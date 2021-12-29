// packages
import express, {
    Application, 
    Request,
    Response, 
    NextFunction
} from 'express';

const { Op } = require("sequelize");

import { ExpError, IUser } from '../../../custom-types';
import { IProjects } from '../../../types/d';
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../../utils/auth');

const { Project, Category, SupportTier, UsersToSupportTier, Bookmark } = require('../../../db/models');

const router = express.Router();

const getBookmarks = async (pageNumber:string, user:IUser) => {
    const zeroIndexPage = Number(pageNumber) - 1

    let userBookmarks = await Bookmark.findAll({
        where: {
            userId: user.id
        }
    })

    userBookmarks = userBookmarks.map((bookmark: typeof Bookmark) => bookmark.projectId)

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

    const projectsDict:IProjects[] = projects.map((project: typeof Project) => {
        let sum = 0
        let percentFunded = 0
        project.SupportTiers.forEach((supportTier: typeof SupportTier) => {
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
            bookmarked: true
        }
    })

    return projectsDict.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)
}

const addBookmark = async (projectId:string, user:IUser) => {
    await Bookmark.create({
        projectId,
        userId: user.id
    })
}

const removeBookmark = async (projectId:string, user:IUser) => {
    const bookmark = await Bookmark.findOne({
        where: {
            projectId,
            userId: user.id
        }
    })
    if (bookmark) {
        await bookmark.destroy()
    }
}

router.get('/page/:pageNumber', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const { category, pageNumber } = req.params;
    const user:IUser = req.user

    let projects = []

    projects = await getBookmarks(pageNumber, user)
    res.json(projects) 
}))

router.post('/:projectId', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { bookmarked } = req.body;
    const user:IUser = req.user

    if (bookmarked) {
        await addBookmark(projectId, user)
    } else {
        await removeBookmark(projectId, user)
    }
    res.json(projectId) 
}))

module.exports = router;