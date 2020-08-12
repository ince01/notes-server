import passport from 'passport';
import CreateError from 'http-errors';
import httpStatus from 'http-status';

import { INVAILD_TOKEN, TOKEN_EXPIRED } from '../constants/errorCode';

const requireAuthentication = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    try {
      if (error) {
        throw error;
      }
      // Authentication error
      if (!user) {
        if (info && info.name === 'TokenExpiredError') {
          throw new CreateError(httpStatus.UNAUTHORIZED, {
            message: 'Token exprired',
            code: TOKEN_EXPIRED,
          });
        }

        throw new CreateError(httpStatus.UNAUTHORIZED, {
          message: 'Invaild token',
          code: INVAILD_TOKEN,
        });
      }
      // Blind user to req object
      req.user = user;

      return next();
    } catch (err) {
      return next(err);
    }
  })(req, res, next);

export default requireAuthentication;
