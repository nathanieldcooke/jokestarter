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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var core_1 = require("@material-ui/core");
var TIerTIle_1 = __importDefault(require("./TIerTIle"));
var SnackBar_1 = __importDefault(require("./SnackBar"));
require("../compStyles/Project.css");
function Project() {
    var _this = this;
    var dispatch = (0, react_redux_1.useDispatch)();
    var projectId = (0, react_router_dom_1.useParams)().projectId;
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
    var tiersRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(project.bookmarked), bookmarked = _a[0], setBookmarked = _a[1];
    var _b = (0, react_1.useState)(false), showSnackBar = _b[0], setShowSnackBar = _b[1];
    var _c = (0, react_1.useState)(false), support = _c[0], setSupport = _c[1];
    var handleTierOpen = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setSupport(support ? false : true);
            window.scrollTo({ behavior: 'smooth', top: tiersRef.current.offsetTop });
            return [2 /*return*/];
        });
    }); };
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
            ;
        }
        ;
    };
    (0, react_1.useEffect)(function () { setBookmarked(project.bookmarked); }, [project]);
    (0, react_1.useEffect)(function () { window.scrollTo({ behavior: 'smooth', top: tiersRef.current.offsetTop }); }, [support]);
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
                            project.fundsCollected && project.fundsCollected.toLocaleString())),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null,
                            "pledged of ",
                            react_1.default.createElement("span", { id: 'funding-goal' },
                                " $",
                                project.goal && project.goal.toLocaleString(),
                                " "),
                            " goal"))),
                react_1.default.createElement("section", null,
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("span", { id: 'num-of-backers' }, project.numOfBackers && project.numOfBackers.toLocaleString())),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("span", null, "backers")))),
                react_1.default.createElement("section", null,
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", { id: 'days-to-go' }, project.daysToGo)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null, "days to go"))),
                react_1.default.createElement(core_1.Button, { id: 'back-this-project-btn', onClick: handleTierOpen }, "Back this project"),
                react_1.default.createElement(core_1.Button, { id: 'bookmark-btn', onClick: function (e) { return handleBookmarkClick(e); } },
                    react_1.default.createElement(Bookmark_1.default, { style: { color: bookmarked ? 'yellow' : '' } }),
                    "Bookmark"))),
        react_1.default.createElement("section", { ref: tiersRef, id: 'support-tiers', style: { display: support ? 'flex' : 'none' } }, project.supportTiers.map(function (supportTier) { return react_1.default.createElement(TIerTIle_1.default, { key: "support-tier-".concat(supportTier.name), props: { supportTier: supportTier } }); })),
        showSnackBar && react_1.default.createElement(SnackBar_1.default, { props: { showSnackBar: showSnackBar, setShowSnackBar: setShowSnackBar } })));
}
;
exports.default = Project;
