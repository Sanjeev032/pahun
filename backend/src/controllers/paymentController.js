import Stripe from 'stripe';
import Order from '../models/orderModel.js';

// Initialize Stripe lazily or with a check
const getStripe = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn('STRIPE_SECRET_KEY is not defined in environment variables');
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
};

// @desc    Handle Stripe Webhook
// @route   POST /api/payments/webhook
// @access  Public
export const stripeWebhook = async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        const stripe = getStripe();
        // Construct the event from the raw payload using the signature and our webhook secret
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder');
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the specific event type we care about
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        
        // Example Stripe metadata usage:
        // When creating the PaymentIntent on the frontend/backend, you should pass metadata: { orderId: 'your_order_id_here' }
        const orderId = paymentIntent.metadata.orderId;

        if (orderId) {
            try {
                // Find the order in MongoDB using metadata.orderId
                const order = await Order.findById(orderId);

                if (order) {
                    order.isPaid = true;
                    order.paidAt = Date.now();
                    order.paymentResult = {
                        id: paymentIntent.id,
                        status: paymentIntent.status,
                        email: paymentIntent.receipt_email || paymentIntent.charges?.data?.[0]?.billing_details?.email,
                    };

                    await order.save();
                    console.log(`Order ${orderId} marked as paid successfully.`);
                } else {
                    console.warn(`Webhook: Order ${orderId} not found.`);
                }
            } catch (error) {
                console.error(`Error updating order ${orderId}: ${error.message}`);
                return res.status(500).json({ error: 'Server error updating order' });
            }
        } else {
            console.warn('Webhook: No orderId provided in metadata');
        }
    } else {
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
};
