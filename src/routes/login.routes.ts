import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import validateLogin from '../middlewares/login.validation';

const router = Router();

const loginController = new LoginController();

router.post(
  '/',
  validateLogin,
  loginController.create,
);

export default router;