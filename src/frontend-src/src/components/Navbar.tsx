import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from './../store/session'
import { RootState } from './../store';
import { IUser } from './../d';
import Button from '@material-ui/core/Button';
import './../compStyles/Navbar.css'
import Modal from '@mui/material/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import * as projectActions from './../store/projects'

function Navbar() {
  const history = useHistory();
  const [selectedForm, setSelectedForm] = useState('')
  const [bottomNavDis, setBottomNavDis] = useState((window.location.pathname.split('/')[window.location.pathname.split('/').length - 2] === 'project' 
  ?
  'none'
  :
  ''
  ));
  
  const [open, setOpen] = useState(false);
  const handleOpen = (selectedForm:string) => {
            setSelectedForm(selectedForm);
            setOpen(true);
        };
  const handleClose = () => {
            setSelectedForm('');
            setOpen(false);
        };
  const handleLogout = async () => {
      await dispatch(sessionActions.logout())
      history.push('/category/Top/page/1')
  }

  const handleGoHome = async () => {
    setBottomNavDis('');
    history.push('/category/Top/page/1')
  }

  const checkActive = (nav:string) => {
    const len = window.location.pathname.split('/').length
    const path =  window.location.pathname.split('/')
    const cat = path[len - 3]
    return cat === nav
  }

        
    const dispatch = useDispatch();
    const sessionUser:IUser = useSelector((state: RootState) => state.session);
    
    useEffect(() => {
        if (sessionUser.user.username) {
            handleClose()
        }
    }, [sessionUser])

    const handleClick = (category:string) => {
        if (category !== 'bookmarks') {
        dispatch(projectActions.getProjects(category, '1'))
        } else {
        dispatch(projectActions.getBookmarks('1', sessionUser.user.id))
        }
    }

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
            <p id='site-title'
            onClick={handleGoHome}><span>JOKE</span>STARTER</p>
            {
            sessionUser.user.username 
            ?
            <div id='nav-button-container'>
            <Button 
                id='login'  
                onClick={handleLogout}
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
        <div id='nav-bottom' style={{display: bottomNavDis}}>
            <div id='nav-link-container'>
                <NavLink to="/category/Top/page/1" 
                onClick={() => handleClick('Top')}
                activeClassName="selected"
                isActive={() => checkActive('Top')}>
                    Top
                </NavLink>
                <br></br>
                <NavLink to="/category/Toys/page/1" 
                onClick={() => handleClick('Toys')}
                activeClassName="selected"
                isActive={() => checkActive('Toys')}>
                    Toys
                </NavLink>
                <NavLink to="/category/Food/page/1" 
                onClick={() => handleClick('Food')}
                activeClassName="selected"
                isActive={() => checkActive('Food')}>
                    Food
                </NavLink>
                <NavLink to="/category/Services/page/1" 
                onClick={() => handleClick('Services')}
                activeClassName="selected"
                isActive={() => checkActive('Services')}>
                    Services
                </NavLink>
                <NavLink to="/category/Misc/page/1" 
                onClick={() => handleClick('Misc')}
                activeClassName="selected"
                isActive={() => checkActive('Misc')}>
                    Misc
                </NavLink>
                {
                sessionUser.user.username 
                ?
                <>
                <span>|</span>
                <NavLink to="/category/bookmarks/page/1" 
                onClick={() => handleClick('bookmarks')}
                activeClassName="selected"
                isActive={() => checkActive('bookmarks')}>
                    Bookmarks
                </NavLink>
                <NavLink to="/contributions/page/1" 
                activeClassName="selected"
                isActive={() => checkActive('contributions')}>
                    Contributions
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