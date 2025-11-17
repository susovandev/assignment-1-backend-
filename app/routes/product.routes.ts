import { Router } from 'express';
import productController from '../controller/product.controller';
import validateRequest from '../middlewares/validation.middleware';
import {
	createProductValidationSchema,
	queryParamsValidationSchema,
	updateProductValidationSchema,
	validateId,
} from '../validation/product.validation';

const router = Router();

router
	.route('/')
	.get(
		validateRequest(queryParamsValidationSchema, 'query'),
		productController.fetchProductsHandler,
	);
router
	.route('/:id')
	.get(validateRequest(validateId, 'params'), productController.fetchProductHandler);
router
	.route('/')
	.post(validateRequest(createProductValidationSchema), productController.createProductHandler);

router
	.route('/:id')
	.patch(
		validateRequest(validateId, 'params'),
		validateRequest(updateProductValidationSchema),
		productController.updateProductHandler,
	);

router
	.route('/:id')
	.delete(validateRequest(validateId, 'params'), productController.deleteProductHandler);

export default router;
