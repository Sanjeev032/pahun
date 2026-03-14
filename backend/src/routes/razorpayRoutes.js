import express from 'express';
import { createRazorpayOrder, verifyRazorpayWebhook } from '../controllers/razorpayController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a Razorpay order from the frontend
// Needs to be protected as only logged in users should make orders
router.post('/order', protect, createRazorpayOrder);

// Webhook route - must use express.raw to keep the body exactly as Stripe/Razorpay sends it
// to ensure HMAC signature verification passes.
router.post('/webhook', express.raw({ type: 'application/json' }), verifyRazorpayWebhook);

export default router;
