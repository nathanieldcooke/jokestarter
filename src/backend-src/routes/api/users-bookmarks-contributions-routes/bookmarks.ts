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

const { Project, Category, SupportTier, UsersToSupportTier, Bookmark } = require('../../../db/models');

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
                [Op.in]: userBookmarks
            }
        }
    })

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
            pageNums: Math.ceil(projects.length / 4),
            bookmarked: bookmarkedProjectsSet.has(project.id)
        }
    })

    return projects.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)
}

const addBookmark = async (projectId:string, user:IUser) => {
    await Bookmark.create({
        projectId,
        userId: user.id
    })
}

const removeBookmark = async (projectId:string, user:IUser) => {
    const bookmark = await Bookmark.findOne({
        projectId,
        userId: user.id
    })
    if (bookmark) {
        await bookmark.destroy()
    }
}

router.get('/page/:pageNumber', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const { category, pageNumber } = req.params;
    const user = req.user

    let projects = []

    projects = await getBookmarks(pageNumber, user)
    res.json(projects) 
}))

router.post('/:projectId', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { bookmarked } = req.body;
    const user = req.user

    if (bookmarked) {
        await addBookmark(projectId, user)
    } else {
        await removeBookmark(projectId, user)
    }
    res.json(projectId) 
}))

module.exports = router;