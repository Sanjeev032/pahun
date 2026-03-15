import { verifyToken } from '@clerk/clerk-sdk-node';
import User from '../models/userModel.js';

// Protect routes
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify the session token using Clerk
            const decoded = await verifyToken(token, {
                secretKey: process.env.CLERK_SECRET_KEY,
            });

            // Find user in our DB by clerkId
            const user = await User.findOne({ clerkId: decoded.sub });

            if (!user) {
                res.status(401);
                throw new Error('User not found in database');
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('Auth Error:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};

// Admin middleware
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403); // Forbidden is better than 401 for role issues
        throw new Error('Not authorized as an admin');
    }
};

export { protect, adminOnly as admin };
