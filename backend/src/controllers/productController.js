import * as productService from '../services/productService.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    const products = await productService.getAllProducts();
    res.json(products);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const product = await productService.getProductById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const createdProduct = await productService.createSampleProduct(req.user._id);
    res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const updatedProduct = await productService.updateProductDetails(req.params.id, req.body);

    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    const success = await productService.removeProduct(req.params.id);

    if (success) {
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
