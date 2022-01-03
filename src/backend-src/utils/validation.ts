// packages
import {
    Request,
    Response, 
    NextFunction
} from 'express';
import { ExpError } from '../types/d';

const { check } = require('express-validator');

const { validationResult } = require('express-validator');

const { User } = require('../db/models');

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
  check('username')
  .custom(async (username:string, _checkVal:any) => {
    const user = await User.findOne({ where: { username }})
    if(user){
      throw new Error('Username already in use.')
    }
  }),
  check('email')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a email with at least 4 characters.'),
  check('email')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Please provide a email with less than 51 characters.'),
  check('email')
  .custom(async (email:string, _checkVal:any) => {
    const user = await User.findOne({ where: { email }})
    if(user){
      throw new Error('Email already in use.')
    }
  }),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('confirmPassword')
    .trim() // removes trailing spaces
    // Validate confirmPassword
    .custom(async (confirmPassword:string, checkVal:any) => {
      const password = checkVal.req.body.password
      if(password !== confirmPassword){
        throw new Error('Password and Confirm Password must match')
      }
    }),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup
};