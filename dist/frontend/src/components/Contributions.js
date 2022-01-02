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
var contributionsActions = __importStar(require("./../store/contributions"));
var ContTierTile_1 = __importDefault(require("./ContTierTile"));
var ProjectTIle_1 = __importDefault(require("./ProjectTIle"));
var material_1 = require("@mui/material");
require("../compStyles/Contributions.css");
function Contributions() {
    var history = (0, react_router_dom_1.useHistory)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var pageNumber = (0, react_router_dom_1.useParams)().pageNumber;
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    var contributions = (0, react_redux_1.useSelector)(function (state) { return state.contributions; });
    var pageNums = (contributions[0] && contributions[0].projectTile.id) ? contributions[0].projectTile.pageNums : 0;
    var pageNumberNum = Number(pageNumber);
    var _a = (0, react_1.useState)(pageNumberNum), page = _a[0], setPage = _a[1];
    var handleChange = function (_event, value) {
        dispatch(contributionsActions.getContributions(sessionUser.user.id, "".concat(value)));
        setPage(value);
        history.push("/contributions/page/".concat(value));
    };
    (0, react_1.useEffect)(function () {
        dispatch(contributionsActions.getContributions(sessionUser.user.id, pageNumber));
    }, [dispatch]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'page-dial-container-top' },
            react_1.default.createElement(material_1.Stack, { spacing: 2 },
                react_1.default.createElement(material_1.Pagination, { count: pageNums, page: page, onChange: handleChange }))),
        (!contributions[0] || !contributions[0].projectTile.id)
            ?
                null
            :
                react_1.default.createElement("div", { className: 'cont-tier-tile' }, contributions.map(function (contribution) {
                    return (react_1.default.createElement("section", { className: 'sub-cont-tier-tile', key: "".concat(contribution.projectTile.id).concat(Math.random()) },
                        react_1.default.createElement(ProjectTIle_1.default, { props: { project: contribution.projectTile } }),
                        react_1.default.createElement(ContTierTile_1.default, { props: { supportTier: contribution.receiptTile } })));
                })),
        react_1.default.createElement("div", { className: 'page-dial-container-bottom' },
            react_1.default.createElement(material_1.Stack, { spacing: 2 },
                react_1.default.createElement(material_1.Pagination, { count: pageNums, page: page, onChange: handleChange })))));
}
exports.default = Contributions;
