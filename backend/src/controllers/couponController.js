import * as couponService from '../services/couponService.js';
import { successResponse } from '../utils/responseFormatter.js';

// @desc    Get coupon profile and validate rules
// @route   GET /api/coupons/:code
// @access  Public
const getCouponValidation = async (req, res, next) => {
    try {
        const coupon = await couponService.validateCoupon(req.params.code);
        
        // Return only what the frontend safely needs to see
        res.json(successResponse({
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        }, 'Coupon validated successfully'));
    } catch (error) {
        next(error);
    }
};

export { getCouponValidation };

