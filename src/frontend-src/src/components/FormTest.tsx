import React, { useState } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../store';
import Button from '@material-ui/core/Button';
// import '../CompStyles/Form.css'
// import '../CompStyles/Form.css'
const FormTest = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state: RootState) => state.session.user);
  const [credential, setCredential] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }))
  }

    return (
    <form className='log-sign' onSubmit={handleSubmit}>
      <p>{sessionUser && sessionUser.username}</p>
      <ul>
        {sessionUser && sessionUser.errors && sessionUser.errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Credential:
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      {/* <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label> */}
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {/* <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label> */}
      <Button type='submit' id='form-button'>Sign Up</Button>
      <a id='log-sign-change'>already have an account? <span>Log In</span></a>
    </form>
    );
  }
  
  export default FormTest;