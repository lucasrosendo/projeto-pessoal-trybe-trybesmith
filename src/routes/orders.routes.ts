import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import tokenValidation from '../middlewares/token.validation';
import validateProductId from '../middlewares/order.productsIds.validation';

const router = Router();
const ordersController = new OrdersController();

router.get('/', ordersController.getAll);
router.post(
  '/',
  tokenValidation,
  validateProductId,
  ordersController.create,
);

export default router;