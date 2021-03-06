/* 
GLOSSARY:
    general interfaces and types
    user interfaces and types
    projects interfaces and types
    project interfaces and types
    contributions interfaces and types
*/

/////////////////////// general interfaces and types
declare global {
    interface Window { 
        csrfFetch: (////////////////////// general interfaces and types
            url /////////////////// general interfaces and types
                : string /////////// general interfaces and types
            , ////////// general interfaces and types
            options // general interfaces and types
                ?: IOptions) => Promise<any>,
        store:any
        sessionActions: typeof import("./store/session")
    }
}

export interface IOptions {
    method:string,
    headers:{
        'Content-Type'?:string,
        'XSRF-Token'?:string,
    },
    body?:string
}



/////////////////////// user interfaces and types
export interface IUser {
    status:boolean|null
    errors:string[]
    user: {
        username:string|null
        id:number|null
    }
}

export interface IUserSignup {
    email:string
    username:string
    password:string
    confirmPassword:string
}

export interface IUserSecure {
    password:string
    credential:string
}

export interface IActionUser {
    type:string
    payload:IUser
}


/////////////////////// projects interfaces and types


export interface IProjects {
    id:number
    screenShot:string|undefined
    title:string|null
    summary:string|null
    imgAlt:string|null
    creatorName:string|null
    percentFunded:number
    pageNums:number
    bookmarked:boolean
}

export interface IBookmark {
    projectId:number
    bool:boolean
}

export interface IActionProjects {
    type:string
    payload:IProjects[]
}


export interface IActionBookmark {
    type:string,
}



/////////////////////// project interfaces and types

export interface ISupportTier {
    id:number
    amount:number
    name:string|null
    summary:string|null
    shipsTo:string|null
    backers:number|null
    amountLeft:number|null
    estimatedDelivery:string|null
} 

export interface IProject {
    id:number
    goal:number|null
    screenShot:string|undefined
    imgAlt:string|null
    videoSrc:string|undefined
    title:string|null
    summary:string|null
    creatorName:string|null
    fundsCollected:number|null
    percentFunded:number
    numOfBackers:number
    supportTiers:ISupportTier[]
    daysToGo:number
    bookmarked:boolean
}

export interface IActionProject {
    type:string
    payload:IProject
}


/////////////////////// contributions interfaces and types

export interface IReceipt {
    amountPledged:number|null
    nameOfTier:string|null
    summaryOfTier:string|null
    etaDelivery:string|null
    shipsTo:string|null
}

export interface IContribution {
    receiptTile:IReceipt
    projectTile:IProjects
}

export interface IActionContribution {
    type:string
    payload:IContribution[]
}