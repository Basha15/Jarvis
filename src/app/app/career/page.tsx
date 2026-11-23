'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  UserFocus,
  CheckCircle,
  Plus,
  Play,
  FileText,
  Building,
} from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';

export default function CareerPage() {
  const { speakText } = useJarvis();

  const [applications, setApplications] = useState([
    {
      id: 'job_1',
      company: 'Apex AI Systems',
      role: 'Principal AI Architect',
      status: 'Interviewing',
      appliedDate: '2026-11-10',
      interviewDate: 'Nov 26, 2026 at 03:30 PM',
      notes: 'Round 3: System Design & Multi-Agent Orchestration architecture.',
      salary: '₹45,00,000 - ₹55,00,000 / yr',
    },
    {
      id: 'job_2',
      company: 'HyperScale Cloud Labs',
      role: 'Staff Full-Stack Engineer',
      status: 'Applied',
      appliedDate: '2026-11-18',
      interviewDate: 'Pending Review',
      notes: 'Submitted customized portfolio and JARVIS OS architecture case study.',
      salary: '₹40,00,000 / yr',
    },
  ]);

  const [activeInterviewQuestion, setActiveInterviewQuestion] = useState(
    'Describe how you achieve sub-1.2 second neural voice latency while handling mixed-language code-switching in real-time streaming architectures.'
  );

  const mockQuestions = [
    'Describe how you achieve sub-1.2 second neural voice latency while handling mixed-language code-switching in real-time streaming architectures.',
    'Explain the consensus algorithm tradeoffs between Raft and Paxos in geo-distributed microservices.',
    'How do you handle permission boundaries and prevent AI agents from executing unconfirmed financial transactions?',
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
          Career Advancement
        </span>
        <h1 className="heading-3 text-white font-semibold">Career & Interview Management</h1>
        <p className="body-4 text-jarvis-textSecondary">
          Track active vacancies, analyze resumes against requirements, and run AI-guided mock interview preparation.
        </p>
      </div>

      {/* Grid: Job Applications + Mock Interview Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Applications Tracker (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder space-y-4">
          <div className="flex items-center justify-between border-b border-surface-dark2 pb-4">
            <h2 className="title-2 text-white font-semibold flex items-center gap-2">
              <Briefcase size={20} className="text-jarvis-accentBlue" />
              Active Opportunities
            </h2>
            <span className="caption-4 font-mono text-jarvis-textMuted">
              {applications.length} tracked applications
            </span>
          </div>

          <div className="space-y-3">
            {applications.map((app) => (
              <div key={app.id} className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="title-3 text-white font-semibold">{app.role}</h3>
                    <div className="flex items-center gap-2 caption-3 text-jarvis-textSecondary">
                      <Building size={14} />
                      <span className="text-jarvis-textPrimary font-medium">{app.company}</span>
                      <span>•</span>
                      <span>{app.salary}</span>
                    </div>
                  </div>
                  <span
                    className={`caption-5 font-mono uppercase px-2 py-0.5 rounded ${
                      app.status === 'Interviewing'
                        ? 'text-jarvis-accentCyan bg-cyan-500/10 border border-cyan-500/20'
                        : 'text-jarvis-textMuted bg-surface-dark3 border border-jarvis-surfaceBorder'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <p className="caption-2 text-jarvis-textSecondary bg-surface-dark3/50 p-2.5 rounded-lg border border-jarvis-surfaceBorder">
                  <strong className="text-white">Prep Notes:</strong> {app.notes}
                </p>

                <div className="flex items-center justify-between caption-4 font-mono text-jarvis-textMuted pt-1">
                  <span>Applied: {app.appliedDate}</span>
                  <span className="text-jarvis-warning">Interview: {app.interviewDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Interview Audio Simulator (1 Col) */}
        <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 border-b border-surface-dark2 pb-3 mb-4">
              <UserFocus size={20} className="text-jarvis-accentPurple" />
              <h3 className="title-2 text-white font-semibold">AI Mock Interview</h3>
            </div>

            <p className="caption-3 text-jarvis-textSecondary mb-4">
              Practice real technical and leadership questions. Click to vocalize the prompt with JARVIS neural voice.
            </p>

            <div className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder mb-4">
              <span className="caption-5 font-mono text-jarvis-accentCyan uppercase block mb-1">Current Question</span>
              <p className="body-4 text-white font-medium mb-3">"{activeInterviewQuestion}"</p>
              <button
                onClick={() => speakText(activeInterviewQuestion, 'en')}
                className="button-sm bg-jarvis-accentPurple/20 text-jarvis-accentPurple hover:bg-jarvis-accentPurple/30 border border-jarvis-accentPurple/30 flex items-center gap-1.5 rounded-lg interactive-tap"
              >
                <Play size={14} weight="fill" />
                <span>Hear Voice Prompt</span>
              </button>
            </div>

            <div className="space-y-2">
              <span className="caption-5 font-mono text-jarvis-textMuted uppercase block">Select Scenario:</span>
              {mockQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveInterviewQuestion(q)}
                  className={`w-full p-2.5 rounded-lg border text-left caption-3 transition-colors ${
                    activeInterviewQuestion === q
                      ? 'bg-jarvis-surfaceElevated border-jarvis-accentBlue text-white font-medium'
                      : 'bg-surface-dark2 border-jarvis-surfaceBorder text-jarvis-textSecondary hover:text-white'
                  }`}
                >
                  Scenario {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-surface-dark2 caption-4 font-mono text-jarvis-textMuted">
            You can answer aloud via JARVIS voice console.
          </div>
        </div>
      </div>
    </div>
  );
}
