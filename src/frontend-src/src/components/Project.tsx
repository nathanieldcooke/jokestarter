import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from './../store/project'
import { RootState } from './../store';
import { IProject } from './../d';
import { useHistory, useParams } from 'react-router-dom';
import '../compStyles/Project.css'
import { Button } from '@material-ui/core';
import TierTile from './TIerTIle';

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
    const percentFunded = project.percentFunded > 1 
    ?
    100
    : 
    project.percentFunded * 100
    // console.log("DIs It: ", project, project.videoSrc)

    useEffect(() => {
        dispatch(projectActions.getProject(projectIdNum))
    }, [dispatch]);
  return (
    <div id='project-details'>
        <section id='title-summary'>
            <div id='title'>
                <span>{project.title}</span>
            </div>
            <div id='summary'>
                <span>{project.summary}</span>
            </div>
        </section>
        <section id='video-other-data'>
            <iframe src={project.videoSrc}></iframe>
            <div id='other-data'>
                    <section>
                        <LinearProgress variant="determinate" value={percentFunded} />
                        <div>
                            <span id='funds-collected'>$ {project.fundsCollected}</span>
                        </div>
                        <div>
                            <span>
                            pledged of <span id='funding-goal'> ${project.goal} </span> goal
                            </span>
                        </div>
                    </section>
                    <section>
                        <div>
                            <div>
                                <span id='num-of-backers'>{project.numOfBackers}</span>
                            </div>
                            <div>
                                <span>backers</span>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div>
                            <span id='days-to-go'>{project.daysToGo}</span>
                        </div>
                        <div>
                            <span>days to go</span>
                        </div>
                    </section>
                    <Button id='back-this-project-btn'>Back this project</Button>
                    <Button id='bookmark-btn'>Bookmark</Button>
            </div>
        </section>
        <section id='support-tiers'>
            {project.supportTiers.map(supportTier => <TierTile key={`support-tier-${supportTier.name}`} props={{supportTier}}/>)}
        </section>
    </div>
  )
};

export default Project;