'use client';

import React, { useState } from 'react';
import {
  FileText,
  FileDoc,
  FilePdf,
  DownloadSimple,
  Plus,
  MagnifyingGlass,
  CheckCircle,
} from '@phosphor-icons/react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    {
      id: 'doc_1',
      title: 'JARVIS AI 2.0 System Architecture Overview',
      docType: 'Report',
      format: 'pdf',
      date: 'Nov 23, 2026',
      content:
        '# JARVIS AI 2.0 System Architecture Overview\n\nA comprehensive personal AI operating system combining multilingual voice intelligence, persistent memory, and project governance.',
    },
    {
      id: 'doc_2',
      title: 'Q1 Enterprise Client Proposal',
      docType: 'Proposal',
      format: 'docx',
      date: 'Nov 22, 2026',
      content:
        '# Executive Business Proposal: Intelligent Operating Systems for Leadership\n\nAutomating administrative overhead, scheduling conflicts, and data aggregation for high-output executives.',
    },
    {
      id: 'doc_3',
      title: 'Voice Latency & Streaming Benchmarks Dataset',
      docType: 'Dataset',
      format: 'csv',
      date: 'Nov 20, 2026',
      content: 'Benchmark,Language,FirstAudioLatencyMs\nTest1,English,340\nTest2,Telugu,410\nTest3,Hindi,390',
    },
  ]);

  const [search, setSearch] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredDocs = documents.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()) || d.docType.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = async (doc: (typeof documents)[0]) => {
    setDownloadingId(doc.id);
    try {
      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: doc.title,
          content: doc.content,
          docType: doc.docType.toLowerCase(),
          format: doc.format,
        }),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${doc.title.toLowerCase().replace(/\s+/g, '_')}.${doc.format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            Asset Repository
          </span>
          <h1 className="heading-3 text-white font-semibold">Documents & Presentations</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Archive of all AI-synthesized executive briefs, proposals, slide decks, and downloadable reports.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl pl-9 pr-4 py-2 text-white text-xs focus:outline-none focus:border-jarvis-accentBlue"
          />
          <MagnifyingGlass size={16} className="absolute left-3 top-2.5 text-jarvis-textMuted" />
        </div>
      </div>

      {/* Document Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const isPdf = doc.format === 'pdf';
          const isDocx = doc.format === 'docx';
          return (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col justify-between hover:border-jarvis-accentBlue/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs uppercase ${
                      isPdf
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : isDocx
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {doc.format}
                  </div>
                  <span className="caption-5 font-mono text-jarvis-textMuted">{doc.date}</span>
                </div>

                <h3 className="title-3 text-white font-semibold mb-1 line-clamp-2">{doc.title}</h3>
                <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2 py-0.5 rounded border border-jarvis-surfaceBorder inline-block mb-4">
                  {doc.docType}
                </span>
              </div>

              <div className="border-t border-surface-dark2 pt-4 flex items-center justify-between">
                <span className="caption-5 font-mono text-jarvis-textMuted">Generated by JARVIS OS</span>
                <button
                  onClick={() => handleDownload(doc)}
                  disabled={downloadingId === doc.id}
                  className="button-sm bg-surface-dark2 hover:bg-surface-dark3 text-white border border-jarvis-surfaceBorder flex items-center gap-1.5 rounded-lg interactive-tap"
                >
                  <DownloadSimple size={14} />
                  <span>{downloadingId === doc.id ? 'Exporting...' : 'Download'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
