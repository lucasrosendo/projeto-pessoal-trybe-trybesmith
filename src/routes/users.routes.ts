import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import validateUserName from '../middlewares/user.username.validation';
import validateClasse from '../middlewares/user.classe.validation';
import validateLevel from '../middlewares/user.level.validation';
import validatePassword from '../middlewares/user.password.validation';

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