import express from 'express';
import { loginPageController, loginActionController,logoutActionController } from '../controllers/auth-controllers.js';


export const authRouter = express.Router();


authRouter.get('/login',loginPageController);
authRouter.post ('/login',loginActionController);

authRouter.get('/logout', logoutActionController);