import { Strategy, ExtractJwt } from 'passport-jwt';
import config from './index';
import models from '../src/models';

const { Users } = models;

const passportConfig = passport => {
  const params = {
    secretOrKey: config.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(config.AUTH_HEADER_PREFIX),
  };

  passport.use(
    new Strategy(params, async (payload, done) => {
      try {
        const user = await Users.findById(payload.id);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findById(id);
      return done(null, user);
    } catch (err) {
      return done(null, false);
    }
  });
};

export default passportConfig;
