// packages
import express, {
    Request,
    Response, 
    NextFunction
} from 'express';
import { ExpError } from '../../types/d';

const {validateLogin, validateSignup} = require('../../utils/validation');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { generateDemoUser } = require('../../utils/routeDataAggregators')

const bookmarksRouter = require('./users-bookmarks-contributions-hide-routes/bookmarks');
const hideprojectsRouter = require('./users-bookmarks-contributions-hide-routes/hideprojects');
const contributionsRouter = require('./users-bookmarks-contributions-hide-routes/contributions');

const router = express.Router();

router.use('/:userId/bookmarks', bookmarksRouter);
router.use('/:userId/hide-project', hideprojectsRouter);
router.use('/:userId/contributions', contributionsRouter);

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
    const user = await generateDemoUser();

    await setTokenCookie(res, user);
    return res.json({
      status: true,
      errors: [],
      user: user.toSafeObject()
    });
  })
);

// Log out
router.put(
  '/logout',
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