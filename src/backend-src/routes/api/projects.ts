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
const { Project, Category, SupportTier, UsersToSupportTier, Bookmark } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router();


const getOtherCategory = async (category:string, pageNumber:string, user:any) => {
    const zeroIndexPage = Number(pageNumber) - 1

    const categoryId = await Category.getCategoryId(category)

    let projects = await Project.findAll({
        include: {
            model: SupportTier,
            include: UsersToSupportTier
        },
        where: {
            categoryId: categoryId
        },
    });

    // remove prjects in hidelists if there's a user

    projects = projects.map((project:any) => {
        let sum = 0
        let percentFunded = 0
        project.SupportTiers.forEach((supportTier:any) => {
            sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge 
        })
        percentFunded = sum / project.goal * 100

        return {
            id: project.id,
            screenShot: project.screenShot,
            title: project.title,
            summary: project.summary,
            creatorName: project.creatorName,
            percentFunded,
            pageNums: Math.ceil(projects.length / 4)
        }
    })

    return projects.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)

}

const getTop = async (pageNumber:string, user:any) => {
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
    });

    // remove prjects in hidelists if there's a user

    projects = projects.map((project:any) => {
        let sum = 0
        let percentFunded = 0
        project.SupportTiers.forEach((supportTier:any) => {
            sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge 
        })
        percentFunded = sum / project.goal * 100

        return {
            id: project.id,
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

const editSupportTier = (supportTier:any, usersToSupportTier:any) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let backers = usersToSupportTier.length
    let amountLeft = supportTier.amountAvailable - backers
    let date = new Date(supportTier.estimatedDelivery) 
    return {
        amount: supportTier.minPledge,
        name: supportTier.name,
        summary: supportTier.summary,
        shipsTo: supportTier.shipsTo,
        backers,
        amountLeft,
        estimatedDelivery: `${months[date.getMonth()]} ${date.getFullYear()}`
    }
}

const getProjectDetails = async (projectId:string) => {


    let project = await Project.findByPk(projectId, {
        include: SupportTier
    });
    let sum = 0
    let numOfBackers = 0
    let percentFunded = 0
    let supportTiers:any = []

    for (let supportTier of project.SupportTiers) {
        let usersToSupportTier = await UsersToSupportTier.findAll({
            where: {
                supportTierId: supportTier.id
            }
        })

        usersToSupportTier.forEach((uToSTier:any) => {
            sum += uToSTier.pledgeAmount;
            numOfBackers += 1;
        })

        let dictSupportTier = editSupportTier(supportTier, usersToSupportTier)
        supportTiers.push(dictSupportTier)
    }

    percentFunded = sum / project.goal

    let d1 = new Date()
    let d2 = new Date(project.endDate)

    let diffInTIme = d2.getTime() - d1.getTime();

    let diffInDays = diffInTIme / (1000 * 3600 * 24);

    return {
        id: project.id,
        goal: project.goal,
        screenShot: project.screenShot,
        videoSrc: project.video,
        title: project.title,
        summary: project.summary,
        creatorName: project.creatorName,
        fundsCollected: sum,
        percentFunded,
        numOfBackers,
        supportTiers,
        daysToGo: Math.floor(diffInDays)
    }


}

router.get('/:projectId', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    
    const { projectId } = req.params;


    let projects = await getProjectDetails(projectId)
    res.json(projects)
    
}))

router.get('/:category/page/:pageNumber', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const { category, pageNumber } = req.params;
    const user = req.user


    let projects = []
    if (category === 'Top') {
        projects = await getTop(pageNumber, user)
        res.json(projects)
    } else {
        projects = await getOtherCategory(category, pageNumber, user)
        res.json(projects)
    }
    
}))

module.exports = router;