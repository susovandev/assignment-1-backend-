import { Document, Schema, model } from 'mongoose';

export interface IProductDocument extends Document {
	name: string;
	description: string;
	price: number;
	category: string;
	inStock: boolean;
	createdAt: Date;
	updatedAt: Date;
}

/*
name: { type: String, required: true }, description: String,

price: { type: Number, required: true }, category: String,

inStock: { type: Boolean, default: true }, createdAt: { type: Date, default: Date.now }
*/
const productSchema = new Schema<IProductDocument>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		inStock: { type: Boolean, default: true },
	},
	{ timestamps: true },
);

const productModel = model<IProductDocument>('Product', productSchema);

export default productModel;
