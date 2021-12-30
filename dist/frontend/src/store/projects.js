var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookmark = exports.hideProject = exports.getBookmarks = exports.getProjects = void 0;
var csrf_1 = require("./csrf");
var SET_PROJECTS = 'projects/setProjects';
var setProjects = function (projects) {
    return {
        type: SET_PROJECTS,
        payload: projects,
    };
};
var getProjects = function (category, page) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, csrf_1.csrfFetch)("/api/projects/".concat(category, "/page/").concat(page))];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                dispatch(setProjects(data));
                return [2 /*return*/, response];
        }
    });
}); }; };
exports.getProjects = getProjects;
var getBookmarks = function (page, userId) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, csrf_1.csrfFetch)("/api/users/".concat(userId, "/Bookmarks/page/").concat(page))];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                dispatch(setProjects(data));
                return [2 /*return*/, response];
        }
    });
}); }; };
exports.getBookmarks = getBookmarks;
var hideProject = function (projectId, userId, category, page, bookmarked) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var response1, response2, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, csrf_1.csrfFetch)("/api/users/".concat(userId, "/hide-project/").concat(projectId), {
                    method: 'PUT',
                    headers: {},
                    body: JSON.stringify({}),
                })];
            case 1:
                response1 = _a.sent();
                if (!bookmarked) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, csrf_1.csrfFetch)("/api/users/".concat(userId, "/Bookmarks/").concat(projectId), {
                        method: 'POST',
                        headers: {},
                        body: JSON.stringify({
                            bookmarked: false,
                        }),
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, (0, csrf_1.csrfFetch)("/api/projects/".concat(category, "/page/").concat(page))];
            case 4:
                response2 = _a.sent();
                return [4 /*yield*/, response2.json()];
            case 5:
                data = _a.sent();
                dispatch(setProjects(data));
                return [2 /*return*/, response1];
        }
    });
}); }; };
exports.hideProject = hideProject;
var removeBookmarkedProject = function (state, projectId) {
    var intProjectId = Number(projectId);
    return state.filter(function (project) {
        return project.id !== intProjectId;
    }).map(function (project) {
        return __assign({}, project);
    });
};
var updateBookmarkedProject = function (state, projectId) {
    var intProjectId = Number(projectId);
    return state.map(function (project) {
        if (project.id === intProjectId) {
            var projectCopy = __assign({}, project);
            projectCopy.bookmarked = projectCopy.bookmarked ? false : true;
            return projectCopy;
        }
        else {
            return __assign({}, project);
        }
    });
};
var updateBookmark = function (projectId, bookmarked, projects, userId, category) { return function (dispatch) { return __awaiter(_this, void 0, void 0, function () {
    var response, data, updatedProjects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, csrf_1.csrfFetch)("/api/users/".concat(userId, "/Bookmarks/").concat(projectId), {
                    method: 'POST',
                    headers: {},
                    body: JSON.stringify({
                        bookmarked: bookmarked,
                    }),
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                updatedProjects = [];
                if (!bookmarked && category === 'Bookmarks') {
                    updatedProjects = removeBookmarkedProject(projects, "".concat(projectId));
                }
                else {
                    updatedProjects = updateBookmarkedProject(projects, data.projecId);
                }
                dispatch(setProjects(updatedProjects));
                return [2 /*return*/, response];
        }
    });
}); }; };
exports.updateBookmark = updateBookmark;
var initialState = [];
var sessionReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    var newState;
    switch (action.type) {
        case SET_PROJECTS:
            newState = __spreadArray([], action.payload, true);
            return newState;
        default:
            return state;
    }
    ;
};
exports.default = sessionReducer;
