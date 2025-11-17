import Joi from 'joi';
import mongoose from 'mongoose';

export const createProductValidationSchema = Joi.object().keys({
	name: Joi.string().required().min(3).max(50),
	description: Joi.string().optional().min(10).max(200),
	price: Joi.number().required().positive().precision(2),
	category: Joi.string().required().min(3).max(50),
});

export const updateProductValidationSchema = Joi.object().keys({
	name: Joi.string().optional().min(3).max(50),
	description: Joi.string().optional().min(10).max(200),
	price: Joi.number().optional().positive().precision(2),
	category: Joi.string().optional().min(3).max(50),
});

export const queryParamsValidationSchema = Joi.object().keys({
	page: Joi.number().integer().positive().optional().default(1),
	limit: Joi.number().integer().positive().optional().default(10),
	name: Joi.string().optional().min(3).max(50),
	category: Joi.string().optional().min(3).max(50),
	price: Joi.number().optional().positive().precision(2),
});

export const validateId = Joi.object({
	id: Joi.string()
		.required()
		.custom((value, helpers) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				return helpers.error('any.invalid');
			}
			return value;
		}, 'ObjectId validation')
		.messages({
			'any.invalid': 'Invalid Product ID. Must be a valid MongoDB ObjectId.',
			'any.required': 'Product ID is required.',
		}),
});
