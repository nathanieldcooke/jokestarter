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
var Op = require("sequelize").Op;
var asyncHandler = require('express-async-handler');
var _a = require('../../../utils/auth'), setTokenCookie = _a.setTokenCookie, restoreUser = _a.restoreUser, requireAuth = _a.requireAuth;
var _b = require('../../../db/models'), Project = _b.Project, Category = _b.Category, SupportTier = _b.SupportTier, UsersToSupportTier = _b.UsersToSupportTier, Bookmark = _b.Bookmark;
var router = express_1.default.Router();
var getBookmarks = function (pageNumber, user) { return __awaiter(void 0, void 0, void 0, function () {
    var zeroIndexPage, userBookmarks, projects, bookmarkedProjects, bookmarkedProjectsSet;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                zeroIndexPage = Number(pageNumber) - 1;
                return [4 /*yield*/, Bookmark.findAll({
                        where: {
                            userId: user.id
                        }
                    })];
            case 1:
                userBookmarks = _b.sent();
                userBookmarks = userBookmarks.map(function (bookmark) { return bookmark.projectId; });
                return [4 /*yield*/, Project.findAll({
                        include: {
                            model: SupportTier,
                            include: UsersToSupportTier
                        },
                        where: {
                            id: (_a = {},
                                _a[Op.in] = userBookmarks,
                                _a)
                        }
                    })];
            case 2:
                projects = _b.sent();
                bookmarkedProjects = [];
                if (!user) return [3 /*break*/, 4];
                return [4 /*yield*/, Bookmark.findAll({
                        where: {
                            userId: user.id
                        }
                    })];
            case 3:
                bookmarkedProjects = _b.sent();
                bookmarkedProjects = bookmarkedProjects.map(function (bookmark) { return bookmark.projectId; });
                _b.label = 4;
            case 4:
                bookmarkedProjectsSet = new Set(bookmarkedProjects);
                projects = projects.map(function (project) {
                    var sum = 0;
                    var percentFunded = 0;
                    project.SupportTiers.forEach(function (supportTier) {
                        sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge;
                    });
                    percentFunded = sum / project.goal * 100;
                    return {
                        id: project.id,
                        screenShot: project.screenShot,
                        title: project.title,
                        summary: project.summary,
                        creatorName: project.creatorName,
                        percentFunded: percentFunded,
                        pageNums: Math.ceil(projects.length / 4),
                        bookmarked: bookmarkedProjectsSet.has(project.id)
                    };
                });
                return [2 /*return*/, projects.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)];
        }
    });
}); };
var addBookmark = function (projectId, user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Bookmark.create({
                    projectId: projectId,
                    userId: user.id
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var removeBookmark = function (projectId, user) { return __awaiter(void 0, void 0, void 0, function () {
    var bookmark;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("BACK-PU: ", projectId, user.id);
                return [4 /*yield*/, Bookmark.findOne({
                        where: {
                            projectId: projectId,
                            userId: user.id
                        }
                    })];
            case 1:
                bookmark = _a.sent();
                if (!bookmark) return [3 /*break*/, 3];
                return [4 /*yield*/, bookmark.destroy()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
router.get('/page/:pageNumber', restoreUser, asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, category, pageNumber, user, projects;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, category = _a.category, pageNumber = _a.pageNumber;
                user = req.user;
                projects = [];
                return [4 /*yield*/, getBookmarks(pageNumber, user)];
            case 1:
                projects = _b.sent();
                res.json(projects);
                return [2 /*return*/];
        }
    });
}); }));
router.post('/:projectId', restoreUser, asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, bookmarked, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = req.params.projectId;
                bookmarked = req.body.bookmarked;
                user = req.user;
                if (!bookmarked) return [3 /*break*/, 2];
                return [4 /*yield*/, addBookmark(projectId, user)];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, removeBookmark(projectId, user)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                res.json(projectId);
                return [2 /*return*/];
        }
    });
}); }));
module.exports = router;
