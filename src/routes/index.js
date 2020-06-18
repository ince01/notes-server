import { Router } from 'express';
import userRouter from './users';

const router = Router();

router.use('/user', userRouter);

export default router;
