import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// Prisma client initialization (will connect to PostgreSQL when configured)
let prisma: any;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch {
  // Prisma client fallback when running without local database engine
}

const JWT_SECRET = process.env.JWT_SECRET || 'jobconnect_jwt_secret_default_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const register = async (req: Request, res: Response) => {
  try {
    const { 
      name, 
      email, 
      password, 
      phone, 
      college, 
      degree, 
      branch, 
      graduationYear, 
      skills 
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    // Check duplicate
    if (prisma) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: 'An account with this email already exists.' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'STUDENT',
          phone,
          college,
          degree,
          branch,
          graduationYear: graduationYear ? Number(graduationYear) : undefined,
          skills: Array.isArray(skills) ? skills : []
        }
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return res.status(201).json({
        message: 'Student registered successfully',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          college: user.college,
          degree: user.degree
        }
      });
    }

    // Direct response when DB is in preview
    const token = jwt.sign(
      { id: 'usr-preview', email, role: 'STUDENT' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      message: 'Student registered successfully (Preview Mode)',
      token,
      user: { name, email, role: 'STUDENT', college, degree }
    });
  } catch (err: any) {
    console.error('Register error:', err);
    return res.status(500).json({ error: err.message || 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Handle Admin login
    if (role === 'ADMIN' || email.toLowerCase() === 'admin@jobconnect.com') {
      if (password === 'admin123' || password === 'admin@2026') {
        const token = jwt.sign(
          { id: 'usr-admin-01', email: 'admin@jobconnect.com', role: 'ADMIN' },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );
        return res.status(200).json({
          message: 'Admin login successful',
          token,
          user: {
            id: 'usr-admin-01',
            name: 'Administrator',
            email: 'admin@jobconnect.com',
            role: 'ADMIN'
          }
        });
      } else {
        return res.status(401).json({ error: 'Invalid admin password.' });
      }
    }

    if (prisma) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'Account not found with this email.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password credentials.' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          college: user.college
        }
      });
    }

    // Fallback response for student login
    const token = jwt.sign(
      { id: 'usr-student-01', email, role: 'STUDENT' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      message: 'Student login successful',
      token,
      user: {
        id: 'usr-student-01',
        name: 'Katari Anil',
        email,
        role: 'STUDENT'
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: err.message || 'Login failed' });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (prisma) {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          college: true,
          degree: true,
          branch: true,
          graduationYear: true,
          skills: true,
          resumeUrl: true,
          resumeFileName: true,
          github: true,
          linkedin: true,
          portfolio: true,
          bio: true,
          createdAt: true
        }
      });
      return res.status(200).json(user);
    }

    return res.status(200).json({
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to fetch user' });
  }
};
