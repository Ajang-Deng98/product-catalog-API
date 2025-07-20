/**
 * Enhanced Validation Middleware
 * Provides comprehensive input validation using express-validator with centralized rules
 */

const { body, param, query, validationResult } = require('express-validator');
const { HTTP_STATUS, VALIDATION_LIMITS, MESSAGES } = require('../utils/constants');
const { sendErrorResponse } = require('../utils/responseHelper');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value,
      location: error.location
    }));

    return sendErrorResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.ERROR.VALIDATION_ERROR,
      formattedErrors
    );
  }
  next();
};

const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: VALIDATION_LIMITS.PRODUCT_NAME_MIN, max: VALIDATION_LIMITS.PRODUCT_NAME_MAX })
    .withMessage(`Name must be ${VALIDATION_LIMITS.PRODUCT_NAME_MIN}-${VALIDATION_LIMITS.PRODUCT_NAME_MAX} characters`)
    .escape(),
  
  body('description')
    .trim()
    .isLength({ min: 1, max: VALIDATION_LIMITS.PRODUCT_DESCRIPTION_MAX })
    .withMessage(`Description must be 1-${VALIDATION_LIMITS.PRODUCT_DESCRIPTION_MAX} characters`)
    .escape(),
  
  body('category')
    .isMongoId()
    .withMessage('Valid category ID required'),
  
  body('basePrice')
    .isFloat({ min: VALIDATION_LIMITS.MIN_PRICE })
    .withMessage('Base price must be a positive number'),
  
  body('variants')
    .optional()
    .isArray()
    .withMessage('Variants must be an array'),
  
  body('variants.*.sku')
    .if(body('variants').exists())
    .notEmpty()
    .withMessage('SKU is required for variants')
    .isLength({ min: 1, max: 50 })
    .withMessage('SKU must be 1-50 characters')
    .escape(),
  
  body('variants.*.price')
    .if(body('variants').exists())
    .isFloat({ min: VALIDATION_LIMITS.MIN_PRICE })
    .withMessage('Variant price must be positive'),
  
  body('variants.*.inventory')
    .if(body('variants').exists())
    .isInt({ min: VALIDATION_LIMITS.MIN_INVENTORY })
    .withMessage('Inventory must be non-negative'),
  
  body('variants.*.discount')
    .if(body('variants').exists())
    .optional()
    .isFloat({ min: 0, max: VALIDATION_LIMITS.MAX_DISCOUNT })
    .withMessage(`Discount must be between 0 and ${VALIDATION_LIMITS.MAX_DISCOUNT}%`),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('tags.*')
    .if(body('tags').exists())
    .isString()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each tag must be 1-30 characters')
    .escape(),
  
  handleValidationErrors
];

const validateCategory = [
  body('name')
    .trim()
    .isLength({ min: VALIDATION_LIMITS.CATEGORY_NAME_MIN, max: VALIDATION_LIMITS.CATEGORY_NAME_MAX })
    .withMessage(`Name must be ${VALIDATION_LIMITS.CATEGORY_NAME_MIN}-${VALIDATION_LIMITS.CATEGORY_NAME_MAX} characters`)
    .escape(),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: VALIDATION_LIMITS.CATEGORY_DESCRIPTION_MAX })
    .withMessage(`Description cannot exceed ${VALIDATION_LIMITS.CATEGORY_DESCRIPTION_MAX} characters`)
    .escape(),
  
  handleValidationErrors
];

const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage(MESSAGES.ERROR.INVALID_ID),
  handleValidationErrors
];

const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: VALIDATION_LIMITS.MAX_PAGE_SIZE })
    .withMessage(`Limit must be between 1 and ${VALIDATION_LIMITS.MAX_PAGE_SIZE}`),
  
  handleValidationErrors
];

const validateSearch = [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search term must be 1-100 characters')
    .escape(),
  
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be non-negative'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be non-negative'),
  
  query('dateFrom')
    .optional()
    .isISO8601()
    .withMessage('dateFrom must be a valid ISO 8601 date'),
  
  query('dateTo')
    .optional()
    .isISO8601()
    .withMessage('dateTo must be a valid ISO 8601 date'),
  
  handleValidationErrors
];

module.exports = {
  validateProduct,
  validateCategory,
  validateObjectId,
  validatePagination,
  validateSearch,
  handleValidationErrors
};