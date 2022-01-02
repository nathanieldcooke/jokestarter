// packages
import express, {
    Request,
    Response, 
} from 'express';


const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../../utils/auth');

const { HideList } = require('../../../db/models');

const router = express.Router();

router.delete('/:projectId', restoreUser, asyncHandler( async (req: Request, res: Response) => {

    const { projectId } = req.params;
    const user = req.user;

    await HideList.create({
        userId: user.id,
        projectId,
    })

    res.json({message: 'success'});
}));

module.exports = router;