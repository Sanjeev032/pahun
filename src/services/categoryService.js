import apiClient from './apiClient';

/**
 * Category API Service
 */
const categoryService = {
    /**
     * Get all categories
     */
    getCategories: async () => {
        const response = await apiClient.get('/categories');
        return response.data;
    },

    /**
     * Create a new category (Admin)
     */
    createCategory: async (categoryData) => {
        const response = await apiClient.post('/categories', categoryData);
        return response.data;
    },

    /**
     * Update an existing category (Admin)
     */
    updateCategory: async (id, categoryData) => {
        const response = await apiClient.put(`/categories/${id}`, categoryData);
        return response.data;
    },

    /**
     * Delete a category (Admin)
     */
    deleteCategory: async (id) => {
        const response = await apiClient.delete(`/categories/${id}`);
        return response.data;
    },
};

export default categoryService;
