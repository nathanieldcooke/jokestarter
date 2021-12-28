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
import CustomizedSnackbars from './SnackBar';
import CircularProgress from '@mui/material/CircularProgress';

function ProjectTile(props:{props: { project:IProjects }}) {
    const dispatch = useDispatch();
    const projects:IProjects[] = useSelector((state: RootState) => state.projects);
    const sessionUser:IUser = useSelector((state: RootState) => state.session);
    const isContribution = (window.location.pathname.split('/')[window.location.pathname.split('/').length - 3] === 'contributions')
    const project = props.props.project
    const percentFunded = project.percentFunded > 1 
    ?
    100
    : 
    project.percentFunded * 100;
    const [bookmarked, setBookmarked] = useState(project.bookmarked)
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [progress, setProgress] = useState(0);
    const [hideTile, setHideTile] = useState(false);
    const category = window.location.pathname.split('/')[window.location.pathname.split('/').length - 3]
    const pageNumber = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
    const openInNewTab = (url:string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const undoHide = () => {
        setHideTile(false)
    }

    const handleBookmarkClick = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (!sessionUser.user.id) {
            setShowSnackBar(true)
        } else {
            if (bookmarked) {
                setBookmarked(false);
                dispatch(projectActions.updateBookmark(project.id, false, projects, sessionUser.user.id, category))
            } else {
                setBookmarked(true);
                dispatch(projectActions.updateBookmark(project.id, true, projects, sessionUser.user.id, category))
            }
        }
    }

    const handleThumbClick = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (!sessionUser.user.id) {
            setShowSnackBar(true)
        } else {
            setHideTile(true)
        }
    }

    useEffect(() => {
    if (hideTile) {

        const timer = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress >= 100) {
                dispatch(projectActions.hideProject(project.id, sessionUser.user.id, category, pageNumber, project.bookmarked))
            }
              return (prevProgress >= 100 ? 0 : prevProgress + 10)
          });
        }, 800);
    
        return () => {
          clearInterval(timer);
        };
    }
    }, [hideTile]);

  return (
    <div className='project-tile'>
        {

            hideTile
            ?
            <div id='circle-undo'
                onClick={undoHide}
            >
                <  CircularProgress variant="determinate" value={progress} />
                <div>Click To Undo</div>
            </div>
            :
        <>
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
                        style={{color: bookmarked ? 'yellow' : '', display: isContribution ? 'none' : ''}}
                    />
                </div>
                <div style={{display: (category === 'Bookmarks' || isContribution) ? 'none' : ''}}>
                    <ThumbDownIcon
                        onClick={(e) => handleThumbClick(e)}
                    />
                </div>
            </div>
            </div>
        </>}
        {showSnackBar && <CustomizedSnackbars props={{showSnackBar,setShowSnackBar}}/>}
    </div>
  )
};

export default ProjectTile;