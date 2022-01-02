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

export const getBookmarks = (page:string, userId:number|null) => async (dispatch: Dispatch<IActionProjects>) => {
    const response = await csrfFetch(`/api/users/${userId}/bookmarks/page/${page}`)

    const data:IProjects[] = await response.json();



    dispatch(setProjects(data))

    return response;
};

export const hideProject = (projectId:number, userId:number|null, category:string, page:string, bookmarked:boolean) => async (dispatch: Dispatch<IActionProjects>) => {
    const response1 = await csrfFetch(`/api/users/${userId}/hide-project/${projectId}`, {
        method: 'DELETE',
        headers: {}, 
        body: JSON.stringify({
        }),
    })

    if (bookmarked) {
        await csrfFetch(`/api/users/${userId}/bookmarks/${projectId}`, {
            method: 'PUT',
            headers: {}, 
            body: JSON.stringify({
              bookmarked: false,
            }),
        })
    }

    const response2 = await csrfFetch(`/api/projects/${category}/page/${page}`)

    const data:IProjects[] = await response2.json();

    dispatch(setProjects(data))

    return response1;
};

const removeBookmarkedProject = (state:IProjects[], projectId:string) => {
    let intProjectId = Number(projectId);

    return state.filter((project:IProjects) => {
        return project.id !== intProjectId
    }).map((project:IProjects) => {
         return {...project};
    });
}

const updateBookmarkedProject = (state:IProjects[], projectId:string) => {
    let intProjectId = Number(projectId)
    return state.map((project:IProjects) => {
        if (project.id === intProjectId) {
            let projectCopy = {...project}
            projectCopy.bookmarked = projectCopy.bookmarked ? false : true
            return projectCopy
        } else {
            return {...project}
        }
    })
};

export const updateBookmark = (projectId:number, bookmarked:boolean, projects:IProjects[], userId:number|null, category:string) => async (dispatch: Dispatch<IActionProjects>) => {
    const response = await csrfFetch(`/api/users/${userId}/bookmarks/${projectId}`, {
        method: 'PUT',
        headers: {}, 
        body: JSON.stringify({
          bookmarked,
        }),
    })

    const data:{projecId:string} = await response.json();

    let updatedProjects:IProjects[] = []

    if (!bookmarked && category === 'bookmarks') {
        updatedProjects = removeBookmarkedProject(projects,`${projectId}`)
    } else {
        updatedProjects = updateBookmarkedProject(projects, data.projecId)
    }

    dispatch(setProjects(updatedProjects))

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