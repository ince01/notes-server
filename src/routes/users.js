import { Router } from 'express';

import { requireAuth } from '../../middleware';
import controllers from '../controllers/users';

const router = Router();

router.post('/signUp', controllers.signUp);
router.post('/signIn', controllers.signIn);
router.get('/me', requireAuth, controllers.getCurrentUserByToken);

export default router;
