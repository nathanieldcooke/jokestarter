import { Dispatch } from 'react';
import { IActionProject, IProject  } from '../d';
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
    id: 0,
    screenShot: undefined,
    videoSrc: undefined,
    title: null,
    summary: null,
    imgAlt:null,
    creatorName: null,
    fundsCollected: null,
    percentFunded: 0,
    numOfBackers: 0,
    daysToGo: 0,
    goal: null,
    supportTiers: [],
    bookmarked: false
}

const projectReducer = (state = initialState, action:IActionProject) => {
    let newState;
    switch (action.type) {
        case SET_PROJECT:
            newState = action.payload;
            return newState;
        default:
            return state;
    };
};

export default projectReducer