import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

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
