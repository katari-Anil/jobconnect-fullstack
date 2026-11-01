import { Router } from 'express';
import { 
  applyForJob, 
  getMyApplications, 
  getAllApplications, 
  updateApplicationStatus 
} from '../controllers/applicationController';
import { authenticateJWT, requireAdmin, requireStudent } from '../middleware/authMiddleware';

const router = Router();

// Student endpoints
router.post('/', authenticateJWT, requireStudent, applyForJob);
router.get('/my', authenticateJWT, requireStudent, getMyApplications);

// Admin endpoints
router.get('/', authenticateJWT, requireAdmin, getAllApplications);
router.patch('/:id/status', authenticateJWT, requireAdmin, updateApplicationStatus);

export default router;
