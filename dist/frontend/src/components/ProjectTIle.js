"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var LinearProgress_1 = __importDefault(require("@mui/material/LinearProgress"));
require("../compStyles/ProjectTile.css");
function ProjectTile(props) {
    var project = props.props.project;
    var percentFunded = project.percentFunded > 1
        ?
            100
        :
            project.percentFunded * 100;
    console.log('PPs: ', project);
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
        react_1.default.createElement("div", { className: 'hidden-tile-cover' }, "More Details")));
}
;
exports.default = ProjectTile;
