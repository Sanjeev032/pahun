import * as userService from '../services/userService.js';
import config from '../config/index.js';
import { successResponse } from '../utils/responseFormatter.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../services/emailService.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = await userService.authenticateUser(email, password);

        if (userData) {
            res.json(successResponse(userData, 'Login successful'));
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const userData = await userService.registerNewUser(req.body);
        if (userData) {
            // Send welcome email asynchronously so it doesn't block the response
            sendWelcomeEmail(userData.email, userData.name).catch(console.error);

            res.status(201).json(successResponse(userData, 'Registration successful'));
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.user._id);

        if (user) {
            res.json(successResponse({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }));
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Forgot Password - Send reset email
// @route   POST /api/users/forgotpassword
// @access  Public
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const resetToken = await userService.generatePasswordResetToken(email);

        const resetUrl = `${config.frontendUrl}/reset-password/${resetToken}`;

        try {
            await sendPasswordResetEmail(email, resetUrl);
            res.status(200).json(successResponse(null, 'Password reset email sent'));
        } catch (error) {
            res.status(500);
            throw new Error('Email could not be sent');
        }
    } catch (error) {
        next(error);
    }
};


// @desc    Reset Password
// @route   PUT /api/users/resetpassword/:token
// @access  Public
const resetPassword = async (req, res, next) => {
    try {
        // req.params.token holds the raw token, req.body.password holds the new password
        const updatedUser = await userService.resetPasswordWithToken(req.params.token, req.body.password);
        res.status(200).json(successResponse(updatedUser, 'Password reset successful'));
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(successResponse(users, 'Users fetched successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
    try {
        const success = await userService.deleteUserById(req.params.id);
        if (success) {
            res.json(successResponse(null, 'User removed successfully'));
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Promote user to admin
// @route   PUT /api/users/:id/promote
// @access  Private/Admin
const promoteUser = async (req, res, next) => {
    try {
        const updatedUser = await userService.promoteToAdmin(req.params.id);
        res.json(successResponse(updatedUser, 'User promoted to admin'));
    } catch (error) {
        next(error);
    }
};

// @desc    Revoke admin role
// @route   PUT /api/users/:id/revoke
// @access  Private/Admin
const revokeUserAdmin = async (req, res, next) => {
    try {
        const updatedUser = await userService.revokeAdminRole(req.params.id);
        res.json(successResponse(updatedUser, 'Admin role revoked'));
    } catch (error) {
        next(error);
    }
};

export { 
    authUser, 
    registerUser, 
    getUserProfile, 
    forgotPassword, 
    resetPassword,
    getUsers,
    deleteUser,
    promoteUser,
    revokeUserAdmin
};
