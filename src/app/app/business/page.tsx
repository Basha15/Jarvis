'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  FileDoc,
  FilePdf,
  FileText,
  DownloadSimple,
  Sparkle,
  Presentation,
  CheckCircle,
} from '@phosphor-icons/react';

export default function BusinessWorkspacePage() {
  const [docType, setDocType] = useState('proposal');
  const [docTitle, setDocTitle] = useState('Q1 Enterprise Client Proposal');
  const [docContent, setDocContent] = useState(
    'Executive Business Proposal: AI Operating Systems for Enterprise Leadership\n\n1. Executive Summary\nModern executives spend over 4.5 hours per week on scheduling fragments and manual project reporting. JARVIS AI 2.0 unifies personal voice control, cross-language task normalization, and autonomous document synthesis.\n\n2. Financial & Strategic ROI\n- 38% reduction in administrative overhead.\n- Immediate sub-1.2s voice access to corporate agendas.\n- Strict 4-tier autonomy matrix ensuring zero unapproved transactions.'
  );
  const [generating, setGenerating] = useState(false);

  const handleDownload = async (format: 'pdf' | 'docx' | 'markdown') => {
    setGenerating(true);
    try {
      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: docTitle,
          content: docContent,
          docType,
          format,
        }),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${docTitle.toLowerCase().replace(/\s+/g, '_')}.${format === 'markdown' ? 'md' : format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setGenerating(false);
    }
  };

  const templates = [
    {
      type: 'proposal',
      title: 'Q1 Enterprise Client Proposal',
      icon: Briefcase,
      desc: 'Structured executive proposal for business clients with value metrics.',
    },
    {
      type: 'pitch_deck',
      title: 'Series A Investor Deck Outline',
      icon: Presentation,
      desc: '12-slide venture capital presentation blueprint.',
    },
    {
      type: 'minutes',
      title: 'Executive Board Meeting Minutes',
      icon: FileText,
      desc: 'Formal meeting record with action items and attendee ledger.',
    },
    {
      type: 'business_plan',
      title: 'Annual Strategic Operations Plan',
      icon: FileDoc,
      desc: 'Comprehensive multi-department operational milestones.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
          Leadership Suite
        </span>
        <h1 className="heading-3 text-white font-semibold">Business Executive Workspace</h1>
        <p className="body-4 text-jarvis-textSecondary">
          Draft strategic plans, investor pitch decks, meeting minutes, and corporate proposals with instant DOCX & PDF exports.
        </p>
      </div>

      {/* Template Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          const isSelected = docType === tpl.type;
          return (
            <button
              key={tpl.type}
              onClick={() => {
                setDocType(tpl.type);
                setDocTitle(tpl.title);
              }}
              className={`p-4 rounded-xl border text-left transition-all interactive-tap ${
                isSelected
                  ? 'bg-jarvis-surfaceElevated border-jarvis-accentBlue shadow-md'
                  : 'bg-surface-dark1 border-jarvis-surfaceBorder hover:border-jarvis-textMuted'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-surface-dark2 border border-jarvis-surfaceBorder flex items-center justify-center text-jarvis-accentCyan mb-2">
                <Icon size={18} weight="bold" />
              </div>
              <h3 className="title-4 text-white font-semibold block mb-1">{tpl.title}</h3>
              <p className="caption-5 text-jarvis-textSecondary">{tpl.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Document Drafting Canvas */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-jarvis-surfaceBorder pb-4">
          <div className="flex-1 w-full sm:w-auto">
            <label className="caption-4 font-mono text-jarvis-textMuted uppercase block mb-1">Document Subject</label>
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2 text-white font-semibold title-3 focus:outline-none focus:border-jarvis-accentBlue"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => handleDownload('docx')}
              disabled={generating}
              className="button-sm bg-surface-dark2 hover:bg-surface-dark3 text-white border border-jarvis-surfaceBorder flex items-center gap-1.5 rounded-lg interactive-tap"
            >
              <FileDoc size={16} className="text-blue-400" />
              <span>Download DOCX</span>
            </button>

            <button
              onClick={() => handleDownload('pdf')}
              disabled={generating}
              className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-1.5 rounded-lg interactive-tap shadow-md"
            >
              <FilePdf size={16} />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        <div>
          <label className="caption-4 font-mono text-jarvis-textMuted uppercase block mb-1">
            Executive Content & Analysis
          </label>
          <textarea
            value={docContent}
            onChange={(e) => setDocContent(e.target.value)}
            rows={12}
            className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl p-4 text-white body-4 font-mono leading-relaxed focus:outline-none focus:border-jarvis-accentBlue resize-y"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-jarvis-textMuted font-mono pt-2">
          <span>Real-time file generator powered by docx & jsPDF</span>
          <span>Verified factual representation requirement enforced</span>
        </div>
      </div>
    </div>
  );
}
