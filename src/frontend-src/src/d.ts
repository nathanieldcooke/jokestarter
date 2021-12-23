export interface IOptions {
    method:string,
    headers:{
        'Content-Type'?:string,
        'XSRF-Token'?:string,
    },
    body?:string
}

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

declare global {
    interface Window { 
        csrfFetch:any,
        store:any,
        sessionActions:any
    }
}
