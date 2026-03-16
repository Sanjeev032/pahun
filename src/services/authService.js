import apiClient from './apiClient';

/**
 * Authentication Service
 * Handles legacy/custom auth flows like password reset
 */
const authService = {
    /**
     * Request a password reset email
     * @param {string} email 
     */
    forgotPassword: async (email) => {
        try {
            const response = await apiClient.post('/users/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Reset password using a token
     * @param {string} token 
     * @param {string} password 
     */
    resetPassword: async (token, password) => {
        try {
            const response = await apiClient.post(`/users/reset-password/${token}`, { password });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Sync Clerk user with backend (if not using SyncUser component)
     * @param {Object} userData 
     */
    syncUser: async (userData) => {
        try {
            const response = await apiClient.post('/users/sync', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default authService;
