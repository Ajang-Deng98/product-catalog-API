/**
 * Async Error Handler Wrapper
 * Catches async errors and passes them to the error handling middleware
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
