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
var focus_trap_react_1 = __importDefault(require("focus-trap-react"));
require("../compStyles/Form.css");
var LoginForm = react_1.default.forwardRef(function (props, ref) {
    var _a = props.props, setSelectedForm = _a.setSelectedForm, handleClose = _a.handleClose;
    var dispatch = (0, react_redux_1.useDispatch)();
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    var _b = (0, react_1.useState)(''), credential = _b[0], setCredential = _b[1];
    var _c = (0, react_1.useState)(''), password = _c[0], setPassword = _c[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential: credential, password: password }));
    };
    return (react_1.default.createElement(focus_trap_react_1.default, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("form", { className: 'log-sign', onSubmit: handleSubmit },
                react_1.default.createElement("ul", null, sessionUser && sessionUser.errors && sessionUser.errors.map(function (error, idx) { return react_1.default.createElement("li", { key: idx }, error); })),
                react_1.default.createElement("label", null,
                    "Username/Email:",
                    react_1.default.createElement("input", { type: "text", value: credential, onChange: function (e) { return setCredential(e.target.value); }, required: true })),
                react_1.default.createElement("label", null,
                    "Password:",
                    react_1.default.createElement("input", { type: "password", value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true })),
                react_1.default.createElement(Button_1.default, { type: 'submit', id: 'form-button' }, "Submit"),
                react_1.default.createElement("p", { id: 'log-sign-change' },
                    "Don't have an account?",
                    react_1.default.createElement(Button_1.default, { onClick: function () { return setSelectedForm('signup'); } }, "Sign Up")),
                react_1.default.createElement("button", { id: 'close-modal', onClick: handleClose }, "X")),
            react_1.default.createElement("div", { onClick: handleClose, id: 'close-modal-div' }))));
});
exports.default = LoginForm;
