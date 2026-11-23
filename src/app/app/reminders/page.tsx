'use client';

import React, { useState } from 'react';
import {
  BellSimpleRinging,
  Plus,
  Play,
  SpeakerHigh,
  CheckCircle,
  Trash,
  Pause,
  WarningCircle,
  DeviceMobile,
} from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';
import { Reminder } from '@/types';

export default function RemindersPage() {
  const {
    reminders,
    refreshData,
    permissionStatus,
    requestNotificationPermission,
    speakText,
  } = useJarvis();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [recurrence, setRecurrence] = useState<Reminder['recurrence']>('none');
  const [ringtone, setRingtone] = useState<Reminder['ringtone']>('chime');
  const [voiceAnnouncement, setVoiceAnnouncement] = useState(true);
  const [showExperimentalWarning, setShowExperimentalWarning] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        scheduledTime: scheduledTime ? new Date(scheduledTime).toISOString() : new Date().toISOString(),
        recurrence,
        ringtone,
        voiceAnnouncement,
      }),
    });

    setTitle('');
    setShowCreateModal(false);
    refreshData();
  };

  const handleUpdateStatus = async (id: string, status: Reminder['status']) => {
    await fetch('/api/reminders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    refreshData();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/reminders?id=${id}`, { method: 'DELETE' });
    refreshData();
  };

  const playSoundPreview = (tone: string) => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (tone === 'urgent') {
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.15);
      } else if (tone === 'chime') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12);
      } else {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      }

      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc.stop(ctx.currentTime + 0.45);
    }
    if (voiceAnnouncement) {
      setTimeout(() => {
        speakText(`Preview: ${tone} alert tone active.`, 'en');
      }, 500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            Persistent Alert Engine
          </span>
          <h1 className="heading-3 text-white font-semibold">Reminders & Persistent Alerts</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Alerts persist until explicitly marked completed. Voice announcements ensure critical priorities are never missed.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {permissionStatus !== 'granted' && (
            <button
              onClick={requestNotificationPermission}
              className="button-sm bg-surface-dark2 hover:bg-surface-dark3 text-jarvis-accentCyan border border-jarvis-surfaceBorder flex items-center gap-1.5 rounded-lg interactive-tap"
            >
              <DeviceMobile size={16} />
              <span>Enable Web Push</span>
            </button>
          )}

          <button
            onClick={() => setShowCreateModal(true)}
            className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-1.5 rounded-lg interactive-tap shadow-md"
          >
            <Plus size={16} weight="bold" />
            <span>New Reminder</span>
          </button>
        </div>
      </div>

      {/* PWA Background Behaviour Transparency Notice */}
      <div className="p-4 rounded-xl bg-surface-dark1 border border-jarvis-surfaceBorder flex items-start gap-3">
        <WarningCircle size={22} className="text-jarvis-accentBlue shrink-0 mt-0.5" />
        <div className="caption-2 text-jarvis-textSecondary">
          <strong className="text-white">Operating System Notice:</strong> JARVIS uses Web Push and Web Audio for alerts.
          Browsers restrict continuous audio looping when a mobile device is locked; reminders will pop notifications immediately upon waking.
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.map((rem) => {
          const isComplete = rem.status === 'completed';
          const isPaused = rem.status === 'paused';
          return (
            <div
              key={rem.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isComplete
                  ? 'bg-surface-dark2/40 border-jarvis-surfaceBorder opacity-60'
                  : 'bg-surface-dark1 border-jarvis-surfaceBorder'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex items-center justify-center text-jarvis-warning shrink-0">
                  <BellSimpleRinging size={20} weight={isComplete ? 'regular' : 'fill'} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="caption-4 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2 py-0.5 rounded border border-jarvis-surfaceBorder">
                      {rem.recurrence}
                    </span>
                    <span className="caption-4 font-mono text-jarvis-textMuted">
                      {new Date(rem.scheduledTime).toLocaleDateString()} at{' '}
                      {new Date(rem.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h3 className={`title-3 font-semibold ${isComplete ? 'line-through text-jarvis-textMuted' : 'text-white'}`}>
                    {rem.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 caption-4 text-jarvis-textSecondary font-mono">
                    <span>Tone: {rem.ringtone}</span>
                    <span>•</span>
                    <span>Voice Announcement: {rem.voiceAnnouncement ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => playSoundPreview(rem.ringtone)}
                  className="p-2 rounded-lg bg-surface-dark2 hover:bg-surface-dark3 text-jarvis-textSecondary hover:text-white border border-jarvis-surfaceBorder"
                  title="Test Alert Sound"
                  aria-label="Test Alert Sound"
                >
                  <Play size={16} />
                </button>

                {!isComplete && (
                  <button
                    onClick={() => handleUpdateStatus(rem.id, isPaused ? 'active' : 'paused')}
                    className="p-2 rounded-lg bg-surface-dark2 hover:bg-surface-dark3 text-jarvis-textSecondary hover:text-white border border-jarvis-surfaceBorder"
                    title={isPaused ? 'Resume Alert' : 'Pause Alert'}
                    aria-label={isPaused ? 'Resume Alert' : 'Pause Alert'}
                  >
                    <Pause size={16} />
                  </button>
                )}

                <button
                  onClick={() => handleUpdateStatus(rem.id, isComplete ? 'active' : 'completed')}
                  className={`p-2 rounded-lg border transition-colors ${
                    isComplete
                      ? 'bg-jarvis-success/20 text-jarvis-success border-jarvis-success/40'
                      : 'bg-surface-dark2 text-jarvis-textSecondary hover:text-white border-jarvis-surfaceBorder'
                  }`}
                  title={isComplete ? 'Mark Incomplete' : 'Complete Reminder'}
                  aria-label="Complete Reminder"
                >
                  <CheckCircle size={16} weight={isComplete ? 'fill' : 'regular'} />
                </button>

                <button
                  onClick={() => handleDelete(rem.id)}
                  className="p-2 rounded-lg bg-surface-dark2 hover:bg-red-500/20 text-jarvis-textSecondary hover:text-red-400 border border-jarvis-surfaceBorder"
                  title="Delete Reminder"
                  aria-label="Delete Reminder"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Reminder Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-6 shadow-2xl">
            <h3 className="title-2 text-white font-semibold mb-4">Create Persistent Reminder</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="caption-3 text-white block mb-1">Reminder Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Call Client & Review Deliverables"
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="caption-3 text-white block mb-1">Schedule Date & Time</label>
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  />
                </div>

                <div>
                  <label className="caption-3 text-white block mb-1">Recurrence Interval</label>
                  <select
                    value={recurrence}
                    onChange={(e) => {
                      const val = e.target.value as Reminder['recurrence'];
                      setRecurrence(val);
                      if (val === 'second_experiment') {
                        setShowExperimentalWarning(true);
                      }
                    }}
                    className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  >
                    <option value="none">One-time Alert</option>
                    <option value="daily">Daily Schedule</option>
                    <option value="weekly">Weekly Routine</option>
                    <option value="monthly">Monthly Cycle</option>
                    <option value="second_experiment">Experimental (Continuous Repeat)</option>
                  </select>
                </div>
              </div>

              {showExperimentalWarning && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 caption-2">
                  <strong>Warning:</strong> Continuous repeated alerts may rapidly impact device battery and notification limits. Immediate manual stop controls will remain active.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="caption-3 text-white block mb-1">Ringtone Tone</label>
                  <select
                    value={ringtone}
                    onChange={(e) => setRingtone(e.target.value as Reminder['ringtone'])}
                    className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  >
                    <option value="chime">Subtle Chime</option>
                    <option value="standard">Standard Tone</option>
                    <option value="urgent">Urgent Warning</option>
                    <option value="vocal">Voice Vocal Announcement</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="voiceAnnounce"
                    checked={voiceAnnouncement}
                    onChange={(e) => setVoiceAnnouncement(e.target.checked)}
                    className="w-4 h-4 rounded text-jarvis-accentBlue focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="voiceAnnounce" className="caption-3 text-white cursor-pointer">
                    Neural Voice Announcement
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-dark2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="button-sm bg-surface-dark2 text-jarvis-textSecondary hover:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button-sm bg-jarvis-accentBlue text-white rounded-lg interactive-tap shadow-md"
                >
                  Commit Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
