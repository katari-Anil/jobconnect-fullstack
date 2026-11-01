import { Router } from 'express';
import { getJobs, getJobById, createJob, updateJob, deleteJob } from '../controllers/jobController';
import { authenticateJWT, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Public Job discovery endpoints
router.get('/', getJobs);
router.get('/:id', getJobById);

// Admin-only management endpoints
router.post('/', authenticateJWT, requireAdmin, createJob);
router.put('/:id', authenticateJWT, requireAdmin, updateJob);
router.delete('/:id', authenticateJWT, requireAdmin, deleteJob);

export default router;
