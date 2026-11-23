'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, LockKey, EnvelopeSimple, User } from '@phosphor-icons/react';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please complete all required fields.');
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
            <div className="w-12 h-12 rounded-xl bg-jarvis-accentPurple/20 text-jarvis-accentPurple flex items-center justify-center mx-auto mb-3 font-mono font-bold text-lg">
              J2
            </div>
            <h1 className="heading-4 text-white font-semibold">Initialize Operator Identity</h1>
            <p className="caption-2 text-jarvis-textSecondary mt-1">Deploy your private personal AI operating system</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 caption-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="caption-3 text-white block mb-1.5">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 pl-10 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  placeholder="Umar Basha"
                />
                <User size={18} className="absolute left-3 top-3 text-jarvis-textMuted" />
              </div>
            </div>

            <div>
              <label className="caption-3 text-white block mb-1.5">Operator Email</label>
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

            <div>
              <label className="caption-3 text-white block mb-1.5">Security Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 pl-10 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  placeholder="Create secure password"
                />
                <LockKey size={18} className="absolute left-3 top-3 text-jarvis-textMuted" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full button-md bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center justify-center gap-2 rounded-xl mt-6 shadow-lg shadow-blue-500/20 interactive-tap"
            >
              <span>{loading ? 'Creating Identity...' : 'Initialize System'}</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-surface-dark2 text-center caption-2 text-jarvis-textMuted">
            Already registered?{' '}
            <Link href="/signin" className="text-jarvis-accentCyan hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
