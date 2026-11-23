'use client';

import React, { useState } from 'react';
import {
  Clock,
  CalendarCheck,
  WarningCircle,
  Plus,
  CheckCircle,
  VideoCamera,
  GraduationCap,
  Heartbeat,
} from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';

export default function TimetablePage() {
  const { tasks, reminders } = useJarvis();
  const [selectedView, setSelectedView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const scheduleSlots = [
    {
      time: '06:30 AM - 07:15 AM',
      title: 'Morning Cardio & Health Routine',
      category: 'health',
      type: 'Routine',
      status: 'active',
      icon: Heartbeat,
      conflict: false,
    },
    {
      time: '09:00 AM - 10:00 AM',
      title: 'JARVIS 2.0 Engineering Review',
      category: 'work',
      type: 'Work Session',
      status: 'active',
      icon: Clock,
      conflict: false,
    },
    {
      time: '10:00 AM - 11:00 AM',
      title: 'Technical Architecture Sync',
      category: 'meeting',
      type: 'Google Meet',
      status: 'upcoming',
      icon: VideoCamera,
      conflict: false,
    },
    {
      time: '10:30 AM - 11:30 AM',
      title: 'Overlapping Advisory Sync (Detected Conflict)',
      category: 'meeting',
      type: 'Calendar Sync',
      status: 'conflict',
      icon: WarningCircle,
      conflict: true,
    },
    {
      time: '02:00 PM - 03:30 PM',
      title: 'Distributed Systems Revision Session',
      category: 'education',
      type: 'Exam Prep',
      status: 'upcoming',
      icon: GraduationCap,
      conflict: false,
    },
    {
      time: '04:00 PM - 04:45 PM',
      title: 'Client Engagement Call & Checklist Review',
      category: 'work',
      type: 'Executive Call',
      status: 'upcoming',
      icon: Clock,
      conflict: false,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header and View Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            Scheduling & Conflict Engine
          </span>
          <h1 className="heading-3 text-white font-semibold">Master Timetable</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Synchronized routines, study sessions, and meetings with automatic conflict detection.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-surface-dark2 p-1 rounded-xl border border-jarvis-surfaceBorder">
          {(['daily', 'weekly', 'monthly'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-3 py-1.5 rounded-lg caption-3 capitalize transition-colors interactive-tap ${
                selectedView === view
                  ? 'bg-jarvis-accentBlue text-white font-semibold'
                  : 'text-jarvis-textSecondary hover:text-white'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Conflict Alert Box */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
        <WarningCircle size={22} className="text-jarvis-warning shrink-0 mt-0.5" />
        <div>
          <span className="title-4 text-white font-semibold block">1 Scheduling Conflict Detected</span>
          <p className="caption-2 text-jarvis-textSecondary">
            "Overlapping Advisory Sync" overlaps with "Technical Architecture Sync" by 30 minutes at 10:30 AM.
            You can say "Jarvis, move meeting to Friday" to resolve.
          </p>
        </div>
      </div>

      {/* Schedule Slots Timeline */}
      <div className="space-y-4">
        {scheduleSlots.map((slot, index) => {
          const Icon = slot.icon;
          return (
            <div
              key={index}
              className={`p-5 rounded-2xl border transition-all ${
                slot.conflict
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-surface-dark1 border-jarvis-surfaceBorder hover:border-jarvis-accentBlue/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      slot.conflict
                        ? 'bg-amber-500/20 text-jarvis-warning'
                        : 'bg-surface-dark2 text-jarvis-accentCyan border border-jarvis-surfaceBorder'
                    }`}
                  >
                    <Icon size={20} weight="bold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="caption-4 font-mono text-jarvis-textMuted">{slot.time}</span>
                      <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2 py-0.5 rounded">
                        {slot.type}
                      </span>
                    </div>
                    <h3 className="title-3 text-white font-semibold">{slot.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {slot.conflict ? (
                    <span className="caption-4 font-mono text-jarvis-warning bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                      Conflict Active
                    </span>
                  ) : (
                    <span className="caption-4 font-mono text-jarvis-success bg-jarvis-success/10 px-2.5 py-1 rounded-md border border-jarvis-success/20">
                      Synchronized
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
