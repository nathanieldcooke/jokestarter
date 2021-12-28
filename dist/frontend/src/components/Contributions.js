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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var contributionsActions = __importStar(require("./../store/contributions"));
function Contributions() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var pageNumber = (0, react_router_dom_1.useParams)().pageNumber;
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    (0, react_1.useEffect)(function () {
        dispatch(contributionsActions.getContributions(sessionUser.user.id, pageNumber));
    }, [dispatch]);
    return (react_1.default.createElement("div", null, "Contribute Page Comp"));
}
exports.default = Contributions;
