"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
require("../compStyles/Form.css");
var Projects_1 = __importDefault(require("./Projects"));
// props:{ props: {setSelectedForm: React.Dispatch<React.SetStateAction<string>>}} 
var Main = function (props) {
    //   const { setSelectedForm } = props.props;
    //   const dispatch = useDispatch();
    //   const sessionUser = useSelector((state: RootState) => state.session);
    //   const [credential, setCredential] = useState('');
    //   const [password, setPassword] = useState('');
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/category/:categoryName/page/:pageNumber" },
                react_1.default.createElement(Projects_1.default, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/category/:categoryName/project/:projectId" },
                react_1.default.createElement("div", { id: 'whatt' }, "project Details")),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/contributions/page/:pageNumber" },
                react_1.default.createElement("div", null, "Contributions and Page")))));
};
exports.default = Main;
