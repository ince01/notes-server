import CreateError from 'http-errors';
import httpStatus from 'http-status';
import models from '../models';

const { Users } = models;

export default {
  signUp: async (req, res, next) => {
    const { email, password, fullName, gender, dateOfBirth, avatar } = req.body;

    try {
      const user = await Users.create({
        email,
        password,
        fullName,
        gender,
        dateOfBirth,
        avatar,
      });

      res.success({ data: user, message: 'Sign up successfully' });
    } catch (err) {
      next(err);
    }
  },

  signIn: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email });

      if (!user) {
        next(CreateError(httpStatus.BAD_REQUEST, { message: 'User Not Found', code: 'USER_NOT_FOUND' }));
        return;
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        next(CreateError(400, { message: 'Invaild email or password', code: 'INVAILD_IDENTIFIER' }));
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
