import { Router } from 'express';
import productController from '../controller/product.controller';
import validateRequest from '../middlewares/validation.middleware';
import {
	createProductValidationSchema,
	updateProductValidationSchema,
} from '../validation/product.validation';

const router = Router();

router.route('/:id').get(productController.fetchProductHandler);
router
	.route('/')
	.post(validateRequest(createProductValidationSchema), productController.createProductHandler);

router
	.route('/:id')
	.patch(validateRequest(updateProductValidationSchema), productController.updateProductHandler);

export default router;
