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
var projectActions = __importStar(require("./../store/projects"));
var Bookmark_1 = __importDefault(require("@mui/icons-material/Bookmark"));
var ThumbDown_1 = __importDefault(require("@mui/icons-material/ThumbDown"));
require("../compStyles/ProjectTile.css");
var SnackBar_1 = __importDefault(require("./SnackBar"));
var CircularProgress_1 = __importDefault(require("@mui/material/CircularProgress"));
function ProjectTile(props) {
    var dispatch = (0, react_redux_1.useDispatch)();
    var projects = (0, react_redux_1.useSelector)(function (state) { return state.projects; });
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    var isContribution = (window.location.pathname.split('/')[window.location.pathname.split('/').length - 3] === 'contributions');
    var project = props.props.project;
    var percentFunded = project.percentFunded > 1
        ?
            100
        :
            project.percentFunded * 100;
    var _a = (0, react_1.useState)(project.bookmarked), bookmarked = _a[0], setBookmarked = _a[1];
    var _b = (0, react_1.useState)(false), showSnackBar = _b[0], setShowSnackBar = _b[1];
    var _c = (0, react_1.useState)(0), progress = _c[0], setProgress = _c[1];
    var _d = (0, react_1.useState)(false), hideTile = _d[0], setHideTile = _d[1];
    var category = window.location.pathname.split('/')[window.location.pathname.split('/').length - 3];
    var pageNumber = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    var openInNewTab = function (url) {
        var newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow)
            newWindow.opener = null;
    };
    var undoHide = function () {
        setHideTile(false);
    };
    var handleBookmarkClick = function (e) {
        e.stopPropagation();
        if (!sessionUser.user.id) {
            setShowSnackBar(true);
        }
        else {
            if (bookmarked) {
                setBookmarked(false);
                dispatch(projectActions.updateBookmark(project.id, false, projects, sessionUser.user.id, category));
            }
            else {
                setBookmarked(true);
                dispatch(projectActions.updateBookmark(project.id, true, projects, sessionUser.user.id, category));
            }
        }
    };
    var handleThumbClick = function (e) {
        e.stopPropagation();
        if (!sessionUser.user.id) {
            setShowSnackBar(true);
        }
        else {
            setHideTile(true);
        }
    };
    (0, react_1.useEffect)(function () {
        if (hideTile) {
            var timer_1 = setInterval(function () {
                setProgress(function (prevProgress) {
                    if (prevProgress >= 100) {
                        dispatch(projectActions.hideProject(project.id, sessionUser.user.id, category, pageNumber, project.bookmarked));
                    }
                    return (prevProgress >= 100 ? 0 : prevProgress + 10);
                });
            }, 800);
            return function () {
                clearInterval(timer_1);
            };
        }
    }, [hideTile]);
    return (react_1.default.createElement("div", { className: 'project-tile' },
        hideTile
            ?
                react_1.default.createElement("div", { id: 'circle-undo', onClick: undoHide },
                    react_1.default.createElement(CircularProgress_1.default, { variant: "determinate", value: progress }),
                    react_1.default.createElement("div", null, "Click To Undo"))
            :
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("img", { src: project.screenShot, alt: project.imgAlt }),
                    react_1.default.createElement(LinearProgress_1.default, { variant: "determinate", value: percentFunded }),
                    react_1.default.createElement("section", { className: 'text-content' },
                        react_1.default.createElement("div", { className: 'projects-title' },
                            react_1.default.createElement("span", null, project.title)),
                        react_1.default.createElement("div", { className: 'projects-summary' },
                            react_1.default.createElement("span", null, project.summary)),
                        react_1.default.createElement("div", { className: 'projects-creatorName' },
                            react_1.default.createElement("span", null,
                                "By ",
                                project.creatorName))),
                    react_1.default.createElement("div", { className: 'hidden-tile-cover', onClick: function () { return openInNewTab("/category/".concat(category, "/project/").concat(project.id)); } },
                        react_1.default.createElement("span", null, "More Details"),
                        react_1.default.createElement("div", { className: 'hidden-icons' },
                            react_1.default.createElement("div", null,
                                react_1.default.createElement(Bookmark_1.default, { onClick: function (e) { return handleBookmarkClick(e); }, style: { color: bookmarked ? 'yellow' : '', display: isContribution ? 'none' : '' } })),
                            react_1.default.createElement("div", { style: { display: (category === 'bookmarks' || isContribution) ? 'none' : '' } },
                                react_1.default.createElement(ThumbDown_1.default, { onClick: function (e) { return handleThumbClick(e); } }))))),
        showSnackBar && react_1.default.createElement(SnackBar_1.default, { props: { showSnackBar: showSnackBar, setShowSnackBar: setShowSnackBar } })));
}
;
exports.default = ProjectTile;
