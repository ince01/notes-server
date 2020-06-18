import { validationResult } from 'express-validator';

import { Users } from '../../db';

export default {
  signUp: async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        next(res.failure({ errors: errors.array(), message: 'Sign up failure' }));
        return;
      }

      const { email, password, fullName, gender, dateOfBirth, avatar } = req.body;

      const user = await Users.create({
        email,
        password,
        fullName,
        gender,
        dateOfBirth,
        avatar,
      });

      res.success({ data: user, message: 'Sign up success' });
    } catch (err) {
      next(err);
    }
  },

  signIn: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email });

      if (!user) {
        next(res.failure({ message: 'User Not Found', code: 'USER_NOT_FOUND' }));
        return;
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        next(res.failure({ message: 'Invaild email or password', code: 'INVAILD_IDENTIFIER' }));
        return;
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
