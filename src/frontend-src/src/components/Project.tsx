import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from './../store/project'
import { RootState } from './../store';
import { IProject } from './../d';
import { useHistory, useParams } from 'react-router-dom';
import '../compStyles/ProjectTile.css'

// /category/:categoryName/project/:projectId

type urlParams = {
    categoryName:string,
    projectId:string
}

function Project() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { categoryName, projectId } = useParams<urlParams>();
    const projectIdNum = Number(projectId) 
    const project:IProject = useSelector((state: RootState) => state.project);

    console.log("DIs It: ", project)

    useEffect(() => {
        dispatch(projectActions.getProject(projectIdNum))
    }, [dispatch]);
  return (
    <div>
        Project Details Page
    </div>
  )
};

export default Project;