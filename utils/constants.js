/**
 * Application Constants
 * Centralized location for all application constants
 */

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

const VALIDATION_LIMITS = {
  PRODUCT_NAME_MIN: 1,
  PRODUCT_NAME_MAX: 100,
  PRODUCT_DESCRIPTION_MAX: 1000,
  CATEGORY_NAME_MIN: 1,
  CATEGORY_NAME_MAX: 50,
  CATEGORY_DESCRIPTION_MAX: 200,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  MIN_PRICE: 0,
  MAX_DISCOUNT: 100,
  MIN_INVENTORY: 0
};

const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100
};

const SORT_OPTIONS = {
  DEFAULT_SORT: 'createdAt',
  DEFAULT_ORDER: 'desc',
  ALLOWED_SORT_FIELDS: ['createdAt', 'name', 'basePrice', 'updatedAt'],
  ALLOWED_ORDER: ['asc', 'desc']
};

const MESSAGES = {
  SUCCESS: {
    PRODUCT_CREATED: 'Product created successfully',
    PRODUCT_UPDATED: 'Product updated successfully',
    PRODUCT_DELETED: 'Product deleted successfully',
    CATEGORY_CREATED: 'Category created successfully',
    CATEGORY_UPDATED: 'Category updated successfully',
    CATEGORY_DELETED: 'Category deleted successfully'
  },
  ERROR: {
    PRODUCT_NOT_FOUND: 'Product not found',
    CATEGORY_NOT_FOUND: 'Category not found',
    INVALID_ID: 'Invalid ID format',
    DUPLICATE_SKU: 'SKU already exists',
    DUPLICATE_CATEGORY: 'Category name already exists',
    ROUTE_NOT_FOUND: 'Route not found',
    SERVER_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
    DATABASE_CONNECTION_ERROR: 'Database connection failed'
  }
};

const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test'
};

module.exports = {
  HTTP_STATUS,
  VALIDATION_LIMITS,
  RATE_LIMIT,
  SORT_OPTIONS,
  MESSAGES,
  ENVIRONMENT
};
