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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// packages
var express_1 = __importDefault(require("express"));
var d_1 = require("../../types/d");
var _a = require('../../utils/validation'), validateLogin = _a.validateLogin, validateSignup = _a.validateSignup;
var asyncHandler = require('express-async-handler');
var _b = require('../../utils/auth'), setTokenCookie = _b.setTokenCookie, restoreUser = _b.restoreUser;
var User = require('../../db/models').User;
var bookmarksRouter = require('./users-bookmarks-contributions-hide-routes/bookmarks');
var hideprojectsRouter = require('./users-bookmarks-contributions-hide-routes/hideprojects');
var contributionsRouter = require('./users-bookmarks-contributions-hide-routes/contributions');
var router = express_1.default.Router();
router.use('/:userId/Bookmarks', bookmarksRouter);
router.use('/:userId/hide-project', hideprojectsRouter);
router.use('/:userId/contributions', contributionsRouter);
// Sign up
router.post('/signup', validateSignup, asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, username, email, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, password = _a.password, username = _a.username, email = _a.email;
                return [4 /*yield*/, User.signup({ username: username, email: email, password: password })];
            case 1:
                user = _b.sent();
                return [4 /*yield*/, setTokenCookie(res, user)];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({
                        status: true,
                        errors: [],
                        user: user.toSafeObject()
                    })];
        }
    });
}); }));
// Log in
router.put('/login', validateLogin, asyncHandler(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, credential, password, user, err;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, credential = _a.credential, password = _a.password;
                return [4 /*yield*/, User.login({ credential: credential, password: password })];
            case 1:
                user = _b.sent();
                if (!user) {
                    err = new d_1.ExpError('Login failed');
                    err.status = 401;
                    err.title = 'Login failed';
                    err.errors = ['The provided credentials were invalid.'];
                    return [2 /*return*/, next(err)];
                }
                ;
                return [4 /*yield*/, setTokenCookie(res, user)];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({
                        status: true,
                        errors: [],
                        user: user.toSafeObject()
                    })];
        }
    });
}); }));
// Demo Log in
router.put('/demo', asyncHandler(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.login({ credential: 'demo@user.com', password: 'password' })];
            case 1:
                user = _a.sent();
                if (!user) {
                    err = new d_1.ExpError('Login failed');
                    err.status = 401;
                    err.title = 'Login failed';
                    err.errors = ['The provided credentials were invalid.'];
                    return [2 /*return*/, next(err)];
                }
                ;
                return [4 /*yield*/, setTokenCookie(res, user)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({
                        status: true,
                        errors: [],
                        user: user.toSafeObject()
                    })];
        }
    });
}); }));
// Log out
router.put('/logout', function (_req, res) {
    res.clearCookie('token');
    return res.json({
        status: true,
        errors: [],
        user: { id: null,
            username: null
        }
    });
});
// Restore session user
router.get('/profile', restoreUser, function (req, res) {
    var user = req.user;
    if (user) {
        return res.json({
            status: true,
            errors: [],
            user: user.toSafeObject()
        });
    }
    else
        return res.json({
            status: true,
            errors: [],
            user: { id: null,
                username: null
            }
        });
});
module.exports = router;
