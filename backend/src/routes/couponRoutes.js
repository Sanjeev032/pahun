import express from 'express';
import { getCouponValidation } from '../controllers/couponController.js';

const router = express.Router();

router.get('/:code', getCouponValidation);

export default router;
