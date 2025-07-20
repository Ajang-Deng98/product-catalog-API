# LINK TO MY VIDEO ON YOUTUBE
https://youtu.be/cZDjp80qRag



# Product Catalog API

A comprehensive RESTful API for managing product catalogs in an e-commerce platform, built with Node.js, Express.js, and MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
[![Swagger](https://img.shields.io/badge/API-Documented-orange.svg)](http://localhost:1991/api-docs)

## Features

- **Product Management**: Full CRUD operations with variants support
- **Category Management**: Organize products under hierarchical categories
- **Advanced Search**: Text search, filtering, sorting, and pagination
- **Inventory Tracking**: Real-time stock management per variant
- **Pricing & Discounts**: Flexible pricing with discount support
- **Reporting**: Low-stock alerts and inventory insights
- **Swagger Documentation**: Interactive API documentation
- **Security**: Input validation, rate limiting, and error handling
- **Performance**: Optimized MongoDB queries with indexing

## Quick Start

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

## API Endpoints

**Base URL**: `http://localhost:1991`

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/products` | Get all products (with filtering) | None |
| `GET` | `/api/products/:id` | Get single product by ID | None |
| `POST` | `/api/products` | Create new product | None |
| `PUT` | `/api/products/:id` | Update existing product | None |
| `DELETE` | `/api/products/:id` | Delete product | None |
| `GET` | `/api/products/reports/low-stock` | Low stock report | None |
| `GET` | `/api/products/reports/inventory-summary` |: Inventory statistics | None |
| `GET` | `/api/products/reports/by-category` |: Products by category | None |

### Categories
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/categories` | Get all categories (with search) | None |
| `GET` | `/api/categories/:id` | Get single category | None |
| `POST` | `/api/categories` | Create new category | None |
| `PUT` | `/api/categories/:id` | Update category | None |
| `DELETE` | `/api/categories/:id` | Delete category | None |

### System
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | API health status |
| `GET` | `/api-docs` | Swagger documentation |

## Advanced Search & Filtering

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
| `search` | string |  Text search (name, description) | `?search=electronics` |
| `dateFrom` | string | Filter from date | `?dateFrom=2023-01-01` |
| `dateTo` | string | Filter to date | `?dateTo=2023-12-31` |
| `sortBy` | string | Sort field (name, createdAt) | `?sortBy=name` |
| `order` | string | Sort order (asc, desc) | `?order=desc` |

`

## Sample Usage

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

## **More Product Examples**

### Example 1: Electronics Product with Multiple Variants
```http
POST http://localhost:1991/api/products
Content-Type: application/json

{
  "name": "Gaming Laptop Pro",
  "description": "High-performance gaming laptop with RTX 4080 graphics card, 32GB RAM, and 1TB SSD storage. Perfect for gaming, content creation, and professional work.",
  "category": "64f5a1b2c3d4e5f6a7b8c9d0",
  "basePrice": 2499.99,
  "variants": [
    {
      "size": "15-inch",
      "color": "Midnight Black",
      "sku": "GLP-15-BLK-32GB",
      "price": 2499.99,
      "inventory": 25,
      "discount": 5
    },
    {
      "size": "17-inch",
      "color": "Midnight Black", 
      "sku": "GLP-17-BLK-32GB",
      "price": 2799.99,
      "inventory": 15,
      "discount": 3
    },
    {
      "size": "15-inch",
      "color": "Silver",
      "sku": "GLP-15-SLV-32GB",
      "price": 2549.99,
      "inventory": 20,
      "discount": 0
    }
  ],
  "tags": ["gaming", "laptop", "high-performance", "RTX4080", "32GB", "SSD", "professional"]
}
```

### Example 2: Clothing Product with Size and Color Variants
```http
POST http://localhost:1991/api/products
Content-Type: application/json

{
  "name": "Premium Cotton T-Shirt",
  "description": "100% organic cotton t-shirt with sustainable manufacturing. Soft, comfortable, and durable. Perfect for casual wear and eco-conscious consumers.",
  "category": "64f5a1b2c3d4e5f6a7b8c9d1",
  "basePrice": 29.99,
  "variants": [
    {
      "size": "Small",
      "color": "White",
      "sku": "PCT-S-WHT-001",
      "price": 29.99,
      "inventory": 100,
      "discount": 0
    },
    {
      "size": "Medium",
      "color": "White",
      "sku": "PCT-M-WHT-001",
      "price": 29.99,
      "inventory": 150,
      "discount": 0
    },
    {
      "size": "Large",
      "color": "White",
      "sku": "PCT-L-WHT-001",
      "price": 29.99,
      "inventory": 120,
      "discount": 0
    },
    {
      "size": "Small",
      "color": "Navy Blue",
      "sku": "PCT-S-NVY-001",
      "price": 29.99,
      "inventory": 80,
      "discount": 10
    },
    {
      "size": "Medium",
      "color": "Navy Blue",
      "sku": "PCT-M-NVY-001",
      "price": 29.99,
      "inventory": 90,
      "discount": 10
    },
    {
      "size": "Large",
      "color": "Navy Blue",
      "sku": "PCT-L-NVY-001",
      "price": 29.99,
      "inventory": 75,
      "discount": 10
    },
    {
      "size": "Medium",
      "color": "Forest Green",
      "sku": "PCT-M-GRN-001",
      "price": 32.99,
      "inventory": 60,
      "discount": 15
    }
  ],
  "tags": ["clothing", "t-shirt", "organic", "cotton", "sustainable", "casual", "eco-friendly"]
}
```

### Example 3: Home & Kitchen Product with Simple Variants
```http
POST http://localhost:1991/api/products
Content-Type: application/json

{
  "name": "Stainless Steel Water Bottle",
  "description": "Double-wall vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof design with wide mouth for easy filling and cleaning.",
  "category": "64f5a1b2c3d4e5f6a7b8c9d2",
  "basePrice": 34.99,
  "variants": [
    {
      "size": "16oz",
      "color": "Matte Black",
      "sku": "SSWB-16-BLK-001",
      "price": 34.99,
      "inventory": 200,
      "discount": 0
    },
    {
      "size": "20oz",
      "color": "Matte Black",
      "sku": "SSWB-20-BLK-001", 
      "price": 39.99,
      "inventory": 180,
      "discount": 5
    },
    {
      "size": "24oz",
      "color": "Matte Black",
      "sku": "SSWB-24-BLK-001",
      "price": 44.99,
      "inventory": 150,
      "discount": 0
    },
    {
      "size": "16oz",
      "color": "Ocean Blue",
      "sku": "SSWB-16-BLU-001",
      "price": 36.99,
      "inventory": 120,
      "discount": 8
    },
    {
      "size": "20oz",
      "color": "Ocean Blue",
      "sku": "SSWB-20-BLU-001",
      "price": 41.99,
      "inventory": 100,
      "discount": 12
    },
    {
      "size": "16oz",
      "color": "Rose Gold",
      "sku": "SSWB-16-RGD-001",
      "price": 37.99,
      "inventory": 85,
      "discount": 0
    }
  ],
  "tags": ["water-bottle", "stainless-steel", "insulated", "BPA-free", "leak-proof", "eco-friendly", "reusable"]
}
```

## **Product Creation Tips**

### **Required Fields:**
- `name` - Product name (1-100 characters)
- `description` - Detailed description (1-1000 characters)  
- `category` - Valid category ID (must exist)
- `basePrice` - Base price (positive number)

### **Variant Requirements:**
- `sku` - Unique product identifier
- `price` - Variant-specific price
- `inventory` - Stock quantity (0 or positive)

### **Optional Fields:**
- `variants` - Array of product variations
- `tags` - Array of searchable keywords
- `discount` - Percentage discount (0-100)
- `size` - Product size
- `color` - Product color

### **Best Practices:**
1. **Unique SKUs**: Each variant must have a unique SKU
2. **Descriptive Names**: Use clear, searchable product names
3. **Relevant Tags**: Add keywords for better search functionality
4. **Proper Categories**: Ensure category exists before creating products
5. **Inventory Tracking**: Set realistic inventory numbers
6. **Pricing Strategy**: Use competitive pricing with strategic discounts

### Step 3: Update Category (use category ID)
```http
PUT http://localhost:1991/api/categories/64f5a1b2c3d4e5f6a7b8c9d0
Content-Type: application/json

{
  "name": "Consumer Electronics",
  "description": "Updated description for consumer electronic devices and gadgets"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "name": "Consumer Electronics",
    "description": "Updated description for consumer electronic devices and gadgets",
    "isActive": true,
    "createdAt": "2023-09-04T10:30:00.000Z",
    "updatedAt": "2023-09-04T11:45:00.000Z"
  }
}
```

### Step 4: Update Product (use product ID from step 2)
```http
PUT http://localhost:1991/api/products/64f5a1b2c3d4e5f6a7b8c9d1
Content-Type: application/json

{
  "name": "Premium Wireless Headphones",
  "description": "Updated premium wireless headphones with enhanced noise cancellation",
  "category": "64f5a1b2c3d4e5f6a7b8c9d0",
  "basePrice": 249.99,
  "variants": [
    {
      "color": "Black",
      "sku": "WH-001-BLK",
      "price": 249.99,
      "inventory": 45,
      "discount": 15
    },
    {
      "color": "White",
      "sku": "WH-001-WHT",
      "price": 249.99,
      "inventory": 25,
      "discount": 10
    },
    {
      "color": "Silver",
      "sku": "WH-001-SLV",
      "price": 249.99,
      "inventory": 20,
      "discount": 5
    }
  ],
  "tags": ["wireless", "audio", "bluetooth", "noise-cancellation", "premium"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
    "name": "Premium Wireless Headphones",
    "description": "Updated premium wireless headphones with enhanced noise cancellation",
    "category": {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "name": "Consumer Electronics"
    },
    "basePrice": 249.99,
    "variants": [
      {
        "color": "Black",
        "sku": "WH-001-BLK",
        "price": 249.99,
        "inventory": 45,
        "discount": 15
      },
      {
        "color": "White", 
        "sku": "WH-001-WHT",
        "price": 249.99,
        "inventory": 25,
        "discount": 10
      },
      {
        "color": "Silver",
        "sku": "WH-001-SLV",
        "price": 249.99,
        "inventory": 20,
        "discount": 5
      }
    ],
    "tags": ["wireless", "audio", "bluetooth", "noise-cancellation", "premium"],
    "isActive": true,
    "createdAt": "2023-09-04T10:35:00.000Z",
    "updatedAt": "2023-09-04T12:00:00.000Z"
  }
}
```

## Testing

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

# Update category (replace {id} with actual category ID)
curl -X PUT http://localhost:1991/api/categories/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"Consumer Electronics","description":"Updated electronic devices"}'

# Update product (replace {id} with actual product ID)  
curl -X PUT http://localhost:1991/api/products/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Updated Product Name",
    "description":"Updated description",
    "category":"64f5a1b2c3d4e5f6a7b8c9d0",
    "basePrice":299.99,
    "variants":[{
      "color":"Blue",
      "sku":"UP-001-BLU", 
      "price":299.99,
      "inventory":25,
      "discount":5
    }]
  }'
```

## Project Structure

```
formativeassignment/
├── config/
│   ├── database.js           # MongoDB connection setup
│   └── swagger.js            # Swagger documentation config
├── controllers/
│   ├── productController.js  # Product business logic
│   └── categoryController.js # Category business logic
├── middleware/
│   ├── errorHandler.js       # Global error handling
│   └── validation.js         # Input validation rules
├── models/
│   ├── Product.js            # Product MongoDB schema
│   └── Category.js           # Category MongoDB schema
├── routes/
│   ├── products.js           # Product API routes
│   └── categories.js         # Category API routes
├── server.js              # Main application entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── API-DOCUMENTATION.md  # Detailed API docs
└── SETUP-GUIDE.md        # Setup instructions
```

## Security Features

- **Helmet.js**: Security headers protection
- **CORS**: Cross-origin resource sharing control
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive request validation
- **Data Sanitization**: MongoDB injection prevention
- **Error Handling**: No sensitive data exposure
- **Request Logging**: Activity monitoring

## Error Handling

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

### Common PUT Operation Issues

#### **404 Not Found Error**
```bash
# WRONG - Missing ID in URL
PUT http://localhost:1991/api/categories
# ERROR: 404 Not Found

# CORRECT - Include valid ID in URL
PUT http://localhost:1991/api/categories/64f5a1b2c3d4e5f6a7b8c9d0
```

#### **Proper PUT Request Format**
```http
PUT http://localhost:1991/api/categories/{valid-category-id}
Content-Type: application/json

{
  "name": "Updated Category Name",
  "description": "Updated description"
}
```

#### **How to Get Valid IDs**
1. **Create a resource first** (POST request)
2. **Copy the `_id` from the response**
3. **Use that ID in your PUT request URL**

Example workflow:
```bash
# 1. Create category and note the returned _id
POST /api/categories → returns {"data": {"_id": "abc123..."}}

# 2. Use that _id for updates
PUT /api/categories/abc123...
```

### HTTP Status Codes
| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | Request successful |
| `201` | Created | Resource created successfully |
| `400` | Bad Request | Invalid request data |
| `404` | Not Found | Resource not found |
| `500` | Server Error | Internal server error |

## Documentation

### Available Documentation
- **[API Documentation](./API-DOCUMENTATION.md)**: Complete endpoint reference
- **[Setup Guide](./SETUP-GUIDE.md)**: Installation and configuration
- **[Swagger UI](http://localhost:1991/api-docs)**: Interactive API explorer
- **[Swagger UI](http://localhost:1991/api-docs)**: Interactive testing interface

### Key Features
- **Interactive Testing**: Swagger UI with try-it-out functionality
- **Request/Response Examples**: Complete with sample data
- **Error Documentation**: All possible error scenarios
- **Setup Instructions**: Step-by-step installation guide
- **Troubleshooting**: Common issues and solutions

## Getting Started

1. **Quick Setup**: Follow the installation steps above
2. **Test Health**: Visit http://localhost:1991/health
3. **Explore API**: Open http://localhost:1991/api-docs
4. **Test API**: Use Swagger UI for interactive testing
5. **Build Features**: Start with categories, then add products

## Performance

- **Database Indexing**: Optimized MongoDB queries
- **Pagination**: Efficient data loading
- **Caching**: Response optimization
- **Rate Limiting**: API protection
- **Error Handling**: Graceful failure management

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Status**: Production Ready | **Docs**: Complete | **Tests**: Available | **Security**: Implemented