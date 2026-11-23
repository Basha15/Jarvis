'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChatCircleDots,
  Gauge,
  Clock,
  CalendarCheck,
  BellSimpleRinging,
  CheckSquareOffset,
  Kanban,
  Briefcase,
  TrendUp,
  VideoCamera,
  Ticket,
  GraduationCap,
  Student,
  MagnifyingGlass,
  FileText,
  Brain,
  PlugsConnected,
  ShieldCheck,
  SpeakerHigh,
  GearSix,
  X,
} from '@phosphor-icons/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const navGroups = [
    {
      group: 'Core AI',
      items: [
        { name: 'JARVIS Voice OS', href: '/app', icon: ChatCircleDots },
        { name: 'Personal Dashboard', href: '/app/dashboard', icon: Gauge },
      ],
    },
    {
      group: 'Schedule & Tasks',
      items: [
        { name: 'Daily Timetable', href: '/app/timetable', icon: Clock },
        { name: 'Calendar Engine', href: '/app/calendar', icon: CalendarCheck },
        { name: 'Reminders & Alerts', href: '/app/reminders', icon: BellSimpleRinging },
        { name: 'Task Manager', href: '/app/tasks', icon: CheckSquareOffset },
      ],
    },
    {
      group: 'Projects & Workspaces',
      items: [
        { name: 'Project Governance', href: '/app/projects', icon: Kanban },
        { name: 'Business Executive', href: '/app/business', icon: Briefcase },
        { name: 'Marketing Analytics', href: '/app/marketing', icon: TrendUp },
        { name: 'Research Intelligence', href: '/app/research', icon: MagnifyingGlass },
      ],
    },
    {
      group: 'Coordination',
      items: [
        { name: 'Meetings & Minutes', href: '/app/meetings', icon: VideoCamera },
        { name: 'Booking Assistant', href: '/app/bookings', icon: Ticket },
        { name: 'Documents & PPTX', href: '/app/documents', icon: FileText },
      ],
    },
    {
      group: 'Growth & Learning',
      items: [
        { name: 'Career & Interviews', href: '/app/career', icon: GraduationCap },
        { name: 'Education & Exams', href: '/app/education', icon: Student },
      ],
    },
    {
      group: 'System Governance',
      items: [
        { name: 'Persistent Memory', href: '/app/memory', icon: Brain },
        { name: 'Integrations Hub', href: '/app/integrations', icon: PlugsConnected },
        { name: 'Audit & Compliance', href: '/app/audit', icon: ShieldCheck },
        { name: 'Voice & Language', href: '/app/voice-settings', icon: SpeakerHigh },
        { name: 'Security & Profile', href: '/app/settings', icon: GearSix },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-surface-dark1 border-r border-jarvis-surfaceBorder flex flex-col transition-transform duration-300 ease-jarvis-base lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-jarvis-surfaceBorder flex items-center justify-between">
          <Link href="/app" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-jarvis-accentBlue flex items-center justify-center font-mono font-bold text-xs text-white">
              J2
            </div>
            <div>
              <span className="title-4 text-white font-bold block">JARVIS AI</span>
              <span className="caption-5 font-mono text-jarvis-accentCyan block">OPERATING SYSTEM</span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-jarvis-textSecondary hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.group}>
              <div className="caption-5 font-mono uppercase tracking-wider text-jarvis-textMuted px-3 mb-2">
                {group.group}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg title-4 transition-colors duration-200 ${
                        isActive
                          ? 'bg-jarvis-surfaceElevated text-white border-l-2 border-jarvis-accentBlue font-semibold'
                          : 'text-jarvis-textSecondary hover:text-white hover:bg-surface-dark2'
                      }`}
                    >
                      <Icon
                        size={18}
                        weight={isActive ? 'fill' : 'regular'}
                        className={isActive ? 'text-jarvis-accentCyan' : 'text-jarvis-textMuted'}
                      />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-jarvis-surfaceBorder flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-surface-dark3 border border-jarvis-accentBlue/30 flex items-center justify-center text-sm font-bold text-white">
            UB
          </div>
          <div className="flex-1 min-w-0">
            <span className="title-5 text-white block truncate">Umar Basha</span>
            <span className="caption-5 text-jarvis-accentCyan font-mono block">Operator • Online</span>
          </div>
        </div>
      </aside>
    </>
  );
};
