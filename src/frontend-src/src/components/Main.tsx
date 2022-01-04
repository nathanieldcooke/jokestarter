import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { IUser } from '../d';
import { RootState } from '../store';
import Contributions from './Contributions';
import Project from './Project';
import Projects from './Projects';
import '../compStyles/Main.css'

const Main = () => {

  const sessionUser:IUser = useSelector((state: RootState) => state.session);

  return (
    <main id='main' key={sessionUser.user.id}>
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
    </main>
  );
};
  
export default Main;