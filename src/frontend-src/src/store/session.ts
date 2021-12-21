import { Dispatch } from 'react';
import { IAction, IUserSecure, IUser } from '../d';
import { csrfFetch } from './csrf';
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user:IUser) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const restoreUser = () => async (dispatch: Dispatch<IAction>) => {
  const response = await csrfFetch('/api/users/account');
  const data:{user:IUser} = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const login = (user:IUserSecure) => async (dispatch: Dispatch<IAction>) => {
  const username:string = user.username
  const password:string = user.password
  const response = await csrfFetch('/api/users/login', {
    method: 'PUT',
    headers: {}, 
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    dispatch(setUser({
        id: null,
        username: null,
        errors: data.errors
    }));
  } else {
    dispatch(setUser(data.user));
  };
  return response;
};

export const demo = (user:IUserSecure) => async (dispatch: Dispatch<IAction>) => {
  const username:string = user.username
  const password:string = user.password
  const response = await csrfFetch('/api/users/demo', {
    method: 'PUT',
    headers: {}, 
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    dispatch(setUser({
        id: null,
        username: null,
        errors: data.errors
    }));
  } else {
    dispatch(setUser(data.user));
  };
  return response;
};

export const signup = (user:IUserSecure) => async (dispatch: Dispatch<IAction>) => {
  const username:string = user.username
  const password:string = user.password
  const confirmPassword:string|undefined = user.confirmPassword
  const response = await csrfFetch('/api/users/signup', {
    method: 'POST',
    headers: {}, 
    body: JSON.stringify({
      username,
      password,
      confirmPassword,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    dispatch(setUser(data.user)); // add error confirmation for failed log out, at later date.
  } else {
    dispatch(setUser({
        id: null,
        username: null,
        errors: []
    }));
  };
  return response;
};

export const logout = (user:IUser) => async (dispatch: Dispatch<IAction>) => {
  const username:string|null = user.username
  const id:number|null = user.id
  const response = await csrfFetch('/api/users/logout', {
    method: 'PUT',
    headers: {}, 
    body: JSON.stringify({
      username,
      id,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    dispatch(setUser({
        id: null,
        username: null,
        errors: data.errors
    }));
  } else {
    dispatch(setUser(data.user));
  };
  return response;
};

const initialState = { user: {username: null, id: null, errors: []} };

const sessionReducer = (state = initialState, action:IAction) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = {username: null, id: null, errors: []};
      return newState;
    default:
      return state;
  };
};

export default sessionReducer