'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Microphone,
  SpeakerHigh,
  ShieldCheck,
  Kanban,
  Brain,
  Clock,
  ArrowRight,
  CheckCircle,
  CaretDown,
  Globe,
  DeviceMobile,
  ChartLineUp,
} from '@phosphor-icons/react';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';
import { TaglineReveal } from '@/components/public/TaglineReveal';
import { AudioWaveformVisualizer } from '@/components/AudioWaveformVisualizer';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const sampleCommands = [
    { lang: 'English', text: 'Jarvis, remind me to call the client at 4 PM.' },
    { lang: 'Telugu', text: 'Jarvis, repu morning 7 ki workout reminder pettu.' },
    { lang: 'Hindi', text: 'Jarvis, kal mera interview hai, mujhe prepare karwao.' },
    { lang: 'Mixed', text: 'Jarvis, naa project progress entha undi?' },
  ];

  const faqs = [
    {
      q: 'How does JARVIS achieve sub-1.2 second voice response speed?',
      a: 'JARVIS combines client-side streaming speech recognition with chunked natural male neural speech synthesis. Instead of waiting for full LLM sentences, audio generation begins immediately upon the first semantic tokens.',
    },
    {
      q: 'Can I set a reminder in Telugu and complete it in English?',
      a: 'Yes. JARVIS normalizes tasks, times, and entities into a unified semantic state. You can schedule a workout reminder speaking Telugu and later say "I finished my workout" in English or Hindi to mark it complete.',
    },
    {
      q: 'Why are there no Quick Actions anywhere in the interface?',
      a: 'JARVIS 2.0 is built on a conversational operating philosophy. Rather than cluttering the screen with hundreds of rigid buttons, interaction is led by high-speed natural voice or direct hierarchical navigation.',
    },
    {
      q: 'Does JARVIS continuously record audio in the background?',
      a: 'No. JARVIS operates strictly through explicit microphone activation. There is zero hidden background recording. All memory storage is transparent and fully auditable by you.',
    },
    {
      q: 'Can JARVIS execute financial transactions or bookings autonomously?',
      a: 'No. JARVIS adheres to a strict 4-tier permission model (READ, PREPARE, EXECUTE, PREAUTHORIZED). High-stakes actions like flight bookings, payments, and major project deletions require explicit user confirmation.',
    },
    {
      q: 'Can I install JARVIS on my Android or Windows desktop?',
      a: 'Yes. JARVIS is an installable Progressive Web App (PWA) with offline shell support, Web Push notifications, and responsive layouts calibrated for desktop, tablet, and mobile screens.',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />

      <main className="flex-1 pt-28">
        {/* HERO SECTION */}
        <section className="relative px-6 py-16 md:py-24 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Proof Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-dark2 border border-jarvis-surfaceBorder mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-jarvis-accentCyan animate-pulse" />
            <span className="caption-4 text-jarvis-textSecondary font-mono">
              JARVIS AI 2.0 • English, Telugu & Hindi Neural Voice
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-2 sm:heading-1 font-semibold max-w-[680px] hero-gradient-text tracking-tight mb-6"
          >
            Run your life and work with an intelligent voice operating system
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="title-3 text-jarvis-textSecondary max-w-[680px] mb-8"
          >
            Manage daily schedules, technical projects, bookings, and career goals through immediate natural voice commands with persistent cross-language memory.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-10"
          >
            <Link
              href="/app"
              className="button-lg bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-2 shadow-xl shadow-blue-500/25 interactive-tap"
            >
              <span>Launch Operating System</span>
              <ArrowRight size={18} weight="bold" />
            </Link>
            <Link
              href="/how-it-works"
              className="button-lg bg-surface-dark2 hover:bg-surface-dark3 text-jarvis-textPrimary border border-jarvis-surfaceBorder interactive-tap"
            >
              See Architecture Specs
            </Link>
          </motion.div>

          {/* Proof Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 caption-2 text-jarvis-textMuted border-t border-jarvis-surfaceBorder pt-6 w-full max-w-xl">
            <div className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-jarvis-success" weight="fill" />
              <span>Sub-1.2s voice response</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-jarvis-success" weight="fill" />
              <span>Cross-language task sync</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-jarvis-success" weight="fill" />
              <span>Zero quick-action clutter</span>
            </div>
          </div>

          {/* Interactive Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-4xl mt-12 bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-jarvis-surfaceBorder pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="caption-4 font-mono text-jarvis-textMuted ml-2">jarvis-os-terminal // v2.0-prod</span>
              </div>
              <div className="caption-5 font-mono text-jarvis-accentCyan">LATENCY: 380MS • STREAMING ON</div>
            </div>

            <AudioWaveformVisualizer isListening={false} isSpeaking={true} isProcessing={false} />

            {/* Sample Multilingual Voice Triggers */}
            <div className="mt-6 text-left">
              <span className="caption-4 font-mono uppercase tracking-wider text-jarvis-textMuted block mb-3">
                Live Voice Triggers Tested Across Languages:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sampleCommands.map((cmd) => (
                  <div
                    key={cmd.text}
                    className="p-3 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex flex-col gap-1"
                  >
                    <span className="caption-5 text-jarvis-accentBlue font-mono uppercase">{cmd.lang}</span>
                    <span className="body-5 text-white">"{cmd.text}"</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* PROBLEM TO SOLUTION SECTION */}
        <section className="py-20 px-6 border-t border-jarvis-surfaceBorder bg-surface-dark1">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="caption-3 font-mono uppercase tracking-wider text-jarvis-accentCyan block mb-2">
                The Operational Shift
              </span>
              <h2 className="heading-3 font-semibold text-white">Why personal computing needs a true assistant</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Problem */}
              <div className="p-8 rounded-2xl bg-surface-dark2 border border-jarvis-surfaceBorder flex flex-col justify-between">
                <div>
                  <span className="title-3 text-red-400 font-semibold block mb-4">Fragmented Productivity Hell</span>
                  <ul className="space-y-3 body-5 text-jarvis-textSecondary">
                    <li>• Constant app-hopping across 12 separate calendars, note apps, and task trackers.</li>
                    <li>• Robotic voice assistants with 4-second delays that only set simple kitchen timers.</li>
                    <li>• Forgotten tasks when switching between Telugu, Hindi, and English instructions.</li>
                    <li>• Dashboards polluted with 50 useless shortcut buttons instead of actual comprehension.</li>
                  </ul>
                </div>
                <div className="caption-4 font-mono text-jarvis-textMuted mt-6 pt-4 border-t border-surface-dark3">
                  Traditional Workflow: 4.5 hours lost weekly to manual coordination
                </div>
              </div>

              {/* Solution */}
              <div className="p-8 rounded-2xl bg-surface-dark2 border border-jarvis-surfaceBorder flex flex-col justify-between">
                <div>
                  <span className="title-3 text-jarvis-accentCyan font-semibold block mb-4">JARVIS AI 2.0 Unified Engine</span>
                  <ul className="space-y-3 body-5 text-jarvis-textSecondary">
                    <li>• Unified central voice console that manages your agenda, meetings, and projects in one breath.</li>
                    <li>• Sub-1.2 second natural male voice playback with instant conversational interruption.</li>
                    <li>• Normalized cross-lingual memory that understands intent regardless of language.</li>
                    <li>• Zero quick actions: Clean, high-focus interface centered around voice and clear hierarchy.</li>
                  </ul>
                </div>
                <div className="caption-4 font-mono text-jarvis-accentCyan mt-6 pt-4 border-t border-surface-dark3">
                  JARVIS Operating System: Immediate resolution in one voice turn
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MANDATORY B11 TAGLINE REVEAL */}
        <TaglineReveal phrase="An intelligent personal operating system that speaks your language and manages your life with absolute precision." />

        {/* HOW IT WORKS (3 STEPS) */}
        <section className="py-20 px-6 border-t border-jarvis-surfaceBorder">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="caption-3 font-mono uppercase tracking-wider text-jarvis-accentBlue block mb-2">
                Architecture Flow
              </span>
              <h2 className="heading-3 font-semibold text-white">How JARVIS powers your day in three steps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-jarvis-accentBlue/20 text-jarvis-accentBlue flex items-center justify-center font-bold text-lg mb-4">
                  01
                </div>
                <h3 className="title-2 text-white font-semibold mb-2">Speak Naturally</h3>
                <p className="body-5 text-jarvis-textSecondary">
                  Trigger commands in English, Telugu, or Hindi. Speak mixed language phrases without manual language toggling.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-jarvis-accentPurple/20 text-jarvis-accentPurple flex items-center justify-center font-bold text-lg mb-4">
                  02
                </div>
                <h3 className="title-2 text-white font-semibold mb-2">Normalized Orchestration</h3>
                <p className="body-5 text-jarvis-textSecondary">
                  The system extracts dates, priorities, and dependencies into a normalized semantic graph across all 20 modules.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-jarvis-accentCyan/20 text-jarvis-accentCyan flex items-center justify-center font-bold text-lg mb-4">
                  03
                </div>
                <h3 className="title-2 text-white font-semibold mb-2">Execution with Safeguards</h3>
                <p className="body-5 text-jarvis-textSecondary">
                  Tasks are scheduled, meetings aligned, and bookings compared. Sensitive operations require your explicit approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES OVERVIEW */}
        <section className="py-20 px-6 border-t border-jarvis-surfaceBorder bg-surface-dark1">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="caption-3 font-mono uppercase tracking-wider text-jarvis-accentCyan block mb-2">
                Comprehensive Modules
              </span>
              <h2 className="heading-3 font-semibold text-white">Full-spectrum personal executive intelligence</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <Clock size={28} className="text-jarvis-accentBlue mb-4" />
                <h3 className="title-3 text-white font-semibold mb-2">Timetable & Reminders</h3>
                <p className="body-6 text-jarvis-textSecondary">
                  Daily schedule, conflict detection, and persistent voice alerts that survive browser restarts until completed.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <Kanban size={28} className="text-jarvis-accentPurple mb-4" />
                <h3 className="title-3 text-white font-semibold mb-2">Project Governance</h3>
                <p className="body-6 text-jarvis-textSecondary">
                  Milestone tracking, dependency graphs, overdue work detection, and automated weekly progress summaries.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <Brain size={28} className="text-jarvis-accentCyan mb-4" />
                <h3 className="title-3 text-white font-semibold mb-2">Persistent Memory</h3>
                <p className="body-6 text-jarvis-textSecondary">
                  Searchable long-term context retention with full user inspection, editing, export, and deletion capabilities.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <Globe size={28} className="text-jarvis-accentBlue mb-4" />
                <h3 className="title-3 text-white font-semibold mb-2">Multilingual Intelligence</h3>
                <p className="body-6 text-jarvis-textSecondary">
                  Flawless comprehension and natural male speech output across English, Telugu, and Hindi code-switched dialogues.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <ShieldCheck size={28} className="text-jarvis-success mb-4" />
                <h3 className="title-3 text-white font-semibold mb-2">4-Tier Autonomy Matrix</h3>
                <p className="body-6 text-jarvis-textSecondary">
                  Strict READ, PREPARE, EXECUTE, and PREAUTHORIZED permission limits with immutable audit logging.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <DeviceMobile size={28} className="text-jarvis-warning mb-4" />
                <h3 className="title-3 text-white font-semibold mb-2">Installable PWA</h3>
                <p className="body-6 text-jarvis-textSecondary">
                  Offline-ready progressive web app with Web Push notifications and calibrated responsive layouts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION (OBJECTION HANDLING) */}
        <section className="py-20 px-6 border-t border-jarvis-surfaceBorder">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="caption-3 font-mono uppercase tracking-wider text-jarvis-accentPurple block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="heading-3 font-semibold text-white">Everything you need to know about JARVIS 2.0</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="rounded-xl bg-surface-dark1 border border-jarvis-surfaceBorder overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="title-4 text-white font-medium">{faq.q}</span>
                      <CaretDown
                        size={18}
                        className={`text-jarvis-textMuted transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 body-5 text-jarvis-textSecondary border-t border-surface-dark2 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-20 px-6 border-t border-jarvis-surfaceBorder bg-surface-dark1 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-3 sm:heading-2 font-semibold text-white mb-4">
              Take complete command of your daily workflow
            </h2>
            <p className="title-3 text-jarvis-textSecondary mb-8 max-w-xl mx-auto">
              Experience the fast, multilingual voice operating system designed for serious personal productivity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/app"
                className="button-lg bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-2 shadow-xl shadow-blue-500/25 interactive-tap"
              >
                <span>Launch Operating System</span>
                <ArrowRight size={18} weight="bold" />
              </Link>
              <Link
                href="/signup"
                className="button-lg bg-surface-dark2 hover:bg-surface-dark3 text-jarvis-textPrimary border border-jarvis-surfaceBorder interactive-tap"
              >
                Create Free Identity
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
