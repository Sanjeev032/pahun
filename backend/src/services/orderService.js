import Order from '../models/orderModel.js';

/**
 * Create a new order
 * @param {Object} orderData 
 * @param {string} userId 
 * @returns {Promise<Object>}
 */
export const createOrder = async (orderData, userId) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = orderData;

    if (orderItems && orderItems.length === 0) {
        throw new Error('No order items');
    }

    const order = new Order({
        orderItems: orderItems.map((x) => ({
            ...x,
            product: x._id,
            _id: undefined,
        })),
        user: userId,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    return await order.save();
};

/**
 * Get order by ID with user info
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const getOrderDetails = async (id) => {
    return await Order.findById(id).populate('user', 'name email');
};

/**
 * Update order status to paid
 * @param {string} id 
 * @param {Object} paymentResult 
 * @returns {Promise<Object>}
 */
export const markOrderAsPaid = async (id, paymentResult) => {
    const order = await Order.findById(id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: paymentResult.id,
            status: paymentResult.status,
            update_time: paymentResult.update_time,
            email_address: paymentResult.email_address,
        };

        return await order.save();
    }
    return null;
};

/**
 * Get orders for a specific user
 * @param {string} userId 
 * @returns {Promise<Array>}
 */
export const getUserOrders = async (userId) => {
    return await Order.find({ user: userId });
};

/**
 * Get all orders for admin
 * @returns {Promise<Array>}
 */
export const getAllOrders = async () => {
    return await Order.find({}).populate('user', 'id name');
};
