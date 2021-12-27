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

router.put('/:projectId', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const user = req.user

    await HideList.create({
        userId: user.id,
        projectId,
    })

    res.json({message: 'success'}) 
}))

module.exports = router;