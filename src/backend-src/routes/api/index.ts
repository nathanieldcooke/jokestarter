const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = require('express').Router();
const usersRouter = require('./users.js');
const projectsRouter = require('./projects');

router.use('/projects', projectsRouter);
router.use('/users', usersRouter);
module.exports = router;