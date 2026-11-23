'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '@/components/public/Navbar';
import { PublicFooter } from '@/components/public/Footer';
import { PlugsConnected, ArrowRight, CheckCircle, ShieldCheck } from '@phosphor-icons/react';

export default function IntegrationsPublicPage() {
  const supported = [
    {
      name: 'Google Workspace',
      services: ['Gmail', 'Google Calendar', 'Google Drive', 'Google Meet'],
      type: 'OAuth 2.0 Official API',
      status: 'Production Supported',
    },
    {
      name: 'Developer Platforms',
      services: ['GitHub Repositories', 'GitLab', 'CI/CD Pipelines'],
      type: 'Personal Access Token / OAuth',
      status: 'Production Supported',
    },
    {
      name: 'Team Collaboration',
      services: ['Slack', 'Microsoft Teams', 'Zoom Video'],
      type: 'Webhooks & Bot Tokens',
      status: 'Production Supported',
    },
    {
      name: 'Productivity Systems',
      services: ['Notion', 'Trello', 'Asana', 'Jira Software'],
      type: 'REST APIs & Integrations',
      status: 'Production Supported',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-dark0 text-jarvis-textPrimary flex flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="caption-3 font-mono uppercase tracking-wider text-jarvis-accentBlue block mb-2">
            Ecosystem Connectivity
          </span>
          <h1 className="heading-2 sm:heading-1 font-semibold text-white mb-4">
            Connect your tools with minimal permission scope
          </h1>
          <p className="title-3 text-jarvis-textSecondary">
            JARVIS AI 2.0 integrates with official APIs to coordinate your emails, calendars, code repositories, and meetings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {supported.map((item) => (
            <div key={item.name} className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="title-2 text-white font-semibold">{item.name}</h3>
                  <span className="caption-5 font-mono text-jarvis-success bg-jarvis-success/10 px-2.5 py-1 rounded-md border border-jarvis-success/20">
                    {item.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {item.services.map((srv) => (
                    <div key={srv} className="flex items-center gap-2 caption-2 text-jarvis-textSecondary">
                      <CheckCircle size={16} className="text-jarvis-accentCyan" weight="fill" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="caption-4 font-mono text-jarvis-textMuted border-t border-surface-dark2 pt-3">
                Protocol: {item.type}
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder text-center">
          <h2 className="heading-3 text-white font-semibold mb-3">Configure integrations in your console</h2>
          <p className="body-3 text-jarvis-textSecondary max-w-lg mx-auto mb-6">
            View active tokens, set permission boundaries, and disconnect services at any time.
          </p>
          <Link
            href="/app/integrations"
            className="button-lg bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white inline-flex items-center gap-2 interactive-tap"
          >
            <span>Open Integrations Centre</span>
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
