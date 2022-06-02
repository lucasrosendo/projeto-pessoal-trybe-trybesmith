import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { validateUserName,
  validateClasse,
  validateLevel,
  validatePassword } from '../middlewares/user.validation';

const router = Router();

const usersController = new UsersController();

router.post(
  '/',
  validateUserName,
  validateClasse,
  validateLevel,
  validatePassword,
  usersController.create,
);

export default router;