import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../utils/apiError.util';

const routeNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	next(new NotFoundException(`Route ${req.originalUrl} not found on this server`));
};

export default routeNotFoundHandler;
