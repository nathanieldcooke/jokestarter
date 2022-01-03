"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var d_1 = require("../types/d");
var check = require('express-validator').check;
var validationResult = require('express-validator').validationResult;
var User = require('../db/models').User;
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
    check('username')
        .custom(function (username, _checkVal) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User.findOne({ where: { username: username } })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        throw new Error('Username already in use.');
                    }
                    return [2 /*return*/];
            }
        });
    }); }),
    check('email')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a email with at least 4 characters.'),
    check('email')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Please provide a email with less than 51 characters.'),
    check('email')
        .custom(function (email, _checkVal) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User.findOne({ where: { email: email } })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        throw new Error('Email already in use.');
                    }
                    return [2 /*return*/];
            }
        });
    }); }),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('confirmPassword')
        .trim() // removes trailing spaces
        // Validate confirmPassword
        .custom(function (confirmPassword, checkVal) { return __awaiter(void 0, void 0, void 0, function () {
        var password;
        return __generator(this, function (_a) {
            password = checkVal.req.body.password;
            if (password !== confirmPassword) {
                throw new Error('Password and Confirm Password must match');
            }
            return [2 /*return*/];
        });
    }); }),
    handleValidationErrors
];
module.exports = {
    handleValidationErrors: handleValidationErrors,
    validateLogin: validateLogin,
    validateSignup: validateSignup
};
