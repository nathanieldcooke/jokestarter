var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var GitHub_1 = __importDefault(require("@mui/icons-material/GitHub"));
var FolderShared_1 = __importDefault(require("@mui/icons-material/FolderShared"));
var LinkedIn_1 = __importDefault(require("@mui/icons-material/LinkedIn"));
require("../compStyles/Footer.css");
function Footer() {
    return (react_1.default.createElement("footer", { className: 'links' },
        react_1.default.createElement("span", null, "Nathaniel Cooke: "),
        react_1.default.createElement("a", { href: "https://github.com/nathanieldcooke", target: "_blank" },
            react_1.default.createElement(GitHub_1.default, null)),
        react_1.default.createElement("a", { href: "https://www.linkedin.com/in/nathaniel-cooke-nrd/", target: "_blank" },
            react_1.default.createElement(LinkedIn_1.default, null)),
        react_1.default.createElement("a", { href: "https://nathanieldcooke.github.io/", target: "_blank" },
            react_1.default.createElement(FolderShared_1.default, null))));
}
exports.default = Footer;
