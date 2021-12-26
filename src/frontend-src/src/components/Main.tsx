import React, { useState } from 'react';
// import * as sessionActions from '../store/session';
// import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { RootState } from '../store';
// import Button from '@material-ui/core/Button';
import '../compStyles/Main.css'
import Project from './Project';
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
          ><Project/></Route>
          <Route
            path="/contributions/page/:pageNumber"
          ><div>Contributions and Page</div></Route>
        </Switch>
      <div id='background-lines' >
        <img id='left-img' src='https://cdn.optimizely.com/img/14069890047/72ae3620b85d48c1878cbe4d0866665d.png'/>
        <img id='right-img' src='https://cdn.optimizely.com/img/14069890047/efeeb04eb14c4a70a1b3ac360ea795d2.png'/>
        <img id='bottom-img' src='https://ksr-static.imgix.net/c51lnrg9-doodle_continue.png?ixlib=rb-2.1.0&auto=compress%2Cformat&w=1000&fit=min&s=dc34091fa7d24f5d676e0e0201337f9b'/>
      </div>
    </div>
    );
  }
  
  export default Main;