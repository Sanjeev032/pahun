import Product from '../models/productModel.js';

/**
 * Fetch all products
 */
export const getAllProducts = async () => {
    return await Product.find({});
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
