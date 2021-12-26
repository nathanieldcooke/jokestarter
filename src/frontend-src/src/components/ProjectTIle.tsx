import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from './../store/projects'
import { RootState } from './../store';
import { IProjects, IUser } from './../d';
import { useHistory, useParams } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import '../compStyles/ProjectTile.css'

function ProjectTile(props:{props: { project:IProjects }}) {
    const dispatch = useDispatch();
    const projects:IProjects[] = useSelector((state: RootState) => state.projects);
    const sessionUser:IUser = useSelector((state: RootState) => state.session);
    const project = props.props.project
    const percentFunded = project.percentFunded > 1 
    ?
    100
    : 
    project.percentFunded * 100;
    const [bookmarked, setBookmarked] = useState(project.bookmarked)
    const category = window.location.pathname.split('/')[window.location.pathname.split('/').length - 3]
    const openInNewTab = (url:string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const handleBookmarkClick = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (bookmarked) {
            setBookmarked(false);
            dispatch(projectActions.updateBookmark(project.id, false, projects, sessionUser.user.id, category))
        } else {
            setBookmarked(true);
            dispatch(projectActions.updateBookmark(project.id, true, projects, sessionUser.user.id, category))
        }
    }

  return (
    <div className='project-tile'>
        <img src={project.screenShot}/>
        <LinearProgress variant="determinate" value={percentFunded} />
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
        <div 
            className='hidden-tile-cover'
            onClick={() => openInNewTab(`/category/${category}/project/${project.id}`)}
            >
            <span>More Details</span>
        <div className='hidden-icons'>
            <div>
                <BookmarkIcon
                    onClick={(e) => handleBookmarkClick(e)}
                    style={{color: bookmarked ? 'yellow' : ''}}
                />
            </div>
            <div>
                <ThumbDownIcon></ThumbDownIcon>
            </div>
        </div>
        </div>
    </div>
  )
};

export default ProjectTile;