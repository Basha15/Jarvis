'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/app/AppSidebar';
import { AppHeader } from '@/components/app/AppHeader';

const pageTitles: Record<string, string> = {
  '/app': 'JARVIS Voice OS 2.0',
  '/app/dashboard': 'Executive Dashboard',
  '/app/timetable': 'Daily Timetable & Schedule',
  '/app/calendar': 'Calendar & Conflict Matrix',
  '/app/reminders': 'Persistent Reminders & Alerts',
  '/app/tasks': 'Task & Routine Manager',
  '/app/projects': 'Project Governance',
  '/app/business': 'Business Executive Workspace',
  '/app/marketing': 'Marketing Intelligence',
  '/app/meetings': 'Meetings & Minutes',
  '/app/bookings': 'Autonomous Booking Assistant',
  '/app/career': 'Career & Interview Prep',
  '/app/education': 'Education & Examination Hub',
  '/app/research': 'Deep Research Workspace',
  '/app/documents': 'Documents & Presentations',
  '/app/memory': 'Long-Term AI Memory',
  '/app/integrations': 'Integrations Hub',
  '/app/audit': 'Activity History & Audit Trail',
  '/app/voice-settings': 'Voice & Multilingual Settings',
  '/app/settings': 'Security & System Settings',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const title = pageTitles[pathname] || 'JARVIS Operating System';

  return (
    <div className="min-h-screen bg-surface-dark0 flex text-jarvis-textPrimary">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <AppHeader onOpenSidebar={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
