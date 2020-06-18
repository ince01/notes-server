import passport from 'passport';
import CreateError from 'http-errors';
import httpStatus from 'http-status';

const requireAuth = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) {
      throw error;
    }
    // Authentication error
    if (!user) {
      if (info.name === 'TokenExpiredError') {
        throw new CreateError(httpStatus.UNAUTHORIZED, {
          message: 'Token exprired',
          code: 'TOKEN_EXPIRED',
        });
      }
      throw new CreateError(httpStatus.UNAUTHORIZED, {
        message: 'Invaild token',
        code: 'INVAILD_TOKEN',
      });
    }

    // Blind user to req object
    req.user = user; // Blind user to req object

    return next();
  })(req, res, next);

export default requireAuth;
