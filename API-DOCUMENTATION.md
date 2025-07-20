# Product Catalog API - Complete Documentation

## 📋 **Table of Contents**
1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Authentication](#authentication)
4. [Endpoints](#endpoints)
5. [Request/Response Examples](#examples)
6. [Error Handling](#error-handling)
7. [Testing](#testing)

## 🎯 **Overview**

RESTful API for e-commerce product catalog management with full CRUD operations, advanced search, inventory tracking, and reporting capabilities.

**Base URL:** `http://localhost:1991`

## 🚀 **Quick Start**

### Prerequisites
- Node.js v14+
- MongoDB running locally or cloud instance

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
# Edit .env file:
PORT=1991
MONGODB_URI=mongodb://localhost:27017/product-catalog
NODE_ENV=development

# 3. Start server
npm start

# 4. Access documentation
http://localhost:1991/api-docs
```

## 🔐 **Authentication**
Currently no authentication required. All endpoints are publicly accessible.

## 📡 **Endpoints**

### **Categories**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories (with search & date filtering) |
| GET | `/api/categories/:id` | Get single category |
| POST | `/api/categories` | Create category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

#### **Category Query Parameters**
- `search` (string): Text search in name and description
- `dateFrom` (string): Filter categories created from date (YYYY-MM-DD)
- `dateTo` (string): Filter categories created to date (YYYY-MM-DD)
- `sortBy` (string): Sort by field (name, createdAt) - default: name
- `order` (string): Sort order (asc, desc) - default: asc

### **Products**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with filters) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/reports/low-stock` | Get low stock report |
| GET | `/api/products/reports/inventory-summary` | **NEW**: Get inventory statistics |
| GET | `/api/products/reports/by-category` | **NEW**: Get products grouped by category |

#### **Product Query Parameters**
- `search` (string): Text search in name, description, and tags
- `category` (string): Filter by category ID
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `dateFrom` (string): **NEW**: Filter products created from date (YYYY-MM-DD)
- `dateTo` (string): **NEW**: Filter products created to date (YYYY-MM-DD)
- `inStock` (boolean): Filter only products with inventory > 0
- `sortBy` (string): Sort by field (createdAt, price, name) - default: createdAt
- `order` (string): Sort order (asc, desc) - default: desc
- `page` (number): Page number for pagination - default: 1
- `limit` (number): Items per page - default: 10

### **System**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api-docs` | Swagger documentation |

## 📝 **Request/Response Examples**

### **Create Category**
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Electronics",
  "description": "Electronic devices and gadgets"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "isActive": true,
    "createdAt": "2023-09-04T10:30:00.000Z",
    "updatedAt": "2023-09-04T10:30:00.000Z"
  }
}
```

### **Create Product**
```http
POST /api/products
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "description": "Premium wireless headphones with noise cancellation",
  "category": "64f5a1b2c3d4e5f6a7b8c9d0",
  "basePrice": 199.99,
  "variants": [
    {
      "color": "Black",
      "sku": "WH-001-BLK",
      "price": 199.99,
      "inventory": 50,
      "discount": 10
    }
  ],
  "tags": ["wireless", "audio", "bluetooth"]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d1",
    "name": "Wireless Headphones",
    "description": "Premium wireless headphones with noise cancellation",
    "category": {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "name": "Electronics"
    },
    "basePrice": 199.99,
    "variants": [...],
    "tags": ["wireless", "audio", "bluetooth"],
    "isActive": true,
    "createdAt": "2023-09-04T10:35:00.000Z"
  }
}
```

### **Search Products**
```http
GET /api/products?search=wireless&category=64f5a1b2c3d4e5f6a7b8c9d0&minPrice=100&maxPrice=300&inStock=true&sortBy=price&order=asc&page=1&limit=10
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 15,
  "pagination": {
    "page": 1,
    "pages": 2
  },
  "data": [...]
}
```

### **Low Stock Report**
```http
GET /api/products/reports/low-stock?threshold=10
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "name": "Bluetooth Speaker",
      "variants": [
        {
          "sku": "BS-001-BLK",
          "inventory": 5
        }
      ]
    }
  ]
}
```

### **NEW: Inventory Summary Report**
```http
GET /api/products/reports/inventory-summary
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalProducts": 25,
    "totalVariants": 48,
    "totalInventory": 1250,
    "averagePrice": 149.99,
    "lowStockCount": 8,
    "outOfStockCount": 3
  }
}
```

### **NEW: Products by Category Report**
```http
GET /api/products/reports/by-category
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "categoryId": "64f5a1b2c3d4e5f6a7b8c9d0",
      "categoryName": "Electronics",
      "productCount": 15,
      "totalInventory": 680,
      "averagePrice": 199.99
    },
    {
      "categoryId": "64f5a1b2c3d4e5f6a7b8c9d1",
      "categoryName": "Clothing",
      "productCount": 8,
      "totalInventory": 420,
      "averagePrice": 79.99
    }
  ]
}
```

### **NEW: Enhanced Category Search**
```http
GET /api/categories?search=electronics&dateFrom=2023-01-01&sortBy=name&order=asc
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "name": "Electronics",
      "description": "Electronic devices and gadgets",
      "isActive": true,
      "createdAt": "2023-03-15T10:30:00.000Z"
    }
  ]
}
```

### **NEW: Enhanced Product Search with Date Filtering**
```http
GET /api/products?search=wireless&dateFrom=2023-01-01&dateTo=2023-12-31&minPrice=50&maxPrice=300
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "total": 5,
  "pagination": {
    "page": 1,
    "pages": 1
  },
  "data": [
    {
      "_id": "...",
      "name": "Wireless Headphones",
      "basePrice": 199.99,
      "createdAt": "2023-06-15T10:30:00.000Z",
      "category": {
        "name": "Electronics"
      }
    }
  ]
}
```

## ⚠️ **Error Handling**

### **Error Response Format**
```json
{
  "success": false,
  "error": "Error message description"
}
```

### **HTTP Status Codes**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

### **Common Errors**

**Validation Error (400):**
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

**Not Found (404):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

## 🧪 **Testing**

### **Using Postman/Insomnia**
1. Import the provided `simple-test.http` file
2. Create categories first
3. Use category IDs in product creation
4. Test all endpoints

### **Using Swagger UI**
1. Visit `http://localhost:1991/api-docs`
2. Interactive testing interface
3. Try out all endpoints directly

