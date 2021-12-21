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
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var csrf_1 = require("./store/csrf");
var react_dom_1 = __importDefault(require("react-dom"));
var App_1 = __importDefault(require("./App"));
var store_1 = __importDefault(require("./store"));
var sessionActions = __importStar(require("./store/session"));
require("./index.css");
var store = (0, store_1.default)();
if (process.env.NODE_ENV !== 'production') {
    (0, csrf_1.restoreCSRF)();
    window.csrfFetch = csrf_1.csrfFetch;
    window.store = store;
    window.sessionActions = sessionActions;
}
function Root() {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(App_1.default, null))));
}
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(Root, null)), document.getElementById('root'));
