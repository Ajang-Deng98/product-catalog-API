# Product Catalog API

🚀 A comprehensive RESTful API for managing product catalogs in an e-commerce platform, built with Node.js, Express.js, and MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
[![Swagger](https://img.shields.io/badge/API-Documented-orange.svg)](http://localhost:1991/api-docs)

## ✨ Features

- 🛍️ **Product Management**: Full CRUD operations with variants support
- 📂 **Category Management**: Organize products under hierarchical categories
- 🔍 **Advanced Search**: Text search, filtering, sorting, and pagination
- 📦 **Inventory Tracking**: Real-time stock management per variant
- 💰 **Pricing & Discounts**: Flexible pricing with discount support
- 📊 **Reporting**: Low-stock alerts and inventory insights
- 📚 **Swagger Documentation**: Interactive API documentation
- 🛡️ **Security**: Input validation, rate limiting, and error handling
- ⚡ **Performance**: Optimized MongoDB queries with indexing

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14 or higher
- **MongoDB** (local installation or cloud service)
- **npm** or **yarn** package manager

### Installation

1. **Clone & Navigate**
```bash
git clone <repository-url>
cd formativeassignment
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# .env file (already configured)
PORT=1991
MONGODB_URI=mongodb://localhost:27017/product-catalog
NODE_ENV=development
```

4. **Start MongoDB**
```bash
# Ensure MongoDB is running
mongod
# Or start MongoDB service
```

5. **Launch API Server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

6. **Access Documentation**
- **Swagger UI**: http://localhost:1991/api-docs
- **Health Check**: http://localhost:1991/health
- **Base API**: http://localhost:1991/api

## 📡 API Endpoints

**Base URL**: `http://localhost:1991`

### 🛍️ Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/products` | Get all products (with filtering) | None |
| `GET` | `/api/products/:id` | Get single product by ID | None |
| `POST` | `/api/products` | Create new product | None |
| `PUT` | `/api/products/:id` | Update existing product | None |
| `DELETE` | `/api/products/:id` | Delete product | None |
| `GET` | `/api/products/reports/low-stock` | Low stock report | None |
| `GET` | `/api/products/reports/inventory-summary` | **NEW**: Inventory statistics | None |
| `GET` | `/api/products/reports/by-category` | **NEW**: Products by category | None |

### 📂 Categories
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/categories` | Get all categories (with search) | None |
| `GET` | `/api/categories/:id` | Get single category | None |
| `POST` | `/api/categories` | Create new category | None |
| `PUT` | `/api/categories/:id` | Update category | None |
| `DELETE` | `/api/categories/:id` | Delete category | None |

### 🔧 System
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | API health status |
| `GET` | `/api-docs` | Swagger documentation |

## 🔍 Advanced Search & Filtering

### Query Parameters
```http
GET /api/products?search=laptop&category=64f5a1b2c3d4e5f6a7b8c9d0&minPrice=100&maxPrice=1000&dateFrom=2023-01-01&dateTo=2023-12-31&inStock=true&sortBy=price&order=asc&page=1&limit=10
```

| Parameter | Type | Description | Example |
|-----------|------|-------------|----------|
| `search` | string | Text search (name, description, tags) | `?search=wireless` |
| `category` | string | Filter by category ID | `?category=64f5a1b2...` |
| `minPrice` | number | Minimum price filter | `?minPrice=50` |
| `maxPrice` | number | Maximum price filter | `?maxPrice=500` |
| `dateFrom` | string | **NEW**: Filter from date (YYYY-MM-DD) | `?dateFrom=2023-01-01` |
| `dateTo` | string | **NEW**: Filter to date (YYYY-MM-DD) | `?dateTo=2023-12-31` |
| `inStock` | boolean | Only in-stock products | `?inStock=true` |
| `sortBy` | string | Sort field (createdAt, price, name) | `?sortBy=price` |
| `order` | string | Sort order (asc, desc) | `?order=desc` |
| `page` | number | Page number (pagination) | `?page=2` |
| `limit` | number | Items per page | `?limit=20` |

### Category Search Parameters
```http
GET /api/categories?search=electronics&dateFrom=2023-01-01&sortBy=name&order=asc
```

| Parameter | Type | Description | Example |
|-----------|------|-------------|----------|
| `search` | string | **NEW**: Text search (name, description) | `?search=electronics` |
| `dateFrom` | string | **NEW**: Filter from date | `?dateFrom=2023-01-01` |
| `dateTo` | string | **NEW**: Filter to date | `?dateTo=2023-12-31` |
| `sortBy` | string | **NEW**: Sort field (name, createdAt) | `?sortBy=name` |
| `order` | string | **NEW**: Sort order (asc, desc) | `?order=desc` |

### Example Queries
```bash
# Search wireless products under $200
GET /api/products?search=wireless&maxPrice=200

# Electronics category, sorted by price
GET /api/products?category=64f5a1b2c3d4e5f6a7b8c9d0&sortBy=price&order=asc

# Products created in 2023
GET /api/products?dateFrom=2023-01-01&dateTo=2023-12-31

# Low stock report with custom threshold
GET /api/products/reports/low-stock?threshold=5

# NEW: Get inventory summary statistics
GET /api/products/reports/inventory-summary

# NEW: Get products grouped by category
GET /api/products/reports/by-category

# NEW: Search categories created this month
GET /api/categories?search=electronics&dateFrom=2023-09-01
```

## 📝 Sample Usage

### Step 1: Create Category
```http
POST http://localhost:1991/api/categories
Content-Type: application/json

{
  "name": "Electronics",
  "description": "Electronic devices and gadgets"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "isActive": true,
    "createdAt": "2023-09-04T10:30:00.000Z"
  }
}
```

### Step 2: Create Product (use category ID from step 1)
```http
POST http://localhost:1991/api/products
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "description": "Premium wireless headphones with active noise cancellation",
  "category": "64f5a1b2c3d4e5f6a7b8c9d0",
  "basePrice": 199.99,
  "variants": [
    {
      "color": "Black",
      "sku": "WH-001-BLK",
      "price": 199.99,
      "inventory": 50,
      "discount": 10
    },
    {
      "color": "White",
      "sku": "WH-001-WHT",
      "price": 199.99,
      "inventory": 30,
      "discount": 0
    }
  ],
  "tags": ["wireless", "audio", "bluetooth", "noise-cancellation"]
}
```

## 🧪 Testing

### Option 1: Swagger UI (Recommended)
1. Visit: http://localhost:1991/api-docs
2. Interactive testing interface
3. Try all endpoints with sample data

### Option 2: Postman/Insomnia
1. Import the provided sample requests
2. Set base URL to `http://localhost:1991`
3. Test all CRUD operations

