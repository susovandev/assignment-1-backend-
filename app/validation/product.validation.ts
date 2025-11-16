import Joi from 'joi';

export const createProductValidationSchema = Joi.object().keys({
	name: Joi.string().required().min(3).max(50),
	description: Joi.string().optional().min(10).max(200),
	price: Joi.number().required().positive().precision(2),
	category: Joi.string().required().min(3).max(50),
});
