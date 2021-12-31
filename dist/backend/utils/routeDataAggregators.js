"use strict";
/*
GLOSSARY:
    route: projects
    route: users
    route: users/bookmarks
    route: users/contributions
    route: projects
*/
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
/////////////////////route: projects
var sequelize_1 = require("sequelize");
var _a = require('../db/models'), Project = _a.Project, Category = _a.Category, SupportTier = _a.SupportTier, UsersToSupportTier = _a.UsersToSupportTier, Bookmark = _a.Bookmark, HideList = _a.HideList, User = _a.User;
var getOtherCategory = function (category, pageNumber, user) { return __awaiter(void 0, void 0, void 0, function () {
    var zeroIndexPage, categoryId, bookmarkedProjects, hideLists, bookmarkedProjectsSet, projects, projectsDict;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                zeroIndexPage = Number(pageNumber) - 1;
                return [4 /*yield*/, Category.getCategoryId(category)];
            case 1:
                categoryId = _b.sent();
                bookmarkedProjects = [];
                hideLists = [];
                if (!user) return [3 /*break*/, 4];
                return [4 /*yield*/, Bookmark.findAll({
                        where: {
                            userId: user.id
                        }
                    })];
            case 2:
                bookmarkedProjects = _b.sent();
                return [4 /*yield*/, HideList.findAll({
                        where: {
                            userId: user.id
                        }
                    })];
            case 3:
                hideLists = _b.sent();
                bookmarkedProjects = bookmarkedProjects.map(function (bookmark) { return bookmark.projectId; });
                hideLists = hideLists.map(function (hide) { return hide.projectId; });
                _b.label = 4;
            case 4:
                ;
                bookmarkedProjectsSet = new Set(bookmarkedProjects);
                return [4 /*yield*/, Project.findAll({
                        include: {
                            model: SupportTier,
                            include: UsersToSupportTier
                        },
                        where: {
                            categoryId: categoryId,
                            id: (_a = {},
                                _a[sequelize_1.Op.not] = hideLists,
                                _a)
                        },
                    })];
            case 5:
                projects = _b.sent();
                projectsDict = projects.map(function (project) {
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
                return [2 /*return*/, projectsDict.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)];
        }
    });
}); };
var getTop = function (pageNumber, user) { return __awaiter(void 0, void 0, void 0, function () {
    var zeroIndexPage, categories, categoryIds, bookmarkedProjects, hideLists, bookmarkedProjectsSet, projects, projectsDict;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                zeroIndexPage = Number(pageNumber) - 1;
                return [4 /*yield*/, Category.findAll({
                        where: {
                            name: (_a = {},
                                _a[sequelize_1.Op.not] = ['Top', 'Bookmarks', 'Contributed'],
                                _a)
                        }
                    })];
            case 1:
                categories = _d.sent();
                categoryIds = categories.map(function (category) { return category.id; });
                bookmarkedProjects = [];
                hideLists = [];
                if (!user) return [3 /*break*/, 4];
                return [4 /*yield*/, Bookmark.findAll({
                        where: {
                            userId: user.id
                        }
                    })];
            case 2:
                bookmarkedProjects = _d.sent();
                return [4 /*yield*/, HideList.findAll({
                        where: {
                            userId: user.id
                        }
                    })];
            case 3:
                hideLists = _d.sent();
                bookmarkedProjects = bookmarkedProjects.map(function (bookmark) { return bookmark.projectId; });
                hideLists = hideLists.map(function (hide) { return hide.projectId; });
                _d.label = 4;
            case 4:
                ;
                bookmarkedProjectsSet = new Set(bookmarkedProjects);
                return [4 /*yield*/, Project.findAll({
                        include: {
                            model: SupportTier,
                            include: UsersToSupportTier
                        },
                        where: {
                            categoryId: (_b = {},
                                _b[sequelize_1.Op.or] = categoryIds,
                                _b),
                            id: (_c = {},
                                _c[sequelize_1.Op.not] = hideLists,
                                _c)
                        },
                    })];
            case 5:
                projects = _d.sent();
                projectsDict = projects.map(function (project) {
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
                projectsDict.sort(function (a, b) { return b.percentFunded - a.percentFunded; });
                return [2 /*return*/, projectsDict.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)];
        }
    });
}); };
var genDictSupportTier = function (supportTier, usersToSupportTier) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var backers = usersToSupportTier.length;
    var amountLeft = supportTier.amountAvailable - backers;
    var date = new Date(supportTier.estimatedDelivery);
    return {
        id: supportTier.id,
        amount: supportTier.minPledge,
        name: supportTier.name,
        summary: supportTier.summary,
        shipsTo: supportTier.shipsTo,
        backers: backers,
        amountLeft: amountLeft,
        estimatedDelivery: "".concat(months[date.getMonth()], " ").concat(date.getFullYear())
    };
};
var getProjectDetails = function (projectId, user) { return __awaiter(void 0, void 0, void 0, function () {
    var project, sum, numOfBackers, percentFunded, supportTiers, bookmarkedProjects, bookmarkedProjectsSet, _i, _a, supportTier, usersToSupportTier, dictSupportTier, d1, d2, diffInTIme, diffInDays;
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
                bookmarkedProjects = [];
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, Bookmark.findAll({
                        where: {
                            userId: user.id
                        }
                    })];
            case 2:
                bookmarkedProjects = _b.sent();
                bookmarkedProjects = bookmarkedProjects.map(function (bookmark) { return bookmark.projectId; });
                _b.label = 3;
            case 3:
                ;
                bookmarkedProjectsSet = new Set(bookmarkedProjects);
                _i = 0, _a = project.SupportTiers;
                _b.label = 4;
            case 4:
                if (!(_i < _a.length)) return [3 /*break*/, 7];
                supportTier = _a[_i];
                return [4 /*yield*/, UsersToSupportTier.findAll({
                        where: {
                            supportTierId: supportTier.id
                        }
                    })];
            case 5:
                usersToSupportTier = _b.sent();
                usersToSupportTier.forEach(function (uToSTier) {
                    sum += uToSTier.pledgeAmount;
                    numOfBackers += 1;
                });
                dictSupportTier = genDictSupportTier(supportTier, usersToSupportTier);
                supportTiers.push(dictSupportTier);
                _b.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7:
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
                        daysToGo: Math.floor(diffInDays),
                        bookmarked: bookmarkedProjectsSet.has(project.id)
                    }];
        }
    });
}); };
/////////////////////route: users
var generateDemoUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var getRandomInt, randomNum, username, email, password, user, projectId1, projectId2, projectId3, project1, project2, project3, supportTier1, supportTier1Pledge, supportTier2, supportTier2Pledge, supportTier3, supportTier3Pledge;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getRandomInt = function (max) {
                    return Math.floor(Math.random() * max);
                };
                randomNum = "".concat(getRandomInt(10)).concat(getRandomInt(10)).concat(getRandomInt(10));
                username = "Demo User-".concat(randomNum);
                email = "demo-user".concat(randomNum, "@demouser.com");
                password = "password".concat(randomNum, "!A");
                return [4 /*yield*/, User.signup({ username: username, email: email, password: password })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, Project.getProjectId('Sexy Beasts')];
            case 2:
                projectId1 = _a.sent();
                return [4 /*yield*/, Project.getProjectId('Jalapeno Milk')];
            case 3:
                projectId2 = _a.sent();
                return [4 /*yield*/, Project.getProjectId('Playground For Seniors')];
            case 4:
                projectId3 = _a.sent();
                return [4 /*yield*/, Bookmark.create({ userId: user.id, projectId: projectId1 })];
            case 5:
                _a.sent();
                return [4 /*yield*/, Bookmark.create({ userId: user.id, projectId: projectId2 })];
            case 6:
                _a.sent();
                return [4 /*yield*/, Bookmark.create({ userId: user.id, projectId: projectId3 })];
            case 7:
                _a.sent();
                return [4 /*yield*/, Project.findOne({
                        where: {
                            title: 'Pregnancy Belly'
                        },
                        include: SupportTier
                    })];
            case 8:
                _a.sent();
                return [4 /*yield*/, Project.findOne({
                        where: {
                            title: 'HomeSchooling'
                        },
                        include: SupportTier
                    })];
            case 9:
                project1 = _a.sent();
                return [4 /*yield*/, Project.findOne({
                        where: {
                            title: 'Game, Set, Crack'
                        },
                        include: SupportTier
                    })];
            case 10:
                project2 = _a.sent();
                return [4 /*yield*/, Project.findOne({
                        where: {
                            title: 'Pregnancy Belly'
                        },
                        include: SupportTier
                    })];
            case 11:
                project3 = _a.sent();
                supportTier1 = project1.SupportTiers[0].id;
                supportTier1Pledge = project1.SupportTiers[0].minPledge;
                supportTier2 = project2.SupportTiers[3].id;
                supportTier2Pledge = project2.SupportTiers[0].minPledge;
                supportTier3 = project3.SupportTiers[2].id;
                supportTier3Pledge = project3.SupportTiers[0].minPledge;
                return [4 /*yield*/, UsersToSupportTier.create({ userId: user.id, supportTierId: supportTier1, pledgeAmount: supportTier1Pledge })];
            case 12:
                _a.sent();
                return [4 /*yield*/, UsersToSupportTier.create({ userId: user.id, supportTierId: supportTier2, pledgeAmount: supportTier2Pledge })];
            case 13:
                _a.sent();
                return [4 /*yield*/, UsersToSupportTier.create({ userId: user.id, supportTierId: supportTier3, pledgeAmount: supportTier3Pledge })];
            case 14:
                _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
