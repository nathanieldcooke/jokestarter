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
require("../compStyles/ProjectTile.css");
function ProjectTile(props) {
    var project = props.props.project;
    var percentFunded = project.percentFunded;
    var _a = (0, react_1.useState)((percentFunded) * 100 > 100
        ?
            80
        :
            percentFunded * 100), progress = _a[0], setProgress = _a[1];
    console.log('PPs: ', project);
    return (react_1.default.createElement("div", { className: 'project-tile' },
        react_1.default.createElement("img", { src: project.screenShot }),
        react_1.default.createElement(LinearProgress_1.default, { variant: "determinate", value: progress }),
        react_1.default.createElement("section", { className: 'text-content' },
            react_1.default.createElement("div", { className: 'projects-title' },
                react_1.default.createElement("span", null, project.title)),
            react_1.default.createElement("div", { className: 'projects-summary' },
                react_1.default.createElement("span", null, project.summary)),
            react_1.default.createElement("div", { className: 'projects-creatorName' },
                react_1.default.createElement("span", null,
                    "By ",
                    project.creatorName)))));
}
;
exports.default = ProjectTile;
