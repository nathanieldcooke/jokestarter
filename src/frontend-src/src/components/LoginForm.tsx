import React, { useState } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Button from '@material-ui/core/Button';
import FocusTrap from 'focus-trap-react';
import '../compStyles/Form.css'

const LoginForm = React.forwardRef((props: { props: { setSelectedForm: React.Dispatch<React.SetStateAction<string>>, handleClose: () => void } }, ref) => {

  const { setSelectedForm, handleClose } = props.props;

  const dispatch = useDispatch();

  const sessionUser = useSelector((state: RootState) => state.session);

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }));
  }

  return (
    <FocusTrap>
    <div>
      <form
        className='log-sign'
        onSubmit={handleSubmit}
      >
        <ul>
          {sessionUser && sessionUser.errors && sessionUser.errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Username/Email:
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <Button type='submit' id='form-button'>Submit</Button>
        <p id='log-sign-change'>Don't have an account?<Button
          onClick={() => setSelectedForm('signup')}
        >Sign Up</Button></p>
        <button
          id='close-modal'
          onClick={handleClose}
        >X</button>
      </form>
      <div 
          onClick={handleClose}
          id='close-modal-div'></div>
    </div>
    </FocusTrap>
  );
});

export default LoginForm;