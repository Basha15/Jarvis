import React from 'react';
import Link from 'next/link';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-jarvis-surfaceBorder bg-surface-dark1 text-jarvis-textSecondary py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-jarvis-accentBlue flex items-center justify-center font-mono font-bold text-xs text-white">
              J2
            </div>
            <span className="title-3 text-white font-bold">JARVIS AI 2.0</span>
          </div>
          <p className="caption-2 text-jarvis-textMuted max-w-xs">
            Next generation personal artificial intelligence operating system. Built for seamless multilingual voice control and executive orchestration.
          </p>
        </div>

        <div>
          <span className="title-4 text-white block mb-3">Product Architecture</span>
          <ul className="flex flex-col gap-2 caption-2">
            <li>
              <Link href="/features" className="hover:text-white transition-colors">
                Multilingual Voice Core
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="hover:text-white transition-colors">
                Continuous Memory Engine
              </Link>
            </li>
            <li>
              <Link href="/integrations" className="hover:text-white transition-colors">
                Connected Workspaces
              </Link>
            </li>
            <li>
              <Link href="/app/timetable" className="hover:text-white transition-colors">
                Timetable & Scheduling
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <span className="title-4 text-white block mb-3">Security & Trust</span>
          <ul className="flex flex-col gap-2 caption-2">
            <li>
              <Link href="/security" className="hover:text-white transition-colors">
                Permission Governance
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/app/audit" className="hover:text-white transition-colors">
                Audit Trail Standards
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <span className="title-4 text-white block mb-3">Operating Access</span>
          <ul className="flex flex-col gap-2 caption-2">
            <li>
              <Link href="/app" className="hover:text-white transition-colors">
                Launch Assistant Console
              </Link>
            </li>
            <li>
              <Link href="/signin" className="hover:text-white transition-colors">
                Sign In to Account
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-white transition-colors">
                Create Operator Identity
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white transition-colors">
                Pricing & Deployment Plans
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 border-t border-surface-dark2 flex flex-col sm:flex-row items-center justify-between gap-4 caption-2 text-jarvis-textMuted">
        <div>© 2026 JARVIS AI Operating System. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/security" className="hover:text-white transition-colors">
            Security Spec
          </Link>
        </div>
      </div>
    </footer>
  );
};
