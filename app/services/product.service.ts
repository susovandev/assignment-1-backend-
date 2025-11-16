import productModel, { IProductDocument } from '../model/product.model';
import { InternalServerException, NotFoundException } from '../utils/apiError.util';
import Logger from '../utils/logger.util';
class ProductService {
	async findAll() {
		try {
			Logger.info(`[ProductService] Fetch products request received`);

			const products = await productModel.find({}).sort({ createdAt: -1 }).lean();
			return products;
		} catch (error) {
			Logger.warn('[ProductService] Error fetching products', error);
			throw error;
		}
	}
	async findById(id: string) {
		try {
			Logger.info(`[ProductService] Find product request received with id: ${id}`);

			const product = await productModel.findById(id).lean();
			if (!product) {
				throw new NotFoundException('product not found for given ID');
			}

			return product;
		} catch (error) {
			Logger.warn('[ProductService] Error finding product', error);
			throw error;
		}
	}
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

	async update(id: string, input: Partial<Omit<IProductDocument, 'createdAt' | 'updatedAt'>>) {
		try {
			Logger.info(
				`[ProductController] update product request received with id: ${id} and input: ${JSON.stringify(input)}`,
			);

			const updatedProduct = await productModel.findByIdAndUpdate(id, input, { new: true });
			if (!updatedProduct) {
				throw new NotFoundException('product not found for given ID');
			}

			return updatedProduct;
		} catch (error) {
			Logger.warn('[ProductService] Error updating product', error);
			throw error;
		}
	}

	async delete(id: string) {
		try {
			Logger.info(`[ProductService] Delete product request received with id: ${id}`);

			const deletedProduct = await productModel.findByIdAndDelete(id);
			if (!deletedProduct) {
				throw new NotFoundException('product not found for given ID');
			}

			return deletedProduct;
		} catch (error) {
			Logger.warn('[ProductService] Error deleting product', error);
			throw error;
		}
	}
}

export default new ProductService();
