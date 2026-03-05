import * as userService from '../services/userService.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const userData = await userService.authenticateUser(email, password);

    if (userData) {
        res.json(userData);
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    try {
        const userData = await userService.registerNewUser(req.body);
        if (userData) {
            res.status(201).json(userData);
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await userService.getUserById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export { authUser, registerUser, getUserProfile };
