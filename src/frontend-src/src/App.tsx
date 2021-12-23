import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from './store/session'
import { RootState } from './store';
import { IUser } from './d';
import Navbar from './components/Navbar';
import { useHistory } from 'react-router-dom';
import Main from './components/Main';


function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser:IUser = useSelector((state: RootState) => state.session);

  useEffect(() => {
    history.push('/category/Top/page/1')
  }, [])

  useEffect(() => { // once session user updates in store, load App
    setIsLoaded(true);
  }, [sessionUser])

  useEffect(() => { // attempt to restore user on page load
    dispatch(sessionActions.restoreUser())
  }, [dispatch]);


  return ( (isLoaded && 
    <div>
      <header>
        <Navbar/>
      </header>
      <Main props={{}}>
      </Main>
    </div>) || null
  )
};

export default App;
