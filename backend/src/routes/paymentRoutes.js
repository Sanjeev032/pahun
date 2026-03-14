import express from 'express';
import { stripeWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Mount the webhook route. Notice we use express.raw() here.
// IMPORTANT: This route must be mounted BEFORE any app.use(express.json()) in server.js
// so that the incoming request body remains as a Buffer/Raw format, which Stripe requires.
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

export default router;
