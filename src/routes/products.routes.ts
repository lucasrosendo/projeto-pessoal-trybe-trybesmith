import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import validateProductName from '../middlewares/product.name.validation';
import validateProductAmount from '../middlewares/product.amount.validation';

const router = Router();

const productsController = new ProductsController();

router.get('/', productsController.getAll);
router.post('/', validateProductName, validateProductAmount, productsController.create);

export default router;