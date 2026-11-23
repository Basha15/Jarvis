'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, EnvelopeSimple, CheckCircle } from '@phosphor-icons/react';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-md bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="heading-4 text-white font-semibold">Recover Operator Key</h1>
            <p className="caption-2 text-jarvis-textSecondary mt-1">
              Instructions will be dispatched to your registered recovery address
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle size={48} className="text-jarvis-success mx-auto mb-3" weight="fill" />
              <h2 className="title-3 text-white font-semibold mb-2">Recovery Dispatch Sent</h2>
              <p className="body-5 text-jarvis-textSecondary mb-6">
                If an account exists for {email}, a secure one-time authentication link has been dispatched.
              </p>
              <Link href="/signin" className="button-md bg-surface-dark2 text-white rounded-xl inline-block">
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="caption-3 text-white block mb-1.5">Registered Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 pl-10 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                    placeholder="operator@jarvis-os.ai"
                  />
                  <EnvelopeSimple size={18} className="absolute left-3 top-3 text-jarvis-textMuted" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full button-md bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center justify-center gap-2 rounded-xl mt-6 shadow-lg shadow-blue-500/20 interactive-tap"
              >
                Send Recovery Link
              </button>

              <div className="text-center mt-4">
                <Link href="/signin" className="caption-3 text-jarvis-textMuted hover:text-white flex items-center justify-center gap-1">
                  <ArrowLeft size={14} /> Back to Sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
