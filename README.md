# JARVIS AI 2.0 — Personal AI Operating System

JARVIS AI 2.0 is an intelligent, multilingual personal artificial intelligence operating system designed for desktop, tablet, and mobile devices. It manages daily routines, technical projects, business documentation, meetings, bookings, and career growth through natural voice and text interactions.

---

## Key Capabilities

- **Multilingual Voice Intelligence**: Speaks and understands English, Telugu, and Hindi with automatic language identification, code-switching support (Hinglish / Tenglish), and natural male neural voices.
- **Sub-1.2s Response Latency**: Optimized speech pipeline with immediate token streaming, natural cadence, and instant voice interruption.
- **Cross-Language Persistent Memory**: Create a reminder in Telugu (`"repu morning 7 ki workout reminder pettu"`) and complete it in English (`"I finished my workout"`).
- **Strictly No Quick Actions**: Modern, clean conversational console centered on voice and hierarchical navigation without cluttered shortcut tiles or buttons.
- **20 Complete Application Workspaces**:
  1. Main JARVIS Assistant Interface (`/app`)
  2. Personal Executive Dashboard (`/app/dashboard`)
  3. Daily Timetable & Schedule (`/app/timetable`)
  4. Calendar & Conflict Matrix (`/app/calendar`)
  5. Reminders & Persistent Alerts (`/app/reminders`)
  6. Task & Subtask Manager (`/app/tasks`)
  7. Project Management & Milestones (`/app/projects`)
  8. Business Executive Workspace (`/app/business`)
  9. Marketing Intelligence & Analytics (`/app/marketing`)
  10. Meetings & Minutes Coordination (`/app/meetings`)
  11. Autonomous Booking Assistant (`/app/bookings`)
  12. Career & Job Management (`/app/career`)
  13. Education & Examination Hub (`/app/education`)
  14. Deep Research Workspace (`/app/research`)
  15. Documents & Presentations (`/app/documents`)
  16. Long-Term AI Memory (`/app/memory`)
  17. Integrations Hub (`/app/integrations`)
  18. Activity History & Audit Trail (`/app/audit`)
  19. Voice & Multilingual Settings (`/app/voice-settings`)
  20. Security & Profile Settings (`/app/settings`)
- **Real File Generation**: Generates real downloadable PDF, DOCX (Word), and CSV files on demand.
- **Progressive Web App (PWA)**: Installable via Chrome on desktop and Android with offline shell and Web Push support.
- **4-Tier Permission Matrix**: READ, PREPARE, EXECUTE, and PREAUTHORIZED security model with full audit logging.

---

## Quick Start Guide

### 1. Installation
```bash
git clone <repo-url> jarvis-os
cd jarvis-os
npm install
```

### 2. Configuration
Copy the environment template:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in Google Chrome.

### 4. Build & Production Run
```bash
npm run build
npm start
```

### 5. Run Automated End-to-End Tests
```bash
python scripts/test_e2e.py
```

---

## Architecture Overview

```
src/
├── app/                      # Next.js App Router (Public + Authenticated Pages)
│   ├── page.tsx              # Marketing Landing Page (Hero, Tagline Reveal, FAQ, CTA)
│   ├── features/             # Feature Breakdown
│   ├── how-it-works/         # 5-Step Architecture Flow
│   ├── security/             # 4-Tier Permission Matrix
│   ├── privacy/              # Privacy & Microphone Governance
│   ├── pricing/              # Plans & Pricing
│   ├── signin/               # Operator Authentication
│   ├── signup/               # Identity Registration
│   ├── app/                  # Authenticated Application Shell
│   │   ├── page.tsx          # Main Voice & Assistant Console
│   │   ├── dashboard/        # Executive Dashboard
│   │   ├── timetable/        # Daily Timetable & Conflicts
│   │   ├── calendar/         # Connected Calendar
│   │   ├── reminders/        # Persistent Reminders
│   │   ├── tasks/            # Task Manager
│   │   ├── projects/         # Project Governance
│   │   ├── business/         # Business Workspace & DOCX/PDF
│   │   ├── marketing/        # Marketing Analytics
│   │   ├── meetings/         # Meetings & Agendas
│   │   ├── bookings/         # Booking Assistant
│   │   ├── career/           # Career & Mock Interviews
│   │   ├── education/        # Exam Schedules & Revision
│   │   ├── research/         # Research Reports & Sources
│   │   ├── documents/        # Downloadable Document Archive
│   │   ├── memory/           # Persistent Memory Graph
│   │   ├── integrations/     # OAuth & Integrations Center
│   │   ├── audit/            # Immutable Audit Trail
│   │   ├── voice-settings/   # Voice & Multilingual Tuning
│   │   └── settings/         # Profile & Privacy Purge
│   └── api/                  # Full REST & Processing Endpoints
├── components/               # Accessible UI Components
│   ├── AudioWaveformVisualizer.tsx # Multi-state audio visualizer
│   ├── app/                  # App Header & Sidebar Navigation
│   └── public/               # Floating Navbar, Footer, TaglineReveal
├── context/                  # JarvisContext & Voice Recognition Engine
├── lib/
│   ├── db.ts                 # Persistent JSON/SQLite Database Layer
│   └── ai.ts                 # Multilingual Semantic Processor & Normalizer
└── types/                    # Unified TypeScript Definitions
```

---

## License & Sovereignty

All system records, memories, and files remain the sole property of the user under local encryption and GDPR/CCPA data sovereignty controls.