### **Sample Test Flow**
1. **Health Check:** `GET /health`
2. **Create Category:** `POST /api/categories`
3. **Create Product:** `POST /api/products` (use category ID)
4. **Search Products:** `GET /api/products?search=...`
5. **Filter by Date:** `GET /api/products?dateFrom=2023-01-01&dateTo=2023-12-31`
6. **Low Stock Report:** `GET /api/products/reports/low-stock`
7. **NEW: Inventory Summary:** `GET /api/products/reports/inventory-summary`
8. **NEW: Category Report:** `GET /api/products/reports/by-category`
9. **NEW: Search Categories:** `GET /api/categories?search=electronics`

## 📊 **Query Parameters**

### **Product Filtering**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Text search | `?search=laptop` |
| `category` | string | Category ID | `?category=64f5...` |
| `minPrice` | number | Minimum price | `?minPrice=100` |
| `maxPrice` | number | Maximum price | `?maxPrice=500` |
| `inStock` | boolean | In stock only | `?inStock=true` |
| `sortBy` | string | Sort field | `?sortBy=price` |
| `order` | string | Sort order | `?order=asc` |
| `page` | number | Page number | `?page=1` |
| `limit` | number | Items per page | `?limit=10` |

## 🔧 **Data Models**

### **Category Schema**
```javascript
{
  name: String (required, max 50 chars),
  description: String (max 200 chars),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### **Product Schema**
```javascript
{
  name: String (required, max 100 chars),
  description: String (required, max 1000 chars),
  category: ObjectId (required, ref: Category),
  basePrice: Number (required, min: 0),
  variants: [{
    size: String,
    color: String,
    sku: String (required, unique),
    price: Number (required, min: 0),
    inventory: Number (required, min: 0),
    discount: Number (0-100, default: 0)
  }],
  tags: [String],
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ **Security Features**
- Helmet.js security headers
- CORS protection
- Rate limiting (100 requests/15 minutes)
- Input validation and sanitization
- MongoDB injection protection

---

**🎯 API Status: Production Ready**
- ✅ All endpoints functional
- ✅ Comprehensive error handling
- ✅ Complete documentation
- ✅ Security implemented
- ✅ Testing ready