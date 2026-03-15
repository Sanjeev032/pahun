import dotenv from 'dotenv';
dotenv.config();

/**
 * Centralized Backend Configuration
 */
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
    
    // Payment Gateway (Razorpay)
    razorpay: {
        keyId: process.env.RAZORPAY_KEY_ID,
        keySecret: process.env.RAZORPAY_KEY_SECRET,
    },

    // File Storage (Cloudinary)
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },

    // Email Service (Nodemailer/SendGrid)
    email: {
        service: process.env.EMAIL_SERVICE,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        from: process.env.EMAIL_FROM || 'no-reply@pahunn.com',
    },

    // Frontend URL for CORS and Links
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

// Validate critical config
const requiredKeys = ['MONGO_URI', 'CLERK_SECRET_KEY'];
requiredKeys.forEach((key) => {
    if (!process.env[key]) {
        console.warn(`WARNING: Missing critical environment variable: ${key}`);
    }
});

export default config;
