"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
// import * as sessionActions from '../store/session';
// import { useDispatch, useSelector } from 'react-redux';
var react_router_dom_1 = require("react-router-dom");
// import { RootState } from '../store';
// import Button from '@material-ui/core/Button';
require("../compStyles/Main.css");
var Project_1 = __importDefault(require("./Project"));
var Projects_1 = __importDefault(require("./Projects"));
// props:{ props: {setSelectedForm: React.Dispatch<React.SetStateAction<string>>}} 
var Main = function (props) {
    //   const { setSelectedForm } = props.props;
    //   const dispatch = useDispatch();
    //   const sessionUser = useSelector((state: RootState) => state.session);
    //   const [credential, setCredential] = useState('');
    //   const [password, setPassword] = useState('');
    return (react_1.default.createElement("div", { id: 'main' },
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/category/:categoryName/page/:pageNumber" },
                react_1.default.createElement(Projects_1.default, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/category/:categoryName/project/:projectId" },
                react_1.default.createElement(Project_1.default, null)),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/contributions/page/:pageNumber" },
                react_1.default.createElement("div", null, "Contributions and Page")))));
};
exports.default = Main;
