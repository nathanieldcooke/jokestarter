/////////////////////// general interfaces and types
declare global {
    interface Window { 
        csrfFetch:any,
        store:any,
        sessionActions:any
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

export interface IReciept {
    amountPledged:number|null
    nameOfTier:string|null
    summaryOfTier:string|null
    etaDelivery:string|null
    shipsTo:string|null
}

export interface IContribution {
    recieptTile:IReciept
    projectTile:IProjects
}

export interface IActionContribution {
    type:string
    payload:IContribution[]
}