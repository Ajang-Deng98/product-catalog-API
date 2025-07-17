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
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get single category |
| POST | `/api/categories` | Create category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### **Products**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with filters) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/reports/low-stock` | Get low stock report |

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
5. **Low Stock Report:** `GET /api/products/reports/low-stock`

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