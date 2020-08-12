import { validationResult, checkSchema } from 'express-validator';

export default function validator(schema) {
  return [
    checkSchema(schema),
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw res.failure({ message: 'Validation errors', errors: errors.array() });
      }

      next();
    },
  ];
}
