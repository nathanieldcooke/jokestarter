import React, {useState, useEffect, useRef} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import * as projectsActions from './../store/projects'
import * as projectActions from './../store/project'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { RootState } from './../store';
import { IProject, IProjects, IUser } from './../d';
import { useParams } from 'react-router-dom';
import '../compStyles/Project.css'
import { Button } from '@material-ui/core';
import TierTile from './TIerTIle';
import CustomizedSnackbars from './SnackBar';

type urlParams = {
    categoryName:string,
    projectId:string
}

function Project() {
    const dispatch = useDispatch();
    const { projectId } = useParams<urlParams>();
    const projectIdNum = Number(projectId) 
    const projects:IProjects[] = useSelector((state: RootState) => state.projects);
    const project:IProject = useSelector((state: RootState) => state.project);
    const sessionUser:IUser = useSelector((state: RootState) => state.session);
    const category = window.location.pathname.split('/')[window.location.pathname.split('/').length - 3]
    const percentFunded = project.percentFunded > 1 
    ?
    100
    : 
    project.percentFunded * 100;
    
    const tiersRef = useRef(null);
    
    const [bookmarked, setBookmarked] = useState(project.bookmarked)
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [support, setSupport] = useState(false);

    const handleTierOpen = async () => {
        setSupport(support ? false : true);
        window.scrollTo({ behavior: 'smooth', top: tiersRef.current.offsetTop });
    }

    const handleBookmarkClick = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (!sessionUser.user.id) {
            setShowSnackBar(true)
        } else {
            if (bookmarked) {
                setBookmarked(false);
                dispatch(projectsActions.updateBookmark(project.id, false, projects, sessionUser.user.id, category))
            } else {
                setBookmarked(true);
                dispatch(projectsActions.updateBookmark(project.id, true, projects, sessionUser.user.id, category))
            }
        }
    }

    useEffect(() => {setBookmarked(project.bookmarked)}, [project])
    useEffect(() => {window.scrollTo({ behavior: 'smooth', top: tiersRef.current.offsetTop });}, [support])
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
                            <span id='funds-collected'>$ {project.fundsCollected && project.fundsCollected.toLocaleString()}</span>
                        </div>
                        <div>
                            <span>
                            pledged of <span id='funding-goal'> ${project.goal && project.goal.toLocaleString()} </span> goal
                            </span>
                        </div>
                    </section>
                    <section>
                        <div>
                            <div>
                                <span id='num-of-backers'>{project.numOfBackers && project.numOfBackers.toLocaleString()}</span>
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
                    <Button 
                        id='back-this-project-btn'
                        onClick={handleTierOpen}
                    >Back this project</Button>
                    <Button 
                        id='bookmark-btn'
                        onClick={(e) => handleBookmarkClick(e)}
                    ><BookmarkIcon
                        style={{color: bookmarked ? 'yellow' : ''}}
                    />Bookmark</Button>
            </div>
        </section>
        <section ref={tiersRef} id='support-tiers' style={{display: support ? 'flex' : 'none'}}>
            {project.supportTiers.map(supportTier => <TierTile key={`support-tier-${supportTier.name}`} props={{supportTier}}/>)}
        </section>
        {showSnackBar && <CustomizedSnackbars props={{showSnackBar,setShowSnackBar}}/>}
    </div>
  )
};

export default Project;