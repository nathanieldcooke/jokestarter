// packages
import express, {
     Application, 
     Request,
     Response, 
     NextFunction
} from 'express';
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf')
const cookieParsee = require('cookie-parser');
const helmet = require('helmet');
const { ValidationError } = require('sequelize');
// internal 
const { environment } = require('./config');
const routes = require('./routes');
import { ExpError } from './custom-types';

const isProduction: boolean = environment === 'production' 

const app: Application = express();

app.use(morgan('dev'));
app.use(cookieParsee());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    // in prduction front and back end are served from same server
    app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(helmet({
    contentSecurityPolicy: false
}));
  
// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
        }
    })
);

app.use(routes);


// Catch unhandled requests and forward to error handler.
app.use((_req: Request, _res: Response, next: NextFunction) => {
    const err = new ExpError("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err: ExpError | typeof ValidationError, _req: Request, _res: Response, next: NextFunction) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      err.errors = err.errors.map((e: { message: string; }) => e.message);
      err.title = 'Validation error';
    }
    next(err);
});

// Error formatter
app.use((err: ExpError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
});

module.exports = app;