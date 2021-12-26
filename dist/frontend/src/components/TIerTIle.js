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
var Button_1 = __importDefault(require("@material-ui/core/Button"));
require("../compStyles/TierTile.css");
var TierTile = function (props) {
    var supportTier = props.props.supportTier;
    var _a = (0, react_1.useState)(false), focus = _a[0], setFocus = _a[1];
    var _b = (0, react_1.useState)(supportTier.amount), tierAmount = _b[0], setTierAmount = _b[1];
    var handleFocus = function () {
        setFocus(true);
    };
    var handleBlur = function () {
        setFocus(false);
    };
    var handleAmountChange = function (e) {
        var currAmount = Number(e.target.value);
        setTierAmount(currAmount);
    };
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
                    react_1.default.createElement(Button_1.default, { disabled: tierAmount < supportTier.amount, id: 'continue-pledge-amount' }, "Continue"))
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
        react_1.default.createElement("div", { className: 'select-reward-hidden', onClick: handleFocus, style: { display: focus ? 'none' : '' } }, "Select Reward")));
};
exports.default = TierTile;
