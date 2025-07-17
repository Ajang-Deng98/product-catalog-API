const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

const validateProduct = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
  body('description').trim().isLength({ min: 1, max: 1000 }).withMessage('Description must be 1-1000 characters'),
  body('category').isMongoId().withMessage('Valid category ID required'),
  body('basePrice').isFloat({ min: 0 }).withMessage('Base price must be a positive number'),
  body('variants').optional().isArray().withMessage('Variants must be an array'),
  body('variants.*.sku').if(body('variants').exists()).notEmpty().withMessage('SKU is required for variants'),
  body('variants.*.price').if(body('variants').exists()).isFloat({ min: 0 }).withMessage('Variant price must be positive'),
  body('variants.*.inventory').if(body('variants').exists()).isInt({ min: 0 }).withMessage('Inventory must be non-negative'),
  handleValidationErrors
];

const validateCategory = [
  body('name').trim().isLength({ min: 1, max: 50 }).withMessage('Name must be 1-50 characters'),
  body('description').optional().isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters'),
  handleValidationErrors
];

const validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  handleValidationErrors
];

module.exports = {
  validateProduct,
  validateCategory,
  validateObjectId
};