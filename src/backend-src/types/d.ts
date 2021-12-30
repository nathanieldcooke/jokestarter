// extend errors

export class ExpError extends Error {
    title:string|undefined;
    errors:string[]|undefined;
    status:number|undefined;

    constructor(message:string) {
        super(message);
        this.title = undefined;
        this.errors = undefined;
        this.status = undefined;
    }
}

///////////////////// users

export interface IUserSecure {
    credential:string,
    password:string
}

export interface IUserSignUp {
    email:string,
    username:string,
    password:string
}

export interface IUser {
    email:string,
    username:string,
    id:number,
    errors:string[]
}

export interface IUsersToTiersProject {
    userId:number
    supportTierId:number
    pledgeAmount:number
}

///////////////////// projects

export interface ISupportTier1 {
    projectId:number
    name:string|undefined
    summary:string
    estimatedDelivery:Date
    shipsTo:string
    amountAvailable:number
    minPledge:number
}

export interface ISupportTier2 {
    id:number
    amount:number
    name:string|undefined
    summary:string
    shipsTo:string
    backers:number
    amountLeft:number
    estimatedDelivery:string
}

export interface IProjects {
    id:number
    screenShot:string
    title:string
    summary:string
    creatorName:string
    percentFunded:number
    pageNums:number
    bookmarked:boolean
}

export interface IReciept {
    amountPledged:number
    nameOfTier:string
    summaryOfTier:string
    etaDelivery:string
    shipsTo:string
}
