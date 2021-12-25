import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as projectActions from './../store/projects'
import { RootState } from './../store';
import { IProjects, IUser } from './../d';
import { useHistory, useParams } from 'react-router-dom';

type urlParams = {
    categoryName:string,
    pageNumber:string
}

function Projects() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryName, pageNumber } = useParams<urlParams>();
//   const [isLoaded, setIsLoaded] = useState(false);
  const projects:IProjects[] = useSelector((state: RootState) => state.projects);

  console.log('PPs: ', projects)
//   useEffect(() => {
    //     history.push('/category/Top/page/1')
    //   }, [])
    
    //   useEffect(() => { // once session user updates in store, load App
    //     setIsLoaded(true);
    //   }, [sessionUser])
    
    useEffect(() => { // attempt to restore user on page load
        dispatch(projectActions.getProjects(categoryName, pageNumber))
    }, [dispatch]);


  return (
    <div>
        Projects
    </div>
  )
};

export default Projects;
