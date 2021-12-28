// packages
import express, {
    Application, 
    Request,
    Response, 
    NextFunction
} from 'express';

const { Op } = require("sequelize");

import { ExpError, IUser } from '../../../custom-types';
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../../utils/auth');

const { Project, Category, SupportTier, UsersToSupportTier, Bookmark, HideList } = require('../../../db/models');

const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const formatData = async (data:any, pageNumber:string, user:IUser) => {
    const zeroIndexPage = Number(pageNumber) - 1

    let bookmarkedProjects = []

    if (user) {
        bookmarkedProjects = await Bookmark.findAll({
            where: {
                userId: user.id
            }
        })
    
        bookmarkedProjects = bookmarkedProjects.map((bookmark:any) => bookmark.projectId)
    }

    let bookmarkedProjectsSet = new Set(bookmarkedProjects)

    let reciepts = data.map((dataPoint:any) => {
        const supportTier = dataPoint.SupportTier
        const project = supportTier.Project
        const supportTiers = project.SupportTiers
        
        let sum = 0
        let percentFunded = 0
        supportTiers.forEach((supportTier:any) => {
            sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge 
        })
        percentFunded = sum / project.goal * 100

        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let date = new Date(supportTier.estimatedDelivery) 

        return {
            recieptTile:{
                amountPledged: dataPoint.pledgeAmount,
                nameOfTier: supportTier.name,
                summaryOfTier: supportTier.summary,
                etaDelivery: `${months[date.getMonth()]} ${date.getFullYear()}`,
                shipsTo: supportTier.shipsTo
            },
            projectTile:{
                id: project.id,
                screenShot: project.screenShot,
                title: project.title,
                summary: project.summary,
                creatorName: project.creatorName,
                percentFunded,
                pageNums: Math.ceil(data.length / 2),
                bookmarked: bookmarkedProjectsSet.has(project.id)
            }
        }
    })

    return reciepts.slice(zeroIndexPage * 2, zeroIndexPage * 2 + 2)
}


// uses posted information to initiate payment through stripe API
router.post('/', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const { supportTierId, amountPledged, curr_url } = req.body;
    const user = req.user
    const supportTier = await SupportTier.findByPk(supportTierId);
    console.log('HIT BACK ROUTE', supportTierId, amountPledged, supportTier.minPledge)
    if (Number(amountPledged) >= supportTier.minPledge) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: supportTier.name
                        },
                        unit_amount: amountPledged * 100
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${process.env.DOMAIN}/contributions/page/1`,
            cancel_url: `${process.env.DOMAIN + curr_url}`
        })

        UsersToSupportTier.create({
            userId: user.id,
            supportTierId: supportTier.id,
            pledgeAmount: amountPledged
        })

        res.json({url: session.url}) 
        return
    }
    res.json({url: curr_url})
}))

router.get('/page/:pageNumber', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const {pageNumber} = req.params
    const user = req.user

    const data = await UsersToSupportTier.findAll({
        where: {
            userId: user.id
        },
        include: {
            model: SupportTier,
            include: {
                model: Project,
                include: {
                    model: SupportTier,
                    include: UsersToSupportTier
                }
            }
        }
    })
    const formattedData = await formatData(data, pageNumber, user)
    res.json({contributions: formattedData})
}))

module.exports = router;