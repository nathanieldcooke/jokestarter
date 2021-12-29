// packages
import express, {
    Application, 
    Request,
    Response, 
    NextFunction
} from 'express';
const { Op } = require("sequelize");
import { ExpError, IUser } from '../../custom-types';
import { IProjects, ISupportTier2 } from '../../types/d';
const asyncHandler = require('express-async-handler');
const { Project, Category, SupportTier, UsersToSupportTier, Bookmark, HideList } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router();


const getOtherCategory = async (category:string, pageNumber:string, user:IUser) => {
    const zeroIndexPage = Number(pageNumber) - 1
    
    const categoryId = await Category.getCategoryId(category)
    
    let bookmarkedProjects:typeof Project[]|number[] = []
    let hideLists:typeof Project[]|number[] = []
    
    if (user) {
        bookmarkedProjects = await Bookmark.findAll({
            where: {
                userId: user.id
            }
        })
    
        hideLists = await HideList.findAll({
            where: {
                userId: user.id
            }
        })
    
        bookmarkedProjects = bookmarkedProjects.map((bookmark:typeof Project) => bookmark.projectId)
        hideLists = hideLists.map((hide:typeof Project) => hide.projectId)
    }

    let bookmarkedProjectsSet = new Set(bookmarkedProjects)

    let projects = await Project.findAll({
        include: {
            model: SupportTier,
            include: UsersToSupportTier
        },
        where: {
            categoryId: categoryId,
            id: {
                [Op.not]: hideLists
            }
        },
    });


    const projectsDict:IProjects[] = projects.map((project:typeof Project) => {
        let sum = 0
        let percentFunded = 0
        project.SupportTiers.forEach((supportTier:typeof SupportTier) => {
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
            pageNums: Math.ceil(projects.length / 4),
            bookmarked: bookmarkedProjectsSet.has(project.id)
        }
    })

    return projectsDict.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)

}

const getTop = async (pageNumber:string, user:IUser) => {
    const zeroIndexPage = Number(pageNumber) - 1

    const categories = await Category.findAll({
        where: {
            name: {
                [Op.not]: ['Top', 'Bookmarks', 'Contributed']
            }
        }
    })
    const categoryIds = categories.map((category:typeof Category) => category.id)

    let bookmarkedProjects:typeof Project[]|number[] = []
    let hideLists:typeof Project[]|number[] = []
    
    if (user) {
        bookmarkedProjects = await Bookmark.findAll({
            where: {
                userId: user.id
            }
        })
    
        hideLists = await HideList.findAll({
            where: {
                userId: user.id
            }
        })
    
        bookmarkedProjects = bookmarkedProjects.map((bookmark:typeof Project) => bookmark.projectId)
        hideLists = hideLists.map((hide:typeof Project) => hide.projectId)
    }
    
    let bookmarkedProjectsSet = new Set(bookmarkedProjects)

    let projects = await Project.findAll({
        include: {
            model: SupportTier,
            include: UsersToSupportTier
        },
        where: {
            categoryId: {
                [Op.or]: categoryIds
            },
            id: {
                [Op.not]: hideLists
            }
        },
    });

    let projectsDict:IProjects[] = projects.map((project: typeof Project) => {
        let sum = 0
        let percentFunded = 0
        project.SupportTiers.forEach((supportTier:typeof SupportTier) => {
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
            pageNums: Math.ceil(projects.length / 4),
            bookmarked: bookmarkedProjectsSet.has(project.id)
        }
    })

    projectsDict.sort((a:IProjects, b:IProjects) => b.percentFunded - a.percentFunded)

    return projectsDict.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)
}

const editSupportTier = (supportTier: typeof SupportTier, usersToSupportTier: typeof UsersToSupportTier) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let backers = usersToSupportTier.length
    let amountLeft = supportTier.amountAvailable - backers
    let date = new Date(supportTier.estimatedDelivery) 
    return {
        id: supportTier.id,
        amount: supportTier.minPledge,
        name: supportTier.name,
        summary: supportTier.summary,
        shipsTo: supportTier.shipsTo,
        backers,
        amountLeft,
        estimatedDelivery: `${months[date.getMonth()]} ${date.getFullYear()}`
    }
}

const getProjectDetails = async (projectId:string, user:IUser) => {


    let project = await Project.findByPk(projectId, {
        include: SupportTier
    });
    let sum = 0
    let numOfBackers = 0
    let percentFunded = 0
    let supportTiers:ISupportTier2[] = []

    let bookmarkedProjects = []
    
    if (user) {
        bookmarkedProjects = await Bookmark.findAll({
            where: {
                userId: user.id
            }
        })
    
        bookmarkedProjects = bookmarkedProjects.map((bookmark: { projectId: number; }) => bookmark.projectId)
    }
    
    let bookmarkedProjectsSet = new Set(bookmarkedProjects)

    for (let supportTier of project.SupportTiers) {
        let usersToSupportTier = await UsersToSupportTier.findAll({
            where: {
                supportTierId: supportTier.id
            }
        })

        usersToSupportTier.forEach((uToSTier: typeof UsersToSupportTier) => {
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
        daysToGo: Math.floor(diffInDays),
        bookmarked: bookmarkedProjectsSet.has(project.id)
    }


}

router.get('/:projectId', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    
    const user = req.user;

    const { projectId } = req.params;


    let projects = await getProjectDetails(projectId, user)
    res.json(projects)
    
}))

router.get('/:category/page/:pageNumber', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const { category, pageNumber } = req.params;
    const user:IUser = req.user
    // console.log(user)

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