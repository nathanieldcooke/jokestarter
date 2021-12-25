import { Dispatch } from 'react';
import { IActionProjects, IProjects } from '../d';
import { csrfFetch } from './csrf';

const SET_PROJECTS = 'projects/setProjects'

const setProjects = (projects:IProjects[]) => {
    return {
        type: SET_PROJECTS,
        payload: projects,
    };
};

export const getProjects = (category:string, page:string) => async (dispatch: Dispatch<IActionProjects>) => {
    const response = await csrfFetch(`/api/projects/${category}/page/${page}`)

    const data:IProjects[] = await response.json();

    dispatch(setProjects(data))

    return response;
};

const initialState:IProjects[] = []

const sessionReducer = (state = initialState, action:IActionProjects) => {
    let newState;
    switch (action.type) {
        case SET_PROJECTS:
            newState = [...action.payload];
            return newState;
        default:
            return state;
    };
};

export default sessionReducer