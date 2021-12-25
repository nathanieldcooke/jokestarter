import React, { useState } from 'react';
// import * as sessionActions from '../store/session';
// import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { RootState } from '../store';
// import Button from '@material-ui/core/Button';
import '../compStyles/Main.css'
import Projects from './Projects';
// props:{ props: {setSelectedForm: React.Dispatch<React.SetStateAction<string>>}} 
const Main = (props:{props: {}}|React.ReactNode) => {
//   const { setSelectedForm } = props.props;
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state: RootState) => state.session);
//   const [credential, setCredential] = useState('');
//   const [password, setPassword] = useState('');


    return (
    <div id='main'>
        <Switch>
          <Route
            path="/category/:categoryName/page/:pageNumber"
          ><Projects/></Route>
          <Route
            path="/category/:categoryName/project/:projectId"
          ><div id='whatt'>project Details</div></Route>
          <Route
            path="/contributions/page/:pageNumber"
          ><div>Contributions and Page</div></Route>
        </Switch>
    </div>
    );
  }
  
  export default Main;