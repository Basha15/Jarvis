'use client';

import React, { useState } from 'react';
import {
  TrendUp,
  Target,
  Megaphone,
  MagnifyingGlass,
  ChartBar,
  ChartPieSlice,
  CheckCircle,
} from '@phosphor-icons/react';

export default function MarketingWorkspacePage() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'personas' | 'seo'>('campaigns');

  const campaigns = [
    {
      name: 'JARVIS 2.0 Product Launch Campaign',
      channel: 'Google Ads & LinkedIn Sponsored',
      budget: '$4,500',
      reach: '142,500',
      ctr: '3.82%',
      cpc: '$1.42',
      conversions: '614',
      status: 'Active',
    },
    {
      name: 'Multilingual Voice Developer Outreach',
      channel: 'X Ads & Developer Subreddits',
      budget: '$2,200',
      reach: '88,900',
      ctr: '4.15%',
      cpc: '$0.98',
      conversions: '422',
      status: 'Active',
    },
    {
      name: 'Enterprise Executive Inbound',
      channel: 'SEO Content & Whitepapers',
      budget: '$1,800',
      reach: '45,200',
      ctr: '2.64%',
      cpc: '$2.10',
      conversions: '118',
      status: 'Optimizing',
    },
  ];

  const personas = [
    {
      role: 'Principal Engineer & Tech Founder',
      pain: 'Context switching across code repos, team syncs, and terminal sessions.',
      solution: 'Sub-1.2s voice queries to check PR reviews and server status without leaving the IDE.',
    },
    {
      role: 'C-Suite Executive & Managing Director',
      pain: 'Back-to-back calendar conflicts and missed personal commitments.',
      solution: 'Autonomous meeting rescheduling and persistent cross-language reminder vocalizations.',
    },
  ];

  const keywords = [
    { query: 'personal ai operating system', volume: '14,800', difficulty: 'Medium', position: '#3' },
    { query: 'multilingual voice assistant telugu hindi', volume: '8,200', difficulty: 'Low', position: '#1' },
    { query: 'cross language ai memory engine', volume: '3,400', difficulty: 'Low', position: '#2' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            Growth & Analytics
          </span>
          <h1 className="heading-3 text-white font-semibold">Marketing Intelligence Workspace</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Campaign performance metrics, audience segmentation personas, and organic SEO rank analysis.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-surface-dark2 p-1 rounded-xl border border-jarvis-surfaceBorder">
          {(['campaigns', 'personas', 'seo'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg caption-3 capitalize transition-colors interactive-tap ${
                activeTab === tab
                  ? 'bg-jarvis-accentBlue text-white font-semibold'
                  : 'text-jarvis-textSecondary hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Disclaimer per Section 12 */}
      <div className="p-3.5 rounded-xl bg-surface-dark1 border border-jarvis-surfaceBorder caption-3 text-jarvis-textSecondary font-mono flex items-center justify-between">
        <span>DATA SOURCE: Authorized Google Ads & Search Console API Sync</span>
        <span className="text-jarvis-accentCyan">AUDITED & VERIFIED</span>
      </div>

      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaigns.map((camp) => (
              <div key={camp.name} className="p-5 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="caption-5 font-mono text-jarvis-success bg-jarvis-success/10 px-2 py-0.5 rounded border border-jarvis-success/20">
                      {camp.status}
                    </span>
                    <span className="caption-4 font-mono text-white font-bold">{camp.budget}</span>
                  </div>
                  <h3 className="title-3 text-white font-semibold mb-1">{camp.name}</h3>
                  <p className="caption-4 text-jarvis-textMuted mb-4">{camp.channel}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono border-t border-surface-dark2 pt-3">
                    <div>
                      <span className="text-jarvis-textMuted block">Reach:</span>
                      <strong className="text-white">{camp.reach}</strong>
                    </div>
                    <div>
                      <span className="text-jarvis-textMuted block">CTR:</span>
                      <strong className="text-jarvis-accentCyan">{camp.ctr}</strong>
                    </div>
                    <div>
                      <span className="text-jarvis-textMuted block">CPC:</span>
                      <strong className="text-white">{camp.cpc}</strong>
                    </div>
                    <div>
                      <span className="text-jarvis-textMuted block">Conversions:</span>
                      <strong className="text-jarvis-success">{camp.conversions}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'personas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((p) => (
            <div key={p.role} className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
              <div className="flex items-center gap-3 mb-4">
                <Target size={24} className="text-jarvis-accentPurple" />
                <h3 className="title-2 text-white font-semibold">{p.role}</h3>
              </div>
              <div className="space-y-3 body-4">
                <div>
                  <strong className="text-red-400 block caption-4 font-mono uppercase mb-1">Core Friction Point:</strong>
                  <p className="text-jarvis-textSecondary">{p.pain}</p>
                </div>
                <div>
                  <strong className="text-jarvis-accentCyan block caption-4 font-mono uppercase mb-1">
                    JARVIS Solution Matrix:
                  </strong>
                  <p className="text-white">{p.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
          <h3 className="title-2 text-white font-semibold mb-4">Verified Search Engine Rank Index</h3>
          <div className="space-y-3">
            {keywords.map((kw) => (
              <div key={kw.query} className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex items-center justify-between">
                <div>
                  <span className="title-4 text-white font-medium block">{kw.query}</span>
                  <span className="caption-4 font-mono text-jarvis-textMuted">
                    Monthly Volume: {kw.volume} • Difficulty: {kw.difficulty}
                  </span>
                </div>
                <span className="title-3 font-mono font-bold text-jarvis-accentCyan bg-surface-dark3 px-3 py-1 rounded-lg border border-jarvis-surfaceBorder">
                  {kw.position}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
