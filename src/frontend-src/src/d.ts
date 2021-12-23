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
