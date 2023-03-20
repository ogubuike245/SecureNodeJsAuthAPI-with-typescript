import express from 'express';
import controller from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', controller.handShake);
userRouter.post('/register', controller.userProfile);

export = userRouter;
