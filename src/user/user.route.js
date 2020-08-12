import { Router } from 'express';

import { requireAuthentication, validator } from '../../middleware';
import validatorSchema from './user.validatorSchema';
import controllers from './user.controller';

const router = Router();

router.post('/signUp', validator(validatorSchema.signUpSchema), controllers.signUp);
router.post('/signIn', controllers.signIn);
router.get('/me', requireAuthentication, controllers.getCurrentUserByToken);

export default router;
