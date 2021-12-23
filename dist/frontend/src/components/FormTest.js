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
var sessionActions = __importStar(require("../store/session"));
var react_redux_1 = require("react-redux");
var Button_1 = __importDefault(require("@material-ui/core/Button"));
// import '../CompStyles/Form.css'
// import '../CompStyles/Form.css'
var FormTest = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session.user; });
    var _a = (0, react_1.useState)(''), credential = _a[0], setCredential = _a[1];
    // const [email, setEmail] = useState('');
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    // const [confirmPassword, setConfirmPassword] = useState('');
    var handleSubmit = function (e) {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential: credential, password: password }));
    };
    return (react_1.default.createElement("form", { className: 'log-sign', onSubmit: handleSubmit },
        react_1.default.createElement("p", null, sessionUser && sessionUser.username),
        react_1.default.createElement("ul", null, sessionUser && sessionUser.errors && sessionUser.errors.map(function (error, idx) { return react_1.default.createElement("li", { key: idx }, error); })),
        react_1.default.createElement("label", null,
            "Credential:",
            react_1.default.createElement("input", { type: "text", value: credential, onChange: function (e) { return setCredential(e.target.value); }, required: true })),
        react_1.default.createElement("label", null,
            "Password:",
            react_1.default.createElement("input", { type: "password", value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true })),
        react_1.default.createElement(Button_1.default, { type: 'submit', id: 'form-button' }, "Sign Up"),
        react_1.default.createElement("a", { id: 'log-sign-change' },
            "already have an account? ",
            react_1.default.createElement("span", null, "Log In"))));
};
exports.default = FormTest;
