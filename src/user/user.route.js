import { Router } from 'express';

import { requireAuthentication } from '../../middleware';
import { signUpValidator } from './user.validator';
import controllers from './user.controller';

const router = Router();

router.post('/signUp', signUpValidator, controllers.signUp);
router.post('/signIn', controllers.signIn);
router.get('/me', requireAuthentication, controllers.getCurrentUserByToken);

export default router;
