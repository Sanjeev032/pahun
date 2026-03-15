import express from 'express';
import {
    syncUser,
    getUserProfile,
    getUsers,
    deleteUser,
    promoteUser,
    revokeUserAdmin
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/sync', syncUser);
router.get('/profile', protect, getUserProfile);

// Admin User Management Routes
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);
router.put('/:id/promote', protect, admin, promoteUser);
router.put('/:id/revoke', protect, admin, revokeUserAdmin);

export default router;
