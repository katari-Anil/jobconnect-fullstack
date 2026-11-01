import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

let prisma: any;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch {}

export const getStudents = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (prisma) {
      const students = await prisma.user.findMany({
        where: { role: 'STUDENT' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          college: true,
          degree: true,
          branch: true,
          graduationYear: true,
          skills: true,
          createdAt: true
        }
      });
      return res.status(200).json(students);
    }
    return res.status(200).json([]);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const getStudentById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (prisma) {
      const student = await prisma.user.findUnique({
        where: { id },
        include: { applications: { include: { job: true } } }
      });
      if (!student) return res.status(404).json({ error: 'Student not found' });
      return res.status(200).json(student);
    }
    return res.status(200).json({ id });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    if (prisma) {
      const updated = await prisma.user.update({
        where: { id: userId },
        data: req.body
      });
      return res.status(200).json(updated);
    }
    return res.status(200).json({ id: userId, ...req.body });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