### Option 3: cURL Commands
```bash
# Health check
curl http://localhost:1991/health

# Get all products
curl http://localhost:1991/api/products

# Create category
curl -X POST http://localhost:1991/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Electronics","description":"Electronic devices"}'
```

## 📁 Project Structure

```
formativeassignment/
├── 📁 config/
│   ├── database.js           # MongoDB connection setup
│   └── swagger.js            # Swagger documentation config
├── 📁 controllers/
│   ├── productController.js  # Product business logic
│   └── categoryController.js # Category business logic
├── 📁 middleware/
│   ├── errorHandler.js       # Global error handling
│   └── validation.js         # Input validation rules
├── 📁 models/
│   ├── Product.js            # Product MongoDB schema
│   └── Category.js           # Category MongoDB schema
├── 📁 routes/
│   ├── products.js           # Product API routes
│   └── categories.js         # Category API routes
├── 📄 server.js              # Main application entry point
├── 📄 package.json           # Dependencies and scripts
├── 📄 .env                   # Environment variables
├── 📄 .gitignore            # Git ignore rules
├── 📄 README.md             # This file
├── 📄 API-DOCUMENTATION.md  # Detailed API docs
└── 📄 SETUP-GUIDE.md        # Setup instructions
```

## 🛡️ Security Features

- **🔒 Helmet.js**: Security headers protection
- **🌐 CORS**: Cross-origin resource sharing control
- **⏱️ Rate Limiting**: 100 requests per 15 minutes per IP
- **✅ Input Validation**: Comprehensive request validation
- **🧹 Data Sanitization**: MongoDB injection prevention
- **🚫 Error Handling**: No sensitive data exposure
- **📝 Request Logging**: Activity monitoring

## ⚠️ Error Handling

### Response Format
```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

### Validation Errors
```json
{
  "success": false,
  "errors": [
    {
      "type": "field",
      "msg": "Product name is required",
      "path": "name",
      "location": "body"
    }
  ]
}
```

### HTTP Status Codes
| Code | Status | Description |
|------|--------|-------------|
| `200` | ✅ OK | Request successful |
| `201` | ✅ Created | Resource created successfully |
| `400` | ❌ Bad Request | Invalid request data |
| `404` | ❌ Not Found | Resource not found |
| `500` | ❌ Server Error | Internal server error |

## 📚 Documentation

### 📖 Available Documentation
- **[API Documentation](./API-DOCUMENTATION.md)**: Complete endpoint reference
- **[Setup Guide](./SETUP-GUIDE.md)**: Installation and configuration
- **[Swagger UI](http://localhost:1991/api-docs)**: Interactive API explorer
- **[Swagger UI](http://localhost:1991/api-docs)**: Interactive testing interface

### 🎯 Key Features
- **Interactive Testing**: Swagger UI with try-it-out functionality
- **Request/Response Examples**: Complete with sample data
- **Error Documentation**: All possible error scenarios
- **Setup Instructions**: Step-by-step installation guide
- **Troubleshooting**: Common issues and solutions

## 🚀 Get ting Started

1. **Quick Setup**: Follow the installation steps above
2. **Test Health**: Visit http://localhost:1991/health
3. **Explore API**: Open http://localhost:1991/api-docs
4. **Test API**: Use Swagger UI for interactive testing
5. **Build Features**: Start with categories, then add products

## 📊 Performance

- **Database Indexing**: Optimized MongoDB queries
- **Pagination**: Efficient data loading
- **Caching**: Response optimization
- **Rate Limiting**: API protection
- **Error Handling**: Graceful failure management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**🎯 Status**: Production Ready | **📚 Docs**: Complete | **🧪 Tests**: Available | **🛡️ Security**: Implemented