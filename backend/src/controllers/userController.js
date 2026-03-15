import User from '../models/userModel.js';
import { successResponse } from '../utils/responseFormatter.js';

// @desc    Sync Clerk user with MongoDB
// @route   POST /api/users/sync
// @access  Public (protected by Clerk on frontend)
const syncUser = async (req, res, next) => {
    try {
        const { clerkId, email, name, avatar } = req.body;

        if (!clerkId || !email) {
            res.status(400);
            throw new Error('ClerkId and Email are required');
        }

        // 1. Try to find by clerkId
        let user = await User.findOne({ clerkId });
        let isNew = false;

        if (user) {
            // Migration check: if user has isAdmin true but role is default 'user', promote to admin
            // (Mongoose might still have isAdmin in the raw doc if strict is not enforced or if we use raw access)
            if (user._doc && user._doc.isAdmin && user.role === 'user') {
                user.role = 'admin';
            }
            
            // Update existing Clerk user
            user.name = name || user.name;
            user.email = email || user.email;
            user.avatar = avatar || user.avatar;
            await user.save();
        } else {
            // 2. Try to find by email (for users migrating from old system)
            user = await User.findOne({ email });
            
            if (user) {
                // Link existing email user to Clerk
                user.clerkId = clerkId;
                user.name = name || user.name;
                user.avatar = avatar || user.avatar;
                await user.save();
            } else {
                // 3. Create brand new user
                isNew = true;
                user = await User.create({
                    clerkId,
                    email,
                    name,
                    avatar,
                    role: 'user'
                });
            }
        }

        res.status(isNew ? 201 : 200).json(successResponse(user, 'User synced successfully'));
    } catch (error) {
        next(error);
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json(successResponse({
                _id: user._id,
                clerkId: user.clerkId,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            }));
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
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
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
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
        const user = await User.findById(req.params.id);
        if (user) {
            user.role = 'admin';
            const updatedUser = await user.save();
            res.json(successResponse(updatedUser, 'User promoted to admin'));
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Revoke admin role
// @route   PUT /api/users/:id/revoke
// @access  Private/Admin
const revokeUserAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.role = 'user';
            const updatedUser = await user.save();
            res.json(successResponse(updatedUser, 'Admin role revoked'));
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        next(error);
    }
};

export { 
    syncUser, 
    getUserProfile, 
    getUsers,
    deleteUser,
    promoteUser,
    revokeUserAdmin
};
