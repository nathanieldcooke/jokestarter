import React, {useState, useEffect} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from './../store/projects'
import { RootState } from './../store';
import { IProjects, IUser } from './../d';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import '../compStyles/ProjectTile.css'
import CustomizedSnackbars from './SnackBar';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';

function ProjectTile(props:{props: { project:IProjects }}) {

    const dispatch = useDispatch();

    const projects:IProjects[] = useSelector((state: RootState) => state.projects);
    const sessionUser:IUser = useSelector((state: RootState) => state.session);

    const isContribution = (window.location.pathname.split('/')[window.location.pathname.split('/').length - 3] === 'contributions')
    const project = props.props.project;
    const percentFunded = project.percentFunded > 1 
    ?
        100
    : 
        project.percentFunded * 100;

    const [bookmarked, setBookmarked] = useState(project.bookmarked);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [progress, setProgress] = useState(0);
    const [hideTile, setHideTile] = useState(false);
    const [notifyDelete, setNotifyDelete] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [subIsFocused, setSubIsFocused] = useState(false);

    const category = window.location.pathname.split('/')[window.location.pathname.split('/').length - 3];
    const pageNumber = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];

    const history = useHistory();
    const openProject = (e:React.MouseEvent|React.KeyboardEvent, url:string) => {
        if (subIsFocused) return;
        history.push(url);
    }

    const handleFocus = () => {
        setIsFocused(isFocused ? false : true);
    };

    const handleSubFocus = () => {
        setSubIsFocused(subIsFocused ? false : true);
    };

    const undoHide = () => {
        handleFocus();
        setHideTile(false);
    };

    const handleBookmarkClick = (e:React.MouseEvent|React.KeyboardEvent) => {
        e.stopPropagation();
        if (!sessionUser.user.id) {
            setShowSnackBar(true);
        } else {
            if (bookmarked) {
                setBookmarked(false);
                dispatch(projectActions.updateBookmark(project.id, false, projects, sessionUser.user.id, category));
            } else {
                setBookmarked(true);
                dispatch(projectActions.updateBookmark(project.id, true, projects, sessionUser.user.id, category));
            };
        };
    };

    const handleThumbClick = (e:React.MouseEvent|React.KeyboardEvent) => {
        e.stopPropagation()
        if (!sessionUser.user.id) {
            setShowSnackBar(true);
        } else {
            setHideTile(true);
        };
    };

    useEffect(() => {
    if (hideTile) {

        const timer = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress >= 100) {
                setNotifyDelete(true);
                setTimeout(() => {
                    dispatch(projectActions.hideProject(project.id, sessionUser.user.id, category, pageNumber, project.bookmarked));
                }, 3000)
            }
              return (prevProgress >= 100 ? 0 : prevProgress + 10);
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
                !notifyDelete
                ?
                    <div tabIndex={0} id='circle-undo'
                        onClick={undoHide}
                        onKeyDown={undoHide}
                    >
                        <  CircularProgress variant="determinate" value={progress} />
                        <div>Click To Undo</div>
                    </div>
                :
                    <div id='circle-undo'
                    >
                    <  CircularProgress variant="determinate" value={100} />
                    <div>{project.title} is removed</div>
                    </div>
            :
                <>
                    <img src={project.screenShot} alt={project.imgAlt}/>
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
                    <button 
                        className='hidden-tile-cover'
                        onClick={(e) => openProject(e, `/category/${category}/project/${project.id}`)}
                        onFocus={handleFocus}
                        onBlur={handleFocus}
                        style={isFocused ? {
                            backgroundColor: 'rgba(7, 135, 0, 0.913)',
                            color: 'white',
                            transition: '.5s',
                            cursor: 'pointer',
                        } : {}}
                        >
                        <span>More Details</span>
                        <div className='hidden-icons'>
                            <div
                            >
                                <BookmarkIcon
                                    onFocus={handleSubFocus}
                                    onBlur={handleSubFocus}
                                    onKeyPress={(e) => handleBookmarkClick(e)}
                                    tabIndex={0}
                                    onClick={(e) => handleBookmarkClick(e)}
                                    style={{color: bookmarked ? 'yellow' : '', display: isContribution ? 'none' : ''}}
                                />
                            </div>
                            <div style={{display: (category === 'bookmarks' || isContribution) ? 'none' : ''}}>
                                <ThumbDownIcon
                                    onFocus={handleSubFocus}
                                    onBlur={handleSubFocus}
                                    tabIndex={0}
                                    onClick={(e) => handleThumbClick(e)}
                                    onKeyPress={(e) => handleThumbClick(e)}
                                />
                            </div>
                        </div>
                    </button>
                </>}
        {showSnackBar && <CustomizedSnackbars props={{showSnackBar,setShowSnackBar}}/>}
    </div>
  )
};

export default ProjectTile;