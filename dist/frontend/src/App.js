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
var react_redux_1 = require("react-redux");
var sessionActions = __importStar(require("./store/session"));
var Navbar_1 = __importDefault(require("./components/Navbar"));
var react_router_dom_1 = require("react-router-dom");
var Main_1 = __importDefault(require("./components/Main"));
var Footer_1 = __importDefault(require("./components/Footer"));
function App() {
    var history = (0, react_router_dom_1.useHistory)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_1.useState)(false), isLoaded = _a[0], setIsLoaded = _a[1];
    var sessionUser = (0, react_redux_1.useSelector)(function (state) { return state.session; });
    (0, react_1.useEffect)(function () {
        if (window.location.pathname === '/') {
            history.push('/category/Top/page/1');
        }
    }, []);
    (0, react_1.useEffect)(function () {
        setIsLoaded(true);
    }, [sessionUser]);
    (0, react_1.useEffect)(function () {
        dispatch(sessionActions.restoreUser());
    }, [dispatch]);
    return ((isLoaded &&
        react_1.default.createElement("div", { id: 'app-body' },
            react_1.default.createElement("header", null,
                react_1.default.createElement(Navbar_1.default, null)),
            react_1.default.createElement(Main_1.default, null),
            react_1.default.createElement("div", { id: 'background-lines' },
                react_1.default.createElement("img", { id: 'left-img', src: 'https://cdn.optimizely.com/img/14069890047/72ae3620b85d48c1878cbe4d0866665d.png' }),
                react_1.default.createElement("img", { id: 'right-img', src: 'https://cdn.optimizely.com/img/14069890047/efeeb04eb14c4a70a1b3ac360ea795d2.png' }),
                react_1.default.createElement("img", { id: 'bottom-img', src: 'https://ksr-static.imgix.net/c51lnrg9-doodle_continue.png?ixlib=rb-2.1.0&auto=compress%2Cformat&w=1000&fit=min&s=dc34091fa7d24f5d676e0e0201337f9b' })),
            react_1.default.createElement(Footer_1.default, null))) || null);
}
;
exports.default = App;
