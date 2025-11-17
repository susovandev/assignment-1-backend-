import productModel, { IProductDocument } from '../model/product.model';
import { InternalServerException, NotFoundException } from '../utils/apiError.util';
import Logger from '../utils/logger.util';

interface queryParams {
	page: number;
	limit: number;
	name: string;
	category: string;
	price: number;
}
class ProductService {
	async findAll(queryParam: Partial<queryParams>) {
		try {
			Logger.info(`[ProductService] Fetch products request received`);
			const page = Number(queryParam.page) || 0;
			const limit = Number(queryParam.limit) || 10;
			const skip = page * limit;

			const { name, category, price } = queryParam;

			type ProductFilters = {
				name: { $regex: string; $options: string };
				category: { $regex: string; $options: string };
				price: { $lte: number };
			};

			const filters: Partial<ProductFilters> = {};

			if (name) {
				filters.name = { $regex: name, $options: 'i' };
			}

			if (category) {
				filters.category = { $regex: category, $options: 'i' };
			}

			if (price) {
				filters.price = { $lte: Number(price) };
			}

			console.log(filters);

			const [products, totalProducts] = await Promise.all([
				productModel
					.find({ ...filters })
					.sort({ createdAt: -1 })
					.skip(skip)
					.limit(Number(limit)),
				productModel.countDocuments({ ...filters }),
			]);

			if (!products.length) {
				throw new NotFoundException('No products found with this given query');
			}

			const response = {
				pagination: {
					currentPage: page,
					limit,
					totalProducts,
					totalPages: Math.ceil(totalProducts / limit),
					hasNextPage: (page + 1) * limit < totalProducts,
					hasPrevPage: page > 0,
				},
				products,
			};

			return response;
		} catch (error) {
			Logger.warn('[ProductService] Error fetching products', error);
			throw error;
		}
	}
	async findById(productId: string) {
		try {
			Logger.info(`[ProductService] Find product request received with id: ${productId}`);

			const product = await productModel.findById(productId).lean();
			if (!product) {
				throw new NotFoundException('product not found for given ID');
			}

			return product;
		} catch (error) {
			Logger.warn('[ProductService] Error finding product', error);
			throw error;
		}
	}
	async create(productData: Omit<IProductDocument, 'createdAt' | 'updatedAt'>) {
		try {
			Logger.info(
				`[ProductService] Create product request received with input: ${JSON.stringify(productData)}`,
			);

			const newProduct = await productModel.create(productData);
			if (!newProduct) {
				throw new InternalServerException('product creation failed');
			}

			return newProduct;
		} catch (error) {
			Logger.warn('[ProductService] Error creating product', error);
			throw error;
		}
	}
	async update(
		productId: string,
		productData: Partial<Omit<IProductDocument, 'createdAt' | 'updatedAt'>>,
	) {
		try {
			Logger.info(
				`[ProductController] update product request received with id: ${productId} and input: ${JSON.stringify(productData)}`,
			);

			const updatedProduct = await productModel.findByIdAndUpdate(productId, productData, {
				new: true,
			});
			if (!updatedProduct) {
				throw new NotFoundException('product not found for given ID');
			}

			return updatedProduct;
		} catch (error) {
			Logger.warn('[ProductService] Error updating product', error);
			throw error;
		}
	}
	async delete(productId: string) {
		try {
			Logger.info(`[ProductService] Delete product request received with id: ${productId}`);

			const deletedProduct = await productModel.findByIdAndDelete(productId);
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
