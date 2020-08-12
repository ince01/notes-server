import debug from 'debug';

import { Users } from '../../db';

const debugUser = debug('module:user');

export default {
  signUp: async (req, res, next) => {
    const { email, password, fullName, gender, dateOfBirth, avatar } = req.body;

    try {
      const isExist = await Users.exists({ email });

      debugUser('User already exist: ', isExist);

      if (isExist) {
        throw res.failure({ message: 'Email already exists', code: 'EMAIL_ALREADY_EXIST' });
      }

      const user = await Users.create({
        email,
        password,
        fullName,
        gender,
        dateOfBirth,
        avatar,
      });

      res.success({ message: 'Sign up success', data: user });
    } catch (err) {
      next(err);
    }
  },

  signIn: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email });

      if (!user) {
        throw res.failure({ message: 'User Not Found', code: 'USER_NOT_FOUND' });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw res.failure({ message: 'Invaild email or password', code: 'INVAILD_IDENTIFIER' });
      }

      const token = user.generateToken();

      res.success({ ...user.toJSON(), token });
    } catch (err) {
      next(err);
    }
  },

  getCurrentUserByToken: async (req, res, next) => {
    const currentUser = req.user;

    try {
      res.success(currentUser);
    } catch (err) {
      next(err);
    }
  },
};
