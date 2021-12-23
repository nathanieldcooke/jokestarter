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
var bcrypt = require('bcryptjs');
// const path = require('path');
var Sequelize = require('sequelize');
var DataTypes = require("sequelize").DataTypes;
'use strict';
module.exports = function (sequelize, dataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                min: 4,
                max: 50,
            }
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                min: 4,
                max: 50,
            }
        },
        hashedPassword: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                min: 60,
                max: 60
            }
        },
    }, {
        defaultScope: {
            attributes: {
                exclude: ['hashedPassword', 'createdAt', 'updatedAt']
            }
        },
        scopes: {
            currentUser: {
                attributes: { exclude: ['hashedPassword', 'createdAt', 'updatedAt'] }
            },
            loginUser: {
                attributes: {}
            }
        }
    });
    User.associate = function (models) {
        // associations can be defined here
    };
    User.prototype.toSafeObject = function () {
        var _a = this, id = _a.id, username = _a.username; // context will be the User instance
        return { userId: id, username: username };
    };
    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.hashedPassword.toString());
    };
    User.getCurrentUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User.scope('currentUser').findByPk(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    User.login = function (_a) {
        var credential = _a.credential, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User.scope('loginUser').findOne({
                            where: {
                                username: credential,
                            }
                        })];
                    case 1:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, User.scope('loginUser').findOne({
                                where: {
                                    email: credential,
                                }
                            })];
                    case 2:
                        user = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!(user && user.validatePassword(password))) return [3 /*break*/, 5];
                        return [4 /*yield*/, User.scope('currentUser').findByPk(user.id)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    User.signup = function (_a) {
        var username = _a.username, email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        hashedPassword = bcrypt.hashSync(password);
                        return [4 /*yield*/, User.create({
                                username: username,
                                email: email,
                                hashedPassword: hashedPassword
                            })];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, User.scope('currentUser').findByPk(user.id)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return User;
};
