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
var _a = require('../../db/models'), Project = _a.Project, Category = _a.Category, SupportTier = _a.SupportTier, UsersToSupportTier = _a.UsersToSupportTier, Bookmark = _a.Bookmark;
var _b = require('../../utils/auth'), setTokenCookie = _b.setTokenCookie, restoreUser = _b.restoreUser, requireAuth = _b.requireAuth;
var router = express_1.default.Router();
var getBookmarks = function (pageNumber, user) { return __awaiter(void 0, void 0, void 0, function () {
    var zeroIndexPage, userBookmarks, projects;
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
                                _a[Op.or] = userBookmarks,
                                _a)
                        }
                    })];
            case 2:
                projects = _b.sent();
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
                        pageNums: Math.ceil(projects.length / 4)
                    };
                });
                return [2 /*return*/, projects.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)];
        }
    });
}); };
var getOtherCategory = function (category, pageNumber, user) { return __awaiter(void 0, void 0, void 0, function () {
    var zeroIndexPage, categoryId, projects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                zeroIndexPage = Number(pageNumber) - 1;
                return [4 /*yield*/, Category.getCategoryId(category)];
            case 1:
                categoryId = _a.sent();
                return [4 /*yield*/, Project.findAll({
                        include: {
                            model: SupportTier,
                            include: UsersToSupportTier
                        },
                        where: {
                            categoryId: categoryId
                        },
                    })];
            case 2:
                projects = _a.sent();
                // remove prjects in hidelists if there's a user
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
                        pageNums: Math.ceil(projects.length / 4)
                    };
                });
                return [2 /*return*/, projects.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)];
        }
    });
}); };
var getTop = function (pageNumber, user) { return __awaiter(void 0, void 0, void 0, function () {
    var zeroIndexPage, categories, categoryIds, projects;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                zeroIndexPage = Number(pageNumber) - 1;
                return [4 /*yield*/, Category.findAll({
                        where: {
                            name: (_a = {},
                                _a[Op.not] = ['Top', 'Bookmarks', 'Contributed'],
                                _a)
                        }
                    })];
            case 1:
                categories = _c.sent();
                categoryIds = categories.map(function (category) { return category.id; });
                return [4 /*yield*/, Project.findAll({
                        include: {
                            model: SupportTier,
                            include: UsersToSupportTier
                        },
                        where: {
                            categoryId: (_b = {},
                                _b[Op.or] = categoryIds,
                                _b)
                        },
                    })];
            case 2:
                projects = _c.sent();
                // remove prjects in hidelists if there's a user
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
                        pageNums: projects.length / 4
                    };
                });
                projects.sort(function (a, b) { return b.percentFunded - a.percentFunded; });
                return [2 /*return*/, projects.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)];
        }
    });
}); };
var editSupportTier = function (supportTier, usersToSupportTier) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var backers = usersToSupportTier.length;
    var amountLeft = supportTier.amountAvailable - backers;
    var date = new Date(supportTier.estimatedDelivery);
    return {
        amount: supportTier.minPledge,
        name: supportTier.name,
        summary: supportTier.summary,
        shipsTo: supportTier.shipsTo,
        backers: backers,
        amountLeft: amountLeft,
        estimatedDelivery: "".concat(months[date.getMonth()], " ").concat(date.getFullYear())
    };
};
var getProjectDetails = function (projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var project, sum, numOfBackers, percentFunded, supportTiers, _i, _a, supportTier, usersToSupportTier, dictSupportTier, d1, d2, diffInTIme, diffInDays;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Project.findByPk(projectId, {
                    include: SupportTier
                })];
            case 1:
                project = _b.sent();
                sum = 0;
                numOfBackers = 0;
                percentFunded = 0;
                supportTiers = [];
                _i = 0, _a = project.SupportTiers;
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                supportTier = _a[_i];
                return [4 /*yield*/, UsersToSupportTier.findAll({
                        where: {
                            supportTierId: supportTier.id
                        }
                    })];
            case 3:
                usersToSupportTier = _b.sent();
                usersToSupportTier.forEach(function (uToSTier) {
                    sum += uToSTier.pledgeAmount;
                    numOfBackers += 1;
                });
                dictSupportTier = editSupportTier(supportTier, usersToSupportTier);
                supportTiers.push(dictSupportTier);
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                percentFunded = sum / project.goal;
                d1 = new Date();
                d2 = new Date(project.endDate);
                diffInTIme = d2.getTime() - d1.getTime();
                diffInDays = diffInTIme / (1000 * 3600 * 24);
                return [2 /*return*/, {
                        id: project.id,
                        goal: project.goal,
                        screenShot: project.screenShot,
                        videoSrc: project.video,
                        title: project.title,
                        summary: project.summary,
                        creatorName: project.creatorName,
                        fundsCollected: sum,
                        percentFunded: percentFunded,
                        numOfBackers: numOfBackers,
                        supportTiers: supportTiers,
                        daysToGo: Math.floor(diffInDays)
                    }];
        }
    });
}); };
router.get('/:projectId', restoreUser, asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, projects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = req.params.projectId;
                return [4 /*yield*/, getProjectDetails(projectId)];
            case 1:
                projects = _a.sent();
                res.json(projects);
                return [2 /*return*/];
        }
    });
}); }));
router.get('/:category/page/:pageNumber', restoreUser, asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, category, pageNumber, user, projects;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, category = _a.category, pageNumber = _a.pageNumber;
                user = req.user;
                projects = [];
                if (!(category === 'Top')) return [3 /*break*/, 2];
                return [4 /*yield*/, getTop(pageNumber, user)];
            case 1:
                projects = _b.sent();
                res.json(projects);
                return [3 /*break*/, 6];
            case 2:
                if (!(category === 'Bookmarks')) return [3 /*break*/, 4];
                return [4 /*yield*/, getBookmarks(pageNumber, user)];
            case 3:
                projects = _b.sent();
                res.json(projects);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, getOtherCategory(category, pageNumber, user)];
            case 5:
                projects = _b.sent();
                res.json(projects);
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); }));
module.exports = router;
