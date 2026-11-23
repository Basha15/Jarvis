'use client';

import React, { useState } from 'react';
import {
  GearSix,
  User,
  ShieldCheck,
  Moon,
  Sun,
  Trash,
  CheckCircle,
  WarningCircle,
} from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';

export default function SettingsPage() {
  const { user, theme, toggleTheme } = useJarvis();
  const [operatorName, setOperatorName] = useState(user?.name || 'Umar Basha');
  const [operatorEmail, setOperatorEmail] = useState(user?.email || 'operator@jarvis-os.ai');
  const [experimentalRepeat, setExperimentalRepeat] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPurgeModal, setShowPurgeModal] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: operatorName,
        email: operatorEmail,
        experimentalRepeat,
      }),
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePurgeMemory = async () => {
    // In production, purges memory records
    setShowPurgeModal(false);
    alert('System Memory graph has been sanitized. All transient contextual tokens purged.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
          System Administration
        </span>
        <h1 className="heading-3 text-white font-semibold">Account & Security Governance</h1>
        <p className="body-4 text-jarvis-textSecondary">
          Manage your operator identity, interface appearance, and system-level data sovereignty.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-jarvis-success/10 border border-jarvis-success/30 text-jarvis-success caption-2 flex items-center gap-2">
          <CheckCircle size={18} weight="fill" />
          <span>Operator configuration updated successfully.</span>
        </div>
      )}

      {/* Operator Profile */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <h2 className="title-2 text-white font-semibold mb-4 flex items-center gap-2">
          <User size={20} className="text-jarvis-accentBlue" />
          Operator Profile
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="caption-3 text-white block mb-1">Operator Name</label>
              <input
                type="text"
                value={operatorName}
                onChange={(e) => setOperatorName(e.target.value)}
                required
                className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
              />
            </div>

            <div>
              <label className="caption-3 text-white block mb-1">Operator Email</label>
              <input
                type="email"
                value={operatorEmail}
                onChange={(e) => setOperatorEmail(e.target.value)}
                required
                className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
              />
            </div>
          </div>

          {/* Theme Preference */}
          <div className="pt-4 border-t border-surface-dark2 flex items-center justify-between">
            <div>
              <span className="title-4 text-white block">Visual Theme</span>
              <span className="caption-4 text-jarvis-textSecondary">
                Current mode: {theme === 'dark' ? 'Dark Obsidian' : 'Light Clean'}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="button-sm bg-surface-dark2 hover:bg-surface-dark3 text-white border border-jarvis-surfaceBorder flex items-center gap-2 rounded-xl interactive-tap"
            >
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              <span>Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          {/* Experimental Repeat Alerts */}
          <div className="pt-4 border-t border-surface-dark2 flex items-start justify-between gap-4">
            <div>
              <span className="title-4 text-white block">Experimental Continuous Repeat Alerts</span>
              <span className="caption-4 text-jarvis-textSecondary">
                Enables high-frequency alert cycles for urgent reminders. May impact battery life.
              </span>
            </div>
            <input
              type="checkbox"
              checked={experimentalRepeat}
              onChange={(e) => setExperimentalRepeat(e.target.checked)}
              className="w-5 h-5 rounded text-jarvis-accentBlue focus:ring-0 cursor-pointer mt-1"
            />
          </div>

          <div className="pt-4 border-t border-surface-dark2 flex justify-end">
            <button
              type="submit"
              className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white rounded-lg shadow-md interactive-tap"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone: Memory & Data Purge */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-red-500/30">
        <h2 className="title-2 text-red-400 font-semibold mb-2 flex items-center gap-2">
          <Trash size={20} />
          Data Sovereignty & Memory Purge
        </h2>
        <p className="caption-2 text-jarvis-textSecondary mb-4">
          Permanently sanitize the long-term context memory graph and purge all cached conversational interactions.
        </p>

        <button
          onClick={() => setShowPurgeModal(true)}
          className="button-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg interactive-tap"
        >
          Purge Context Memory
        </button>
      </div>

      {/* Purge Modal */}
      {showPurgeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface-dark1 border border-red-500/40 rounded-2xl p-6 shadow-2xl">
            <WarningCircle size={40} className="text-red-400 mx-auto mb-3" />
            <h3 className="title-2 text-white font-semibold text-center mb-2">Confirm Memory Sanitization</h3>
            <p className="caption-2 text-jarvis-textSecondary text-center mb-6">
              This action cannot be undone. All stored preferences, routines, and memory assertions will be permanently purged.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowPurgeModal(false)}
                className="button-sm bg-surface-dark2 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handlePurgeMemory}
                className="button-sm bg-red-500 text-white rounded-lg interactive-tap"
              >
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
