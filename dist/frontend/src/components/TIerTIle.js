"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("../compStyles/TierTile.css");
var TierTile = function (props) {
    var supportTier = props.props.supportTier;
    return (react_1.default.createElement("div", { className: 'support-tier' },
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
                    supportTier.backers))),
        react_1.default.createElement("div", { className: 'select-reward-hidden' }, "Select Reward")));
};
exports.default = TierTile;
