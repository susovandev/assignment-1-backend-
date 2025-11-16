import mongoose from 'mongoose';
import Logger from '../utils/logger.util';
import envConfig from '../config/env.config';

const connectDB = async () => {
	try {
		const connectionInstance = await mongoose.connect(envConfig.DB.URI);
		Logger.info(`MongoDB connected: ${connectionInstance.connection.host}`);
	} catch (error) {
		Logger.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
};

export default connectDB;
