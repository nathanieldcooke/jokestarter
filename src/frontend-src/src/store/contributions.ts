import { Dispatch } from 'react';
import { IActionContribution, IActionProject, IActionProjects, IContribution, IProject, IProjects } from '../d';
import { csrfFetch } from './csrf';

const SET_CONTRIBUTION = 'project/setContribution'

const setContribution = (contribution:IContribution[]) => {
    return {
        type: SET_CONTRIBUTION,
        payload: contribution,
    };
};


export const makeContributionThunk = (supportTierId:number, amountPledged:number, userId:number|null, contributions:IContribution[]|null, curr_url:string) => async (dispatch: Dispatch<IActionContribution>) => {
    const response = await csrfFetch(`/api/users/${userId}/contributions`, {
        method: 'POST',
        headers: {}, 
        body: JSON.stringify({
            supportTierId,
            amountPledged,
            curr_url
        }),
    })

    // const data:{contribution:IContribution} = await response.json();

    // contributions.unshift(data.contribution)

    // dispatch(setContribution(contributions))
    const data:{url:string} = await response.json()

    console.log("data", data)

    window.location.href = data.url

    return data.url;
};

const initialState:IContribution = 
{
    recieptTile:{
        amountPledged:null,
        nameOfTier:null,
        summaryOfTier:null,
        etaDelivery:null,
        shipsTo:null,
    },
    projectTile:{
        id:0,
        screenShot:undefined,
        title:null,
        summary:null,
        creatorName:null,
        percentFunded:0,
        pageNums:0,
        bookmarked:false,
    }
}

const sessionReducer = (state = initialState, action:IActionProject) => {
    let newState;
    switch (action.type) {
        case SET_CONTRIBUTION:
            newState = action.payload;
            return newState;
        default:
            return state;
    };
};

export default sessionReducer