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

export interface IUsersToTiersProject {
    userId:number
    supportTierId:number
    pledgeAmount:number
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