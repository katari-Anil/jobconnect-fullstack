import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

let prisma: any;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch {}

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { search, location, jobType, skill } = req.query;

    if (prisma) {
      const where: any = {};
      if (search) {
        where.OR = [
          { title: { contains: String(search), mode: 'insensitive' } },
          { company: { contains: String(search), mode: 'insensitive' } },
          { description: { contains: String(search), mode: 'insensitive' } }
        ];
      }
      if (location) {
        where.location = { contains: String(location), mode: 'insensitive' };
      }
      if (jobType && jobType !== 'All') {
        where.jobType = String(jobType);
      }

      const jobs = await prisma.job.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(jobs);
    }

    return res.status(200).json({ message: 'Configure DATABASE_URL to query PostgreSQL directly.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to fetch jobs' });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (prisma) {
      const job = await prisma.job.findUnique({
        where: { id },
        include: { applications: true }
      });
      if (!job) return res.status(404).json({ error: 'Job not found' });
      return res.status(200).json(job);
    }
    return res.status(200).json({ id });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const createJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      company,
      description,
      skills,
      location,
      salary,
      jobType,
      experience,
      deadline,
      openings,
      category
    } = req.body;

    if (prisma) {
      const job = await prisma.job.create({
        data: {
          title,
          company,
          description,
          skills: Array.isArray(skills) ? skills : [],
          location,
          salary,
          jobType: jobType || 'FULL_TIME',
          experience: experience || 'Fresher',
          deadline: new Date(deadline),
          openings: Number(openings) || 1,
          category: category || 'Software Engineering'
        }
      });
      return res.status(201).json(job);
    }

    return res.status(201).json({ message: 'Job created in mock preview', data: req.body });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to create job' });
  }
};

export const updateJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (prisma) {
      const updated = await prisma.job.update({
        where: { id },
        data: req.body
      });
      return res.status(200).json(updated);
    }
    return res.status(200).json({ id, ...req.body });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to update job' });
  }
};

export const deleteJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (prisma) {
      await prisma.job.delete({ where: { id } });
      return res.status(200).json({ message: 'Job deleted successfully' });
    }
    return res.status(200).json({ message: 'Job deleted' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to delete job' });
  }
};
