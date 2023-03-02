import dotenv from 'dotenv';
dotenv.config();

const handleError = (err, req, res, next) => {
    console.error(err);

    // Check if the error has a status code, otherwise default to 500
    const statusCode = err.statusCode || 500;

    // Create an error response object
    const errorResponse = {
        error: 'Internal Server Error',
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // Only include stack trace in non-production environments
    };

    // Send the error response
    res.status(statusCode).json(errorResponse);
};

export { handleError };
