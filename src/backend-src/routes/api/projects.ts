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

const getBookmarks = async (pageNumber:string, user:any) => {
    const zeroIndexPage = Number(pageNumber) - 1

    let userBookmarks = await Bookmark.findAll({
        where: {
            userId: user.id
        }
    })

    
    userBookmarks = userBookmarks.map((bookmark:any) => bookmark.projectId)

    let projects = await Project.findAll({
        include: {
            model: SupportTier,
            include: UsersToSupportTier
        },
        where: {
            id: {
                [Op.or]: userBookmarks
            }
        }
    })

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

const editSupportTier = (supportTier:any) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let backers = supportTier.UsersToSupportTiers.length
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
        include: {
            model: SupportTier,
            include: UsersToSupportTier
        }
    });
    let sum = 0
    let numOfBackers = 0
    let percentFunded = 0
    let supportTiers:any = []
    project.SupportTiers.forEach((supportTier:any) => {
        sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge 
        console.log('Helloz', supportTier)
        numOfBackers += supportTier.UsersToSupportTiers.length
        
        let dictSupportTier = editSupportTier(supportTier) 
        console.log('Yoooz')
        supportTiers.push(dictSupportTier)
    })
    percentFunded = sum / project.goal * 100

    let d1 = new Date()
    let d2 = new Date(project.endDate)

    let diffInTIme = d2.getTime() - d1.getTime();

    let diffInDays = diffInTIme / (1000 * 3600 * 24);

    return {
        id: project.id,
        screenShot: project.screenShot,
        videoScr: project.video,
        title: project.title,
        summary: project.summary,
        creatorName: project.creatorName,
        fundsCollected: sum,
        percentFunded,
        numOfBackers,
        supportTiers,
        daysToGo: diffInDays
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
    } else if (category === 'Bookmarks') { // other logged out categories
        projects = await getBookmarks(pageNumber, user)
        res.json(projects)
    } else {
        projects = await getOtherCategory(category, pageNumber, user)
        res.json(projects)
    }
    
}))

module.exports = router;