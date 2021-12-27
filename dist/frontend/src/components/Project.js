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
var LinearProgress_1 = __importDefault(require("@mui/material/LinearProgress"));
var react_redux_1 = require("react-redux");
var projectsActions = __importStar(require("./../store/projects"));
var projectActions = __importStar(require("./../store/project"));
var Bookmark_1 = __importDefault(require("@mui/icons-material/Bookmark"));
var react_router_dom_1 = require("react-router-dom");
require("../compStyles/Project.css");
var core_1 = require("@material-ui/core");
var TIerTIle_1 = __importDefault(require("./TIerTIle"));
var SnackBar_1 = __importDefault(require("./SnackBar"));
function Project() {
    var history = (0, react_router_dom_1.useHistory)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_router_dom_1.useParams)(), categoryName = _a.categoryName, projectId = _a.projectId;
    var projectIdNum = Number(projectId);
    var projects = (0, react_redux_1.useSelector)(function (state) { return state.projects; });
    var project = (0, react_redux_1.useSelector)(function (state) { return state.project; });
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    var category = window.location.pathname.split('/')[window.location.pathname.split('/').length - 3];
    var percentFunded = project.percentFunded > 1
        ?
            100
        :
            project.percentFunded * 100;
    var _b = (0, react_1.useState)(project.bookmarked), bookmarked = _b[0], setBookmarked = _b[1];
    var _c = (0, react_1.useState)(false), showSnackBar = _c[0], setShowSnackBar = _c[1];
    var handleBookmarkClick = function (e) {
        e.stopPropagation();
        if (!sessionUser.user.id) {
            setShowSnackBar(true);
        }
        else {
            if (bookmarked) {
                setBookmarked(false);
                dispatch(projectsActions.updateBookmark(project.id, false, projects, sessionUser.user.id, category));
            }
            else {
                setBookmarked(true);
                dispatch(projectsActions.updateBookmark(project.id, true, projects, sessionUser.user.id, category));
            }
        }
    };
    (0, react_1.useEffect)(function () { setBookmarked(project.bookmarked); }, [project]);
    (0, react_1.useEffect)(function () {
        dispatch(projectActions.getProject(projectIdNum));
    }, [dispatch]);
    return (react_1.default.createElement("div", { id: 'project-details' },
        react_1.default.createElement("section", { id: 'title-summary' },
            react_1.default.createElement("div", { id: 'title' },
                react_1.default.createElement("span", null, project.title)),
            react_1.default.createElement("div", { id: 'summary' },
                react_1.default.createElement("span", null, project.summary))),
        react_1.default.createElement("section", { id: 'video-other-data' },
            react_1.default.createElement("iframe", { src: project.videoSrc }),
            react_1.default.createElement("div", { id: 'other-data' },
                react_1.default.createElement("section", null,
                    react_1.default.createElement(LinearProgress_1.default, { variant: "determinate", value: percentFunded }),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", { id: 'funds-collected' },
                            "$ ",
                            project.fundsCollected)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null,
                            "pledged of ",
                            react_1.default.createElement("span", { id: 'funding-goal' },
                                " $",
                                project.goal,
                                " "),
                            " goal"))),
                react_1.default.createElement("section", null,
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("span", { id: 'num-of-backers' }, project.numOfBackers)),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("span", null, "backers")))),
                react_1.default.createElement("section", null,
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", { id: 'days-to-go' }, project.daysToGo)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null, "days to go"))),
                react_1.default.createElement(core_1.Button, { id: 'back-this-project-btn' }, "Back this project"),
                react_1.default.createElement(core_1.Button, { id: 'bookmark-btn', onClick: function (e) { return handleBookmarkClick(e); } },
                    react_1.default.createElement(Bookmark_1.default, { style: { color: bookmarked ? 'yellow' : '' } }),
                    "Bookmark"))),
        react_1.default.createElement("section", { id: 'support-tiers' }, project.supportTiers.map(function (supportTier) { return react_1.default.createElement(TIerTIle_1.default, { key: "support-tier-".concat(supportTier.name), props: { supportTier: supportTier } }); })),
        showSnackBar && react_1.default.createElement(SnackBar_1.default, { props: { showSnackBar: showSnackBar, setShowSnackBar: setShowSnackBar } })));
}
;
exports.default = Project;
