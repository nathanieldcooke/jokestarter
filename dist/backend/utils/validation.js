"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d_1 = require("../types/d");
var check = require('express-validator').check;
var validationResult = require('express-validator').validationResult;
// middleware for formatting errors from express-validator middleware
var handleValidationErrors = function (req, _res, next) {
    var validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        var errors = validationErrors
            .array()
            .map(function (error) { return "".concat(error.msg); });
        var err = new d_1.ExpError('Bad request.');
        err.errors = errors;
        err.status = 401;
        err.title = 'Bad request.';
        next(err);
    }
    next();
};
//////////////////////////route: users
var validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid username or email.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];
var validateSignup = [
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Please provide a username with less than 51 characters.'),
    check('email')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a email with at least 4 characters.'),
    check('email')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Please provide a email with less than 51 characters.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];
module.exports = {
    handleValidationErrors: handleValidationErrors,
    validateLogin: validateLogin,
    validateSignup: validateSignup
};
