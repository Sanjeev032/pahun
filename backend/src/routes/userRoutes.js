import express from 'express';
import {
    authUser,
    registerUser,
    getUserProfile,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    promoteUser,
    revokeUserAdmin
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:token', resetPassword);
router.get('/profile', protect, getUserProfile);

// Admin User Management Routes
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);
router.put('/:id/promote', protect, admin, promoteUser);
router.put('/:id/revoke', protect, admin, revokeUserAdmin);

export default router;
