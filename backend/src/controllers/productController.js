import * as productService from '../services/productService.js';
import { successResponse } from '../utils/responseFormatter.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        const result = await productService.getAllProducts(req.query);
        res.json(successResponse(result, 'Products fetched successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);

        if (product) {
            res.json(successResponse(product));
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
    try {
        const createdProduct = await productService.createSampleProduct(req.user._id);
        res.status(201).json(successResponse(createdProduct, 'Product created successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await productService.updateProductDetails(req.params.id, req.body);

        if (updatedProduct) {
            res.json(successResponse(updatedProduct, 'Product updated successfully'));
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
    try {
        const success = await productService.removeProduct(req.params.id);

        if (success) {
            res.json(successResponse(null, 'Product removed successfully'));
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        await productService.createProductReview(
            req.params.id,
            req.user,
            rating,
            comment
        );
        res.status(201).json({ message: 'Review added' });
    } catch (error) {
        // We throw custom errors in the service, grab the message here.
        res.status(400).json({ message: error.message });
    }
};

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const result = await productService.getAllProducts({ ...req.query, category });
        res.json(successResponse(result, `Products for category ${category} fetched successfully`));
    } catch (error) {
        next(error);
    }
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductsByCategory,
};
