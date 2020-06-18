export default {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ute-exchange',
  JWT_SECRET: process.env.JWT_SECRET || 'jwtsecrect',
  AUTH_HEADER_PREFIX: process.env.AUTH_HEADER_PREFIX || 'jwt',
};
