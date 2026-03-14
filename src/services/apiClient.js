import axios from 'axios';

/**
 * Centralized API client using Axios
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request Interceptor: Automatically attach JWT token to every request
 */
apiClient.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            try {
                const parsedInfo = JSON.parse(userInfo);
                if (parsedInfo.token) {
                    config.headers.Authorization = `Bearer ${parsedInfo.token}`;
                }
            } catch (e) {
                console.error('Error parsing userInfo from localStorage', e);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor: Uniform error handling and token expiration management
 */
apiClient.interceptors.response.use(
    (response) => {
        // We can extract data directly here if we want to simplify service calls
        // e.g., return response.data;
        return response;
    },
    (error) => {
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;

        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('userInfo');
            // Optional: Redirect to login or dispatch logout action
            // window.location.href = '/login';
        }

        return Promise.reject(message);
    }
);

export default apiClient;
