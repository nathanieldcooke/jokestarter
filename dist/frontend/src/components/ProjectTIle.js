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
var Bookmark_1 = __importDefault(require("@mui/icons-material/Bookmark"));
var ThumbDown_1 = __importDefault(require("@mui/icons-material/ThumbDown"));
require("../compStyles/ProjectTile.css");
function ProjectTile(props) {
    var project = props.props.project;
    var percentFunded = project.percentFunded > 1
        ?
            100
        :
            project.percentFunded * 100;
    var _a = (0, react_1.useState)(project.bookmarked), bookmarked = _a[0], setBookmarked = _a[1];
    var category = window.location.pathname.split('/')[window.location.pathname.split('/').length - 3];
    var openInNewTab = function (url) {
        var newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow)
            newWindow.opener = null;
    };
    var handleBookmarkClick = function (e) {
        e.stopPropagation();
        if (bookmarked) {
            setBookmarked(false);
        }
        else {
            setBookmarked(true);
            // dipatch action to update project as bookmarked and update local project in store
        }
    };
    return (react_1.default.createElement("div", { className: 'project-tile' },
        react_1.default.createElement("img", { src: project.screenShot }),
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
                    react_1.default.createElement(Bookmark_1.default, { onClick: function (e) { return handleBookmarkClick(e); }, style: { color: bookmarked ? 'yellow' : '' } })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(ThumbDown_1.default, null))))));
}
;
exports.default = ProjectTile;
