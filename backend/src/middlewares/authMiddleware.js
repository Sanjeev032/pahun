import { verifyToken } from '@clerk/clerk-sdk-node';
import User from '../models/userModel.js';

// Protect routes using Clerk tokens
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = await verifyToken(token);

      // Find or create user in our DB by Clerk ID
      let user = await User.findOne({ clerkId: decoded.sub });

      if (!user) {
        user = await User.create({
          clerkId: decoded.sub,
          email: decoded.email,
          name: decoded.firstName || decoded.email || 'User',
          avatar: decoded.imageUrl,
        });
      }

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
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

// Admin middleware
const adminOnly = (req, res, next) => {
    const adminEmail = process.env.ADMIN_EMAIL || 'sanjeev29039@gmail.com';
    
    if (req.user && req.user.email === adminEmail) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, adminOnly as admin };
