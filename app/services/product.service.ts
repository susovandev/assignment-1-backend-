import productModel, { IProductDocument } from '../model/product.model';
import { InternalServerException } from '../utils/apiError.util';
import Logger from '../utils/logger.util';
class ProductService {
	async create(input: Omit<IProductDocument, 'createdAt' | 'updatedAt'>) {
		try {
			Logger.info(
				`[ProductService] Create product request received with input: ${JSON.stringify(input)}`,
			);

			const newProduct = await productModel.create(input);
			if (!newProduct) {
				throw new InternalServerException('product creation failed');
			}

			return newProduct;
		} catch (error) {
			Logger.warn('[ProductService] Error creating product', error);
			throw error;
		}
	}
}

export default new ProductService();
