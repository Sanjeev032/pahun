import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';

/**
 * Authenticate user and return data with token
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
export const authenticateUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        };
    }
    return null;
};

/**
 * Register a new user
 * @param {Object} userData 
 * @returns {Promise<Object>}
 */
export const registerNewUser = async ({ name, email, password }) => {
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });

    if (user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        };
    }
    return null;
};

/**
 * Get user by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const getUserById = async (id) => {
    const user = await User.findById(id).select('-password');
    return user;
};

/**
 * Generate a password reset token and save to user
 * @param {string} email 
 * @returns {Promise<string>} raw unhashed token
 */
export const generatePasswordResetToken = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('There is no user with that email');
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire (1 hour)
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;

    await user.save();

    return resetToken;
};

/**
 * Reset password using token
 * @param {string} token 
 * @param {string} newPassword 
 * @returns {Promise<Object>} user data + token
 */
export const resetPasswordWithToken = async (token, newPassword) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        throw new Error('Invalid or expired token');
    }

    // Set new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
    };
};

/**
 * Get all users (Admin only)
 * @returns {Promise<Array>}
 */
export const getAllUsers = async () => {
    return await User.find({}).select('-password');
};

/**
 * Delete a user by ID
 * @param {string} id 
 * @returns {Promise<boolean>}
 */
export const deleteUserById = async (id) => {
    const user = await User.findById(id);

    if (user) {
        if (user.isAdmin) {
             throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({ _id: user._id });
        return true;
    }
    return false;
};

/**
 * Promote user to admin
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const promoteToAdmin = async (id) => {
    const user = await User.findById(id).select('-password');

    if (user) {
        user.isAdmin = true;
        const updatedUser = await user.save();
        return updatedUser;
    }
    
    throw new Error('User not found');
};

/**
 * Revoke admin role from user
 * @param {string} id 
 * @returns {Promise<Object>}
 */
export const revokeAdminRole = async (id) => {
    const user = await User.findById(id).select('-password');

    if (user) {
        user.isAdmin = false;
        const updatedUser = await user.save();
        return updatedUser;
    }

    throw new Error('User not found');
};
