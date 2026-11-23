'use client';

import React from 'react';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="heading-2 font-semibold text-white mb-4">Terms and Conditions</h1>
        <p className="caption-2 text-jarvis-textMuted mb-8 font-mono">Last updated: November 2026 • JARVIS AI OS 2.0</p>

        <div className="space-y-6 body-4 text-jarvis-textSecondary">
          <section className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <h2 className="title-2 text-white font-semibold mb-2">1. Operating System Authorization</h2>
            <p>
              JARVIS AI 2.0 operates as an executive personal assistant and artificial intelligence platform. By utilizing this system, you acknowledge that automated voice triggers, reminder loops, and task syntheses are performed on your behalf in accordance with your explicit permission preferences.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <h2 className="title-2 text-white font-semibold mb-2">2. Permission Governance & Autonomy Boundaries</h2>
            <p>
              JARVIS complies strictly with a four-tier permission model (READ, PREPARE, EXECUTE, PREAUTHORIZED). Consequential operations—including financial transactions, flight and hotel booking confirmations, email transmissions, and source repository mutations—require mandatory user review. JARVIS shall not be liable for external actions executed following explicit user authorization.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <h2 className="title-2 text-white font-semibold mb-2">3. Progressive Web App and Hardware Disclaimers</h2>
            <p>
              While JARVIS employs Web Push protocols and service workers, operating system constraints may restrict background audio execution when devices are fully locked. Critical native-level continuous alarms should be supplemented with dedicated device clock utilities where uninterrupted hardware signaling is strictly required.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <h2 className="title-2 text-white font-semibold mb-2">4. Memory Retention and Data Sovereignty</h2>
            <p>
              You maintain total sovereignty over your long-term memory graph. You retain the right to query, edit, export, and delete any stored memory item, task, or conversational recording at any time via the Memory Management console.
            </p>
          </section>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
