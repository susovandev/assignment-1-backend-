import express from 'express';
import type { Application, Request, Response } from 'express';

const app: Application = express();

// Morgan middleware
import morgan from './config/morgan.config';
app.use(morgan);

app.get('/', (req, res) => {
	return res.status(200).json({
		statusCode: 200,
		status: true,
		message: 'OK',
	});
});
export default app;
