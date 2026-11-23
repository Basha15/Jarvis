'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  WarningCircle,
  Clock,
  DownloadSimple,
  MagnifyingGlass,
} from '@phosphor-icons/react';

export default function AuditLogPage() {
  const [logs, setLogs] = useState([
    {
      id: 'aud_1',
      action: 'Voice Task Completion',
      resource: 'Task: Review production deployment checklist',
      permission: 'EXECUTE',
      status: 'success',
      timestamp: '2026-11-23 12:45:12',
      details: 'Task confirmed and marked complete via voice trigger.',
    },
    {
      id: 'aud_2',
      action: 'Calendar Event Synchronization',
      resource: 'Google Calendar API',
      permission: 'EXECUTE',
      status: 'success',
      timestamp: '2026-11-23 11:30:00',
      details: 'Synchronized 3 upcoming events and validated conflict matrix.',
    },
    {
      id: 'aud_3',
      action: 'Persistent Reminder Scheduled',
      resource: 'Reminder Engine',
      permission: 'EXECUTE',
      status: 'success',
      timestamp: '2026-11-23 10:15:22',
      details: 'Created high-priority morning workout reminder with vocal chime.',
    },
    {
      id: 'aud_4',
      action: 'Document PDF Export Generated',
      resource: 'Document Generator',
      permission: 'EXECUTE',
      status: 'success',
      timestamp: '2026-11-23 09:12:44',
      details: 'Generated and exported architecture report.',
    },
  ]);

  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.resource.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportAudit = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,ID,Action,Resource,Permission,Status,Timestamp,Details\n' +
      logs
        .map((l) => `"${l.id}","${l.action}","${l.resource}","${l.permission}","${l.status}","${l.timestamp}","${l.details}"`)
        .join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(csvContent);
    a.download = `jarvis_audit_log_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            System Compliance
          </span>
          <h1 className="heading-3 text-white font-semibold">Activity History & Audit Trail</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Immutable log of all autonomous and confirmed actions performed by JARVIS AI 2.0.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportAudit}
            className="button-sm bg-surface-dark2 hover:bg-surface-dark3 text-white border border-jarvis-surfaceBorder flex items-center gap-1.5 rounded-lg interactive-tap"
          >
            <DownloadSimple size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search audit trail by action or resource..."
          className="w-full bg-surface-dark1 border border-jarvis-surfaceBorder rounded-xl pl-10 pr-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
        />
        <MagnifyingGlass size={18} className="absolute left-3.5 top-3 text-jarvis-textMuted" />
      </div>

      {/* Log Table / List */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder space-y-3">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-surface-dark3 flex items-center justify-center text-jarvis-success shrink-0 mt-0.5">
                <CheckCircle size={18} weight="fill" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="caption-4 font-mono text-white font-semibold">{log.action}</span>
                  <span className="caption-5 font-mono text-jarvis-accentCyan bg-surface-dark3 px-2 py-0.5 rounded border border-jarvis-surfaceBorder">
                    {log.permission}
                  </span>
                </div>
                <p className="caption-3 text-jarvis-textSecondary">{log.details}</p>
                <span className="caption-5 font-mono text-jarvis-textMuted block mt-1">Resource: {log.resource}</span>
              </div>
            </div>

            <div className="caption-4 font-mono text-jarvis-textMuted shrink-0 self-end md:self-center">
              {log.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
