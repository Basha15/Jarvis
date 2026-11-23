'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';
import { Check, ArrowRight } from '@phosphor-icons/react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Personal Operator',
      price: 'Free during Preview',
      period: 'Unlimited access',
      desc: 'Full personal AI operating system for single users managing daily routines, learning, and projects.',
      features: [
        'Multilingual Voice (English, Telugu, Hindi)',
        'Sub-1.2s neural male speech playback',
        'Daily timetable & persistent reminders',
        'Project governance & milestones',
        'Memory management & audit logs',
        'Progressive Web App installation',
      ],
      cta: 'Launch Free System',
      href: '/app',
      popular: true,
    },
    {
      name: 'Executive Professional',
      price: '{{price}}',
      period: 'Billed monthly',
      desc: 'Advanced autonomous coordination for executives, business operators, and researchers.',
      features: [
        'All Personal Operator capabilities',
        'Dedicated server-side Whisper & neural TTS models',
        'Automated DOCX, PDF, and PPTX document generation',
        'Autonomous booking assistant workflows',
        'Multi-calendar synchronization & conflict matrix',
        'Priority low-latency streaming pipeline',
      ],
      cta: 'Join Waitlist',
      href: '/signup',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="caption-3 font-mono uppercase tracking-wider text-jarvis-accentCyan block mb-2">
            Deployment & Plans
          </span>
          <h1 className="heading-2 sm:heading-1 font-semibold text-white mb-4">
            Transparent access for high-output individuals
          </h1>
          <p className="title-3 text-jarvis-textSecondary">
            JARVIS AI 2.0 is fully functional and ready to deploy in your private environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`p-8 rounded-2xl bg-surface-dark1 border flex flex-col justify-between ${
                p.popular ? 'border-jarvis-accentBlue shadow-xl shadow-blue-500/10' : 'border-jarvis-surfaceBorder'
              }`}
            >
              <div>
                {p.popular && (
                  <span className="caption-5 font-mono uppercase tracking-widest text-jarvis-accentCyan bg-surface-dark2 px-2.5 py-1 rounded-md border border-jarvis-surfaceBorder mb-4 inline-block">
                    Active Development Tier
                  </span>
                )}
                <h3 className="title-2 text-white font-semibold mb-2">{p.name}</h3>
                <p className="body-5 text-jarvis-textSecondary mb-6">{p.desc}</p>
                <div className="mb-6">
                  <span className="heading-3 text-white font-bold">{p.price}</span>
                  <span className="caption-2 text-jarvis-textMuted ml-2">/ {p.period}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 body-5 text-jarvis-textSecondary">
                      <Check size={16} className="text-jarvis-success shrink-0" weight="bold" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={p.href}
                className={`button-md text-center rounded-xl flex items-center justify-center gap-2 interactive-tap ${
                  p.popular
                    ? 'bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white shadow-lg shadow-blue-500/20'
                    : 'bg-surface-dark2 hover:bg-surface-dark3 text-white border border-jarvis-surfaceBorder'
                }`}
              >
                <span>{p.cta}</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
