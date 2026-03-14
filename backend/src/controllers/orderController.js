import * as orderService from '../services/orderService.js';
import { successResponse } from '../utils/responseFormatter.js';
import { sendOrderConfirmationEmail } from '../services/emailService.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res, next) => {
    try {
        const createdOrder = await orderService.createOrder(req.body, req.user._id);
        
        // Send order confirmation email async
        if (req.user && req.user.email) {
            sendOrderConfirmationEmail(req.user.email, createdOrder).catch(console.error);
        }

        res.status(201).json(successResponse(createdOrder, 'Order created successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderDetails(req.params.id);

        if (order) {
            res.json(successResponse(order));
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res, next) => {
    try {
        const updatedOrder = await orderService.markOrderAsPaid(req.params.id, req.body);

        if (updatedOrder) {
            res.json(successResponse(updatedOrder, 'Order marked as paid'));
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getUserOrders(req.user._id);
        res.json(successResponse(orders));
    } catch (error) {
        next(error);
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(successResponse(orders));
    } catch (error) {
        next(error);
    }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
    try {
        const updatedOrder = await orderService.updateOrderToDelivered(req.params.id, req.body);
        res.json(successResponse(updatedOrder, 'Order marked as delivered'));
    } catch (error) {
        next(error);
    }
};

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
};
