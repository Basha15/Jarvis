'use client';

import React from 'react';
import Link from 'next/link';
import {
  Kanban,
  Clock,
  BellSimpleRinging,
  CheckSquareOffset,
  Brain,
  ShieldCheck,
  TrendUp,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';

export default function DashboardPage() {
  const { tasks, reminders, projects } = useJarvis();

  const pendingTasks = tasks.filter((t) => t.status !== 'completed');
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const activeReminders = reminders.filter((r) => r.status === 'active');
  const activeProjects = projects.filter((p) => p.status === 'active');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Overview Banner */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            System Executive Overview
          </span>
          <h1 className="heading-3 text-white font-semibold">Good day, Operator Umar</h1>
          <p className="body-4 text-jarvis-textSecondary">
            JARVIS AI 2.0 is actively synchronizing your schedules, projects, and persistent reminders.
          </p>
        </div>
        <Link
          href="/app"
          className="button-md bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-2 rounded-xl interactive-tap shadow-lg shadow-blue-500/20"
        >
          <span>Open Voice Assistant</span>
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>

      {/* Metric Counters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
          <div className="flex items-center justify-between mb-2">
            <span className="caption-3 font-mono text-jarvis-textMuted uppercase">Active Tasks</span>
            <CheckSquareOffset size={18} className="text-jarvis-accentBlue" />
          </div>
          <div className="heading-3 text-white font-bold">{pendingTasks.length}</div>
          <span className="caption-4 text-jarvis-textSecondary">{completedTasks.length} completed</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
          <div className="flex items-center justify-between mb-2">
            <span className="caption-3 font-mono text-jarvis-textMuted uppercase">Active Reminders</span>
            <BellSimpleRinging size={18} className="text-jarvis-warning" />
          </div>
          <div className="heading-3 text-white font-bold">{activeReminders.length}</div>
          <span className="caption-4 text-jarvis-textSecondary">Persistent chime active</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
          <div className="flex items-center justify-between mb-2">
            <span className="caption-3 font-mono text-jarvis-textMuted uppercase">Projects in Flight</span>
            <Kanban size={18} className="text-jarvis-accentPurple" />
          </div>
          <div className="heading-3 text-white font-bold">{activeProjects.length}</div>
          <span className="caption-4 text-jarvis-textSecondary">
            Avg progress: {Math.round(projects.reduce((acc, p) => acc + p.progressPercentage, 0) / (projects.length || 1))}%
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
          <div className="flex items-center justify-between mb-2">
            <span className="caption-3 font-mono text-jarvis-textMuted uppercase">Autonomy Matrix</span>
            <ShieldCheck size={18} className="text-jarvis-success" />
          </div>
          <div className="heading-3 text-white font-bold">Level 4</div>
          <span className="caption-4 text-jarvis-success">Strict Audit Enabled</span>
        </div>
      </div>

      {/* Main Grid: Projects & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects Status */}
        <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="title-2 text-white font-semibold flex items-center gap-2">
                <Kanban size={20} className="text-jarvis-accentPurple" />
                Active Projects Roadmap
              </h2>
              <Link href="/app/projects" className="caption-3 text-jarvis-accentBlue hover:underline flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                  <div className="flex items-center justify-between mb-2">
                    <span className="title-4 text-white font-medium">{proj.name}</span>
                    <span className="caption-4 font-mono text-jarvis-accentCyan">{proj.progressPercentage}%</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-surface-dark3 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-jarvis-accentBlue to-jarvis-accentPurple rounded-full"
                      style={{ width: `${proj.progressPercentage}%` }}
                    />
                  </div>
                  <div className="caption-4 text-jarvis-textSecondary">
                    <strong className="text-jarvis-textPrimary">Next:</strong> {proj.nextAction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Reminders & Deadlines */}
        <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="title-2 text-white font-semibold flex items-center gap-2">
                <BellSimpleRinging size={20} className="text-jarvis-warning" />
                Persistent Reminders
              </h2>
              <Link href="/app/reminders" className="caption-3 text-jarvis-accentBlue hover:underline flex items-center gap-1">
                Manage alerts <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {activeReminders.map((rem) => (
                <div key={rem.id} className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex items-center justify-between">
                  <div>
                    <span className="title-4 text-white block">{rem.title}</span>
                    <span className="caption-5 font-mono text-jarvis-textMuted">
                      Scheduled: {new Date(rem.scheduledTime).toLocaleDateString()} at{' '}
                      {new Date(rem.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark3 px-2 py-1 rounded border border-jarvis-surfaceBorder">
                    {rem.recurrence}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Queue Breakdown */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div className="flex items-center justify-between mb-4">
          <h2 className="title-2 text-white font-semibold flex items-center gap-2">
            <CheckSquareOffset size={20} className="text-jarvis-accentBlue" />
            Priority Task Queue
          </h2>
          <Link href="/app/tasks" className="caption-3 text-jarvis-accentBlue hover:underline flex items-center gap-1">
            Open Task Manager <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pendingTasks.map((t) => (
            <div key={t.id} className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex items-start justify-between">
              <div>
                <span className="title-4 text-white block mb-1">{t.title}</span>
                <p className="caption-3 text-jarvis-textSecondary mb-2">{t.description}</p>
                <div className="flex items-center gap-2">
                  <span className="caption-5 font-mono text-jarvis-accentCyan bg-surface-dark3 px-2 py-0.5 rounded">
                    {t.category}
                  </span>
                  <span className="caption-5 font-mono text-jarvis-warning bg-surface-dark3 px-2 py-0.5 rounded uppercase">
                    {t.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
