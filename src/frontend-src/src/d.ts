export interface IOptions {
    method:string,
    headers:{
        'Content-Type'?:string,
        'XSRF-Token'?:string,
    },
    body?:string
}

export interface IUser {
    username:string|null,
    id:number|null
    errors:string[]
}

export interface IUserSecure {
    username:string,
    password:string,
    confirmPassword?:string
}

export interface IAction {
    type:string,
    payload:any,
}

declare global {
    interface Window { 
        csrfFetch:any,
        store:any,
        sessionActions:any
    }
}
