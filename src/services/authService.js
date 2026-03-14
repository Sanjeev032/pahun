import apiClient from './apiClient';

/**
 * Auth API Service
 */
const authService = {
    /**
     * Login user
     */
    login: async (credentials) => {
        const response = await apiClient.post('/users/login', credentials);
        return response.data;
    },

    /**
     * Register user
     */
    register: async (userData) => {
        const response = await apiClient.post('/users', userData);
        return response.data;
    },

    /**
     * Get current user profile
     */
    getProfile: async () => {
        const response = await apiClient.get('/users/profile');
        return response.data;
    },

    /**
     * Forgot password
     */
    forgotPassword: async (email) => {
        const response = await apiClient.post('/users/forgotpassword', { email });
        return response.data;
    },

    /**
     * Reset password
     */
    resetPassword: async (token, password) => {
        const response = await apiClient.put(`/users/resetpassword/${token}`, { password });
        return response.data;
    },
};

export default authService;
