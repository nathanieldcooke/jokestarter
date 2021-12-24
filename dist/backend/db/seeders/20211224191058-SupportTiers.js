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
var _a = require('./../models'), Project = _a.Project, User = _a.User;
module.exports = {
    up: function (queryInterface) { return __awaiter(void 0, void 0, void 0, function () {
        var getRandomNumber, randomDateGenerator, generateSupportTiers, projects, projectSupportTiers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getRandomNumber = function (min, max) {
                        return Math.random() * (max - min) + min;
                    };
                    randomDateGenerator = function () {
                        var currDate = new Date();
                        currDate.setDate(currDate.getDate() + getRandomNumber(55, 90));
                        return currDate;
                    };
                    generateSupportTiers = function (project) {
                        var names = ["perspiciatis unde", "omnis iste natus", "error sit", "voluptatem", "accusantium doloremque", "laudantium", "totam rem aperiam", " eaque ipsa quae", "ab illo inventore", "veritatis et quasi", "architecto", "beatae vitae dicta"];
                        var summary = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur';
                        var increaseBy = [5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 15, 15, 15, 25, 25, 25, 50, 75, 100];
                        var supportTiers = [];
                        var potentialAmountRaised = 0;
                        var currMinPledge = 5;
                        while (potentialAmountRaised < project.goal) {
                            var percent = getRandomNumber(10, 20) / 100;
                            var AmountTierMustRaise = project.goal * percent;
                            currMinPledge = currMinPledge + increaseBy[Math.floor(getRandomNumber(0, 21))];
                            var amountAvailable = AmountTierMustRaise / currMinPledge;
                            supportTiers.push({
                                projectId: project.id,
                                name: names.pop(),
                                summary: summary.slice(getRandomNumber(1, 10), getRandomNumber(90, 110)),
                                estimatedDelivery: randomDateGenerator(),
                                shipsTo: 'USA',
                                amountAvailable: amountAvailable,
                                minPledge: currMinPledge,
                            });
                            potentialAmountRaised += AmountTierMustRaise;
                        }
                        ;
                        return supportTiers;
                    };
                    return [4 /*yield*/, Project.findAll()];
                case 1:
                    projects = _a.sent();
                    projectSupportTiers = [];
                    projects.forEach(function (project) {
                        projectSupportTiers.push.apply(projectSupportTiers, generateSupportTiers(project));
                    });
                    // 
                    return [2 /*return*/, queryInterface.bulkInsert('SupportTiers', projectSupportTiers, {})];
            }
        });
    }); },
    down: function (queryInterface) {
        return queryInterface.bulkDelete('SupportTiers', {}, {});
    }
};
