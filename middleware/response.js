import CreateError from 'http-errors';
import httpStatus from 'http-status';

export default function response(req, res, next) {
  try {
    if (req.method.toUpperCase() === 'OPTIONS') {
      res.end();
    }

    res.success = (data, statusCode = httpStatus.OK) => res.status(statusCode).json(data);

    res.failure = (data, statusCode = httpStatus.BAD_REQUEST) =>
      CreateError(statusCode, {
        message: httpStatus['400'],
        code: httpStatus['400_NAME'],
        ...data,
      });

    next();
  } catch (err) {
    next(CreateError(httpStatus.INTERNAL_SERVER_ERROR, err));
  }
}
