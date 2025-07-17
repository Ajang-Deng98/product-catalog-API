# 🚀 Product Catalog API - Setup Guide

## 📋 **Prerequisites**
- Node.js v14 or higher
- MongoDB (local installation or cloud service)
- Git (optional)
- Postman/Insomnia (for testing)

## ⚡ **Quick Setup (5 minutes)**

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
# .env file is already configured with:
PORT=1991
MONGODB_URI=mongodb://localhost:27017/product-catalog
NODE_ENV=development
```

### Step 3: Start MongoDB
```bash
# If using local MongoDB:
mongod

# Or ensure your MongoDB service is running
```

### Step 4: Start API Server
```bash
npm start
```

### Step 5: Verify Installation
```bash
# Test health endpoint
curl http://localhost:1991/health

# Expected response:
{
  "success": true,
  "message": "Product Catalog API is running",
  "timestamp": "2023-09-04T10:30:00.000Z"
}
```

## 🧪 **Testing Your Setup**

### Option 1: Using HTTP Files (Recommended)
1. Open `simple-test.http` in VS Code
2. Install REST Client extension
3. Click "Send Request" on each endpoint

### Option 2: Using Swagger UI
1. Visit: http://localhost:1991/api-docs
2. Interactive testing interface
3. Try all endpoints directly

### Option 3: Using cURL
```bash
# Create category
curl -X POST http://localhost:1991/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Electronics","description":"Electronic devices"}'

# Get categories
curl http://localhost:1991/api/categories
```

## 📁 **Project Structure**
```
formativeassignment/
├── config/
│   ├── database.js      # MongoDB connection
│   └── swagger.js       # API documentation
├── controllers/
│   ├── productController.js
│   └── categoryController.js
├── middleware/
│   ├── errorHandler.js
│   └── validation.js
├── models/
│   ├── Product.js
│   └── Category.js
├── routes/
│   ├── products.js
│   └── categories.js
├── server.js            # Main application
├── package.json
├── .env                 # Environment variables
├── simple-test.http     # Test requests
└── README.md
```

## 🔧 **Configuration Options**

### Environment Variables
```bash
# Server Configuration
PORT=1991                    # API server port
NODE_ENV=development         # Environment mode

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/product-catalog
```

### MongoDB Setup Options

#### Option 1: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod --dbpath /path/to/data
```

## 🚨 **Troubleshooting**

### Common Issues & Solutions

#### Port Already in Use
```bash
# Error: EADDRINUSE :::1991
# Solution: Change port in .env file
PORT=3000
```

#### MongoDB Connection Failed
```bash
# Error: MongoNetworkError
# Solutions:
1. Ensure MongoDB is running: mongod
2. Check connection string in .env
3. Verify MongoDB service status
```

#### Module Not Found
```bash
# Error: Cannot find module
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Validation Errors
```bash
# Error: Category not found
# Solution: Create category first, then use its ID in products
```

## 📊 **Development Workflow**

### 1. Start Development Server
```bash
npm run dev  # Uses nodemon for auto-restart
```

### 2. Test Endpoints
```bash
# Use simple-test.http file
# Or Swagger UI at /api-docs
```

### 3. Monitor Logs
```bash
# Server logs show:
# - Database connection status
# - Request/response details
# - Error messages
```

## 🎯 **Ready to Use!**

Your API is now ready with:
- ✅ All endpoints functional
- ✅ Database connected
- ✅ Documentation available
- ✅ Testing tools ready
- ✅ Error handling active

**Next Steps:**
1. Create your first category
2. Add products to the category
3. Test search and filtering
4. Try the reporting features

**Support:** Check API-DOCUMENTATION.md for detailed endpoint information.