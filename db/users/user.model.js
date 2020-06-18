import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import userSchema from './user.schema';
import config from '../../config';

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const hashPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashPassword;
  }
  next();
});

userSchema.method('comparePassword', async function (plaintextPassword) {
  const isMatch = await bcrypt.compare(plaintextPassword, this.password);
  return isMatch;
});

userSchema.method('generateToken', function () {
  const token = jwt.sign({ id: this._id }, config.JWT_SECRET);
  return token;
});

const Users = mongoose.model('Users', userSchema);

export default Users;
