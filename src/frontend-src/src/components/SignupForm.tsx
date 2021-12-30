import React, { useState } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Button from '@material-ui/core/Button';
import '../compStyles/Form.css'
const SignupForm = React.forwardRef((props:{ props: {setSelectedForm: React.Dispatch<React.SetStateAction<string>>}}, ref  ) => {
  const { setSelectedForm } = props.props;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state: RootState) => state.session);
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    return dispatch(sessionActions.signup({ username, email, password, confirmPassword }))
  }

    return (
    <form className='log-sign' onSubmit={handleSubmit}>
      <ul>
        {sessionUser && sessionUser.errors && sessionUser.errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <Button type='submit' id='form-button'>Sign Up</Button>
      <p id='log-sign-change'>already have an account? <Button
        onClick={() => setSelectedForm('login')}
        >Log In</Button></p>
    </form>
    );
  })
  
  export default SignupForm;