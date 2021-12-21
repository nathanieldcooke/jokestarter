"use strict";
var asyncHandler = require('express-async-handler');
var _a = require('../../utils/auth'), setTokenCookie = _a.setTokenCookie, restoreUser = _a.restoreUser, requireAuth = _a.requireAuth;
var User = require('../../db/models').User;
var router = require('express').Router();
var usersRouter = require('./users.js');
router.use('/users', usersRouter);
module.exports = router;
