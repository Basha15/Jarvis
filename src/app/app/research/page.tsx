'use client';

import React, { useState } from 'react';
import {
  MagnifyingGlass,
  BookOpen,
  ArrowSquareOut,
  ShieldCheck,
  WarningCircle,
  Lightbulb,
  CheckCircle,
} from '@phosphor-icons/react';

export default function ResearchWorkspacePage() {
  const [reports, setReports] = useState([
    {
      id: 'res_1',
      topic: 'Ultra-low Latency Neural Speech Streaming in 2026',
      summary:
        'Technical analysis of edge neural speech-to-text models and streaming vocoders for sub-1.2s conversational voice response pipelines.',
      findings: [
        'Chunked streaming inference achieves 340ms first-audio generation over WebSockets.',
        'Client-side acoustic feature extraction lowers transmission payload by 42%.',
        'Multilingual code-switching requires acoustic token normalization to avoid translation artifacts.',
      ],
      sources: [
        { title: 'Neural Audio Synthesizers Conference 2026', url: 'https://arxiv.org/abs/2602.04512', date: 'Feb 2026' },
        { title: 'W3C Speech Streaming Working Group Report', url: 'https://w3.org/TR/speech-streaming-2026', date: 'May 2026' },
      ],
      risks: [
        'High network jitter can introduce buffer starvation on mobile 4G networks.',
        'Client-side Web Audio synthesis increases battery consumption by ~4% on mobile devices.',
      ],
      opportunities: [
        'Enables instantaneous user interruption with zero server roundtrip lag.',
        'Enables native conversational feel across Telugu, Hindi, and English.',
      ],
      recommendations: [
        'Adopt streaming chunk sizes of 160ms for initial speech packets.',
        'Implement local audio cache for standard confirmation vocalizations.',
      ],
      date: 'Nov 2026',
    },
  ]);

  const [searchTopic, setSearchTopic] = useState('');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
          Evidence-Based Intelligence
        </span>
        <h1 className="heading-3 text-white font-semibold">Deep Research Workspace</h1>
        <p className="body-4 text-jarvis-textSecondary">
          Conduct verified technical and market research with full citations, risk analyses, and actionable recommendations.
        </p>
      </div>

      {/* Verified Sources Disclaimer per Section 16 */}
      <div className="p-4 rounded-xl bg-surface-dark1 border border-jarvis-surfaceBorder caption-3 text-jarvis-textSecondary flex items-center gap-3">
        <ShieldCheck size={20} className="text-jarvis-success shrink-0" />
        <span>
          <strong>Research Policy:</strong> External sources are directly cited with publication dates. Verified facts, statistical estimates, and AI recommendations are distinctly segregated.
        </span>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {reports.map((r) => (
          <div key={r.id} className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder space-y-5">
            <div className="border-b border-surface-dark2 pb-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2 py-0.5 rounded border border-jarvis-surfaceBorder">
                  Synthesized {r.date}
                </span>
              </div>
              <h2 className="heading-4 text-white font-semibold">{r.topic}</h2>
              <p className="body-4 text-jarvis-textSecondary mt-2 leading-relaxed">{r.summary}</p>
            </div>

            {/* Key Findings */}
            <div>
              <span className="caption-4 font-mono text-jarvis-accentBlue uppercase font-bold block mb-2">
                Empirical Findings:
              </span>
              <ul className="space-y-1.5 caption-2 text-white">
                {r.findings.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-jarvis-accentCyan shrink-0 mt-0.5" weight="fill" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Citations & Sources */}
            <div>
              <span className="caption-4 font-mono text-jarvis-textMuted uppercase font-bold block mb-2">
                Source Citations:
              </span>
              <div className="flex flex-wrap gap-2">
                {r.sources.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="caption-3 text-jarvis-accentBlue hover:underline bg-surface-dark2 px-3 py-1.5 rounded-lg border border-jarvis-surfaceBorder flex items-center gap-1.5"
                  >
                    <span>{s.title} ({s.date})</span>
                    <ArrowSquareOut size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Risks & Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-surface-dark2">
              <div className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <span className="caption-4 font-mono text-red-400 uppercase font-bold block mb-2 flex items-center gap-1.5">
                  <WarningCircle size={16} />
                  Risks & Limitations:
                </span>
                <ul className="space-y-1 caption-3 text-jarvis-textSecondary">
                  {r.risks.map((risk, i) => (
                    <li key={i}>• {risk}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <span className="caption-4 font-mono text-jarvis-success uppercase font-bold block mb-2 flex items-center gap-1.5">
                  <Lightbulb size={16} />
                  Operational Recommendations:
                </span>
                <ul className="space-y-1 caption-3 text-jarvis-textSecondary">
                  {r.recommendations.map((rec, i) => (
                    <li key={i}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
