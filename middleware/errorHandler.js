import CreateError, { HttpError } from 'http-errors';
import httpStatus from 'http-status';
import debug from 'debug';

import config from '../config';

const debugError = debug('errorHandler');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;
  if (config.NODE_ENV === 'production') {
    error = err instanceof HttpError ? err : new CreateError.InternalServerError();
    delete error.name;
  }

  // Log error if needed
  debugError(err.message, err.stack);

  return res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    name: error.name,
    code: error.code || httpStatus['500_NAME'],
    message: error.message || httpStatus['500'],
    errors: error.errors,
  });
};

export default errorHandler;
