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
var Button_1 = __importDefault(require("@material-ui/core/Button"));
require("./../compStyles/Navbar.css");
function Navbar() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_1.useState)(false), isLoaded = _a[0], setIsLoaded = _a[1];
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    //   useEffect(() => { // once session user updates in store, load App
    //     setIsLoaded(true);
    //   }, [sessionUser])
    //   useEffect(() => { // attempt to restore user on page load
    //     dispatch(sessionActions.restoreUser())
    //   }, [dispatch]);
    return (react_1.default.createElement("nav", null,
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
            react_1.default.createElement("div", { id: 'nav-button-container' },
                react_1.default.createElement(Button_1.default, { id: 'login' }, "Log In"),
                react_1.default.createElement(Button_1.default, { id: 'signup' }, "Sign Up"),
                react_1.default.createElement(Button_1.default, { id: 'demo' }, "Demo"))),
        react_1.default.createElement("div", { id: 'nav-bottom' },
            react_1.default.createElement("div", { id: 'nav-link-container' },
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/thing1", activeClassName: "selected" }, "Top"),
                react_1.default.createElement("br", null),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/thing2", activeClassName: "selected" }, "Toys"),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/thing3", activeClassName: "selected" }, "Food"),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/thing4", activeClassName: "selected" }, "Services"),
                react_1.default.createElement(react_router_dom_1.NavLink, { to: "/thing5", activeClassName: "selected" }, "Misc"),
                sessionUser.user.username
                    ?
                        react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("span", null, "|"),
                            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/thing6", activeClassName: "selected" }, "Bookmarks"),
                            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/thing7", activeClassName: "selected" }, "Contributed"))
                    :
                        null))));
}
;
exports.default = Navbar;
