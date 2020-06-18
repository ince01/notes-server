import { Schema, SchemaTypes } from 'mongoose';

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
      enum: ['male', 'female', 'other'],
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
      default: 'INACTIVE',
    },
  },
  {
    timestamps: true,
  },
);

export default userSchema;
