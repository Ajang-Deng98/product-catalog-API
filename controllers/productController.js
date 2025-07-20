const Product = require('../models/Product');
const Category = require('../models/Category');

// @desc    Get all products with search and filtering
// @route   GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, inStock, dateFrom, dateTo, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;
    
    let query = { isActive: true };
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.basePrice = {};
      if (minPrice) query.basePrice.$gte = parseFloat(minPrice);
      if (maxPrice) query.basePrice.$lte = parseFloat(maxPrice);
    }
    
    // Date range filter
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }
    
    // In stock filter
    if (inStock === 'true') {
      query['variants.inventory'] = { $gt: 0 };
    }
    
    const sortOrder = order === 'desc' ? -1 : 1;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(query)
      .populate('category', 'name')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Product.countDocuments(query);
    
    res.json({
      success: true,
      count: products.length,
      total,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name description');
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/products
const createProduct = async (req, res, next) => {
  try {
    // Verify category exists
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({ success: false, error: 'Category not found' });
    }
    
    const product = await Product.create(req.body);
    await product.populate('category', 'name');
    
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(400).json({ success: false, error: 'Category not found' });
      }
    }
    
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('category', 'name');
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Get low stock products
// @route   GET /api/products/reports/low-stock
const getLowStockProducts = async (req, res, next) => {
  try {
    const { threshold = 10 } = req.query;
    
    const products = await Product.find({
      isActive: true,
      'variants.inventory': { $lte: parseInt(threshold) }
    }).populate('category', 'name');
    
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get inventory summary report
// @route   GET /api/products/reports/inventory-summary
const getInventorySummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$variants' },
      {
        $group: {
          _id: null,
          totalProducts: { $addToSet: '$_id' },
          totalVariants: { $sum: 1 },
          totalInventory: { $sum: '$variants.inventory' },
          averagePrice: { $avg: '$variants.price' },
          lowStockCount: {
            $sum: { $cond: [{ $lte: ['$variants.inventory', 10] }, 1, 0] }
          },
          outOfStockCount: {
            $sum: { $cond: [{ $eq: ['$variants.inventory', 0] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalProducts: { $size: '$totalProducts' },
          totalVariants: 1,
          totalInventory: 1,
          averagePrice: { $round: ['$averagePrice', 2] },
          lowStockCount: 1,
          outOfStockCount: 1
        }
      }
    ]);

    res.json({ 
      success: true, 
      data: summary[0] || {
        totalProducts: 0,
        totalVariants: 0,
        totalInventory: 0,
        averagePrice: 0,
        lowStockCount: 0,
        outOfStockCount: 0
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products by category report
// @route   GET /api/products/reports/by-category
const getProductsByCategory = async (req, res, next) => {
  try {
    const report = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      { $unwind: '$categoryInfo' },
      {
        $group: {
          _id: '$category',
          categoryName: { $first: '$categoryInfo.name' },
          productCount: { $sum: 1 },
          totalInventory: { $sum: { $sum: '$variants.inventory' } },
          averagePrice: { $avg: '$basePrice' }
        }
      },
      {
        $project: {
          _id: 0,
          categoryId: '$_id',
          categoryName: 1,
          productCount: 1,
          totalInventory: 1,
          averagePrice: { $round: ['$averagePrice', 2] }
        }
      },
      { $sort: { productCount: -1 } }
    ]);

    res.json({ success: true, count: report.length, data: report });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  getInventorySummary,
  getProductsByCategory
};