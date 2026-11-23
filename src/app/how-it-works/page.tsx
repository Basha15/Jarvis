'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';
import { ArrowRight, Microphone, Cpu, ShieldCheck, Database, DeviceMobile } from '@phosphor-icons/react';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Speech Ingestion & Acoustic Normalization',
      desc: 'When you tap the microphone or invoke voice mode, the Web Speech engine captures raw audio streaming directly to the language detection module. It instantly recognizes whether the spoken phrase is English, Telugu, Hindi, or a colloquial mix like Hinglish or Tenglish.',
      icon: Microphone,
    },
    {
      step: '02',
      title: 'Semantic Parsing & Entity Extraction',
      desc: 'The conversational AI core extracts target intentions, times, dates, categories, and entities. For instance, "repu morning 7 ki workout reminder pettu" is converted into a normalized calendar schema pointing to tomorrow at 07:00 AM with category "health".',
      icon: Cpu,
    },
    {
      step: '03',
      title: 'Persistent Database Commit & Cross-Language Memory',
      desc: 'The action is persisted into the database. If a task is created in Telugu, it is indexed with English and Telugu semantic tags. Later, querying "What tasks are pending?" or "I finished my workout" matches the exact record without duplicate entries.',
      icon: Database,
    },
    {
      step: '04',
      title: 'Sub-1.2s Natural Male Neural Voice Synthesis',
      desc: 'JARVIS synthesizes the confirmation using a mature, deep male neural voice with natural pauses and cadence. The audio playback begins on the very first token, hitting the target response latency under 1.2 seconds.',
      icon: DeviceMobile,
    },
    {
      step: '05',
      title: 'Permission Enforcement & Audit Trail',
      desc: 'All consequential actions (payments, bookings, destructive edits) require your explicit verification. Every step taken by JARVIS is logged to an immutable audit ledger available in the Activity History.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="caption-3 font-mono uppercase tracking-wider text-jarvis-accentPurple block mb-2">
            Technical Architecture
          </span>
          <h1 className="heading-2 sm:heading-1 font-semibold text-white mb-4">
            How JARVIS AI 2.0 operates end to end
          </h1>
          <p className="title-3 text-jarvis-textSecondary">
            A transparent look into the speech processing, normalized memory graph, and permission governance pipelines.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="p-8 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col md:flex-row items-start gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-surface-dark2 border border-jarvis-surfaceBorder flex items-center justify-center text-jarvis-accentBlue shrink-0">
                  <Icon size={30} weight="bold" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="caption-4 font-mono text-jarvis-accentCyan font-bold uppercase">Step {s.step}</span>
                  </div>
                  <h3 className="title-2 text-white font-semibold mb-3">{s.title}</h3>
                  <p className="body-4 text-jarvis-textSecondary">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder text-center">
          <h2 className="heading-3 text-white font-semibold mb-3">Experience the voice speed yourself</h2>
          <p className="body-3 text-jarvis-textSecondary max-w-lg mx-auto mb-6">
            Test the live speech recognition and neural synthesis directly in your browser.
          </p>
          <Link
            href="/app"
            className="button-lg bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white inline-flex items-center gap-2 interactive-tap"
          >
            <span>Open JARVIS OS</span>
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
