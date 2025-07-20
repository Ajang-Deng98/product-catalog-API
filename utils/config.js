/**
 * Configuration Management
 * Centralized configuration with validation and defaults
 */

const { ENVIRONMENT, RATE_LIMIT, VALIDATION_LIMITS } = require('./constants');

class Config {
  constructor() {
    this.validateEnvironment();
  }

  validateEnvironment() {
    const requiredEnvVars = ['MONGODB_URI'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }

  get port() {
    return parseInt(process.env.PORT) || 3000;
  }

  get mongoUri() {
    return process.env.MONGODB_URI;
  }

  get nodeEnv() {
    return process.env.NODE_ENV || ENVIRONMENT.DEVELOPMENT;
  }

  get isDevelopment() {
    return this.nodeEnv === ENVIRONMENT.DEVELOPMENT;
  }

  get isProduction() {
    return this.nodeEnv === ENVIRONMENT.PRODUCTION;
  }

  get isTest() {
    return this.nodeEnv === ENVIRONMENT.TEST;
  }

  get rateLimit() {
    return {
      windowMs: RATE_LIMIT.WINDOW_MS,
      max: parseInt(process.env.RATE_LIMIT_MAX) || RATE_LIMIT.MAX_REQUESTS,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        error: 'Too many requests from this IP, please try again later'
      }
    };
  }

  get cors() {
    return {
      origin: this.isDevelopment ? '*' : process.env.ALLOWED_ORIGINS?.split(',') || '*',
      credentials: true,
      optionsSuccessStatus: 200
    };
  }

  get validation() {
    return VALIDATION_LIMITS;
  }

  get swagger() {
    return {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Product Catalog API',
          version: '1.0.0',
          description: 'A comprehensive RESTful API for managing product catalogs',
          contact: {
            name: 'API Support',
            email: 'support@productcatalog.com'
          }
        },
        servers: [
          {
            url: `http://localhost:${this.port}`,
            description: 'Development server'
          }
        ]
      },
      apis: ['./routes/*.js', './models/*.js']
    };
  }
}

module.exports = new Config();
