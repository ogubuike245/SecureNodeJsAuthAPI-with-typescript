import express from 'express';
import controller from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.get('/', controller.handShake);
authRouter.post('/register', controller.userRegistration);
authRouter.post('/verify/email', controller.userVerification);
authRouter.post('/login', controller.userAuthentication);
authRouter.get('/logout', controller.userLogout);

export = authRouter;
