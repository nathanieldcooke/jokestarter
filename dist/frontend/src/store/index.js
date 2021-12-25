"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var session_1 = __importDefault(require("./session"));
var projects_1 = __importDefault(require("./projects"));
var project_1 = __importDefault(require("./project"));
var rootReducer = (0, redux_1.combineReducers)({
    session: session_1.default,
    projects: projects_1.default,
    project: project_1.default,
});
var enhancer;
if (process.env.NODE_ENV === 'production') {
    enhancer = (0, redux_1.applyMiddleware)(redux_thunk_1.default);
}
else {
    var logger = require('redux-logger').default;
    var composeEnhancers = 
    // @ts-ignore: don't know how to add this to window... investigate later.
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
    enhancer = composeEnhancers((0, redux_1.applyMiddleware)(redux_thunk_1.default, logger));
}
var configureStore = function (preloadedState) {
    return (0, redux_1.createStore)(rootReducer, preloadedState, enhancer);
};
exports.default = configureStore;
