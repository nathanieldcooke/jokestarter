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
var _b = require('../../../db/models'), Project = _b.Project, Category = _b.Category, SupportTier = _b.SupportTier, UsersToSupportTier = _b.UsersToSupportTier, Bookmark = _b.Bookmark, HideList = _b.HideList;
var router = express_1.default.Router();
var stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
var formatData = function (data, pageNumber, user) { return __awaiter(void 0, void 0, void 0, function () {
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
// uses posted information to initiate payment through stripe API
router.post('/', restoreUser, asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, supportTierId, amountPledged, curr_url, user, supportTier, session;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, supportTierId = _a.supportTierId, amountPledged = _a.amountPledged, curr_url = _a.curr_url;
                user = req.user;
                return [4 /*yield*/, SupportTier.findByPk(supportTierId)];
            case 1:
                supportTier = _b.sent();
                console.log('HIT BACK ROUTE', supportTierId, amountPledged, supportTier.minPledge);
                if (!(Number(amountPledged) >= supportTier.minPledge)) return [3 /*break*/, 3];
                return [4 /*yield*/, stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        line_items: [
                            {
                                price_data: {
                                    currency: 'usd',
                                    product_data: {
                                        name: supportTier.name
                                    },
                                    unit_amount: amountPledged * 100
                                },
                                quantity: 1
                            }
                        ],
                        mode: 'payment',
                        success_url: "".concat(process.env.DOMAIN, "/contributions/page/1"),
                        cancel_url: "".concat(process.env.DOMAIN + curr_url)
                    })];
            case 2:
                session = _b.sent();
                UsersToSupportTier.create({
                    userId: user.id,
                    supportTierId: supportTier.id,
                    pledgeAmount: amountPledged
                });
                res.json({ url: session.url });
                return [2 /*return*/];
            case 3:
                res.json({ url: curr_url });
                return [2 /*return*/];
        }
    });
}); }));
router.get('/page/:pageNumber', restoreUser, asyncHandler(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pageNumber, user, data, formattedData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pageNumber = req.params.pageNumber;
                user = req.user;
                return [4 /*yield*/, UsersToSupportTier.findAll({
                        where: {
                            userId: user.id
                        },
                        include: {
                            model: SupportTier,
                            include: {
                                model: Project,
                                include: {
                                    model: SupportTier,
                                    include: UsersToSupportTier
                                }
                            }
                        }
                    })];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, formatData(data, pageNumber, user)];
            case 2:
                formattedData = _a.sent();
                res.json({ contributions: formattedData });
                return [2 /*return*/];
        }
    });
}); }));
module.exports = router;
