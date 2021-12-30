// packages
import express, {
    Request,
    Response, 
} from 'express';
import { IUser } from '../../../types/d';

const { addBookmark, getBookmarks, removeBookmark } = require('../../../utils/routeDataAggregators');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../../utils/auth');

const router = express.Router();

router.get('/page/:pageNumber', restoreUser, asyncHandler( async (req: Request, res: Response) => {

    const { pageNumber } = req.params;
    const user:IUser = req.user;

    let projects = [];

    projects = await getBookmarks(pageNumber, user);

    res.json(projects);

}));

router.post('/:projectId', restoreUser, asyncHandler( async (req: Request, res: Response) => {

    const { projectId } = req.params;
    const { bookmarked } = req.body;
    const user:IUser = req.user;

    if (bookmarked) {
        await addBookmark(projectId, user);
    } else {
        await removeBookmark(projectId, user);
    }

    res.json(projectId);

}));

module.exports = router;