import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from './../store/projects'
import { RootState } from './../store';
import { IProjects, IUser } from './../d';
import { useHistory, useParams } from 'react-router-dom';
import ProjectTile from './ProjectTIle';
import '../compStyles/Projects.css'

type urlParams = {
    categoryName:string,
    pageNumber:string
}

function Projects() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryName, pageNumber } = useParams<urlParams>();

  const projects:IProjects[] = useSelector((state: RootState) => state.projects);

  console.log('PPs: ', projects)
    
    useEffect(() => {
        dispatch(projectActions.getProjects(categoryName, pageNumber))
    }, [dispatch]);


  return (
    <div id='projects'>
        {projects.map(((project:IProjects) => <ProjectTile props={{ project }}/>))}
    </div>
  )
};

export default Projects;
