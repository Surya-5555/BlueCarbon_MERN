import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
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

// Configure multer storage (memory - do not write to disk)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ storage: multer.memoryStorage() });

// All routes require authentication
router.use(protect);

// User routes
router.post('/', createFieldData);
// Multipart submit with photos
router.post(
  '/submit',
  upload.fields([
    { name: 'photoNorth', maxCount: 1 },
    { name: 'photoSouth', maxCount: 1 },
    { name: 'photoEast', maxCount: 1 },
    { name: 'photoWest', maxCount: 1 },
    { name: 'photoAdditional', maxCount: 10 },
    { name: 'soilLabResults', maxCount: 1 },
  ]),
  createFieldData
);
// Draft should also accept optional photos via multipart
router.post(
  '/draft',
  upload.fields([
    { name: 'photoNorth', maxCount: 1 },
    { name: 'photoSouth', maxCount: 1 },
    { name: 'photoEast', maxCount: 1 },
    { name: 'photoWest', maxCount: 1 },
    { name: 'photoAdditional', maxCount: 20 },
    { name: 'soilLabResults', maxCount: 1 },
  ]),
  saveDraft
);
router.get('/my-data', getMyFieldData);
router.get('/:id', getFieldDataById);
router.put('/:id', updateFieldData);
router.delete('/:id', deleteFieldData);

// Admin/Verifier routes
router.get('/', authorize('admin', 'verifier'), getAllFieldData);
router.put('/:id/verify', authorize('admin', 'verifier'), verifyFieldData);

export default router;

