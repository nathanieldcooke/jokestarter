var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var React = __importStar(require("react"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Snackbar_1 = __importDefault(require("@mui/material/Snackbar"));
var Alert_1 = __importDefault(require("@mui/material/Alert"));
var Alert = React.forwardRef(function Alert(props, ref) {
    return React.createElement(Alert_1.default, __assign({ elevation: 6, ref: ref, variant: "filled" }, props));
});
function CustomizedSnackbars(props) {
    var _a = props.props, showSnackBar = _a.showSnackBar, setShowSnackBar = _a.setShowSnackBar;
    var open = showSnackBar;
    var handleClose = function () {
        setShowSnackBar(false);
    };
    return (React.createElement(Stack_1.default, { spacing: 2, sx: { width: '100%' } },
        React.createElement(Snackbar_1.default, { open: open, autoHideDuration: 6000, onClose: handleClose, anchorOrigin: { vertical: 'bottom', horizontal: 'right' } },
            React.createElement(Alert, { onClose: handleClose, severity: "error", sx: { width: '100%' } }, "Must be logged in to use feature"))));
}
exports.default = CustomizedSnackbars;
