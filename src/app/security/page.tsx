'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';
import { ShieldCheck, LockKey, EyeSlash, CheckSquare, ArrowRight } from '@phosphor-icons/react';

export default function SecurityPage() {
  const tiers = [
    {
      level: 'READ',
      badge: 'Level 1: Passive Ingestion',
      desc: 'JARVIS reads information you have explicitly granted permission to access (e.g. connected Google Calendar events or task history). No mutations occur.',
    },
    {
      level: 'PREPARE',
      badge: 'Level 2: Draft Generation',
      desc: 'JARVIS drafts messages, proposals, meeting reschedules, and booking comparisons. Nothing is submitted or sent externally without verification.',
    },
    {
      level: 'EXECUTE',
      badge: 'Level 3: Confirmed Action',
      desc: 'JARVIS performs high-consequence actions (e.g., flight booking submissions, database deletions, sending emails) only after you explicitly click or say confirm.',
    },
    {
      level: 'PREAUTHORIZED',
      badge: 'Level 4: Bound Automation',
      desc: 'Autonomous execution strictly bounded to approved recurring low-risk routines (such as daily timetable synchronization).',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="caption-3 font-mono uppercase tracking-wider text-jarvis-success block mb-2">
            Governance & Privacy
          </span>
          <h1 className="heading-2 sm:heading-1 font-semibold text-white mb-4">
            Security by design, zero compromise on autonomy
          </h1>
          <p className="title-3 text-jarvis-textSecondary">
            JARVIS AI 2.0 enforces a strict 4-tier permission model and maintains transparent, user-controlled memory.
          </p>
        </div>

        {/* 4-Tier Matrix */}
        <div className="mb-16">
          <h2 className="heading-3 text-white font-semibold mb-6">The 4-Tier Autonomy Matrix</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map((t) => (
              <div key={t.level} className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
                <div className="flex items-center justify-between mb-3">
                  <span className="title-2 font-mono font-bold text-jarvis-accentCyan">{t.level}</span>
                  <span className="caption-5 font-mono text-jarvis-textMuted bg-surface-dark2 px-2.5 py-1 rounded-md border border-jarvis-surfaceBorder">
                    {t.badge}
                  </span>
                </div>
                <p className="body-4 text-jarvis-textSecondary">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <EyeSlash size={28} className="text-jarvis-accentCyan mb-3" />
            <h3 className="title-3 text-white font-semibold mb-2">Zero Background Snooping</h3>
            <p className="body-5 text-jarvis-textSecondary">
              The microphone is active only when you explicitly trigger it. We never record or stream continuous ambient audio in the background.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <LockKey size={28} className="text-jarvis-accentBlue mb-3" />
            <h3 className="title-3 text-white font-semibold mb-2">End-to-End Cryptography</h3>
            <p className="body-5 text-jarvis-textSecondary">
              OAuth tokens, passwords, and sensitive system records are encrypted. We never leak secrets or API keys to client-side bundles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <CheckSquare size={28} className="text-jarvis-success mb-3" />
            <h3 className="title-3 text-white font-semibold mb-2">Immutable Audit Logging</h3>
            <p className="body-5 text-jarvis-textSecondary">
              Every action taken by the AI operator is logged to an immutable audit trail. You can review, search, and export logs at any time.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder text-center">
          <h2 className="heading-4 text-white font-semibold mb-2">Review Audit Trail In Real Time</h2>
          <p className="body-4 text-jarvis-textSecondary max-w-md mx-auto mb-6">
            Inspect the live compliance audit log in the authenticated application.
          </p>
          <Link
            href="/app/audit"
            className="button-lg bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white inline-flex items-center gap-2 interactive-tap"
          >
            <span>Open Audit Console</span>
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
