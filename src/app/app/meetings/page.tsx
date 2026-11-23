'use client';

import React, { useState } from 'react';
import {
  VideoCamera,
  CalendarCheck,
  Plus,
  Users,
  CheckCircle,
  Clock,
  ArrowSquareOut,
  ShieldCheck,
} from '@phosphor-icons/react';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([
    {
      id: 'meet_1',
      title: 'Weekly Technical Architecture Sync',
      platform: 'Google Meet',
      time: 'Nov 24, 2026 at 10:00 AM - 11:00 AM',
      link: 'https://meet.google.com/abc-jarvis-sync',
      participants: ['architect@jarvis-os.ai', 'dev-lead@jarvis-os.ai', 'operator@jarvis-os.ai'],
      agenda: ['Voice latency benchmarks under 1.2s', 'Database query caching', 'PWA push verification'],
      prepNotes: 'Bring latency logs from Telugu and Hindi streaming tests.',
      actionItems: ['Benchmark neural speech chunk sizes', 'Validate service worker push registration'],
    },
    {
      id: 'meet_2',
      title: 'Q1 Enterprise Product Strategy Review',
      platform: 'Zoom Video',
      time: 'Nov 25, 2026 at 02:00 PM - 03:00 PM',
      link: 'https://zoom.us/j/9876543210',
      participants: ['product@jarvis-os.ai', 'stakeholder@jarvis-os.ai'],
      agenda: ['Q1 Feature prioritization', 'Autonomous booking engine guardrails'],
      prepNotes: 'Review confirmation safeguards for financial transactions.',
      actionItems: [],
    },
  ]);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('Google Meet');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setMeetings([
      ...meetings,
      {
        id: `meet_${Date.now()}`,
        title,
        platform,
        time: `${date} at ${time}`,
        link: 'https://meet.google.com/new-meeting-sync',
        participants: ['operator@jarvis-os.ai'],
        agenda: ['Synchronized via JARVIS AI scheduler'],
        prepNotes: 'Agenda details dispatched to participants.',
        actionItems: [],
      },
    ]);

    setTitle('');
    setShowScheduleModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            Executive Coordination
          </span>
          <h1 className="heading-3 text-white font-semibold">Meetings & Appointments</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Manage video conferencing links, preparation briefs, agendas, and minutes across Google Meet, Zoom, and Teams.
          </p>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-1.5 rounded-lg interactive-tap shadow-md"
        >
          <Plus size={16} weight="bold" />
          <span>New Meeting</span>
        </button>
      </div>

      {/* Recording Consent Notice per Section 13 */}
      <div className="p-4 rounded-xl bg-surface-dark1 border border-jarvis-surfaceBorder caption-3 text-jarvis-textSecondary flex items-center gap-3">
        <ShieldCheck size={20} className="text-jarvis-success shrink-0" />
        <span>
          <strong>Privacy Compliance:</strong> Automated recording and transcription require explicit participant consent and adhere strictly to applicable telecommunication recording regulations.
        </span>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.map((m) => (
          <div key={m.id} className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-dark2 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2 py-0.5 rounded border border-jarvis-surfaceBorder">
                    {m.platform}
                  </span>
                  <span className="caption-4 font-mono text-jarvis-textMuted">{m.time}</span>
                </div>
                <h3 className="title-2 text-white font-semibold">{m.title}</h3>
              </div>

              <a
                href={m.link}
                target="_blank"
                rel="noreferrer"
                className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-1.5 rounded-lg interactive-tap"
              >
                <span>Join Call</span>
                <ArrowSquareOut size={16} />
              </a>
            </div>

            {/* Participants */}
            <div className="flex items-center gap-2 caption-3 text-jarvis-textSecondary">
              <Users size={16} className="text-jarvis-textMuted" />
              <span>Participants: {m.participants.join(', ')}</span>
            </div>

            {/* Agenda & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <span className="caption-4 font-mono text-jarvis-accentBlue uppercase font-bold block mb-2">
                  Session Agenda:
                </span>
                <ul className="space-y-1.5 caption-3 text-white">
                  {m.agenda.map((ag, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-jarvis-accentCyan">•</span>
                      <span>{ag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <span className="caption-4 font-mono text-jarvis-accentCyan uppercase font-bold block mb-2">
                  Preparation Brief:
                </span>
                <p className="caption-3 text-jarvis-textSecondary leading-relaxed">{m.prepNotes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-6 shadow-2xl">
            <h3 className="title-2 text-white font-semibold mb-4">Schedule Executive Sync</h3>
            <form onSubmit={handleSchedule} className="space-y-4">
              <div>
                <label className="caption-3 text-white block mb-1">Meeting Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Q1 Operations Review"
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="caption-3 text-white block mb-1">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom Video">Zoom Video</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                  </select>
                </div>

                <div>
                  <label className="caption-3 text-white block mb-1">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  />
                </div>
              </div>

              <div>
                <label className="caption-3 text-white block mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-dark2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="button-sm bg-surface-dark2 text-jarvis-textSecondary hover:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button-sm bg-jarvis-accentBlue text-white rounded-lg interactive-tap shadow-md"
                >
                  Confirm Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
