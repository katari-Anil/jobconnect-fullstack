import { Router } from 'express';
import { getStudentDashboard, getAdminDashboard } from '../controllers/dashboardController';
import { authenticateJWT, requireAdmin, requireStudent } from '../middleware/authMiddleware';

const router = Router();

router.get('/student', authenticateJWT, requireStudent, getStudentDashboard);
router.get('/admin', authenticateJWT, requireAdmin, getAdminDashboard);

export default router;
