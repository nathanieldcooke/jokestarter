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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var contributionsActions = __importStar(require("../store/contributions"));
var react_redux_1 = require("react-redux");
var Button_1 = __importDefault(require("@material-ui/core/Button"));
require("../compStyles/TierTile.css");
var SnackBar_1 = __importDefault(require("./SnackBar"));
var TierTile = function (props) {
    var dispatch = (0, react_redux_1.useDispatch)();
    var supportTier = props.props.supportTier;
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    var _a = (0, react_1.useState)(false), focus = _a[0], setFocus = _a[1];
    var _b = (0, react_1.useState)(supportTier.amount), tierAmount = _b[0], setTierAmount = _b[1];
    var _c = (0, react_1.useState)(false), showSnackBar = _c[0], setShowSnackBar = _c[1];
    var handleFocus = function () {
        if (sessionUser.user.id) {
            setFocus(true);
        }
        else {
            setShowSnackBar(true);
        }
    };
    var handleBlur = function () {
        setFocus(false);
    };
    var handleAmountChange = function (e) {
        var currAmount = Number(e.target.value);
        setTierAmount(currAmount);
    };
    var handleContribution = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('CONTRIBUTION FRONT');
            dispatch(contributionsActions.makeContributionThunk(supportTier.id, tierAmount, sessionUser.user.id, null, window.location.pathname));
            return [2 /*return*/];
        });
    }); };
    return (react_1.default.createElement("div", { className: 'support-tier', onMouseLeave: handleBlur },
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: 'pledge' },
                "Pledge $",
                supportTier.amount,
                " or more")),
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: 'name-tier' }, supportTier.name)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: 'summary-tier' }, supportTier.summary)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: 'delivery-tier-title' }, "Estimated Delivery")),
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: 'delivery-tier-data' }, supportTier.estimatedDelivery))),
        focus
            ?
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", { id: 'pledge-amount-title' }, "Pledge Amount"),
                    tierAmount < supportTier.amount
                        ?
                            react_1.default.createElement("span", { className: 'alert' },
                                "Amount must be atleast $",
                                supportTier.amount)
                        :
                            null,
                    react_1.default.createElement("span", { id: 'enter-pledge-amount' },
                        react_1.default.createElement("span", null, "$"),
                        react_1.default.createElement("input", { onChange: handleAmountChange, value: tierAmount, type: 'number' })),
                    react_1.default.createElement(Button_1.default, { disabled: tierAmount < supportTier.amount, id: 'continue-pledge-amount', onClick: handleContribution }, "Continue"))
            :
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("span", { className: 'ships-tier-title' }, "Ships To")),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("span", { className: 'ships-tier-data' }, supportTier.shipsTo))),
                    react_1.default.createElement("div", { className: 'tier-bottom' },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("span", { className: 'amount-left-tier' },
                                "Amount Left: ",
                                supportTier.amountLeft)),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("span", { className: 'backers-tier' },
                                "Backers: ",
                                supportTier.backers)))),
        showSnackBar && react_1.default.createElement(SnackBar_1.default, { props: { showSnackBar: showSnackBar, setShowSnackBar: setShowSnackBar } }),
        react_1.default.createElement("div", { className: 'select-reward-hidden', onClick: handleFocus, style: { display: focus ? 'none' : '' } }, "Select Reward")));
};
exports.default = TierTile;
