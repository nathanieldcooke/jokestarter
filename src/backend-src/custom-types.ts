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
    username:string,
    id:number,
    errors:string[]
}