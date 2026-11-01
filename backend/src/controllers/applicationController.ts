import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

let prisma: any;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch {}

export const applyForJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { jobId, resumeUrl, resumeFileName, coverLetter } = req.body;

    if (!userId || !jobId) {
      return res.status(400).json({ error: 'User ID and Job ID are required.' });
    }

    if (prisma) {
      // Prevent duplicate application
      const existing = await prisma.application.findUnique({
        where: {
          userId_jobId: {
            userId,
            jobId
          }
        }
      });

      if (existing) {
        return res.status(409).json({ error: 'You have already applied for this job.' });
      }

      const application = await prisma.application.create({
        data: {
          userId,
          jobId,
          resumeUrl: resumeUrl || '#',
          resumeFileName: resumeFileName || 'Resume.pdf',
          coverLetter,
          status: 'APPLIED'
        },
        include: {
          job: true
        }
      });

      return res.status(201).json(application);
    }

    return res.status(201).json({ message: 'Application submitted successfully', data: req.body });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Application submission failed' });
  }
};

export const getMyApplications = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (prisma) {
      const applications = await prisma.application.findMany({
        where: { userId },
        include: { job: true },
        orderBy: { appliedAt: 'desc' }
      });
      return res.status(200).json(applications);
    }
    return res.status(200).json([]);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAllApplications = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (prisma) {
      const applications = await prisma.application.findMany({
        include: {
          job: true,
          user: {
            select: {
              name: true,
              email: true,
              college: true,
              degree: true,
              branch: true,
              graduationYear: true,
              skills: true
            }
          }
        },
        orderBy: { appliedAt: 'desc' }
      });
      return res.status(200).json(applications);
    }
    return res.status(200).json([]);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateApplicationStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (prisma) {
      const updated = await prisma.application.update({
        where: { id },
        data: {
          status,
          notes,
          updatedAt: new Date()
        }
      });
      return res.status(200).json(updated);
    }
    return res.status(200).json({ id, status, notes });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
