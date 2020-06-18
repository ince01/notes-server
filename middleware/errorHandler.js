import CreateError, { HttpError } from 'http-errors';
import httpStatus from 'http-status';
import debug from 'debug';

const debugError = debug('errorHandler');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;
  if (process.env.NODE_ENV === 'production') {
    error = err instanceof HttpError ? err : new CreateError.InternalServerError();
    delete error.name;
  }

  // Log error if needed
  debugError(err);

  return res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    name: error.name,
    code: error.code || httpStatus.INTERNAL_SERVER_ERROR,
    message: error.message || httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
  });
};

export default errorHandler;
