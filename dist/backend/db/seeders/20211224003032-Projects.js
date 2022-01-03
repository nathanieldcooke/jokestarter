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
var Category = require('./../models').Category;
module.exports = {
    up: function (queryInterface) { return __awaiter(void 0, void 0, void 0, function () {
        var getRandomNumber, randomDateGenerator, _a, _b, _c, _d;
        var _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        return __generator(this, function (_w) {
            switch (_w.label) {
                case 0:
                    getRandomNumber = function () {
                        return Math.random() * (45 - 10) + 10;
                    };
                    randomDateGenerator = function () {
                        var currDate = new Date();
                        currDate.setDate(currDate.getDate() + getRandomNumber());
                        return currDate;
                    };
                    _b = (_a = queryInterface).bulkInsert;
                    _c = ['Projects'];
                    _e = {
                        goal: 50000,
                        endDate: randomDateGenerator(),
                        title: 'Sexy Beasts',
                        summary: 'Are you ready to gift your children some of the hottest toys of the year? Look no further than our exclusive line of plush toys with a fun twist.',
                        video: "https://www.youtube.com/embed/068zMec5Jg8?start=28&end=90",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/sexy-beasts.png",
                        imgAlt: "stuffed animals wearing lingerie",
                        creatorName: 'Joe Gatto'
                    };
                    return [4 /*yield*/, Category.getCategoryId('Toys')];
                case 1:
                    _d = [
                        (_e.categoryId = _w.sent(),
                            _e)
                    ];
                    _f = {
                        goal: 120000,
                        endDate: randomDateGenerator(),
                        title: 'Ampubear',
                        summary: 'Children can find bears with arms extremely terrifying. Our latest product aims to address this fact.',
                        video: "https://www.youtube.com/embed/lQAnh1qJPN4?start=20&end=58",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/ampu-bear.png",
                        imgAlt: "a stuffed bear without two front arms",
                        creatorName: 'Brian Quinn'
                    };
                    return [4 /*yield*/, Category.getCategoryId('Toys')];
                case 2:
                    _d = _d.concat([
                        (_f.categoryId = _w.sent(),
                            _f)
                    ]);
                    _g = {
                        goal: 80000,
                        endDate: randomDateGenerator(),
                        title: 'Toilet Soldiers',
                        summary: 'We found that the bathroom of a home can be an otherwise unused place, except for maybe 1 or 2 reasons. Our newest toy changes all of that.',
                        video: "https://www.youtube.com/embed/ia0tqws7b0E?start=18&end=118",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/toilet-soldiers.png",
                        imgAlt: "a toilet decked out with soldier toys",
                        creatorName: "Sal Vulcano"
                    };
                    return [4 /*yield*/, Category.getCategoryId('Toys')];
                case 3:
                    _d = _d.concat([
                        (_g.categoryId = _w.sent(),
                            _g)
                    ]);
                    _h = {
                        goal: 130000,
                        endDate: randomDateGenerator(),
                        title: "Grandpa Whoopsie",
                        summary: "Grandparents can often bring a fear element into their grandchildrens lives. This product helps to normalize this fear.",
                        video: "https://www.youtube.com/embed/aJf3Ra6W3Dw?start=16&end=107",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/grandpa-woopsie.png",
                        imgAlt: "a stuffed elderly male doll with a large canister to pressurize and to simulate peeing",
                        creatorName: "James Murray"
                    };
                    return [4 /*yield*/, Category.getCategoryId('Toys')];
                case 4:
                    _d = _d.concat([
                        (_h.categoryId = _w.sent(),
                            _h)
                    ]);
                    _j = {
                        goal: 25000,
                        endDate: randomDateGenerator(),
                        title: "Mr. Night Light",
                        summary: "Children can often feel scared when left alone at night. This product aims to remedy those fears.",
                        video: "https://www.youtube.com/embed/aoBENdlyRso?start=2&end=44",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/mr-night-light.png",
                        imgAlt: "a large black-cloaked human figure with glowing red eyes",
                        creatorName: "Sal Vulcano"
                    };
                    return [4 /*yield*/, Category.getCategoryId('Toys')];
                case 5:
                    _d = _d.concat([
                        (_j.categoryId = _w.sent(),
                            _j)
                    ]);
                    _k = {
                        goal: 350000,
                        endDate: randomDateGenerator(),
                        title: "Pregnancy Belly",
                        summary: "Looking for a product that can run wild with your child's imagination. Look no further than this latest hit innovation.",
                        video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=2263&end=2342",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/pregnancy-belly.jpeg",
                        imgAlt: "a pregnant women",
                        creatorName: "James Murray"
                    };
                    return [4 /*yield*/, Category.getCategoryId('Toys')];
                case 6:
                    _d = _d.concat([
                        (_k.categoryId = _w.sent(),
                            _k)
                    ]);
                    _l = {
                        goal: 90000,
                        endDate: randomDateGenerator(),
                        title: "Sister Tracker",
                        summary: "A new toy to allow brothers to keep an eye on their sisters.",
                        video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=3122&end=3190",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/sister-tracker.png",
                        imgAlt: "an assortment of spy gear, listening device, shampoo with hidden camera",
                        creatorName: "Brian Quinn"
                    };
                    return [4 /*yield*/, Category.getCategoryId('Toys')];
                case 7:
                    _d = _d.concat([
                        (_l.categoryId = _w.sent(),
                            _l)
                    ]);
                    _m = {
                        goal: 170000,
                        endDate: randomDateGenerator(),
                        title: "Jalapeño Milk",
                        summary: "Are you tired of having the same old basic cereal each morning? Our product will help to spice your mornings up.",
                        video: "https://www.youtube.com/embed/FypMhbbQsFU?start=3&end=82",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/jala-milk.png",
                        imgAlt: "a milk carton with a label that has a jalapeño pepper",
                        creatorName: 'Brian Quinn'
                    };
                    return [4 /*yield*/, Category.getCategoryId('Food')];
                case 8:
                    _d = _d.concat([
                        (_m.categoryId = _w.sent(),
                            _m)
                    ]);
                    _o = {
                        goal: 70000,
                        endDate: randomDateGenerator(),
                        title: 'Toxic-O\'s',
                        summary: "A new and fun food exclusively to help eliminate rat problems at home. This is not for children.",
                        video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=2010&end=2125",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/toxic-os.png",
                        imgAlt: "a box of seemingly child's cereal that is actually rat poison",
                        creatorName: "Sal Vulcano"
                    };
                    return [4 /*yield*/, Category.getCategoryId('Food')];
                case 9:
                    _d = _d.concat([
                        (_o.categoryId = _w.sent(),
                            _o)
                    ]);
                    _p = {
                        goal: 47000,
                        endDate: randomDateGenerator(),
                        title: '47-Hour Energy Bar',
                        summary: "Do you feel tired around the 46th hour? Look no further than this new super bar.",
                        video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=2544&end=2572",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/47-hour-energy.png",
                        imgAlt: "an approximately 1 foot by 1 foot by 2 inches edible energy bar",
                        creatorName: "Sal Vulcano"
                    };
                    return [4 /*yield*/, Category.getCategoryId('Food')];
                case 10:
                    _d = _d.concat([
                        (_p.categoryId = _w.sent(),
                            _p)
                    ]);
                    _q = {
                        goal: 19000,
                        endDate: randomDateGenerator(),
                        title: "Allen the ATM",
                        summary: "Getting money from the ATM can feel robotic at times. Our new product will fix this pressing issue.",
                        video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=3445&end=3496",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/allen-the-atm.png",
                        imgAlt: "a humanoid model in a suit with bulging eyes",
                        creatorName: "Brian Quinn"
                    };
                    return [4 /*yield*/, Category.getCategoryId('Services')];
                case 11:
                    _d = _d.concat([
                        (_q.categoryId = _w.sent(),
                            _q)
                    ]);
                    _r = {
                        goal: 2000000,
                        endDate: randomDateGenerator(),
                        title: "Playground For Seniors",
                        summary: "Help support our revolutionary playground that caters to a completely opposite age range.",
                        video: "https://www.youtube.com/embed/-N6sw-lZLTA?start=60&end=210",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/playground.jpeg",
                        imgAlt: "an child's playground with slides and monkey bars",
                        creatorName: "Sal Vulcano"
                    };
                    return [4 /*yield*/, Category.getCategoryId('Services')];
                case 12:
                    _d = _d.concat([
                        (_r.categoryId = _w.sent(),
                            _r)
                    ]);
                    _s = {
                        goal: 60000,
                        endDate: randomDateGenerator(),
                        title: "HomeSchooling",
                        summary: "A new homeschooling platform that makes your kids the best homees(home-E-Zs) around.",
                        video: "https://www.youtube.com/embed/8Mxk-FDlSZM?start=5&end=196",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/homeschooling.jpeg",
                        imgAlt: "an image of an adult female teaching two children",
                        creatorName: "Sal Vulcano, Joe Gatto"
                    };
                    return [4 /*yield*/, Category.getCategoryId('Services')];
                case 13:
                    _d = _d.concat([
                        (_s.categoryId = _w.sent(),
                            _s)
                    ]);
                    _t = {
                        goal: 60000,
                        endDate: randomDateGenerator(),
                        title: "Game, Set, Crack",
                        summary: "Two drug dealers expand their lucrative trade with a twist that ends with a crack pipe in the Queen's hand.",
                        video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=1545&end=1584",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/game-set-crack.jpeg",
                        imgAlt: "a person smoking a crack pipe",
                        creatorName: 'Joe Gatto'
                    };
                    return [4 /*yield*/, Category.getCategoryId('Misc')];
                case 14:
                    _d = _d.concat([
                        (_t.categoryId = _w.sent(),
                            _t)
                    ]);
                    _u = {
                        goal: 5000,
                        endDate: randomDateGenerator(),
                        title: "Brick Flops",
                        summary: "In our fast-paced work, we can often forget to slow down. This project will provide a gentle reminder.",
                        video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=1701&end=1728",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/brick-flops.png",
                        imgAlt: "a pair of flip-flops with large bricks attached to the soles",
                        creatorName: 'Joe Gatto'
                    };
                    return [4 /*yield*/, Category.getCategoryId('Misc')];
                case 15:
                    _d = _d.concat([
                        (_u.categoryId = _w.sent(),
                            _u)
                    ]);
                    _v = {
                        goal: 35000,
                        endDate: randomDateGenerator(),
                        title: "Murder Your Family",
                        summary: "We present the newest game that allows children to blow off steam while subconsciously channeling their anger.",
                        video: "https://www.youtube.com/embed/rtlFR5SYzYo?start=3610&end=3640",
                        screenShot: "https://nathanielcookesairbnblite.s3.us-east-2.amazonaws.com/joke-video-shots/Murder-Your-Family.png",
                        imgAlt: "a child looking up at 3 seemingly angry family members; father, mother, and daughter",
                        creatorName: 'Joe Gatto'
                    };
                    return [4 /*yield*/, Category.getCategoryId('Misc')];
                case 16: return [2 /*return*/, _b.apply(_a, _c.concat([_d.concat([
                            (_v.categoryId = _w.sent(),
                                _v)
                        ]), {}]))];
            }
        });
    }); },
    down: function (queryInterface) {
        return queryInterface.bulkDelete('Projects', {}, {});
    }
};
