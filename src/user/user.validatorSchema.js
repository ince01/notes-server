import { GENDER } from '../../constants/user';

export default {
  signUpSchema: {
    email: {
      isEmail: false,
      normalizeEmail: true,
    },
    password: {
      isLength: {
        errorMessage: 'Password should be at least 6 chars long',
        options: { min: 6 },
      },
    },
    fullName: {
      trim: true,
    },
    gender: {
      isIn: {
        errorMessage: 'Gender must be one in MALE, FEMALE of OTHER',
        options: GENDER,
      },
    },
    dateOfBirth: {
      optional: true,
      isISO8601: true,
    },
    avatar: {
      optional: true,
      isURL: true,
    },
  },
};
