/**
 * Enhanced Database Configuration
 * Provides robust MongoDB connection with proper error handling and logging
 */

const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../utils/config');
const { MESSAGES } = require('../utils/constants');

const connectDB = async () => {
  try {
    // Set mongoose configuration options (not connection options)
    mongoose.set('strictQuery', true);
    
    const conn = await mongoose.connect(config.mongoUri, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    
    logger.info('Database connection established', {
      host: conn.connection.host,
      port: conn.connection.port,
      name: conn.connection.name
    });

    // Handle connection events
    mongoose.connection.on('error', (error) => {
      logger.error('Database connection error', { error: error.message });
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('Database disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('Database reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        logger.info('Database connection closed through app termination');
        process.exit(0);
      } catch (error) {
        logger.error('Error during database shutdown', { error: error.message });
        process.exit(1);
      }
    });

    return conn;
  } catch (error) {
    logger.error(MESSAGES.ERROR.DATABASE_CONNECTION_ERROR, {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
};

module.exports = connectDB;