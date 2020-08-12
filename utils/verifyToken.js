import jwt from 'jsonwebtoken';

import config from '../config';

const verifyToken = (token, secretOrKey = config.JWT_SECRET) => {
  try {
    const decoded = jwt.verify(token, secretOrKey);
    return decoded;
  } catch (err) {
    return {};
  }
};

export default verifyToken;
