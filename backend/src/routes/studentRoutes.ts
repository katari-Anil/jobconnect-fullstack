import { Router } from 'express';
import { getStudents, getStudentById, updateProfile } from '../controllers/studentController';
import { authenticateJWT, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateJWT, requireAdmin, getStudents);
router.get('/:id', authenticateJWT, getStudentById);
router.put('/profile', authenticateJWT, updateProfile);

export default router;
