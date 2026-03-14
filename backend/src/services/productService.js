import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import { PAGINATION_LIMIT } from '../config/constants.js';

/**
 * Fetch all products with advanced search, filtering, and pagination
 */
export const getAllProducts = async (queryOptions = {}) => {
    const {
        keyword,
        category,
        minPrice,
        maxPrice,
        rating,
        sort,
        page = 1,
        limit = PAGINATION_LIMIT
    } = queryOptions;

    // 1. Build Query Object
    const query = {};

    // Keyword matching (search in product name, case-insensitive)
    if (keyword) {
        query.name = {
            $regex: keyword,
            $options: 'i',
        };
    }

    // Category exact match
    if (category) {
        query.category = category; // assuming category is string or ObjectId that matches
    }

    // Price range
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Minimum rating
    if (rating) {
        query.rating = { $gte: Number(rating) };
    }

    // 2. Sorting Logic
    let sortObj = {};
    if (sort === 'price') {
        sortObj.price = 1; // Ascending
    } else if (sort === 'rating') {
        sortObj.rating = -1; // Descending
    } else {
        // Default to newest
        sortObj.createdAt = -1;
    }

    // 3. Pagination Logic
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Fetch total count for pagination metadata
    const count = await Product.countDocuments(query);

    // Fetch the actual products
    const products = await Product.find(query)
        .sort(sortObj)
        .limit(limitNum)
        .skip(skip);

    return {
        products,
        page: pageNum,
        pages: Math.ceil(count / limitNum),
        total: count
    };
};

/**
 * Fetch product by ID
 */
export const getProductById = async (id) => {
    return await Product.findById(id);
};

/**
 * Create a sample product
 */
export const createSampleProduct = async (userId) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: userId,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    return await product.save();
};

/**
 * Update product
 */
export const updateProductDetails = async (id, details) => {
    const product = await Product.findById(id);

    if (product) {
        product.name = details.name || product.name;
        product.price = details.price || product.price;
        product.description = details.description || product.description;
        product.image = details.image || product.image;
        product.brand = details.brand || product.brand;
        product.category = details.category || product.category;
        product.countInStock = details.countInStock || product.countInStock;

        return await product.save();
    }
    return null;
};

/**
 * Delete product
 */
export const removeProduct = async (id) => {
    const product = await Product.findById(id);
    if (product) {
        await Product.deleteOne({ _id: product._id });
        return true;
    }
    return false;
};

/**
 * Create new review
 */
export const createProductReview = async (productId, user, rating, comment) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error('Product not found');
    }

    // 1. Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === user._id.toString()
    );

    if (alreadyReviewed) {
        throw new Error('You have already reviewed this product');
    }

    // 2. Check if user has purchased the item
    // Find an order by this user that is paid and contains this product
    const order = await Order.findOne({
        user: user._id,
        isPaid: true,
        'orderItems.product': productId,
    });

    if (!order) {
        throw new Error('You must purchase this product before reviewing it');
    }

    // 3. Create review
    const review = {
        name: user.name,
        rating: Number(rating),
        comment,
        user: user._id,
    };

    product.reviews.push(review);

    // 4. Recalculate rating stats
    product.numReviews = product.reviews.length;
    
    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

    return await product.save();
};
