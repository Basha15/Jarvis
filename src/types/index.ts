export type Language = 'en' | 'te' | 'hi';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  languagePreference: Language;
  voiceSpeed: number;
  voiceName: string;
  theme: 'dark' | 'light';
  experimentalRepeat: boolean;
  createdAt: string;
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  language: Language;
  createdAt: string;
  intent?: string;
  actionTaken?: string;
  suggestedTasks?: string[];
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export type MemoryCategory = 'preference' | 'routine' | 'goal' | 'project' | 'fact' | 'instruction';

export interface MemoryItem {
  id: string;
  userId: string;
  category: MemoryCategory;
  content: string;
  normalizedSummary: string;
  tags: string[];
  language: Language;
  createdAt: string;
  updatedAt: string;
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type TaskCategory = 'personal' | 'work' | 'education' | 'business' | 'health';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  userId: string;
  projectId?: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  subtasks: SubTask[];
  sourceLanguage: Language;
  createdAt: string;
  completedAt?: string;
}

export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'second_experiment';
export type ReminderStatus = 'active' | 'triggered' | 'paused' | 'dismissed' | 'completed';

export interface Reminder {
  id: string;
  userId: string;
  taskId?: string;
  title: string;
  scheduledTime: string;
  recurrence: RecurrenceType;
  ringtone: 'standard' | 'chime' | 'urgent' | 'vocal';
  voiceAnnouncement: boolean;
  status: ReminderStatus;
  createdAt: string;
}

export type ProjectCategory = 'technical' | 'business' | 'marketing' | 'career' | 'education' | 'personal';
export type ProjectStatus = 'planning' | 'active' | 'delayed' | 'completed';

export interface ProjectMilestone {
  id: string;
  title: string;
  targetDate: string;
  completed: boolean;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  objective: string;
  category: ProjectCategory;
  startDate: string;
  deadline: string;
  priority: Priority;
  status: ProjectStatus;
  progressPercentage: number;
  milestones: ProjectMilestone[];
  dependencies: string[];
  budgetEstimated?: number;
  budgetSpent?: number;
  resources: string[];
  nextAction: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meeting {
  id: string;
  userId: string;
  title: string;
  startTime: string;
  endTime: string;
  platform: 'google_meet' | 'zoom' | 'teams' | 'in_person';
  participants: string[];
  link?: string;
  agenda: string[];
  prepNotes: string;
  minutes?: string;
  actionItems: string[];
  createdAt: string;
}

export type BookingServiceType = 'restaurant' | 'hotel' | 'flight' | 'train' | 'event' | 'meeting_room';
export type BookingStatus = 'draft' | 'options_ready' | 'pending_confirmation' | 'confirmed' | 'cancelled';

export interface BookingOption {
  id: string;
  name: string;
  details: string;
  price: string;
  availability: string;
  rating?: number;
}

export interface Booking {
  id: string;
  userId: string;
  serviceType: BookingServiceType;
  title: string;
  status: BookingStatus;
  searchCriteria: Record<string, string>;
  options: BookingOption[];
  selectedOptionId?: string;
  confirmationCode?: string;
  confirmedDetails?: string;
  userConfirmed: boolean;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  userId: string;
  company: string;
  role: string;
  status: 'wishlist' | 'applied' | 'interviewing' | 'offer' | 'rejected';
  appliedDate: string;
  interviewDate?: string;
  notes: string;
  salaryExpectation?: string;
}

export interface ExamSchedule {
  id: string;
  userId: string;
  subject: string;
  examDate: string;
  totalMarks?: number;
  topicsCovered: string[];
  revisionStatus: 'not_started' | 'revising' | 'ready';
}

export interface ResearchReport {
  id: string;
  userId: string;
  topic: string;
  summary: string;
  findings: string[];
  sources: { title: string; url: string; date?: string }[];
  risksAndLimitations: string[];
  opportunities: string[];
  recommendations: string[];
  createdAt: string;
}

export interface DocumentRecord {
  id: string;
  userId: string;
  title: string;
  docType: 'business_plan' | 'proposal' | 'pitch_deck' | 'agenda' | 'minutes' | 'report' | 'research' | 'study_notes';
  format: 'docx' | 'pdf' | 'pptx' | 'csv' | 'markdown';
  content: string;
  createdAt: string;
}

export type PermissionLevel = 'READ' | 'PREPARE' | 'EXECUTE' | 'PREAUTHORIZED';

export interface IntegrationAccount {
  id: string;
  name: string;
  category: 'email' | 'calendar' | 'storage' | 'developer' | 'productivity' | 'communication';
  connected: boolean;
  permissionLevel: PermissionLevel;
  lastSync?: string;
  authType: 'oauth' | 'api_key';
}

export interface AuditEvent {
  id: string;
  userId: string;
  action: string;
  resource: string;
  permissionLevelUsed: PermissionLevel;
  status: 'success' | 'flagged' | 'denied';
  timestamp: string;
  details: string;
}
