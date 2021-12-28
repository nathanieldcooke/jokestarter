// packages
import express, {
    Application, 
    Request,
    Response, 
    NextFunction
} from 'express';
import { ExpError } from '../../custom-types';
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const bookmarksRouter = require('./users-bookmarks-contributions-routes/bookmarks')
const hideprojectsRouter = require('./users-bookmarks-contributions-routes/hideprojects')
const contributionsRouter = require('./users-bookmarks-contributions-routes/contributions')

const router = express.Router();

const validateLogin = [
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

router.use('/:userId/Bookmarks', bookmarksRouter)
router.use('/:userId/hide-project', hideprojectsRouter)
router.use('/:userId/contributions', contributionsRouter)

// Sign up
router.post(
    '/signup',
    validateSignup,
    asyncHandler(async (req: Request, res: Response) => {
      const { password, username, email } = req.body;
      const user = await User.signup({username, email, password });
  
      await setTokenCookie(res, user);
  
      return res.json({
        status: true,
        errors: [],
        user: user.toSafeObject()
      });
    })
  );

// Log in
router.put(
    '/login',
    validateLogin,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const { credential, password } = req.body;
  
      const user = await User.login({ credential, password });
  
      if (!user) {
        const err = new ExpError('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      };
  
      await setTokenCookie(res, user);
      return res.json({
        status: true,
        errors: [],
        user: user.toSafeObject()
      });
    })
  );

// Demo Log in
router.put(
  '/demo',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // const { credential, password } = req.body;

    const user = await User.login({ credential: 'demo@user.com', password: 'password' });

    if (!user) {
      const err = new ExpError('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    };

    await setTokenCookie(res, user);
    return res.json({
      status: true,
      errors: [],
      user: user.toSafeObject()
    });
  })
);

  // Log out
  router.put('/logout',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({
        status: true,
        errors: [],
        user: { id: null, 
          username: null
        }
      });
    }
  );

// Restore session user
router.get(
    '/profile',
    restoreUser,
    (req, res) => {
      const { user }: typeof User = req
      if (user) {
        return res.json({
          status: true,
          errors: [],
          user: user.toSafeObject()
        });
      } else return res.json({
        status: true,
        errors: [],
        user: { id: null, 
          username: null
        }
      });
    }
  );

module.exports = router;