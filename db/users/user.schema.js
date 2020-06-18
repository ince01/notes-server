import { Schema, SchemaTypes } from 'mongoose';

import { GENDER, STATUS, INACTIVE_STATUS } from '../../constants/user';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      enum: GENDER,
    },
    dateOfBirth: {
      type: SchemaTypes.Date,
    },
    avatar: {
      type: String,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: STATUS,
      default: INACTIVE_STATUS,
    },
  },
  {
    timestamps: true,
  },
);

export default userSchema;
