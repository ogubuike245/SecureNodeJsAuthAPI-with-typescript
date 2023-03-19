import express from 'express';
import controller from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/register', controller.userRegistration);
userRouter.post('/verify/:id/user/:token', controller.userVerification);
userRouter.post('/login', controller.userAuthentication);
userRouter.get('/profile:id', controller.userProfile);
userRouter.get('/logout', controller.userLogout);

export = userRouter;
