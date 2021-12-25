import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from './../store/projects'
import { RootState } from './../store';
import { IProjects, IUser } from './../d';
import { useHistory, useParams } from 'react-router-dom';
import '../compStyles/ProjectTile.css'

function ProjectTile(props:{props: { project:IProjects }}) {
    const project = props.props.project
    const percentFunded = project.percentFunded
    const [progress, setProgress] = useState(
        (percentFunded) * 100 > 100 
        ?
        80
        : 
        percentFunded * 100
    );


  console.log('PPs: ', project)

  return (
    <div className='project-tile'>
        <img src={project.screenShot}/>
        <LinearProgress variant="determinate" value={progress} />
        <section className='text-content'>
            <div className='projects-title'>
                <span>{project.title}</span>
            </div>
            <div className='projects-summary'>
                <span>{project.summary}</span>
            </div>
            <div className='projects-creatorName'>
                <span>By {project.creatorName}</span>
            </div>
        </section>
    </div>
  )
};

export default ProjectTile;