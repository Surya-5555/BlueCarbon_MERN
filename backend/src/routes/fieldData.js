import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createFieldData,
  saveDraft,
  getAllFieldData,
  getFieldDataById,
  getMyFieldData,
  updateFieldData,
  verifyFieldData,
  deleteFieldData
} from '../controllers/fieldDataController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// User routes
router.post('/', createFieldData);
router.post('/draft', saveDraft);
router.get('/my-data', getMyFieldData);
router.get('/:id', getFieldDataById);
router.put('/:id', updateFieldData);
router.delete('/:id', deleteFieldData);

// Admin/Verifier routes
router.get('/', authorize('admin', 'verifier'), getAllFieldData);
router.put('/:id/verify', authorize('admin', 'verifier'), verifyFieldData);

export default router;

