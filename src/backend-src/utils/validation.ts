// packages
import {
    Request,
    Response, 
    NextFunction
} from 'express';
import { ExpError } from '../custom-types';
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req: Request, _res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error: any) => `${error.msg}`);

    const err = new ExpError('Bad request.');
    err.errors = errors;
    err.status = 401;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};