import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/orderModel.js';
import * as orderService from '../services/orderService.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payments/razorpay/order
// @access  Private
export const createRazorpayOrder = async (req, res) => {
    try {
        const { orderId } = req.body; // Expecting the MongoDB order ID from the frontend

        // Fetch the order from the database
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Amount must be in the smallest currency unit (paise for INR)
        const amountInPaise = Math.round(order.totalPrice * 100);

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt_order_${order._id}`,
            notes: {
                orderId: order._id.toString(),
            },
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Update the order with the razorpayOrderId
        order.razorpayOrderId = razorpayOrder.id;
        await order.save();

        res.status(200).json({
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
        });

    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Verify Razorpay Webhook
// @route   POST /api/payments/razorpay/webhook
// @access  Public
export const verifyRazorpayWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Razorpay sends the payload as a raw body String
    // Since we use express.json() for other routes, we need the raw payload
    // If the webhook route is defined AFTER express.json(), req.body will be an object
    // To generate the HMAC securely, we need the raw body. 
    // We will ensure the route uses express.raw() or we will stringify the payload.
    // However, stringifying a parsed body can sometimes cause mismatch issues.
    // It is best to use express.raw for webhooks.

    const reqBodyText = req.body; // expected to be raw buffer/string if middleware is setup correctly
    const shasum = crypto.createHmac('sha256', secret);

    shasum.update(reqBodyText);

    const digest = shasum.digest('hex');

    const signature = req.headers['x-razorpay-signature'];

    if (digest === signature) {
        console.log('Razorpay webhook verified.');

        // Proceed to handle the event
        // The event payload is in JSON, so we parse it now
        const payload = JSON.parse(reqBodyText.toString());

        if (payload.event === 'payment.captured' || payload.event === 'order.paid') {
            const payment = payload.payload.payment.entity;
            const razorpayOrderId = payment.order_id;
            
            try {
                // Find order by razorpayOrderId
                const order = await Order.findOne({ razorpayOrderId: razorpayOrderId });

                if (order) {
                    await orderService.markOrderAsPaid(order._id, {
                        id: payment.id,
                        status: payment.status,
                        email: payment.email, // capture customer email
                        method: payment.method
                    });
                    console.log(`Order ${order._id} updated successfully via Razorpay Webhook.`);
                } else {
                    console.error(`Order not found for Razorpay Order ID: ${razorpayOrderId}`);
                }
            } catch (err) {
                 console.error('Error updating order:', err);
                 // We still return 200 so Razorpay doesn't keeping retrying due to our DB error
            }
        }

        res.status(200).json({ status: 'ok' });
    } else {
        console.error('Razorpay signature verification failed.');
        res.status(400).json({ message: 'Invalid signature' });
    }
};
