'use client';

import React from 'react';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="heading-2 font-semibold text-white mb-4">Privacy Policy</h1>
        <p className="caption-2 text-jarvis-textMuted mb-8 font-mono">Last updated: November 2026 • JARVIS AI OS 2.0</p>

        <div className="space-y-6 body-4 text-jarvis-textSecondary">
          <section className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <h2 className="title-2 text-white font-semibold mb-2">1. Microphone and Voice Data Governance</h2>
            <p>
              JARVIS AI 2.0 does not engage in ambient, continuous, or clandestine audio recording. The microphone stream is initialized only when you interact directly with the voice button or active conversational interface. Audio is processed for immediate semantic intent and natural voice synthesis, and is never sold to third-party data brokers.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <h2 className="title-2 text-white font-semibold mb-2">2. Persistent Memory and Cross-Language Normalization</h2>
            <p>
              To provide seamless intelligence across English, Telugu, and Hindi, JARVIS generates normalized semantic tokens from your instructions. These records are stored securely in your private database and are fully visible and editable through the Memory Management console.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <h2 className="title-2 text-white font-semibold mb-2">3. Third-Party Integrations and OAuth Tokens</h2>
            <p>
              When connecting external services (e.g., Google Workspace, GitHub, Zoom), JARVIS requests the minimum viable permission scopes. OAuth access tokens are stored securely in encrypted configurations and are never exposed in client-side bundles.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
            <h2 className="title-2 text-white font-semibold mb-2">4. User Deletion Rights (GDPR & CCPA Compliant)</h2>
            <p>
              You maintain the absolute right to purge your entire memory graph, conversation history, task database, and associated telemetry. Purge commands may be executed directly in the Security & Privacy Settings page.
            </p>
          </section>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
