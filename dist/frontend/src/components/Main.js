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
                react_1.default.createElement("div", { id: 'whatt' }, "project Details")),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/contributions/page/:pageNumber" },
                react_1.default.createElement("div", null, "Contributions and Page"))),
        react_1.default.createElement("div", { id: 'background-lines' },
            react_1.default.createElement("img", { id: 'left-img', src: 'https://cdn.optimizely.com/img/14069890047/72ae3620b85d48c1878cbe4d0866665d.png' }),
            react_1.default.createElement("img", { id: 'right-img', src: 'https://cdn.optimizely.com/img/14069890047/efeeb04eb14c4a70a1b3ac360ea795d2.png' }),
            react_1.default.createElement("img", { id: 'bottom-img', src: 'https://ksr-static.imgix.net/c51lnrg9-doodle_continue.png?ixlib=rb-2.1.0&auto=compress%2Cformat&w=1000&fit=min&s=dc34091fa7d24f5d676e0e0201337f9b' }))));
};
exports.default = Main;
