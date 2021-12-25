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
    email:string,
    username:string,
    password:string,
    confirmPassword:string
}

export interface IUserSecure {
    password:string,
    credential:string
}

export interface IActionUser {
    type:string,
    payload:IUser,
}


/////////////////////// projects interfaces and types


export interface IProjects {
    id:number
    screenShot:string|undefined,
    title:string|null,
    summary:string|null,
    creatorName:string|null,
    percentFunded:number,
    pageNums:number,
}

export interface IActionProjects {
    type:string,
    payload:IProjects[]
}


/////////////////////// project interfaces and types

export interface ISupportTier {
    amount:number|null,
    name:string|null,
    summary:string|null,
    shipsTo:string|null,
    backers:number|null,
    amountLeft:number|null,
    estimatedDelivery:string|null,
} 

export interface IProject {
    id:number|null,
    screenShot:string|undefined,
    videoSrc:string|null,
    title:string|null,
    summary:string|null,
    creatorName:string|null,
    fundsCollected:number|null,
    percentFunded:number|null,
    supportTiers:ISupportTier[],
}

export interface IActionProject {
    type:string,
    payload:IProject
}