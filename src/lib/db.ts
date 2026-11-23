import fs from 'fs';
import path from 'path';
import {
  User,
  Conversation,
  ConversationMessage,
  MemoryItem,
  Task,
  Reminder,
  Project,
  Meeting,
  Booking,
  JobApplication,
  ExamSchedule,
  ResearchReport,
  DocumentRecord,
  IntegrationAccount,
  AuditEvent,
} from '@/types';

interface DatabaseSchema {
  users: User[];
  conversations: Conversation[];
  messages: ConversationMessage[];
  memories: MemoryItem[];
  tasks: Task[];
  reminders: Reminder[];
  projects: Project[];
  meetings: Meeting[];
  bookings: Booking[];
  jobs: JobApplication[];
  exams: ExamSchedule[];
  research: ResearchReport[];
  documents: DocumentRecord[];
  integrations: IntegrationAccount[];
  auditLogs: AuditEvent[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'jarvis_db.json');

function getInitialData(): DatabaseSchema {
  const defaultUserId = 'usr_jarvis_master';
  const now = new Date().toISOString();

  return {
    users: [
      {
        id: defaultUserId,
        email: 'operator@jarvis-os.ai',
        name: 'Umar Basha',
        role: 'admin',
        languagePreference: 'en',
        voiceSpeed: 1.18,
        voiceName: 'Neural Male Deep',
        theme: 'dark',
        experimentalRepeat: false,
        createdAt: now,
      },
    ],
    conversations: [
      {
        id: 'conv_initial',
        userId: defaultUserId,
        title: 'System Initialization & Overview',
        createdAt: now,
        updatedAt: now,
      },
    ],
    messages: [
      {
        id: 'msg_1',
        conversationId: 'conv_initial',
        role: 'assistant',
        content:
          'Welcome to JARVIS AI 2.0. Operating system ready. English, Telugu, and Hindi natural voice interfaces active. All project, scheduling, memory, and executive modules synchronized.',
        language: 'en',
        createdAt: now,
      },
    ],
    memories: [
      {
        id: 'mem_1',
        userId: defaultUserId,
        category: 'preference',
        content: 'Prefers concise spoken summaries with visual drill-down tables for technical metrics.',
        normalizedSummary: 'Brief spoken answers, detailed visual cards.',
        tags: ['voice', 'preference', 'ui'],
        language: 'en',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'mem_2',
        userId: defaultUserId,
        category: 'routine',
        content: 'Morning workout scheduled at 06:30 AM every weekday followed by engineering standup.',
        normalizedSummary: 'Daily workout 06:30 AM weekdays; Standup 09:30 AM.',
        tags: ['health', 'routine', 'fitness'],
        language: 'en',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'mem_3',
        userId: defaultUserId,
        category: 'goal',
        content: 'Complete JARVIS AI 2.0 production deployment and launch SaaS client workspace.',
        normalizedSummary: 'Deliver JARVIS AI 2.0 system with multilingual voice & project engine.',
        tags: ['career', 'projects', 'milestone'],
        language: 'en',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'mem_4',
        userId: defaultUserId,
        category: 'preference',
        content: 'Repu morning 7 ki workout reminder pettu (Telugu request registered).',
        normalizedSummary: 'Morning workout scheduled for 07:00 AM.',
        tags: ['telugu', 'workout', 'normalized_cross_lang'],
        language: 'te',
        createdAt: now,
        updatedAt: now,
      },
    ],
    tasks: [
      {
        id: 'task_1',
        userId: defaultUserId,
        projectId: 'proj_1',
        title: 'Review production deployment checklist',
        description: 'Verify SSL certificates, CORS policies, rate limits, and push notification endpoints.',
        category: 'work',
        priority: 'urgent',
        status: 'pending',
        dueDate: '2026-11-24T18:00:00Z',
        subtasks: [
          { id: 'st_1', title: 'Verify service worker push hooks', completed: true },
          { id: 'st_2', title: 'Validate rate limiter headers', completed: false },
          { id: 'st_3', title: 'Audit database backup cycle', completed: false },
        ],
        sourceLanguage: 'en',
        createdAt: now,
      },
      {
        id: 'task_2',
        userId: defaultUserId,
        title: 'Morning cardiovascular workout',
        description: '30-minute high-intensity cardio session followed by stretching.',
        category: 'health',
        priority: 'high',
        status: 'pending',
        dueDate: '2026-11-24T06:30:00Z',
        subtasks: [],
        sourceLanguage: 'te',
        createdAt: now,
      },
      {
        id: 'task_3',
        userId: defaultUserId,
        projectId: 'proj_2',
        title: 'Prepare business pitch deck for Q1 investors',
        description: 'Structure 12-slide executive deck highlighting revenue growth and unit economics.',
        category: 'business',
        priority: 'high',
        status: 'in_progress',
        dueDate: '2026-11-25T15:00:00Z',
        subtasks: [
          { id: 'st_4', title: 'Compile market TAM/SAM analysis', completed: true },
          { id: 'st_5', title: 'Draft financial projection slide', completed: false },
        ],
        sourceLanguage: 'en',
        createdAt: now,
      },
      {
        id: 'task_4',
        userId: defaultUserId,
        title: 'Revise Distributed Systems Chapter 4',
        description: 'Prepare notes on Paxos, Raft consensus, and vector clocks for upcoming technical evaluation.',
        category: 'education',
        priority: 'medium',
        status: 'pending',
        dueDate: '2026-11-26T20:00:00Z',
        subtasks: [],
        sourceLanguage: 'hi',
        createdAt: now,
      },
    ],
    reminders: [
      {
        id: 'rem_1',
        userId: defaultUserId,
        taskId: 'task_2',
        title: 'Morning Workout & Health Routine',
        scheduledTime: '2026-11-24T06:30:00Z',
        recurrence: 'daily',
        ringtone: 'chime',
        voiceAnnouncement: true,
        status: 'active',
        createdAt: now,
      },
      {
        id: 'rem_2',
        userId: defaultUserId,
        taskId: 'task_1',
        title: 'Call Client & Review Deployment Checklist',
        scheduledTime: '2026-11-24T16:00:00Z',
        recurrence: 'none',
        ringtone: 'urgent',
        voiceAnnouncement: true,
        status: 'active',
        createdAt: now,
      },
      {
        id: 'rem_3',
        userId: defaultUserId,
        title: 'Executive Team Sync Reminder',
        scheduledTime: '2026-11-24T10:00:00Z',
        recurrence: 'weekly',
        ringtone: 'vocal',
        voiceAnnouncement: true,
        status: 'active',
        createdAt: now,
      },
    ],
    projects: [
      {
        id: 'proj_1',
        userId: defaultUserId,
        name: 'JARVIS AI 2.0 Core Architecture',
        description: 'Design and rollout of the next-generation multilingual AI operating system.',
        objective: 'Deliver low-latency voice, intelligent memory, project governance, and PWA capabilities.',
        category: 'technical',
        startDate: '2026-11-01',
        deadline: '2026-12-15',
        priority: 'urgent',
        status: 'active',
        progressPercentage: 88,
        milestones: [
          { id: 'm_1', title: 'System Architecture & Schema', targetDate: '2026-11-05', completed: true },
          { id: 'm_2', title: 'Multilingual Voice Engine', targetDate: '2026-11-15', completed: true },
          { id: 'm_3', title: 'Application Modules & UI System', targetDate: '2026-11-24', completed: true },
          { id: 'm_4', title: 'End-to-End Test Suite & Verification', targetDate: '2026-11-30', completed: false },
        ],
        dependencies: ['Node Runtime', 'Web Speech API', 'PWA Service Worker'],
        budgetEstimated: 12000,
        budgetSpent: 4200,
        resources: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
        nextAction: 'Execute full multilingual test suite across English, Telugu, and Hindi voice triggers.',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'proj_2',
        userId: defaultUserId,
        name: 'Enterprise Client Workspace Launch',
        description: 'Commercial rollout of AI executive tools for enterprise operators.',
        objective: 'Sign first 5 enterprise pilot partnerships with automated reporting workflows.',
        category: 'business',
        startDate: '2026-11-10',
        deadline: '2026-12-30',
        priority: 'high',
        status: 'active',
        progressPercentage: 62,
        milestones: [
          { id: 'm_5', title: 'Enterprise Security Compliance Spec', targetDate: '2026-11-20', completed: true },
          { id: 'm_6', title: 'Pitch Deck & Client Presentations', targetDate: '2026-11-28', completed: false },
        ],
        dependencies: ['JARVIS Core Architecture'],
        budgetEstimated: 25000,
        budgetSpent: 8500,
        resources: ['Security Whitepaper', 'DOCX/PDF Generator'],
        nextAction: 'Finalize financial slide with projected ROI figures.',
        createdAt: now,
        updatedAt: now,
      },
    ],
    meetings: [
      {
        id: 'meet_1',
        userId: defaultUserId,
        title: 'Weekly Technical Architecture Sync',
        startTime: '2026-11-24T10:00:00Z',
        endTime: '2026-11-24T11:00:00Z',
        platform: 'google_meet',
        participants: ['architect@jarvis-os.ai', 'dev-lead@jarvis-os.ai', 'operator@jarvis-os.ai'],
        link: 'https://meet.google.com/abc-jarvis-sync',
        agenda: ['Voice latency benchmarks', 'Database query optimization', 'PWA notification test reports'],
        prepNotes: 'Bring latency logs from Telugu and Hindi voice streaming tests.',
        actionItems: ['Benchmark TTS latency under 1.2s threshold', 'Validate service worker caching'],
        createdAt: now,
      },
      {
        id: 'meet_2',
        userId: defaultUserId,
        title: 'Product Strategy & Roadmap Review',
        startTime: '2026-11-25T14:00:00Z',
        endTime: '2026-11-25T15:00:00Z',
        platform: 'zoom',
        participants: ['product@jarvis-os.ai', 'stakeholder@jarvis-os.ai'],
        link: 'https://zoom.us/j/9876543210',
        agenda: ['Q1 Feature prioritization', 'Autonomous booking engine guardrails'],
        prepNotes: 'Review confirmation safeguards for financial transactions.',
        actionItems: [],
        createdAt: now,
      },
    ],
    bookings: [
      {
        id: 'book_1',
        userId: defaultUserId,
        serviceType: 'flight',
        title: 'Bangalore to Hyderabad Round Trip',
        status: 'options_ready',
        searchCriteria: {
          from: 'BLR',
          to: 'HYD',
          departureDate: '2026-11-28',
          passengers: '1',
          class: 'Economy',
        },
        options: [
          {
            id: 'opt_1',
            name: 'IndiGo 6E-452',
            details: 'Non-stop | Dep: 07:15 AM - Arr: 08:25 AM | 1h 10m',
            price: '₹3,450',
            availability: '4 seats left',
            rating: 4.6,
          },
          {
            id: 'opt_2',
            name: 'Air India AI-542',
            details: 'Non-stop | Dep: 09:30 AM - Arr: 10:45 AM | 1h 15m',
            price: '₹3,820',
            availability: '6 seats left',
            rating: 4.4,
          },
        ],
        userConfirmed: false,
        createdAt: now,
      },
      {
        id: 'book_2',
        userId: defaultUserId,
        serviceType: 'hotel',
        title: 'Hyderabad Hi-Tech City Business Hotel',
        status: 'draft',
        searchCriteria: {
          city: 'Hyderabad',
          area: 'Hi-Tech City',
          checkIn: '2026-11-28',
          checkOut: '2026-11-30',
          guests: '1',
        },
        options: [
          {
            id: 'opt_3',
            name: 'The Westin Hyderabad Mindspace',
            details: 'Deluxe King Room | High-speed Wi-Fi | Breakfast included',
            price: '₹8,500/night',
            availability: 'Available',
            rating: 4.8,
          },
        ],
        userConfirmed: false,
        createdAt: now,
      },
    ],
    jobs: [
      {
        id: 'job_1',
        userId: defaultUserId,
        company: 'Apex AI Systems',
        role: 'Principal AI Architect',
        status: 'interviewing',
        appliedDate: '2026-11-10',
        interviewDate: '2026-11-26T15:30:00Z',
        notes: 'Round 3: System Design and Multi-Agent Orchestration architecture.',
        salaryExpectation: '₹45,00,000 - ₹55,00,000 / yr',
      },
      {
        id: 'job_2',
        userId: defaultUserId,
        company: 'HyperScale Cloud Labs',
        role: 'Staff Full-Stack Engineer',
        status: 'applied',
        appliedDate: '2026-11-18',
        notes: 'Submitted customized portfolio and JARVIS OS architecture case study.',
        salaryExpectation: '₹40,00,000 / yr',
      },
    ],
    exams: [
      {
        id: 'exam_1',
        userId: defaultUserId,
        subject: 'Advanced Distributed Systems & Consensus',
        examDate: '2026-12-05T09:30:00Z',
        totalMarks: 100,
        topicsCovered: ['Raft Consensus', 'Vector Clocks', 'Distributed Transactions (2PC/Saga)', 'Eventual Consistency'],
        revisionStatus: 'revising',
      },
      {
        id: 'exam_2',
        userId: defaultUserId,
        subject: 'Deep Learning & Speech Recognition Architectures',
        examDate: '2026-12-12T14:00:00Z',
        totalMarks: 100,
        topicsCovered: ['Conformer Models', 'CTC Loss', 'Neural Vocoders', 'Streaming Attention'],
        revisionStatus: 'not_started',
      },
    ],
    research: [
      {
        id: 'res_1',
        userId: defaultUserId,
        topic: 'Ultra-low Latency Neural Speech Streaming in 2026',
        summary:
          'Analysis of edge neural speech-to-text and streaming vocoders for sub-1.2s conversational voice response pipelines.',
        findings: [
          'Chunked streaming inference achieves 340ms first-audio generation over WebSockets.',
          'Client-side acoustic feature extraction lowers transmission payload by 42%.',
          'Multilingual code-switching requires acoustic token normalization to avoid translation artifacts.',
        ],
        sources: [
          { title: 'Neural Audio Synthesizers Conference 2026', url: 'https://arxiv.org/abs/2602.04512', date: '2026-02-14' },
          { title: 'W3C Speech Streaming Working Group Report', url: 'https://w3.org/TR/speech-streaming-2026', date: '2026-05-10' },
        ],
        risksAndLimitations: [
          'High network jitter can introduce buffer starvation on mobile 4G networks.',
          'Local Web Audio API processing increases CPU load by ~4% on mobile webviews.',
        ],
        opportunities: [
          'Enables instant speech interruption with zero server roundtrip lag.',
          'Provides seamless voice switching between Telugu, Hindi, and English.',
        ],
        recommendations: [
          'Adopt streaming chunk sizes of 160ms for initial speech packets.',
          'Implement aggressive local cache for standard confirmation vocalizations.',
        ],
        createdAt: now,
      },
    ],
    documents: [
      {
        id: 'doc_1',
        userId: defaultUserId,
        title: 'JARVIS AI 2.0 System Architecture Overview',
        docType: 'report',
        format: 'pdf',
        content: '# JARVIS AI 2.0 System Architecture\n\nA comprehensive personal AI operating system combining multilingual voice intelligence, persistent memory, project management, and automated executive tooling.',
        createdAt: now,
      },
      {
        id: 'doc_2',
        userId: defaultUserId,
        title: 'Q1 Enterprise Business Proposal',
        docType: 'proposal',
        format: 'docx',
        content: '# Executive Business Proposal: Intelligent Operating Systems for Leadership\n\nAutomating administrative overhead, scheduling conflicts, and data aggregation for high-output executives.',
        createdAt: now,
      },
    ],
    integrations: [
      {
        id: 'int_gmail',
        name: 'Gmail & Google Workspace',
        category: 'email',
        connected: true,
        permissionLevel: 'PREPARE',
        lastSync: '10 minutes ago',
        authType: 'oauth',
      },
      {
        id: 'int_gcal',
        name: 'Google Calendar',
        category: 'calendar',
        connected: true,
        permissionLevel: 'EXECUTE',
        lastSync: 'Just now',
        authType: 'oauth',
      },
      {
        id: 'int_github',
        name: 'GitHub Repositories',
        category: 'developer',
        connected: true,
        permissionLevel: 'READ',
        lastSync: '25 minutes ago',
        authType: 'oauth',
      },
      {
        id: 'int_slack',
        name: 'Slack Workspace',
        category: 'communication',
        connected: false,
        permissionLevel: 'PREPARE',
        authType: 'oauth',
      },
      {
        id: 'int_zoom',
        name: 'Zoom Meetings',
        category: 'communication',
        connected: true,
        permissionLevel: 'EXECUTE',
        lastSync: '1 hour ago',
        authType: 'oauth',
      },
    ],
    auditLogs: [
      {
        id: 'aud_1',
        userId: defaultUserId,
        action: 'Calendar Event Synchronization',
        resource: 'Google Calendar API',
        permissionLevelUsed: 'EXECUTE',
        status: 'success',
        timestamp: now,
        details: 'Synchronized 3 upcoming events and validated conflict matrix.',
      },
      {
        id: 'aud_2',
        userId: defaultUserId,
        action: 'Persistent Reminder Scheduled',
        resource: 'Reminder Engine',
        permissionLevelUsed: 'EXECUTE',
        status: 'success',
        timestamp: now,
        details: 'Created high-priority morning workout reminder with vocal chime.',
      },
    ],
  };
}

function ensureDbFile(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initial = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    const initial = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

export function readDb(): DatabaseSchema {
  return ensureDbFile();
}

export function writeDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Helper query functions
export const db = {
  getUsers: () => readDb().users,
  getUserById: (id: string) => readDb().users.find((u) => u.id === id),
  updateUserPreferences: (id: string, updates: Partial<User>) => {
    const data = readDb();
    const idx = data.users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      data.users[idx] = { ...data.users[idx], ...updates };
      writeDb(data);
      return data.users[idx];
    }
    return null;
  },

  getConversations: (userId: string) => readDb().conversations.filter((c) => c.userId === userId),
  getMessages: (conversationId: string) => readDb().messages.filter((m) => m.conversationId === conversationId),
  addMessage: (message: ConversationMessage) => {
    const data = readDb();
    data.messages.push(message);
    const conv = data.conversations.find((c) => c.id === message.conversationId);
    if (conv) {
      conv.updatedAt = message.createdAt;
    }
    writeDb(data);
    return message;
  },

  getMemories: (userId: string) => readDb().memories.filter((m) => m.userId === userId),
  addMemory: (memory: MemoryItem) => {
    const data = readDb();
    data.memories.unshift(memory);
    writeDb(data);
    return memory;
  },
  updateMemory: (id: string, updates: Partial<MemoryItem>) => {
    const data = readDb();
    const idx = data.memories.findIndex((m) => m.id === id);
    if (idx !== -1) {
      data.memories[idx] = { ...data.memories[idx], ...updates, updatedAt: new Date().toISOString() };
      writeDb(data);
      return data.memories[idx];
    }
    return null;
  },
  deleteMemory: (id: string) => {
    const data = readDb();
    data.memories = data.memories.filter((m) => m.id !== id);
    writeDb(data);
    return true;
  },

  getTasks: (userId: string) => readDb().tasks.filter((t) => t.userId === userId),
  addTask: (task: Task) => {
    const data = readDb();
    data.tasks.unshift(task);
    writeDb(data);
    return task;
  },
  updateTask: (id: string, updates: Partial<Task>) => {
    const data = readDb();
    const idx = data.tasks.findIndex((t) => t.id === id);
    if (idx !== -1) {
      data.tasks[idx] = { ...data.tasks[idx], ...updates };
      writeDb(data);
      return data.tasks[idx];
    }
    return null;
  },
  deleteTask: (id: string) => {
    const data = readDb();
    data.tasks = data.tasks.filter((t) => t.id !== id);
    writeDb(data);
    return true;
  },

  getReminders: (userId: string) => readDb().reminders.filter((r) => r.userId === userId),
  addReminder: (reminder: Reminder) => {
    const data = readDb();
    data.reminders.unshift(reminder);
    writeDb(data);
    return reminder;
  },
  updateReminder: (id: string, updates: Partial<Reminder>) => {
    const data = readDb();
    const idx = data.reminders.findIndex((r) => r.id === id);
    if (idx !== -1) {
      data.reminders[idx] = { ...data.reminders[idx], ...updates };
      writeDb(data);
      return data.reminders[idx];
    }
    return null;
  },
  deleteReminder: (id: string) => {
    const data = readDb();
    data.reminders = data.reminders.filter((r) => r.id !== id);
    writeDb(data);
    return true;
  },

  getProjects: (userId: string) => readDb().projects.filter((p) => p.userId === userId),
  addProject: (project: Project) => {
    const data = readDb();
    data.projects.unshift(project);
    writeDb(data);
    return project;
  },
  updateProject: (id: string, updates: Partial<Project>) => {
    const data = readDb();
    const idx = data.projects.findIndex((p) => p.id === id);
    if (idx !== -1) {
      data.projects[idx] = { ...data.projects[idx], ...updates, updatedAt: new Date().toISOString() };
      writeDb(data);
      return data.projects[idx];
    }
    return null;
  },
  deleteProject: (id: string) => {
    const data = readDb();
    data.projects = data.projects.filter((p) => p.id !== id);
    writeDb(data);
    return true;
  },

  getMeetings: (userId: string) => readDb().meetings.filter((m) => m.userId === userId),
  addMeeting: (meeting: Meeting) => {
    const data = readDb();
    data.meetings.unshift(meeting);
    writeDb(data);
    return meeting;
  },

  getBookings: (userId: string) => readDb().bookings.filter((b) => b.userId === userId),
  addBooking: (booking: Booking) => {
    const data = readDb();
    data.bookings.unshift(booking);
    writeDb(data);
    return booking;
  },
  updateBooking: (id: string, updates: Partial<Booking>) => {
    const data = readDb();
    const idx = data.bookings.findIndex((b) => b.id === id);
    if (idx !== -1) {
      data.bookings[idx] = { ...data.bookings[idx], ...updates };
      writeDb(data);
      return data.bookings[idx];
    }
    return null;
  },

  getJobs: (userId: string) => readDb().jobs.filter((j) => j.userId === userId),
  addJob: (job: JobApplication) => {
    const data = readDb();
    data.jobs.unshift(job);
    writeDb(data);
    return job;
  },

  getExams: (userId: string) => readDb().exams.filter((e) => e.userId === userId),
  addExam: (exam: ExamSchedule) => {
    const data = readDb();
    data.exams.unshift(exam);
    writeDb(data);
    return exam;
  },

  getResearch: (userId: string) => readDb().research.filter((r) => r.userId === userId),
  addResearch: (report: ResearchReport) => {
    const data = readDb();
    data.research.unshift(report);
    writeDb(data);
    return report;
  },

  getDocuments: (userId: string) => readDb().documents.filter((d) => d.userId === userId),
  addDocument: (doc: DocumentRecord) => {
    const data = readDb();
    data.documents.unshift(doc);
    writeDb(data);
    return doc;
  },

  getIntegrations: () => readDb().integrations,
  updateIntegration: (id: string, updates: Partial<IntegrationAccount>) => {
    const data = readDb();
    const idx = data.integrations.findIndex((i) => i.id === id);
    if (idx !== -1) {
      data.integrations[idx] = { ...data.integrations[idx], ...updates };
      writeDb(data);
      return data.integrations[idx];
    }
    return null;
  },

  getAuditLogs: (userId: string) => readDb().auditLogs.filter((a) => a.userId === userId),
  addAuditLog: (log: AuditEvent) => {
    const data = readDb();
    data.auditLogs.unshift(log);
    writeDb(data);
    return log;
  },
};
