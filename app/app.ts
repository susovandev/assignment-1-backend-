import express from 'express';
import type { Application, Request, Response } from 'express';

const app: Application = express();

// Morgan middleware
import morgan from './config/morgan.config';
app.use(morgan);

//Body-Parser middlewares
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Default route
app.get('/', (req, res) => {
	return res.status(200).json({
		statusCode: 200,
		status: true,
		message: 'OK',
	});
});

// import routes
import productRoutes from './routes/product.routes';
import routeNotFoundHandler from './middlewares/notFound.middleware';
import globalErrorHandler from './middlewares/error.middleware';
app.use('/api/v1/products', productRoutes);

// Route not found Handler middleware
app.use(routeNotFoundHandler);

// Global error handler middleware
app.use(globalErrorHandler);
export default app;
