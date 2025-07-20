/**
 * Main Application Entry Point
 * Enhanced with proper configuration management, logging, and error handling
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Import utilities and configuration
const config = require('./utils/config');
const logger = require('./utils/logger');
const { HTTP_STATUS, MESSAGES } = require('./utils/constants');
const { sendSuccessResponse, sendErrorResponse } = require('./utils/responseHelper');

// Import middleware and database
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow Swagger UI to work
  crossOriginEmbedderPolicy: false
}));

app.use(cors(config.cors));

// Rate limiting with enhanced configuration
const limiter = rateLimit(config.rateLimit);
app.use(limiter);

// Body parser middleware with size limits
app.use(express.json({ 
  limit: '10mb',
  strict: true
}));
app.use(express.urlencoded({ 
  extended: true,
  limit: '10mb'
}));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    res.responseTime = duration;
    
    logger.info('HTTP Request', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  });
  
  next();
});

// Swagger Documentation
const swaggerSpecs = swaggerJSDoc(config.swagger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Product Catalog API Documentation'
}));

// API Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));

// Health check endpoint with enhanced information
app.get('/health', (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
    version: process.env.npm_package_version || '1.0.0',
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100
    }
  };

  sendSuccessResponse(
    res,
    HTTP_STATUS.OK,
    'Product Catalog API is running',
    healthData
  );
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  sendErrorResponse(
    res,
    HTTP_STATUS.NOT_FOUND,
    MESSAGES.ERROR.ROUTE_NOT_FOUND
  );
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = config.port;

const server = app.listen(PORT, () => {
  logger.info('Server started successfully', {
    port: PORT,
    environment: config.nodeEnv,
    documentation: `http://localhost:${PORT}/api-docs`,
    health: `http://localhost:${PORT}/health`
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection', {
    error: err.message,
    stack: err.stack
  });
  
  // Close server gracefully
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', {
    error: err.message,
    stack: err.stack
  });
  
  process.exit(1);
});

module.exports = app;