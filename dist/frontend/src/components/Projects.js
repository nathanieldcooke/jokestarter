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
var projectActions = __importStar(require("./../store/projects"));
var react_router_dom_1 = require("react-router-dom");
var ProjectTIle_1 = __importDefault(require("./ProjectTIle"));
var Pagination_1 = __importDefault(require("@mui/material/Pagination"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
require("../compStyles/Projects.css");
function Projects() {
    var history = (0, react_router_dom_1.useHistory)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_router_dom_1.useParams)(), categoryName = _a.categoryName, pageNumber = _a.pageNumber;
    var pageNumberNum = Number(pageNumber);
    var projects = (0, react_redux_1.useSelector)(function (state) { return state.projects; });
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    var pageNums = projects[0] ? projects[0].pageNums : 0;
    var _b = (0, react_1.useState)(pageNumberNum), page = _b[0], setPage = _b[1];
    var handleChange = function (_event, value) {
        if (categoryName !== 'bookmarks') {
            dispatch(projectActions.getProjects(categoryName, "".concat(value)));
        }
        else {
            dispatch(projectActions.getBookmarks("".concat(value), sessionUser.user.id));
        }
        setPage(value);
        history.push("/category/".concat(categoryName, "/page/").concat(value));
    };
    (0, react_1.useEffect)(function () {
        setPage(1);
        if (categoryName !== 'bookmarks') {
            dispatch(projectActions.getProjects(categoryName, '1'));
        }
        else {
            dispatch(projectActions.getBookmarks('1', sessionUser.user.id));
        }
    }, [dispatch, (0, react_router_dom_1.useParams)().categoryName]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'page-dial-container-top' },
            react_1.default.createElement(Stack_1.default, { spacing: 2 },
                react_1.default.createElement(Pagination_1.default, { count: pageNums, page: page, onChange: handleChange }))),
        react_1.default.createElement("div", { id: 'projects' }, projects.map((function (project) { return react_1.default.createElement(ProjectTIle_1.default, { key: "project-tile-".concat(project.title), props: { project: project } }); }))),
        react_1.default.createElement("div", { className: 'page-dial-container-bottom' },
            react_1.default.createElement(Stack_1.default, { spacing: 2 },
                react_1.default.createElement(Pagination_1.default, { count: pageNums, page: page, onChange: handleChange })))));
}
;
exports.default = Projects;
