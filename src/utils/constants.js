/**
 * Application-wide constants for the frontend
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const COMPANY_NAME = 'PAHUNN';
export const ADMIN_EMAIL = 'sanjeev29039@gmail.com';

export const PAGINATION_LIMIT = 10;

export const CURRENCY = '₹';

export const SHIPPING_CHARGES = 50;

export const ORDER_STATUS = {
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
};

export const PAYMENT_METHODS = {
    RAZORPAY: 'Razorpay',
    COD: 'Cash on Delivery',
};

export const MAX_CART_ITEMS = 5;
export const FREE_SHIPPING_THRESHOLD = 500;

export const TAX_RATE = 0.18; // 18% GST

export const SUPPORT_EMAIL = 'support@pahun.com';

export const SOCIAL_LINKS = {
    INSTAGRAM: 'https://instagram.com/pahunofficial',
    TWITTER: 'https://twitter.com/pahuncouture',
    FACEBOOK: 'https://facebook.com/pahunofficial',
};

export const NAV_LINKS = [
    { name: 'Men', href: '/shop?category=men' },
    { name: 'Women', href: '/shop?category=women' },
    { name: 'Accessories', href: '/shop?category=accessories' },
    { name: 'Tailoring', href: '/shop?category=tailoring' },
];

export const FOOTER_LINKS = {
    HOUSE: [
        { name: 'About Us', href: '/about' },
        { name: 'Atelier', href: '/atelier' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Careers', href: '/careers' },
    ],
    SUPPORT: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping & Returns', href: '/shipping' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'FAQ', href: '/faq' },
    ],
};
export const PRODUCT_CATEGORIES = ['All', 'Men', 'Women', 'Tailoring', 'Accessories'];

export const ADMIN_INFO = {
    NAME: 'Admin Deputy',
    ROLE: 'Director',
    BRANCH: 'Main Branch',
};