/////////////////////route: users/bookmarks
var getBookmarks = function (pageNumber, user) { return __awaiter(void 0, void 0, void 0, function () {
    var zeroIndexPage, userBookmarks, projects, projectsDict;
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
                                _a[sequelize_1.Op.in] = userBookmarks,
                                _a)
                        }
                    })];
            case 2:
                projects = _b.sent();
                projectsDict = projects.map(function (project) {
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
                        bookmarked: true
                    };
                });
                return [2 /*return*/, projectsDict.slice(zeroIndexPage * 4, zeroIndexPage * 4 + 4)];
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
            case 0: return [4 /*yield*/, Bookmark.findOne({
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
            case 3:
                ;
                return [2 /*return*/];
        }
    });
}); };
/////////////////////route: users/contributions
var formatContibutions = function (data, pageNumber, user) { return __awaiter(void 0, void 0, void 0, function () {
    var zeroIndexPage, bookmarkedProjects, bookmarkedProjectsSet, reciepts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                zeroIndexPage = Number(pageNumber) - 1;
                bookmarkedProjects = [];
                if (!user) return [3 /*break*/, 2];
                return [4 /*yield*/, Bookmark.findAll({
                        where: {
                            userId: user.id
                        }
                    })];
            case 1:
                bookmarkedProjects = _a.sent();
                bookmarkedProjects = bookmarkedProjects.map(function (bookmark) { return bookmark.projectId; });
                _a.label = 2;
            case 2:
                ;
                bookmarkedProjectsSet = new Set(bookmarkedProjects);
                reciepts = data.map(function (dataPoint) {
                    var supportTier = dataPoint.SupportTier;
                    var project = supportTier.Project;
                    var supportTiers = project.SupportTiers;
                    var sum = 0;
                    var percentFunded = 0;
                    supportTiers.forEach(function (supportTier) {
                        sum += supportTier.UsersToSupportTiers.length * supportTier.minPledge;
                    });
                    percentFunded = sum / project.goal * 100;
                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    var date = new Date(supportTier.estimatedDelivery);
                    return {
                        recieptTile: {
                            amountPledged: dataPoint.pledgeAmount,
                            nameOfTier: supportTier.name,
                            summaryOfTier: supportTier.summary,
                            etaDelivery: "".concat(months[date.getMonth()], " ").concat(date.getFullYear()),
                            shipsTo: supportTier.shipsTo
                        },
                        projectTile: {
                            id: project.id,
                            screenShot: project.screenShot,
                            title: project.title,
                            summary: project.summary,
                            creatorName: project.creatorName,
                            percentFunded: percentFunded,
                            pageNums: Math.ceil(data.length / 2),
                            bookmarked: bookmarkedProjectsSet.has(project.id)
                        }
                    };
                });
                return [2 /*return*/, reciepts.slice(zeroIndexPage * 2, zeroIndexPage * 2 + 2)];
        }
    });
}); };
module.exports = {
    formatContibutions: formatContibutions,
    removeBookmark: removeBookmark,
    addBookmark: addBookmark,
    getBookmarks: getBookmarks,
    getProjectDetails: getProjectDetails,
    getOtherCategory: getOtherCategory,
    getTop: getTop,
    genDictSupportTier: genDictSupportTier,
    generateDemoUser: generateDemoUser
};
