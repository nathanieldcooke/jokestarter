import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from './../store/projects'
import { RootState } from './../store';
import { IProjects, IUser } from './../d';
import { useHistory, useParams } from 'react-router-dom';
import ProjectTile from './ProjectTIle';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../compStyles/Projects.css';

type urlParams = {
  categoryName: string,
  pageNumber: string
}

function Projects() {

  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryName, pageNumber } = useParams<urlParams>();

  const projects: IProjects[] = useSelector((state: RootState) => state.projects);
  const sessionUser: IUser = useSelector((state: RootState) => state.session);

  const pageNumberNum: number = Number(pageNumber);
  const pageNums = projects[0] ? projects[0].pageNums : 0;

  const [page, setPage] = useState(pageNumberNum);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    if (categoryName !== 'bookmarks') {
      dispatch(projectActions.getProjects(categoryName, `${value}`));
    } else {
      dispatch(projectActions.getBookmarks(`${value}`, sessionUser.user.id));
    };
    setPage(value);
    history.push(`/category/${categoryName}/page/${value}`);
  };

  useEffect(() => {
    setPage(1)
    if (categoryName !== 'bookmarks') {
      dispatch(projectActions.getProjects(categoryName, '1'))
    } else {
      dispatch(projectActions.getBookmarks('1', sessionUser.user.id))
    };
  }, [dispatch, useParams<urlParams>().categoryName]);

  if (projects[0] && projects[0].id === 0) return <div id='no-projects-found' ></div>;
  if (pageNums === 0) return <div id='no-projects-found' >No Projects Found</div>;

  return (
    <>
      <div className='page-dial-container-top'>
        <Stack spacing={2}>
          <Pagination count={pageNums} page={page} onChange={handleChange} />
        </Stack>
      </div>
      <section id='projects'>
        {projects.map(((project: IProjects) => <ProjectTile key={`project-tile-${project.title}`} props={{ project }} />))}
      </section>
      <div className='page-dial-container-bottom'>
        <Stack spacing={2}>
          <Pagination count={pageNums} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </>
  );
};

export default Projects;
