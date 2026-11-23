'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  CaretLeft,
  CaretRight,
  Plus,
  VideoCamera,
  CheckCircle,
  WarningCircle,
  Clock,
} from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState('November 2026');
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('14:00');

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const eventsByDay: Record<number, { title: string; time: string; type: string }[]> = {
    24: [
      { title: 'Morning Workout & Health', time: '06:30 AM', type: 'Routine' },
      { title: 'Architecture Sync (Google Meet)', time: '10:00 AM', type: 'Meeting' },
      { title: 'Call Client & Checklist Review', time: '04:00 PM', type: 'Work' },
    ],
    25: [
      { title: 'Product Strategy Review (Zoom)', time: '02:00 PM', type: 'Meeting' },
      { title: 'Investor Pitch Deck Drafting', time: '05:00 PM', type: 'Executive' },
    ],
    26: [
      { title: 'Distributed Systems Revision', time: '03:00 PM', type: 'Education' },
      { title: 'Apex AI Systems Round 3 Interview', time: '03:30 PM', type: 'Career' },
    ],
    28: [{ title: 'Flight to Hyderabad (6E-452)', time: '07:15 AM', type: 'Travel' }],
  };

  const activeEvents = eventsByDay[selectedDay] || [];

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    eventsByDay[selectedDay] = eventsByDay[selectedDay] || [];
    eventsByDay[selectedDay].push({
      title: newTitle,
      time: newTime,
      type: 'Custom',
    });
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            Connected Calendar Suite
          </span>
          <h1 className="heading-3 text-white font-semibold">Calendar & Agenda Engine</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Unified view across Google Calendar, Outlook, and JARVIS internal scheduler.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-1.5 rounded-lg interactive-tap shadow-md"
          >
            <Plus size={16} weight="bold" />
            <span>Schedule Event</span>
          </button>
        </div>
      </div>

      {/* Grid Layout: Calendar Month + Day Agenda */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Month Calendar Grid (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
          <div className="flex items-center justify-between mb-6">
            <h2 className="title-2 text-white font-semibold">{currentMonth}</h2>
            <div className="flex items-center gap-2">
              <button
                className="p-1.5 rounded-lg bg-surface-dark2 border border-jarvis-surfaceBorder text-jarvis-textSecondary hover:text-white"
                aria-label="Previous month"
              >
                <CaretLeft size={18} />
              </button>
              <button
                className="p-1.5 rounded-lg bg-surface-dark2 border border-jarvis-surfaceBorder text-jarvis-textSecondary hover:text-white"
                aria-label="Next month"
              >
                <CaretRight size={18} />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-2 text-center caption-4 font-mono text-jarvis-textMuted mb-2">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const isSelected = selectedDay === day;
              const hasEvents = !!eventsByDay[day]?.length;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`h-16 rounded-xl p-2 flex flex-col justify-between border transition-all text-left interactive-tap ${
                    isSelected
                      ? 'bg-jarvis-accentBlue/20 border-jarvis-accentBlue text-white'
                      : 'bg-surface-dark2 border-jarvis-surfaceBorder hover:border-jarvis-textMuted'
                  }`}
                >
                  <span className={`caption-3 font-mono ${isSelected ? 'font-bold text-white' : 'text-jarvis-textSecondary'}`}>
                    {day}
                  </span>
                  {hasEvents && (
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-jarvis-accentCyan" />
                      <span className="caption-5 font-mono text-jarvis-accentCyan hidden sm:inline">
                        {eventsByDay[day].length}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda (1 Col) */}
        <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-jarvis-surfaceBorder pb-4 mb-4">
              <div>
                <span className="caption-4 font-mono text-jarvis-accentCyan uppercase block">Day Focus</span>
                <h3 className="title-2 text-white font-semibold">November {selectedDay}, 2026</h3>
              </div>
              <span className="caption-4 font-mono text-jarvis-textMuted">
                {activeEvents.length} {activeEvents.length === 1 ? 'event' : 'events'}
              </span>
            </div>

            <div className="space-y-3">
              {activeEvents.length > 0 ? (
                activeEvents.map((evt, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                    <div className="flex items-center justify-between mb-1">
                      <span className="caption-4 font-mono text-jarvis-accentCyan">{evt.time}</span>
                      <span className="caption-5 font-mono uppercase bg-surface-dark3 px-2 py-0.5 rounded text-jarvis-textMuted">
                        {evt.type}
                      </span>
                    </div>
                    <span className="body-4 text-white font-medium block">{evt.title}</span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-jarvis-textMuted caption-2">
                  No scheduled commitments for this date.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-jarvis-surfaceBorder mt-6 caption-4 font-mono text-jarvis-textMuted">
            Synchronized with Google Calendar API • Token valid
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-6 shadow-2xl">
            <h3 className="title-2 text-white font-semibold mb-4">Schedule Calendar Commitment</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="caption-3 text-white block mb-1">Event Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Q1 Operations Review"
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                />
              </div>

              <div>
                <label className="caption-3 text-white block mb-1">Time</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="button-sm bg-surface-dark2 text-jarvis-textSecondary hover:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button-sm bg-jarvis-accentBlue text-white rounded-lg interactive-tap"
                >
                  Confirm & Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
