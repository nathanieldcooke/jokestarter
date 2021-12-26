"use strict";
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
    var _a = (0, react_1.useState)(''), selectedForm = _a[0], setSelectedForm = _a[1];
    var _b = (0, react_1.useState)(window.location.pathname.split('/')[window.location.pathname.split('/').length - 2] === 'project'
        ?
            'none'
        :
            ''), bottomNavDis = _b[0], setBottomNavDis = _b[1];
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    var handleOpen = function (selectedForm) {
        setSelectedForm(selectedForm);
        setOpen(true);
    };
    var handleClose = function () {
        setSelectedForm('');
        setOpen(false);
    };
    var handleClick = function (category) {
        dispatch(projectActions.getProjects(category, '1'));
    };
    var dispatch = (0, react_redux_1.useDispatch)();
    var _d = (0, react_1.useState)(false), isLoaded = _d[0], setIsLoaded = _d[1];
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    (0, react_1.useEffect)(function () {
        if (sessionUser.user.username) {
            handleClose();
        }
    }, [sessionUser]);
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
            react_1.default.createElement("p", { id: 'site-title' },
                react_1.default.createElement("span", null, "JOKE"),
                "STARTER"),
            sessionUser.user.username
                ?
                    react_1.default.createElement("div", { id: 'nav-button-container' },
                        react_1.default.createElement(Button_1.default, { id: 'login', onClick: function () { return dispatch(sessionActions.logout()); } }, "Log Out"))
                :
                    react_1.default.createElement("div", { id: 'nav-button-container' },
                        react_1.default.createElement(Button_1.default, { id: 'login', onClick: function () { return handleOpen('login'); } }, "Log In"),
                        react_1.default.createElement(Button_1.default, { id: 'signup', onClick: function () { return handleOpen('signup'); } }, "Sign Up"),
                        react_1.default.createElement(Button_1.default, { id: 'demo', onClick: function () { return dispatch(sessionActions.demo()); } }, "Demo"))),
        react_1.default.createElement("div", { id: 'nav-bottom', style: { display: bottomNavDis } },
            react_1.default.createElement("div", { id: 'nav-link-container' },
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Top/page/1", onClick: function () { return handleClick('Top'); }, activeClassName: "selected" }, "Top"),
                react_1.default.createElement("br", null),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Toys/page/1", onClick: function () { return handleClick('Toys'); }, activeClassName: "selected" }, "Toys"),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Food/page/1", onClick: function () { return handleClick('Food'); }, activeClassName: "selected" }, "Food"),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Services/page/1", onClick: function () { return handleClick('Services'); }, activeClassName: "selected" }, "Services"),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Misc/page/1", onClick: function () { return handleClick('Misc'); }, activeClassName: "selected" }, "Misc"),
                sessionUser.user.username
                    ?
                        react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("span", null, "|"),
                            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/category/Bookmarks/page/1", onClick: function () { return handleClick('Bookmarks'); }, activeClassName: "selected" }, "Bookmarks"),
                            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/contributions/page/1", activeClassName: "selected" }, "Contributed"))
                    :
                        null))));
}
;
exports.default = Navbar;
