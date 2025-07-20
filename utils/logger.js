/**
 * Logging Utility
 * Provides structured logging throughout the application
 */

const { ENVIRONMENT } = require('./constants');

class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT;
  }

  /**
   * Formats log message with timestamp and level
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const formattedMessage = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...(Object.keys(meta).length > 0 && { meta })
    };

    return this.isDevelopment ? 
      `[${timestamp}] ${level.toUpperCase()}: ${message}` + 
      (Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '') :
      JSON.stringify(formattedMessage);
  }

  info(message, meta = {}) {
    console.log(this.formatMessage('info', message, meta));
  }

  error(message, meta = {}) {
    console.error(this.formatMessage('error', message, meta));
  }

  warn(message, meta = {}) {
    console.warn(this.formatMessage('warn', message, meta));
  }

  debug(message, meta = {}) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }

  /**
   * Logs HTTP requests
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  logRequest(req, res) {
    const meta = {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      statusCode: res.statusCode,
      responseTime: res.responseTime || 0
    };

    this.info('HTTP Request', meta);
  }

  /**
   * Logs database operations
   * @param {string} operation - Database operation type
   * @param {string} collection - Database collection
   * @param {Object} meta - Additional metadata
   */
  logDatabase(operation, collection, meta = {}) {
    this.info(`Database ${operation}`, { collection, ...meta });
  }
}

module.exports = new Logger();
