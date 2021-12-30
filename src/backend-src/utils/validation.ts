// packages
import {
    Request,
    Response, 
    NextFunction
} from 'express';
import { ExpError } from '../types/d';

const { check } = require('express-validator');

const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
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

//////////////////////////route: users

const validateLogin =[
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid username or email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

const validateSignup = [
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Please provide a username with less than 51 characters.'),
  check('email')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a email with at least 4 characters.'),
  check('email')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Please provide a email with less than 51 characters.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup
};