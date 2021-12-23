import { Dispatch } from 'react';
import { IUserSecure, IUser, IUserSignup, IActionUser } from '../d';
import { csrfFetch } from './csrf';
const SET_USER = 'session/setUser';
// const REMOVE_USER = 'session/removeUser';

const setUser = (user:IUser) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

// const removeUser = () => {
//   return {
//     type: REMOVE_USER,
//   };
// };

export const restoreUser = () => async (dispatch: Dispatch<IActionUser>) => {
  const response = await csrfFetch('/api/users/account');
  const data:IUser = await response.json();
  dispatch(setUser({
    status: data.status,
    errors: data.errors,
    user: data.user
  }));
  return response;
};

export const login = (user:IUserSecure) => async (dispatch: Dispatch<IActionUser>) => {
  const credential:string = user.credential
  const password:string = user.password
  const response = await csrfFetch('/api/users/login', {
    method: 'PUT',
    headers: {}, 
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  const data:IUser = await response.json();

    dispatch(setUser({
      status: data.status,
      errors: data.errors,
      user: data.user
    }));

  return response;
};

export const demo = () => async (dispatch: Dispatch<IActionUser>) => {

  const response = await csrfFetch('/api/users/demo', {
    method: 'PUT',
    headers: {}, 
    body: JSON.stringify({
    }),
  });

  const data:IUser = await response.json();

  dispatch(setUser({
    status: data.status,
    errors: data.errors,
    user: data.user
  }));

  return response;
};

export const signup = (user:IUserSignup) => async (dispatch: Dispatch<IActionUser>) => {
  const email:string = user.email
  const username:string = user.username
  const password:string = user.password
  const confirmPassword:string = user.confirmPassword
  const response = await csrfFetch('/api/users/signup', {
    method: 'POST',
    headers: {}, 
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    }),
  });

  const data:IUser = await response.json();

  dispatch(setUser({
    status: data.status,
    errors: data.errors,
    user: data.user
  }));

  return response;
};

export const logout = () => async (dispatch: Dispatch<IActionUser>) => {
  const response = await csrfFetch('/api/users/logout', {
    method: 'PUT',
    headers: {}, 
    body: JSON.stringify({}),
  });

  const data:IUser = await response.json();


  dispatch(setUser({
    status: data.status,
    errors: data.errors,
    user: data.user
  }));

  return response;
};

const initialState:IUser = { status: true, errors: [], user: {username: null, id: null} };

const sessionReducer = (state = initialState, action:IActionUser) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    // case REMOVE_USER:
    //   newState = Object.assign({}, state);
    //   newState.user = {username: null, id: null, errors: []};
    //   return newState;
    default:
      return state;
  };
};

export default sessionReducer