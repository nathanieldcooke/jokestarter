import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from './../store/session'
import { RootState } from './../store';
import { IUser } from './../d';
import Button from '@material-ui/core/Button';
import './../compStyles/Navbar.css'
import Modal from '@mui/material/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function Navbar() {
  const [selectedForm, setSelectedForm] = useState('')
  const [open, setOpen] = useState(false);
  const handleOpen = (selectedForm:string) => {
            setSelectedForm(selectedForm);
            setOpen(true);
        };
  const handleClose = () => {
            setSelectedForm('');
            setOpen(false);
        };

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser:IUser = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (sessionUser.user.username) {
        handleClose()
    }
  }, [sessionUser])

//   useEffect(() => { // attempt to restore user on page load
//     dispatch(sessionActions.restoreUser())
//   }, [dispatch]);


  return ( 
    <nav>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {
                selectedForm === 'login' 
                ?
                <LoginForm props={{setSelectedForm}}/>
                :
                <SignupForm props={{setSelectedForm}} />
            }
        </Modal>
        <div id='nav-top'>
            {
            sessionUser.user.username 
            ?
            <p id="nav-left">Welcome: <span>{sessionUser.user.username}</span></p> 
            :
            <p id="nav-left">Log in to get started!</p> 
            }
            <p id='site-title'><span>JOKE</span>STARTER</p>
            {
            sessionUser.user.username 
            ?
            <div id='nav-button-container'>
            <Button 
                id='login'  
                onClick={() => dispatch(sessionActions.logout())}
            >Log Out</Button>
            </div>
            :
            <div id='nav-button-container'>
            <Button 
                id='login'  
                onClick={() => handleOpen('login')}
            >Log In</Button>
            <Button 
                id='signup'  
                onClick={() => handleOpen('signup')}
            >Sign Up</Button>
            <Button 
                id='demo'  
                onClick={() => dispatch(sessionActions.demo())}
            >Demo</Button>
            </div>
            }
        </div>
        <div id='nav-bottom'>
            <div id='nav-link-container'>
                <NavLink to="/thing1" activeClassName="selected">
                    Top
                </NavLink>
                <br></br>
                <NavLink to="/thing2" activeClassName="selected">
                    Toys
                </NavLink>
                <NavLink to="/thing3" activeClassName="selected">
                    Food
                </NavLink>
                <NavLink to="/thing4" activeClassName="selected">
                    Services
                </NavLink>
                <NavLink to="/thing5" activeClassName="selected">
                    Misc
                </NavLink>
                {
                sessionUser.user.username 
                ?
                <>
                <span>|</span>
                <NavLink to="/thing6" activeClassName="selected">
                    Bookmarks
                </NavLink>
                <NavLink to="/thing7" activeClassName="selected">
                    Contributed
                </NavLink>
                </>
                :
                null
                }
            </div>
        </div>
    </nav>
  )
};

export default Navbar;