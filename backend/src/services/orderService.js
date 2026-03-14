import mongoose from 'mongoose';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { sendPaymentSuccessEmail } from '../services/emailService.js';
import * as couponService from '../services/couponService.js';

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
        totalPrice, // Note: we will recalculate this if a valid coupon is present
        couponCode,
    } = orderData;

    if (orderItems && orderItems.length === 0) {
        throw new Error('No order items');
    }

    // 1. Stock Validation (Prevent Checkout if out of stock)
    for (const item of orderItems) {
        // Need to check based on whether frontend sent `_id` or `product` containing the ID
        const productId = item.product || item._id; 
        const product = await Product.findById(productId);
        
        if (!product) {
            throw new Error(`Product not found: ${item.name}`);
        }
        if (product.countInStock < item.qty) {
            throw new Error(`Product out of stock: ${product.name}. Available quantity: ${product.countInStock}`);
        }
    }

    // 2. Validate Coupon and Calculate True Price Securely (Backend Override)
    let calculatedTotalPrice = totalPrice; 
    let appliedDiscount = 0;

    if (couponCode) {
        try {
            const validCoupon = await couponService.validateCoupon(couponCode);
            appliedDiscount = couponService.calculateDiscountAmount(itemsPrice, validCoupon.discountPercentage);
            // Re-calculate the grand total manually mapping: itemsPrice - discount + taxPrice + shippingPrice
            calculatedTotalPrice = (itemsPrice - appliedDiscount) + taxPrice + shippingPrice;

            // Increment usage 
            await couponService.executeUsageIncrement(null, couponCode); // Doing this outside a session for createOrder. 
        } catch (error) {
            throw new Error(`Coupon processing failed: ${error.message}`);
        }
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
        totalPrice: calculatedTotalPrice, // Use the verified total
        discountAmount: appliedDiscount, // Optional tracking
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
 * Update order status to paid and deduct stock atomically
 * @param {string} id 
 * @param {Object} paymentResult 
 * @returns {Promise<Object>}
 */
export const markOrderAsPaid = async (id, paymentResult) => {
    // 2. Mongoose Transaction for atomic stock update
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const order = await Order.findById(id).session(session);

        if (!order) {
            throw new Error('Order not found');
        }

        if (order.isPaid) {
            throw new Error('Order is already paid');
        }

        // Deduct stock safely
        for (const item of order.orderItems) {
            const product = await Product.findById(item.product).session(session);
            
            if (!product) {
                throw new Error(`Product not found: ${item.name}`);
            }

            if (product.countInStock < item.qty) {
                throw new Error(`Transaction aborted: ${product.name} ran out of stock before payment finalized.`);
            }

            product.countInStock -= item.qty;
            await product.save({ session });
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: paymentResult.id,
            status: paymentResult.status,
            email_address: paymentResult.email_address || paymentResult.email,
            method: paymentResult.method
        };

        const updatedOrder = await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        // Send payment success email async
        if (updatedOrder.paymentResult && updatedOrder.paymentResult.email_address) {
            // Need the full populated user for their name/better email info, or simply
            // use the email passed from the payment processor.
            sendPaymentSuccessEmail(updatedOrder.paymentResult.email_address, updatedOrder).catch(console.error);
        }

        return updatedOrder;
    } catch (error) {
        // Rollback any stock deductions if anything fails
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
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
/**
 * Update order tracking status to delivered
 * @param {string} id 
 * @param {Object} trackingInfo
 * @returns {Promise<Object>}
 */
export const updateOrderToDelivered = async (id, trackingInfo) => {
    const order = await Order.findById(id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.orderStatus = 'Delivered';
        
        if (trackingInfo && trackingInfo.trackingNumber) {
            order.trackingNumber = trackingInfo.trackingNumber;
        }

        return await order.save();
    }
    
    throw new Error('Order not found');
};
