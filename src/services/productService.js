import apiClient from './apiClient';

/**
 * Product API Service
 */
const productService = {
    /**
     * Get all products with query params
     */
    getProducts: async (params = {}) => {
        const response = await apiClient.get('/products', { params });
        return response.data;
    },

    /**
     * Get products by category
     */
    getProductsByCategory: async (category, params = {}) => {
        const response = await apiClient.get(`/products/category/${category}`, { params });
        return response.data;
    },

    /**
     * Get single product by ID
     */
    getProductById: async (id) => {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    },

    /**
     * Create product (Admin)
     */
    createProduct: async (productData) => {
        const response = await apiClient.post('/products', productData);
        return response.data;
    },

    /**
     * Update product (Admin)
     */
    updateProduct: async (id, productData) => {
        const response = await apiClient.put(`/products/${id}`, productData);
        return response.data;
    },

    /**
     * Delete product (Admin)
     */
    deleteProduct: async (id) => {
        const response = await apiClient.delete(`/products/${id}`);
        return response.data;
    },

    /**
     * Create product review
     */
    createReview: async (productId, reviewData) => {
        const response = await apiClient.post(`/products/${productId}/reviews`, reviewData);
        return response.data;
    },
};

export default productService;
