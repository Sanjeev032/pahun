import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5001/api',
});

// Add a request interceptor to attach JWT
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('pahunn_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    login: (credentials) => API.post('/users/login', credentials),
    register: (data) => API.post('/users', data),
    getProfile: () => API.get('/users/profile'),
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
