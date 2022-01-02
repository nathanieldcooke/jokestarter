// packages
import express, {
    Request,
    Response, 
} from 'express';
import { IUser } from '../../types/d';

const { getProjectDetails, getTop, getOtherCategory } = require('../../utils/routeDataAggregators');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();


router.get('/:projectId', restoreUser, asyncHandler( async (req: Request, res: Response) => {
    
    const user = req.user;
    const { projectId } = req.params;

    let project = await getProjectDetails(projectId, user);

    res.json(project);
    
}))

router.get('/:category/page/:pageNumber', restoreUser, asyncHandler( async (req: Request, res: Response) => {

    const { category, pageNumber } = req.params;
    const user:IUser = req.user;

    let projects = [];

    if (category === 'Top') {

        projects = await getTop(pageNumber, user)
        res.json(projects)
    } else {

        projects = await getOtherCategory(category, pageNumber, user)
        res.json(projects)
    };
    
}));

module.exports = router;