import React from 'react';

import { Route, Switch } from 'react-router-dom';

import '../compStyles/Main.css'
import Contributions from './Contributions';
import Project from './Project';
import Projects from './Projects';

const Main = () => {

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
          ><Contributions/></Route>
        </Switch>
    </div>
    );
  }
  
  export default Main;