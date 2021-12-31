var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ContTierTile = function (props) {
    var supportTier = props.props.supportTier;
    return (react_1.default.createElement("div", { className: 'support-tier' },
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: 'pledge' },
                "Pledged $",
                supportTier.amountPledged)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: 'name-tier' }, supportTier.nameOfTier)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: 'summary-tier' }, supportTier.summaryOfTier)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: 'delivery-tier-title' }, "Estimated Delivery")),
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: 'delivery-tier-data' }, supportTier.etaDelivery))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: 'ships-tier-title' }, "Ships To")),
            react_1.default.createElement("div", null,
                react_1.default.createElement("span", { className: 'ships-tier-data' }, supportTier.shipsTo)))));
};
exports.default = ContTierTile;
