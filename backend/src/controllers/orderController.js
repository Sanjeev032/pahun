import * as orderService from '../services/orderService.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    try {
        const createdOrder = await orderService.createOrder(req.body, req.user._id);
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    const order = await orderService.getOrderDetails(req.params.id);

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
};

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
    const updatedOrder = await orderService.markOrderAsPaid(req.params.id, req.body);

    if (updatedOrder) {
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await orderService.getUserOrders(req.user._id);
    res.json(orders);
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    const orders = await orderService.getAllOrders();
    res.json(orders);
};

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
};
