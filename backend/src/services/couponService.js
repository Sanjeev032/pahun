import Coupon from '../models/couponModel.js';

/**
 * Validate a coupon code based on business rules
 * @param {string} code 
 * @returns {Promise<Object>} Coupon document if valid
 * @throws Error if conditions fail
 */
export const validateCoupon = async (code) => {
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
        throw new Error('Invalid coupon code');
    }

    if (!coupon.isActive) {
        throw new Error('This coupon code is currently inactive');
    }

    if (new Date() > new Date(coupon.expiryDate)) {
        throw new Error('This coupon code has expired');
    }

    if (coupon.usedCount >= coupon.maxUses) {
        throw new Error('This coupon has reached its maximum usage limit');
    }

    return coupon;
};

/**
 * Calculate newly discounted price
 * @param {number} itemsPrice 
 * @param {number} discountPercentage 
 * @returns {number} The discount amount applied
 */
export const calculateDiscountAmount = (itemsPrice, discountPercentage) => {
    return (itemsPrice * discountPercentage) / 100;
};

/**
 * Handle incrementing the usage metrics atomically via a session
 * @param {Object} session 
 * @param {string} code 
 */
export const executeUsageIncrement = async (session, code) => {
    await Coupon.findOneAndUpdate(
        { code: code.toUpperCase() },
        { $inc: { usedCount: 1 } },
        { session }
    );
};
