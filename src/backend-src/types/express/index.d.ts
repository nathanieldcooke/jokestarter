declare namespace Express {
    interface Request {
        user: any;
        csrfToken: any;
    }
}