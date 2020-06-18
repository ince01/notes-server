import { Router } from 'express';
import userRouter from './user/user.route';

const router = Router();

router.use('/user', userRouter);

export default router;
