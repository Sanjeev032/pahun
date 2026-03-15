import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to attach Clerk Token (if provided)
API.interceptors.request.use((config) => {
    // Note: In Clerk, we should ideally pass the token to this instance
    // For now, we'll assume the token is passed in headers or handled by the caller
    return config;
});

export const authAPI = {
    sync: (userData, config) => API.post('/users/sync', userData, config),
    getProfile: (config) => API.get('/users/profile', config),
};

export const productAPI = {
    getAll: () => API.get('/products'),
    getById: (id) => API.get(`/products/${id}`),
    create: (data) => API.post('/products', data),
    update: (id, data) => API.put(`/products/${id}`, data),
    delete: (id) => API.delete(`/products/${id}`),
};

export const adminAPI = {
    getAnalytics: () => API.get('/admin/analytics'),
};

export default API;
