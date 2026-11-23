'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';
import { WarningCircle, ArrowLeft } from '@phosphor-icons/react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-md w-full bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-8 text-center shadow-2xl">
          <WarningCircle size={56} className="text-jarvis-accentCyan mx-auto mb-4" weight="duotone" />
          <span className="caption-4 font-mono text-jarvis-accentBlue uppercase tracking-widest block mb-2">
            Error 404 • Coordinate Not Found
          </span>
          <h1 className="heading-4 text-white font-semibold mb-3">Resource Unreachable</h1>
          <p className="body-4 text-jarvis-textSecondary mb-8">
            The requested sub-routine or interface route does not exist in JARVIS AI 2.0 system memory.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/app"
              className="button-md bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white rounded-xl shadow-lg shadow-blue-500/20 interactive-tap"
            >
              Return to Assistant Console
            </Link>
            <Link
              href="/"
              className="button-md bg-surface-dark2 hover:bg-surface-dark3 text-white rounded-xl border border-jarvis-surfaceBorder flex items-center justify-center gap-2 interactive-tap"
            >
              <ArrowLeft size={16} /> Return to Home
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
