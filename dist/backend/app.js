"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// packages
var express_1 = __importDefault(require("express"));
var morgan = require('morgan');
var cors = require('cors');
var csurf = require('csurf');
var cookieParsee = require('cookie-parser');
var helmet = require('helmet');
var ValidationError = require('sequelize').ValidationError;
// internal 
var environment = require('./config').environment;
var routes = require('./routes');
var custom_types_1 = require("./custom-types");
var isProduction = environment === 'production';
var app = (0, express_1.default)();
app.use(morgan('dev'));
app.use(cookieParsee());
app.use(express_1.default.json());
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
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
}));
app.use(routes);
// Catch unhandled requests and forward to error handler.
app.use(function (_req, _res, next) {
    var err = new custom_types_1.ExpError("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});
// Process sequelize errors
app.use(function (err, _req, _res, next) {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        err.errors = err.errors.map(function (e) { return e.message; });
        err.title = 'Validation error';
    }
    next(err);
});
// Error formatter
app.use(function (err, _req, res, _next) {
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
