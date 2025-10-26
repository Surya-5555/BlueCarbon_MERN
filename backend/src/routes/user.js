import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { 
  updateUserRole, 
  getAllUsers, 
  getUserById, 
  toggleUserStatus 
} from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Admin only routes
router.route('/')
  .get(authorize('admin'), getAllUsers);

router.route('/:userId')
  .get(getUserById);

router.route('/:userId/role')
  .put(authorize('admin'), updateUserRole);

router.route('/:userId/toggle-status')
  .put(authorize('admin'), toggleUserStatus);

export default router;
