import { csrfFetch } from './csrf';
import { Dispatch } from 'react';
import { IActionContribution, IContribution } from '../d';

const SET_CONTRIBUTION = 'project/setContribution';

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
    const data:{url:string} = await response.json()

    window.location.href = data.url

    return data.url;
};

export const getContributions = (userId:number|null, page:string) => async (dispatch: Dispatch<IActionContribution>) => {
    const response = await csrfFetch(`/api/users/${userId}/contributions/page/${page}`)

    const data:{contributions:IContribution[]} = await response.json();

    dispatch(setContribution(data.contributions))

    return response;
};

const initialState:IContribution[] = [
    {
        receiptTile:{
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
            imgAlt:null,
            creatorName:null,
            percentFunded:0,
            pageNums:0,
            bookmarked:false,
        }
    }
] 

const contributionsReducer = (state = initialState, action:IActionContribution) => {
    let newState;
    switch (action.type) {
        case SET_CONTRIBUTION:
            newState = action.payload;
            return newState;
        default:
            return state;
    };
};

export default contributionsReducer;