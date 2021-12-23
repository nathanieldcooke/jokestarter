"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var custom_types_1 = require("../custom-types");
var validationResult = require('express-validator').validationResult;
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
var handleValidationErrors = function (req, _res, next) {
    var validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        var errors = validationErrors
            .array()
            .map(function (error) { return "".concat(error.msg); });
        var err = new custom_types_1.ExpError('Bad request.');
        err.errors = errors;
        err.status = 401;
        err.title = 'Bad request.';
        next(err);
    }
    next();
};
module.exports = {
    handleValidationErrors: handleValidationErrors
};
