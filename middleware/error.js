import { config } from "../config.js";

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (error, req, res, next) => {
    error.message = error.message || config.errorMessage;
    error.statusCode = error.statusCode || config.statusCode;
    return res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};

export default ErrorHandler;
