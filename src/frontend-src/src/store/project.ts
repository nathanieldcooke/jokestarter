import { Dispatch } from 'react';
import { IActionProject, IActionProjects, IProject, IProjects } from '../d';
import { csrfFetch } from './csrf';

const SET_PROJECT = 'project/setProject'

const setProject = (project:IProject) => {
    return {
        type: SET_PROJECT,
        payload: project,
    };
};

export const getProject = (projectId:number) => async (dispatch: Dispatch<IActionProject>) => {
    const response = await csrfFetch(`/api/projects/${projectId}`)

    const data:IProject = await response.json();

    dispatch(setProject(data))

    return response;
};

const initialState:IProject = 
{
    id: null,
    screenShot: undefined,
    videoSrc: undefined,
    title: null,
    summary: null,
    creatorName: null,
    fundsCollected: null,
    percentFunded: 0,
    numOfBackers: 0,
    daysToGo: 0,
    goal: null,
    supportTiers: [],
}

const sessionReducer = (state = initialState, action:IActionProject) => {
    let newState;
    switch (action.type) {
        case SET_PROJECT:
            newState = action.payload;
            return newState;
        default:
            return state;
    };
};

export default sessionReducer