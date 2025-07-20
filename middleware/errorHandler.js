/**
 * Enhanced Error Handler Middleware
 * Provides comprehensive error handling with proper logging and response formatting
 */

const { HTTP_STATUS, MESSAGES } = require('../utils/constants');
const { sendErrorResponse } = require('../utils/responseHelper');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error details
  logger.error('Error occurred', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error.message = MESSAGES.ERROR.INVALID_ID;
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    error.message = `Duplicate ${field}: ${value}`;
    error.statusCode = HTTP_STATUS.CONFLICT;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message,
      value: val.value
    }));
    error.message = MESSAGES.ERROR.VALIDATION_ERROR;
    error.statusCode = HTTP_STATUS.BAD_REQUEST;
    error.details = errors;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }

  // Custom AppError
  if (err instanceof AppError) {
    return sendErrorResponse(
      res,
      err.statusCode,
      err.message,
      err.details
    );
  }

  // Default error response
  sendErrorResponse(
    res,
    error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    error.message || MESSAGES.ERROR.SERVER_ERROR,
    error.details
  );
};

module.exports = errorHandler;