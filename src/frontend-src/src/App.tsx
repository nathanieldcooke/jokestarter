import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from './store/session'
import { RootState } from './store';
import { IUser } from './d';
import Navbar from './components/Navbar';
import { useHistory } from 'react-router-dom';
import Main from './components/Main';
import Footer from './components/Footer';


function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser:IUser = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (window.location.pathname === '/') {
      history.push('/category/Top/page/1')
    }
  }, [])

  useEffect(() => { // once session user updates in store, load App
    setIsLoaded(true);
  }, [sessionUser])

  useEffect(() => { // attempt to restore user on page load
    dispatch(sessionActions.restoreUser())
  }, [dispatch]);


  return ( (isLoaded && 
    <div id='app-body'>
      <header>
        <Navbar/>
      </header>
      <Main/>
      <div id='background-lines' >
        <img id='left-img' src='https://cdn.optimizely.com/img/14069890047/72ae3620b85d48c1878cbe4d0866665d.png'/>
        <img id='right-img' src='https://cdn.optimizely.com/img/14069890047/efeeb04eb14c4a70a1b3ac360ea795d2.png'/>
        <img id='bottom-img' src='https://ksr-static.imgix.net/c51lnrg9-doodle_continue.png?ixlib=rb-2.1.0&auto=compress%2Cformat&w=1000&fit=min&s=dc34091fa7d24f5d676e0e0201337f9b'/>
      </div>
      <Footer/>
    </div>) || null
  )
};

export default App;
