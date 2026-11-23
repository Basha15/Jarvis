'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKey, EnvelopeSimple } from '@phosphor-icons/react';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('operator@jarvis-os.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid operator email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/app');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-md bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-jarvis-accentBlue/20 text-jarvis-accentBlue flex items-center justify-center mx-auto mb-3 font-mono font-bold text-lg">
              J2
            </div>
            <h1 className="heading-4 text-white font-semibold">Sign in to JARVIS OS</h1>
            <p className="caption-2 text-jarvis-textSecondary mt-1">Authenticate your operator identity</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 caption-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="caption-3 text-white block mb-1.5">Operator Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 pl-10 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  placeholder="operator@jarvis-os.ai"
                />
                <EnvelopeSimple size={18} className="absolute left-3 top-3 text-jarvis-textMuted" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="caption-3 text-white block">Security Key / Password</label>
                <Link href="/forgot-password" className="caption-4 text-jarvis-accentBlue hover:underline">
                  Forgot key?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 pl-10 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                />
                <LockKey size={18} className="absolute left-3 top-3 text-jarvis-textMuted" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full button-md bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center justify-center gap-2 rounded-xl mt-6 shadow-lg shadow-blue-500/20 interactive-tap"
            >
              <span>{loading ? 'Authenticating Operator...' : 'Authenticate & Enter OS'}</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-surface-dark2 text-center caption-2 text-jarvis-textMuted">
            Need a new identity?{' '}
            <Link href="/signup" className="text-jarvis-accentCyan hover:underline font-medium">
              Create account
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
