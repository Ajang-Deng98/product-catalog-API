const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Catalog API',
      version: '1.0.0',
      description: 'A comprehensive RESTful API for managing product catalogs in an e-commerce platform',
      contact: {
        name: 'API Support',
        email: 'support@productcatalog.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:1991',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Products',
        description: 'Product management operations'
      },
      {
        name: 'Categories',
        description: 'Category management operations'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;