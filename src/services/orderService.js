import apiClient from './apiClient';

/**
 * Order API Service
 */
const orderService = {
    /**
     * Create a new order
     */
    createOrder: async (orderData) => {
        const response = await apiClient.post('/orders', orderData);
        return response.data;
    },

    /**
     * Get order details by ID
     */
    getOrderDetails: async (id) => {
        const response = await apiClient.get(`/orders/${id}`);
        return response.data;
    },

    /**
     * Get logged-in user orders
     */
    getMyOrders: async () => {
        const response = await apiClient.get('/orders/myorders');
        return response.data;
    },

    /**
     * Create Razorpay order (Backend integration)
     */
    createRazorpayOrder: async (orderId) => {
        const response = await apiClient.post('/payments/razorpay/order', { orderId });
        return response.data;
    },

    /**
     * Update order to delivered (Admin)
     */
    markAsDelivered: async (id, trackingNumber) => {
        const response = await apiClient.put(`/orders/${id}/deliver`, { trackingNumber });
        return response.data;
    },
};

export default orderService;
