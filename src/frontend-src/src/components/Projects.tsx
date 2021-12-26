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
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryName, pageNumber } = useParams<urlParams>();

  const pageNumberNum:number = Number(pageNumber)
  const projects:IProjects[] = useSelector((state: RootState) => state.projects);
  const pageNums = projects[0] ? projects[0].pageNums : 0

  const [page, setPage] = useState(pageNumberNum);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    history.push(`/category/${categoryName}/page/${value}`)
    dispatch(projectActions.getProjects(categoryName, `${value}`))
    setPage(value);
  };
    
    useEffect(() => {
        dispatch(projectActions.getProjects(categoryName, pageNumber))
    }, [dispatch]);


  return (
    <>
      <div className='page-dial-container'>
        <Stack spacing={2}>
          <Pagination count={pageNums} page={page} onChange={handleChange} />
        </Stack>    
      </div>
      <div id='projects'>
          {projects.map(((project:IProjects) => <ProjectTile key={`project-tile-${project.title}`} props={{ project }}/>))}
      </div>
      <div className='page-dial-container'>
        <Stack spacing={2}>
          <Pagination count={pageNums} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </>
  )
};

export default Projects;
