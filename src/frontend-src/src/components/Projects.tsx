import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from './../store/projects'
import { RootState } from './../store';
import { IProjects, IUser } from './../d';
import { useHistory, useParams } from 'react-router-dom';
import ProjectTile from './ProjectTIle';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../compStyles/Projects.css'

type urlParams = {
    categoryName:string,
    pageNumber:string
}

function Projects() {
  console.log('HELLOOOOOOOOOOOOOO')
  const history = useHistory();
  const dispatch = useDispatch();
  const {categoryName, pageNumber} = useParams<urlParams>();

  const pageNumberNum:number = Number(pageNumber)
  const projects:IProjects[] = useSelector((state: RootState) => state.projects);
  const sessionUser:IUser = useSelector((state: RootState) => state.session);
  const pageNums = projects[0] ? projects[0].pageNums : 0

  const [page, setPage] = useState(pageNumberNum);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (categoryName !== 'Bookmarks') {
      dispatch(projectActions.getProjects(categoryName, `${value}`))
    } else {
      dispatch(projectActions.getBookmarks(`${value}`, sessionUser.user.id))
    }
    setPage(value);
    history.push(`/category/${categoryName}/page/${value}`)
  };
    
    useEffect(() => {
      setPage(1)
      if (categoryName !== 'Bookmarks') {
        dispatch(projectActions.getProjects(categoryName, '1'))
      } else {
        dispatch(projectActions.getBookmarks('1', sessionUser.user.id))
      }
    }, [dispatch, useParams<urlParams>().categoryName]);


  return (
    <>
      <div className='page-dial-container-top'>
        <Stack spacing={2}>
          <Pagination count={pageNums} page={page} onChange={handleChange} />
        </Stack>    
      </div>
      <div id='projects'>
          {projects.map(((project:IProjects) => <ProjectTile key={`project-tile-${project.title}`} props={{ project }}/>))}
      </div>
      <div className='page-dial-container-bottom'>
        <Stack spacing={2}>
          <Pagination count={pageNums} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </>
  )
};

export default Projects;
