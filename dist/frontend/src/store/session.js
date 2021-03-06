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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signup = exports.demo = exports.login = exports.restoreUser = void 0;
var csrf_1 = require("./csrf");
var SET_USER = 'session/setUser';
var setUser = function (user) {
    return {
        type: SET_USER,
        payload: user,
    };
};
var restoreUser = function () { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, csrf_1.csrfFetch)('/api/users/profile')];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                dispatch(setUser({
                    status: data.status,
                    errors: data.errors,
                    user: data.user
                }));
                return [2 /*return*/, response];
        }
    });
}); }; };
exports.restoreUser = restoreUser;
var login = function (user) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var credential, password, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                credential = user.credential;
                password = user.password;
                return [4 /*yield*/, (0, csrf_1.csrfFetch)('/api/users/login', {
                        method: 'PUT',
                        headers: {},
                        body: JSON.stringify({
                            credential: credential,
                            password: password,
                        }),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                if (data.errors.length > 0) {
                    dispatch(setUser({
                        status: true,
                        errors: data.errors,
                        user: {
                            username: null,
                            id: null
                        }
                    }));
                }
                else {
                    dispatch(setUser({
                        status: data.status,
                        errors: data.errors,
                        user: data.user
                    }));
                }
                return [2 /*return*/, response];
        }
    });
}); }; };
exports.login = login;
var demo = function () { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, csrf_1.csrfFetch)('/api/users/demo', {
                    method: 'PUT',
                    headers: {},
                    body: JSON.stringify({}),
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                dispatch(setUser({
                    status: data.status,
                    errors: data.errors,
                    user: data.user
                }));
                return [2 /*return*/, response];
        }
    });
}); }; };
exports.demo = demo;
var signup = function (user) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var email, username, password, confirmPassword, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = user.email;
                username = user.username;
                password = user.password;
                confirmPassword = user.confirmPassword;
                return [4 /*yield*/, (0, csrf_1.csrfFetch)('/api/users/signup', {
                        method: 'POST',
                        headers: {},
                        body: JSON.stringify({
                            username: username,
                            email: email,
                            password: password,
                            confirmPassword: confirmPassword,
                        }),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                if (data.errors.length > 0) {
                    dispatch(setUser({
                        status: true,
                        errors: data.errors,
                        user: {
                            username: null,
                            id: null
                        }
                    }));
                }
                else {
                    dispatch(setUser({
                        status: data.status,
                        errors: data.errors,
                        user: data.user
                    }));
                }
                return [2 /*return*/, response];
        }
    });
}); }; };
exports.signup = signup;
var logout = function () { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, csrf_1.csrfFetch)('/api/users/logout', {
                    method: 'PUT',
                    headers: {},
                    body: JSON.stringify({}),
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                dispatch(setUser({
                    status: data.status,
                    errors: data.errors,
                    user: data.user
                }));
                return [2 /*return*/, response];
        }
    });
}); }; };
exports.logout = logout;
var initialState = { status: true, errors: [], user: { username: null, id: null } };
var sessionReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        default:
            return state;
    }
    ;
};
exports.default = sessionReducer;
