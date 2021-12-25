// packages
import express, {
    Application, 
    Request,
    Response, 
    NextFunction
} from 'express';
const { Op } = require("sequelize");
import { ExpError } from '../../custom-types';
const asyncHandler = require('express-async-handler');
const { Project, Category, SupportTier, UsersToSupportTier } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router();

const getTopLoggedOut = async (pageNumber:string) => {
    const zeroIndexPage = Number(pageNumber) - 1

    const categories = await Category.findAll({
        where: {
            name: {
                [Op.not]: ['Top', 'Bookmarks', 'Contributed']
            }
        }
    })
    const categoryIds = categories.map((category:any) => category.id)

    let projects = await Project.findAll({
        include: {
            model: SupportTier,
            include: UsersToSupportTier
        },
        where: {
            categoryId: {
                [Op.or]: categoryIds
            }
        },
        // limit: 4,
        // offset: zeroIndexPage * 4
    });

    projects = projects.map((project:any) => {
        let sum = 0
        let percentFunded = 0
        project.SupportTiers.forEach((supportTier:any) => {
            sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge 
        })
        percentFunded = sum / project.goal * 100

        return {
            screenShot: project.screenShot,
            title: project.title,
            summary: project.summary,
            creatorName: project.creatorName,
            percentFunded,
            pageNums: projects.length / 4
        }
    })

    projects.sort((a:any, b:any) => b.percentFunded - a.percentFunded)

    return projects.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)
}

router.get('/:category/page/:pageNumber', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const { category, pageNumber } = req.params;
    const user = req.user

    // console.log('Yoooz: ', category, pageNumber)
    if (user) {

    } else {
        // const categoryId = await Category.getCategoryId(category)
        let projects = await getTopLoggedOut(pageNumber)
        console.log('Back: ', projects)
        res.json(projects)
    }
}))

module.exports = router;