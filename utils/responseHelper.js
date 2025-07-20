/**
 * Response Utility Functions
 * Standardizes API response format across the application
 */

const { HTTP_STATUS } = require('./constants');

/**
 * Sends a standardized success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {Object} data - Response data
 * @param {Object} meta - Additional metadata (pagination, etc.)
 */
const sendSuccessResponse = (res, statusCode = HTTP_STATUS.OK, message = 'Success', data = null, meta = null) => {
  const response = {
    success: true,
    message,
    ...(data && { data }),
    ...(meta && { meta })
  };

  res.status(statusCode).json(response);
};

/**
 * Sends a standardized error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Array} errors - Array of detailed errors
 */
const sendErrorResponse = (res, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, message = 'An error occurred', errors = null) => {
  const response = {
    success: false,
    error: message,
    ...(errors && { errors })
  };

  res.status(statusCode).json(response);
};

/**
 * Sends paginated response with metadata
 * @param {Object} res - Express response object
 * @param {Array} data - Response data array
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} total - Total number of items
 * @param {string} message - Success message
 */
const sendPaginatedResponse = (res, data, page, limit, total, message = 'Data retrieved successfully') => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const meta = {
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit),
      hasNextPage,
      hasPrevPage,
      ...(hasNextPage && { nextPage: page + 1 }),
      ...(hasPrevPage && { prevPage: page - 1 })
    }
  };

  sendSuccessResponse(res, HTTP_STATUS.OK, message, data, meta);
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
  sendPaginatedResponse
};
