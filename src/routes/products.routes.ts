import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import { validateProductAmount, validateProductName } from '../middlewares/product.validation';

const router = Router();

const productsController = new ProductsController();

router.get('/', productsController.getAll);
router.post('/', validateProductName, validateProductAmount, productsController.create);

export default router;