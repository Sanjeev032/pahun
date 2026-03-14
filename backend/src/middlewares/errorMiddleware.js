import { errorResponse } from '../utils/responseFormatter.js';

/**
 * Middleware to handle 404 Not Found
 */
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Log error for developers in dev mode
    if (process.env.NODE_ENV !== 'production') {
        console.error('API Error:', err);
    }

    res.status(statusCode).json(
        errorResponse(
            err.message,
            process.env.NODE_ENV === 'production' ? null : { stack: err.stack }
        )
    );
};
