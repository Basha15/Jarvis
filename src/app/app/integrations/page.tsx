'use client';

import React, { useState, useEffect } from 'react';
import {
  PlugsConnected,
  CheckCircle,
  XCircle,
  ShieldCheck,
  ArrowsClockwise,
  Key,
} from '@phosphor-icons/react';
import { IntegrationAccount, PermissionLevel } from '@/types';

export default function IntegrationsCentrePage() {
  const [integrations, setIntegrations] = useState<IntegrationAccount[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchIntegrations = async () => {
    try {
      const res = await fetch('/api/integrations');
      const data = await res.json();
      if (data.integrations) {
        setIntegrations(data.integrations);
      }
    } catch (err) {
      console.error('Fetch integrations error:', err);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const handleToggleConnection = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    try {
      await fetch('/api/integrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          connected: !currentStatus,
        }),
      });
      await fetchIntegrations();
    } catch (err) {
      console.error('Toggle error:', err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleUpdatePermission = async (id: string, level: PermissionLevel) => {
    try {
      await fetch('/api/integrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          permissionLevel: level,
        }),
      });
      await fetchIntegrations();
    } catch (err) {
      console.error('Permission update error:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
          Connected Ecosystem
        </span>
        <h1 className="heading-3 text-white font-semibold">Integrations Centre</h1>
        <p className="body-4 text-jarvis-textSecondary">
          Manage authorized third-party OAuth connections, token validity, and granular permission boundaries.
        </p>
      </div>

      {/* Security Architecture Principle */}
      <div className="p-4 rounded-xl bg-surface-dark1 border border-jarvis-surfaceBorder caption-3 text-jarvis-textSecondary flex items-center gap-3">
        <ShieldCheck size={20} className="text-jarvis-success shrink-0" />
        <span>
          <strong>OAuth Governance:</strong> Tokens are stored server-side with AES-256 encryption. Frontend clients never expose client secrets or raw API tokens.
        </span>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="caption-5 font-mono text-jarvis-textMuted uppercase">{item.category}</span>
                <span
                  className={`caption-5 font-mono uppercase px-2 py-0.5 rounded ${
                    item.connected
                      ? 'text-jarvis-success bg-jarvis-success/10 border border-jarvis-success/20'
                      : 'text-jarvis-textMuted bg-surface-dark2 border border-jarvis-surfaceBorder'
                  }`}
                >
                  {item.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <h3 className="title-3 text-white font-semibold mb-1">{item.name}</h3>
              <p className="caption-4 text-jarvis-textSecondary">
                Protocol: {item.authType.toUpperCase()} • Last Sync: {item.lastSync || 'Never'}
              </p>
            </div>

            <div className="pt-3 border-t border-surface-dark2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span className="caption-5 font-mono text-jarvis-textMuted">Tier:</span>
                <select
                  value={item.permissionLevel}
                  onChange={(e) => handleUpdatePermission(item.id, e.target.value as PermissionLevel)}
                  disabled={!item.connected}
                  className="bg-surface-dark2 border border-jarvis-surfaceBorder rounded px-2 py-1 text-xs text-jarvis-accentCyan font-mono focus:outline-none"
                >
                  <option value="READ">READ</option>
                  <option value="PREPARE">PREPARE</option>
                  <option value="EXECUTE">EXECUTE</option>
                  <option value="PREAUTHORIZED">PREAUTHORIZED</option>
                </select>
              </div>

              <button
                onClick={() => handleToggleConnection(item.id, item.connected)}
                disabled={loadingId === item.id}
                className={`button-sm rounded-lg transition-colors interactive-tap ${
                  item.connected
                    ? 'bg-surface-dark2 hover:bg-red-500/10 text-jarvis-textSecondary hover:text-red-400 border border-jarvis-surfaceBorder'
                    : 'bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white shadow-md'
                }`}
              >
                {loadingId === item.id ? 'Updating...' : item.connected ? 'Disconnect' : 'Connect Account'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
