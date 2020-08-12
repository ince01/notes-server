import { AuthenticationError, UserInputError } from 'apollo-server-express';
import debug from 'debug';

import config from '../../config';

const debugUser = debug('module:user');

export default {
  Query: {
    me: (parent, args, { user }) => {
      return user;
    },
  },
  Mutation: {
    signIn: async (parent, { email, password }, { db, res }) => {
      const user = await db.Users.findOne({ email });
      debugUser('user: ', user);

      if (!user) {
        throw new UserInputError('No user found with this login credentials.', { code: 'USER_NOT_FOUND' });
      }

      const isMatch = await user.comparePassword(password);
      debugUser('isMatch: ', isMatch);

      if (!isMatch) {
        throw new AuthenticationError('Invaild email or password.', { code: 'INVAILD_IDENTIFIER' });
      }

      const token = user.generateToken();

      res.cookie('token', `${config.AUTH_HEADER_PREFIX} ${token}`, {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        signed: true,
      });

      return { token };
    },
    signUp: async (parent, args, { db, res }) => {
      const { email } = args.input;

      const isExist = await db.Users.exists({ email });
      debugUser('User already exist: ', isExist);

      if (isExist) {
        throw new UserInputError('Account already exists', { code: 'ACCOUNT_ALREADY_EXIST' });
      }

      const registeredUser = await db.Users.create(args.input);

      const token = registeredUser.generateToken();

      res.cookie('token', `${config.AUTH_HEADER_PREFIX} ${token}`, {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        signed: true,
      });

      return { token };
    },
  },
};
