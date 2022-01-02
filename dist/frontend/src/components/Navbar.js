var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var sessionActions = __importStar(require("./../store/session"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
require("./../compStyles/Navbar.css");
var Modal_1 = __importDefault(require("@mui/material/Modal"));
var LoginForm_1 = __importDefault(require("./LoginForm"));
var SignupForm_1 = __importDefault(require("./SignupForm"));
var projectActions = __importStar(require("./../store/projects"));
function Navbar() {
    var _this = this;
    var history = (0, react_router_dom_1.useHistory)();
    var _a = (0, react_1.useState)(''), selectedForm = _a[0], setSelectedForm = _a[1];
    var _b = (0, react_1.useState)((window.location.pathname.split('/')[window.location.pathname.split('/').length - 2] === 'project'
        ?
            'none'
        :
            '')), bottomNavDis = _b[0], setBottomNavDis = _b[1];
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    var handleOpen = function (selectedForm) {
        setSelectedForm(selectedForm);
        setOpen(true);
    };
    var handleClose = function () {
        setSelectedForm('');
        setOpen(false);
    };
    var handleLogout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dispatch(sessionActions.logout())];
                case 1:
                    _a.sent();
                    history.push('/category/Top/page/1');
                    return [2 /*return*/];
            }
        });
    }); };
    var handleGoHome = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setBottomNavDis('');
            history.push('/category/Top/page/1');
            return [2 /*return*/];
        });
    }); };
    var checkActive = function (nav) {
        var len = window.location.pathname.split('/').length;
        var path = window.location.pathname.split('/');
        var cat = path[len - 3];
        return cat === nav;
    };
    var dispatch = (0, react_redux_1.useDispatch)();
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    (0, react_1.useEffect)(function () {
        if (sessionUser.user.username) {
            handleClose();
        }
    }, [sessionUser]);
    var handleClick = function (category) {
        if (category !== 'bookmarks') {
            dispatch(projectActions.getProjects(category, '1'));
        }
        else {
            dispatch(projectActions.getBookmarks('1', sessionUser.user.id));
        }
    };
    return (react_1.default.createElement("nav", null,
        react_1.default.createElement(Modal_1.default, { open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, selectedForm === 'login'
            ?
                react_1.default.createElement(LoginForm_1.default, { props: { setSelectedForm: setSelectedForm } })
            :
                react_1.default.createElement(SignupForm_1.default, { props: { setSelectedForm: setSelectedForm } })),
        react_1.default.createElement("div", { id: 'nav-top' },
            sessionUser.user.username
                ?
                    react_1.default.createElement("p", { id: "nav-left" },
                        "Welcome: ",
                        react_1.default.createElement("span", null, sessionUser.user.username))
                :
                    react_1.default.createElement("p", { id: "nav-left" }, "Log in to get started!"),
            react_1.default.createElement("p", { id: 'site-title', onClick: handleGoHome },
                react_1.default.createElement("span", null, "JOKE"),
                "STARTER"),
            sessionUser.user.username
                ?
                    react_1.default.createElement("div", { id: 'nav-button-container' },
                        react_1.default.createElement(Button_1.default, { id: 'login', onClick: handleLogout }, "Log Out"))
                :
                    react_1.default.createElement("div", { id: 'nav-button-container' },
                        react_1.default.createElement(Button_1.default, { id: 'login', onClick: function () { return handleOpen('login'); } }, "Log In"),
                        react_1.default.createElement(Button_1.default, { id: 'signup', onClick: function () { return handleOpen('signup'); } }, "Sign Up"),
                        react_1.default.createElement(Button_1.default, { id: 'demo', onClick: function () { return dispatch(sessionActions.demo()); } }, "Demo"))),
        react_1.default.createElement("div", { id: 'nav-bottom', style: { display: bottomNavDis } },
            react_1.default.createElement("div", { id: 'nav-link-container' },
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Top/page/1", onClick: function () { return handleClick('Top'); }, activeClassName: "selected", isActive: function () { return checkActive('Top'); } }, "Top"),
                react_1.default.createElement("br", null),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Toys/page/1", onClick: function () { return handleClick('Toys'); }, activeClassName: "selected", isActive: function () { return checkActive('Toys'); } }, "Toys"),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Food/page/1", onClick: function () { return handleClick('Food'); }, activeClassName: "selected", isActive: function () { return checkActive('Food'); } }, "Food"),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Services/page/1", onClick: function () { return handleClick('Services'); }, activeClassName: "selected", isActive: function () { return checkActive('Services'); } }, "Services"),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Misc/page/1", onClick: function () { return handleClick('Misc'); }, activeClassName: "selected", isActive: function () { return checkActive('Misc'); } }, "Misc"),
                sessionUser.user.username
                    ?
                        react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("span", null, "|"),
                            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/bookmarks/page/1", onClick: function () { return handleClick('bookmarks'); }, activeClassName: "selected", isActive: function () { return checkActive('bookmarks'); } }, "Bookmarks"),
                            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/contributions/page/1", activeClassName: "selected", isActive: function () { return checkActive('contributions'); } }, "Contributed"))
                    :
                        null))));
}
;
exports.default = Navbar;
