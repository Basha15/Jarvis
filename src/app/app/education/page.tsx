'use client';

import React, { useState } from 'react';
import {
  Student,
  BookOpen,
  CalendarCheck,
  CheckCircle,
  Clock,
  Sparkle,
  Plus,
} from '@phosphor-icons/react';

export default function EducationPage() {
  const [exams, setExams] = useState([
    {
      id: 'exam_1',
      subject: 'Advanced Distributed Systems & Consensus',
      examDate: 'Dec 05, 2026 at 09:30 AM',
      status: 'revising',
      topics: [
        { name: 'Raft Consensus Algorithm', done: true },
        { name: 'Vector Clocks & Causality', done: true },
        { name: 'Two-Phase Commit vs Saga Pattern', done: false },
        { name: 'Eventual Consistency & CRDTs', done: false },
      ],
      revisionProgress: 50,
    },
    {
      id: 'exam_2',
      subject: 'Deep Learning & Speech Recognition Architectures',
      examDate: 'Dec 12, 2026 at 02:00 PM',
      status: 'not_started',
      topics: [
        { name: 'Conformer Neural Architecture', done: true },
        { name: 'Connectionist Temporal Classification (CTC)', done: false },
        { name: 'Neural Vocoders & Edge Streaming', done: false },
      ],
      revisionProgress: 33,
    },
  ]);

  const toggleTopic = (examId: string, topicName: string) => {
    setExams((prev) =>
      prev.map((e) => {
        if (e.id !== examId) return e;
        const newTopics = e.topics.map((t) => (t.name === topicName ? { ...t, done: !t.done } : t));
        const doneCount = newTopics.filter((t) => t.done).length;
        const prog = Math.round((doneCount / newTopics.length) * 100);
        return { ...e, topics: newTopics, revisionProgress: prog };
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
          Academic & Technical Mastery
        </span>
        <h1 className="heading-3 text-white font-semibold">Education & Examination Hub</h1>
        <p className="body-4 text-jarvis-textSecondary">
          Track course syllabi, schedule revision blocks, and prepare for certifications and technical examinations.
        </p>
      </div>

      {/* Examination Schedule Grid */}
      <div className="space-y-6">
        {exams.map((exam) => (
          <div key={exam.id} className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-surface-dark2 pb-4">
              <div>
                <span className="caption-4 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2.5 py-0.5 rounded border border-jarvis-surfaceBorder mb-1 inline-block">
                  Target Exam: {exam.examDate}
                </span>
                <h2 className="heading-4 text-white font-semibold">{exam.subject}</h2>
              </div>
              <div className="text-right sm:self-center">
                <span className="caption-4 font-mono text-jarvis-textMuted block">Syllabus Covered</span>
                <span className="heading-4 text-jarvis-accentCyan font-mono font-bold">{exam.revisionProgress}%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-surface-dark2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-jarvis-accentBlue to-jarvis-accentPurple rounded-full transition-all duration-300"
                style={{ width: `${exam.revisionProgress}%` }}
              />
            </div>

            {/* Syllabus Checkpoints */}
            <div>
              <span className="caption-4 font-mono text-jarvis-textMuted uppercase block mb-3">
                Key Exam Syllabus Topics:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exam.topics.map((t) => (
                  <div
                    key={t.name}
                    className="p-3 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() => toggleTopic(exam.id, t.name)}
                        className="w-4 h-4 rounded text-jarvis-accentBlue focus:ring-0 cursor-pointer"
                      />
                      <span className={`caption-2 ${t.done ? 'line-through text-jarvis-textMuted' : 'text-white'}`}>
                        {t.name}
                      </span>
                    </div>
                    {t.done && <CheckCircle size={16} className="text-jarvis-success" weight="fill" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
