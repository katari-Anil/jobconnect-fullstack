# JobConnect - Full Stack Job Portal & Internship Management System

> **A modern, end-to-end Full Stack career platform built for college students, university placement cells, and tech recruiters.**

[![Developer](https://img.shields.io/badge/Developer-Katari%20Anil-blue?style=flat&logo=github)](https://github.com/katari-Anil)
[![Role](https://img.shields.io/badge/Role-CSE%20Student%20%26%20Full%20Stack%20Developer-green)](#developer-information)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20PostgreSQL%20%7C%20Prisma-orange)](#technology-stack)
[![License](https://img.shields.io/badge/License-Apache--2.0-lightgrey.svg)](LICENSE)

---

## 🌟 Overview

**JobConnect** is a production-grade Full Stack web platform that bridges the gap between ambitious engineering students and corporate recruiters. It empowers candidates to discover verified internships and full-time roles, submit applications with PDF resumes and customized cover letters, and track recruitment progress in real time across 6 standardized hiring stages.

Recruiters and university placement administrators have access to an executive command center to publish listings, review candidate academic backgrounds, download resumes, and issue immediate status decisions (Under Review, Shortlisted, Interview, Selected, or Rejected).

---

## 👨‍💻 Developer Information

- **Developer Name:** Katari Anil
- **Role:** CSE Student & Full Stack Developer
- **GitHub:** [https://github.com/katari-Anil](https://github.com/katari-Anil)
- **LinkedIn:** [https://www.linkedin.com/in/katari-anil-b95157314](https://www.linkedin.com/in/katari-anil-b95157314)
- **Project Repository:** [https://github.com/katari-Anil/jobconnect](https://github.com/katari-Anil)

---

## 🚀 Key Features

### 🎓 1. Student Portal & Candidate Experience
- **Interactive Landing & Discovery:** Curated hero experience, search by role and city, featured jobs, and verified internship listings.
- **Student Registration & Profiles:** Academic details (College, Degree, Branch, Year of Graduation), skills tag manager, profile completion indicator, and developer portfolio links (GitHub, LinkedIn).
- **Secure Authentication:** Role-based JWT session handling, hashed passwords with bcrypt, and session retention.
- **Smart Job Search & Filters:** Filter by Job Type (`Full-Time`, `Part-Time`, `Internship`, `Remote`, `Hybrid`), city location, required tech stack, and salary compensation.
- **1-Click Application Flow:** PDF resume upload validation (<= 5MB), cover letter submission, and automatic duplicate application prevention.
- **Transparent Status Tracking:** Live tracking across 6 distinct stages (`Applied` ➔ `Under Review` ➔ `Shortlisted` ➔ `Interview` ➔ `Selected` / `Rejected`) with personalized recruiter notes.

### 🛡️ 2. Admin & Recruiter Console
- **Executive Analytics:** High-level metrics for Total Students, Active Openings, Application Volume, and Shortlisted Candidates.
- **Interactive Pipeline Visualizations:** Graphical breakdowns of applications across recruitment stages and job categories.
- **Full Job Lifecycle Management:** Create, edit, preview, and delete job postings with confirmation dialogs and field validation.
- **Candidate Evaluation Desk:** Filter applicants by status, review comprehensive academic records, inspect verified PDF resumes, and update recruitment status with real-time candidate notifications.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Lucide React Icons, Responsive UI/UX |
| **Backend** | Node.js, Express.js REST API, JSON Web Tokens (JWT), bcrypt |
| **Database & ORM** | PostgreSQL Cloud Database (Supabase / Neon / Render), Prisma ORM |
| **Validation & Upload** | Multi-part PDF validation, Zod schema validation, CORS security |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend), Cloud PostgreSQL |

---

## 📂 Project Architecture

```
jobconnect/
├── frontend/                     # Interactive React 19 Single Page App
│   ├── src/
│   │   ├── assets/               # Generated architectural photography & assets
│   │   ├── components/
│   │   │   ├── common/           # Modal, ConfirmDialog, StatusBadge, Toast
│   │   │   ├── jobs/             # ApplyJobModal
│   │   │   └── layout/           # Top Bar Navbar, Credit-rich Footer
│   │   ├── context/              # AuthContext (Role-based state & session)
│   │   ├── data/                 # Initial pre-seeded top tech jobs & data
│   │   ├── pages/                # All 14 Core Portal Pages
│   │   │   ├── HomePage.tsx
│   │   │   ├── JobsPage.tsx
│   │   │   ├── JobDetailsPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── MyApplicationsPage.tsx
│   │   │   ├── StudentProfilePage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminManageJobsPage.tsx
│   │   │   ├── AdminManageApplicationsPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── services/             # Storage & API parity engine
│   │   └── types/                # Strict TypeScript domain interfaces
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                      # Production Node.js & Express REST API
│   ├── prisma/
│   │   └── schema.prisma         # PostgreSQL Prisma relational models
│   ├── src/
│   │   ├── controllers/          # Auth, Jobs, Applications, Students, Dashboard
│   │   ├── middleware/           # JWT verification & RBAC authorization
│   │   ├── routes/               # Modular Express API endpoints
│   │   ├── app.ts                # Express application configuration
│   │   └── server.ts             # Server entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## 🗄️ Database Schema (Prisma PostgreSQL)

### Relationships:
- **User (1) ➔ Applications (N):** A student can submit applications to multiple jobs.
- **Job (1) ➔ Applications (N):** A job listing receives multiple student submissions.
- **Unique Constraint `@@unique([userId, jobId])`:** Guarantees that a candidate cannot apply multiple times for the exact same opening.

```prisma
model User {
  id             String        @id @default(uuid())
  name           String
  email          String        @unique
  password       String
  role           Role          @default(STUDENT)
  phone          String?
  college        String?
  degree         String?
  branch         String?
  graduationYear Int?
  skills         String[]
  resumeUrl      String?
  resumeFileName String?
  github         String?
  linkedin       String?
  portfolio      String?
  bio            String?
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
  applications   Application[]
}

model Job {
  id           String        @id @default(uuid())
  title        String
  company      String
  companyLogo  String?
  description  String
  requirements String[]
  skills       String[]
  location     String
  jobType      JobType       @default(FULL_TIME)
  salary       String
  experience   String
  deadline     DateTime
  openings     Int           @default(1)
  category     String        @default("Software Engineering")
  featured     Boolean       @default(false)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  applications Application[]
}

model Application {
  id             String            @id @default(uuid())
  userId         String
  jobId          String
  resumeUrl      String
  resumeFileName String
  coverLetter    String?
  notes          String?
  status         ApplicationStatus @default(APPLIED)
  appliedAt      DateTime          @default(now())
  updatedAt      DateTime          @updatedAt
  user           User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  job            Job               @relation(fields: [jobId], references: [id], onDelete: Cascade)

  @@unique([userId, jobId])
}
```

---

## 📡 REST API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Register a new student account |
| **POST** | `/api/auth/login` | Public | Sign in and retrieve JWT Bearer token |
| **GET** | `/api/auth/me` | Authenticated | Retrieve profile for logged-in user |
| **GET** | `/api/jobs` | Public | List & filter verified job postings |
| **GET** | `/api/jobs/:id` | Public | Retrieve detailed job specifications |
| **POST** | `/api/jobs` | Admin | Create a new job opening |
| **PUT** | `/api/jobs/:id` | Admin | Update job details & requirements |
| **DELETE** | `/api/jobs/:id` | Admin | Remove job listing |
| **POST** | `/api/applications` | Student | Submit new job application with PDF resume |
| **GET** | `/api/applications/my` | Student | Retrieve student's application history |
| **GET** | `/api/applications` | Admin | Retrieve all applicant records across platform |
| **PATCH** | `/api/applications/:id/status` | Admin | Advance candidate status & write review notes |
| **GET** | `/api/dashboard/student` | Student | Retrieve student KPI stats & recommendations |
| **GET** | `/api/dashboard/admin` | Admin | Retrieve recruitment funnel analytics |

---

## ⚙️ Installation & Setup Guide

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or pnpm
- PostgreSQL database instance (local or hosted on Supabase / Neon / Render)

### 1. Clone the Repository
```bash
git clone https://github.com/katari-Anil/jobconnect.git
cd jobconnect
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
```
The application will launch at `http://localhost:3000`.

### 3. Backend & PostgreSQL Database Setup
```bash
cd backend

# Install backend dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and supply your DATABASE_URL and JWT_SECRET

# Run Prisma Database Migrations
npx prisma migrate dev --name init

# (Optional) Launch Prisma Studio GUI
npx prisma studio

# Start Backend Express Server
npm run dev
```
The backend API server will listen on `http://localhost:5000`.

---

## 🚀 Deployment Instructions

### Frontend (Vercel)
1. Push your repository to GitHub (`https://github.com/katari-Anil/jobconnect`).
2. Import project into [Vercel](https://vercel.com).
3. Set Root Directory to `./`.
4. Build command: `npm run build`.
5. Output directory: `dist`.

### Backend (Render / Railway)
1. Create a **Web Service** on [Render](https://render.com).
2. Set Root Directory to `backend`.
3. Build command: `npm install && npx prisma generate && npm run build`.
4. Start command: `node dist/server.js`.
5. Add Environment Variables:
   - `DATABASE_URL`: PostgreSQL connection string.
   - `JWT_SECRET`: Random 64-char key.
   - `FRONTEND_URL`: Your Vercel frontend URL.

---

## 📑 License & Credits

Developed with ❤️ by **Katari Anil** | CSE Student & Full Stack Developer  
GitHub: [https://github.com/katari-Anil](https://github.com/katari-Anil)  
LinkedIn: [https://www.linkedin.com/in/katari-anil-b95157314](https://www.linkedin.com/in/katari-anil-b95157314)

© 2026 JobConnect. All Rights Reserved.
