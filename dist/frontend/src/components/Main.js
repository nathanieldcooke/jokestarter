var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var Contributions_1 = __importDefault(require("./Contributions"));
var Project_1 = __importDefault(require("./Project"));
var Projects_1 = __importDefault(require("./Projects"));
require("../compStyles/Main.css");
var Main = function () {
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    return (react_1.default.createElement("main", { id: 'main', key: sessionUser.user.id },
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/category/:categoryName/page/:pageNumber" },
                react_1.default.createElement(Projects_1.default, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/category/:categoryName/project/:projectId" },
                react_1.default.createElement(Project_1.default, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/contributions/page/:pageNumber" },
                react_1.default.createElement(Contributions_1.default, null)))));
};
exports.default = Main;
