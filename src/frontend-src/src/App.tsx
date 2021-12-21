import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from './store/session'
import { RootState } from './store';
import { IUser } from './d';
import FormTest from './components/FormTest';


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser:IUser = useSelector((state: RootState) => state.session.user);

  useEffect(() => { // once session user updates in store, load App
    setIsLoaded(true);
  }, [sessionUser])

  useEffect(() => { // attempt to restore user on page load
    dispatch(sessionActions.restoreUser())
  }, [dispatch]);


  return ( (isLoaded && 
    <div>
      <FormTest></FormTest>
    </div>) || null
  )
};

export default App;
