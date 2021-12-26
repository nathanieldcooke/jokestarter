'use strict';
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
var _a = require('./../models'), Project = _a.Project, User = _a.User, SupportTier = _a.SupportTier;
module.exports = {
    up: function (queryInterface) { return __awaiter(void 0, void 0, void 0, function () {
        var getRandomNumber, generateUsersToTiers, usersToTiers, projects, _i, projects_1, project, projectUserToSupport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getRandomNumber = function (min, max) {
                        return Math.random() * (max - min) + min;
                    };
                    generateUsersToTiers = function (project) { return __awaiter(void 0, void 0, void 0, function () {
                        var usersToTiersProject, percent, amountOfGoalToHit, amountRaised, otherUserId, supportTiers, percent_1, currSupportTier, FractionOfAmountOfGoalToHit, pledgeAmount, amountPledgesToCreate, currAmount;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    usersToTiersProject = [];
                                    percent = getRandomNumber(5, 70) / 100;
                                    amountOfGoalToHit = project.goal * percent;
                                    amountRaised = 0;
                                    return [4 /*yield*/, User.getUserId('Other User')];
                                case 1:
                                    otherUserId = _a.sent();
                                    return [4 /*yield*/, SupportTier.findAll({
                                            where: {
                                                projectId: project.id
                                            }
                                        })];
                                case 2:
                                    supportTiers = _a.sent();
                                    while (amountRaised < amountOfGoalToHit && supportTiers.length) {
                                        percent_1 = getRandomNumber(5, 25) / 100;
                                        currSupportTier = supportTiers.shift();
                                        FractionOfAmountOfGoalToHit = amountOfGoalToHit * percent_1;
                                        pledgeAmount = currSupportTier.minPledge;
                                        amountPledgesToCreate = 0;
                                        if (FractionOfAmountOfGoalToHit / pledgeAmount > currSupportTier.amountAvailable) {
                                            amountPledgesToCreate = Math.floor(currSupportTier.amountAvailable * .3);
                                        }
                                        else {
                                            amountPledgesToCreate = Math.floor(FractionOfAmountOfGoalToHit / pledgeAmount);
                                        }
                                        currAmount = 0;
                                        while (currAmount < amountPledgesToCreate) {
                                            usersToTiersProject.push({
                                                userId: otherUserId,
                                                supportTierId: currSupportTier.id,
                                                pledgeAmount: pledgeAmount,
                                            });
                                            ++currAmount;
                                        }
                                        amountRaised += FractionOfAmountOfGoalToHit;
                                    }
                                    return [2 /*return*/, usersToTiersProject];
                            }
                        });
                    }); };
                    usersToTiers = [];
                    return [4 /*yield*/, Project.findAll()];
                case 1:
                    projects = _a.sent();
                    _i = 0, projects_1 = projects;
                    _a.label = 2;
                case 2:
                    if (!(_i < projects_1.length)) return [3 /*break*/, 5];
                    project = projects_1[_i];
                    return [4 /*yield*/, generateUsersToTiers(project)];
                case 3:
                    projectUserToSupport = _a.sent();
                    usersToTiers.push.apply(usersToTiers, projectUserToSupport);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    ;
                    return [2 /*return*/, queryInterface.bulkInsert('UsersToSupportTiers', usersToTiers, {})];
            }
        });
    }); },
    down: function (queryInterface) {
        return queryInterface.bulkDelete('UsersToSupportTiers', {}, {});
    }
};
