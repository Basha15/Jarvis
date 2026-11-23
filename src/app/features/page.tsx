'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';
import {
  SpeakerHigh,
  Brain,
  Kanban,
  Clock,
  Briefcase,
  Ticket,
  GraduationCap,
  ShieldCheck,
  TrendUp,
  FileText,
  MagnifyingGlass,
  ArrowRight,
} from '@phosphor-icons/react';

export default function FeaturesPage() {
  const featureList = [
    {
      icon: SpeakerHigh,
      title: 'Multilingual Neural Voice Engine',
      desc: 'Seamless speech recognition and natural male neural voice generation in English, Telugu, and Hindi with automatic language identification.',
      metrics: 'Under 1.2s first audio playback',
    },
    {
      icon: Brain,
      title: 'Persistent Long-Term Memory',
      desc: 'Context retention across days and weeks. Normalized semantic data model allows creating items in Telugu and retrieving them in English.',
      metrics: 'Zero memory loss across reboots',
    },
    {
      icon: Clock,
      title: 'Timetable, Reminders & Alerts',
      desc: 'Daily, weekly, and monthly schedule intelligence. Reminders persist until explicitly completed, canceled, or paused by you.',
      metrics: 'Push notification & vocal alerts',
    },
    {
      icon: Kanban,
      title: 'Project Governance Workspace',
      desc: 'Milestone management, dependency analysis, overdue work detection, and automated weekly progress generation for technical projects.',
      metrics: 'Roadmap & checklist synthesis',
    },
    {
      icon: Briefcase,
      title: 'Business Executive Assistant',
      desc: 'Draft executive proposals, pitch decks, agendas, minutes, and strategic operational plans with direct exports to PDF, DOCX, and PPTX.',
      metrics: 'Real document file generation',
    },
    {
      icon: Ticket,
      title: 'Autonomous Booking Assistant',
      desc: 'Research, compare, and prepare bookings for flights, hotels, trains, and meeting rooms with mandatory user confirmation safeguards.',
      metrics: '11-point confirmation safeguard',
    },
    {
      icon: GraduationCap,
      title: 'Career & Education Management',
      desc: 'Track job applications, generate mock interview questions, design exam revision timetables, and monitor syllabus completion.',
      metrics: 'Integrated mock interview engine',
    },
    {
      icon: TrendUp,
      title: 'Marketing Intelligence & SEO',
      desc: 'Competitor analysis, customer persona definitions, content calendar preparation, and ad performance metric tracking.',
      metrics: 'Audience & campaign insights',
    },
    {
      icon: ShieldCheck,
      title: '4-Tier Permission Matrix',
      desc: 'Transparent governance with READ, PREPARE, EXECUTE, and PREAUTHORIZED tiers. Immutable audit logs for every system action.',
      metrics: '100% auditable execution log',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="caption-3 font-mono uppercase tracking-wider text-jarvis-accentCyan block mb-2">
            System Capabilities
          </span>
          <h1 className="heading-2 sm:heading-1 font-semibold text-white mb-4">
            Built for executive command and deep personal execution
          </h1>
          <p className="title-3 text-jarvis-textSecondary">
            Explore the core architectural modules that make JARVIS AI 2.0 an intelligent operating system rather than a chatbot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {featureList.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col justify-between hover:border-jarvis-accentBlue/50 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex items-center justify-center text-jarvis-accentCyan mb-4">
                    <Icon size={22} weight="bold" />
                  </div>
                  <h3 className="title-3 text-white font-semibold mb-2">{f.title}</h3>
                  <p className="body-5 text-jarvis-textSecondary mb-4">{f.desc}</p>
                </div>
                <div className="caption-4 font-mono text-jarvis-accentBlue border-t border-surface-dark2 pt-3">
                  {f.metrics}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder text-center flex flex-col items-center">
          <h2 className="heading-3 text-white font-semibold mb-3">Ready to test these capabilities live?</h2>
          <p className="body-3 text-jarvis-textSecondary max-w-lg mb-6">
            Speak or write to JARVIS in English, Telugu, or Hindi. Experience real-time task creation, memory updates, and project orchestration.
          </p>
          <Link
            href="/app"
            className="button-lg bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-2 interactive-tap"
          >
            <span>Launch Assistant</span>
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
