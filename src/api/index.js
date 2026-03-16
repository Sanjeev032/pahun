import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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
