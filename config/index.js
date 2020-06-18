export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-db',
  JWT_SECRET: process.env.JWT_SECRET || 'jwtsecrect',
  AUTH_HEADER_PREFIX: process.env.AUTH_HEADER_PREFIX || 'jwt',
};
