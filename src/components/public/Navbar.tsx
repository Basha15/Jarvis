'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, Moon, Sun, ArrowRight, ShieldCheck } from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useJarvis();

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Security', href: '/security' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav
        className="w-full max-w-5xl bg-surface-dark1/85 dark:bg-surface-dark1/85 backdrop-blur-md border border-jarvis-surfaceBorder rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl transition-all duration-300"
        aria-label="Main Navigation"
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-jarvis-accentBlue to-jarvis-accentPurple flex items-center justify-center p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-surface-dark0 rounded-[10px] flex items-center justify-center">
              <span className="font-mono text-sm font-bold text-jarvis-accentCyan">J2</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="title-3 font-bold tracking-tight text-white">JARVIS AI</span>
            <span className="caption-5 font-mono text-jarvis-accentCyan">OS 2.0</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`caption-1 transition-colors duration-200 ${
                  isActive ? 'text-white font-semibold' : 'text-jarvis-textSecondary hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-jarvis-textSecondary hover:text-white hover:bg-surface-dark2 transition-colors interactive-tap"
          >
            {theme === 'dark' ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
          </button>

          <Link
            href="/signin"
            className="caption-1 text-jarvis-textSecondary hover:text-white px-3 py-2 transition-colors"
          >
            Sign in
          </Link>

          <Link
            href="/app"
            className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-1.5 shadow-md shadow-blue-500/20 interactive-tap"
          >
            <span>Launch OS</span>
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-jarvis-textSecondary hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-jarvis-textSecondary hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Full height per B7) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            className="fixed inset-0 top-20 z-40 bg-surface-dark0/95 backdrop-blur-xl p-6 flex flex-col md:hidden border-t border-jarvis-surfaceBorder"
          >
            <div className="flex flex-col gap-5 mt-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="title-2 text-white block py-2 border-b border-surface-dark2"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
                className="flex flex-col gap-3 mt-6"
              >
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="button-md text-center bg-surface-dark2 text-white rounded-xl py-3 border border-jarvis-surfaceBorder"
                >
                  Sign in
                </Link>
                <Link
                  href="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="button-md text-center bg-jarvis-accentBlue text-white rounded-xl py-3 shadow-lg shadow-blue-500/20"
                >
                  Launch Operating System
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
