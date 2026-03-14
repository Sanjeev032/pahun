/**
 * Backend Constants
 */

export const PAGINATION_LIMIT = 10;

export const ORDER_STATUS = {
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
};

export const TAX_RATE = 0.18; // 18% GST
export const SHIPPING_CHARGES = 50;
export const FREE_SHIPPING_THRESHOLD = 500;

export const JWT_EXPIRES_IN = '30d';

export const FILE_UPLOAD_LIMIT = '10mb';

export const ALLOWED_FILE_TYPES = /jpeg|jpg|png|webp/;
