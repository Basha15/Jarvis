'use client';

import React, { useState, useEffect } from 'react';
import {
  Brain,
  MagnifyingGlass,
  Plus,
  Trash,
  PencilSimple,
  DownloadSimple,
  CheckCircle,
  Tag,
  Globe,
} from '@phosphor-icons/react';
import { MemoryItem, MemoryCategory } from '@/types';

export default function MemoryManagementPage() {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryCategory>('preference');

  const fetchMemories = async () => {
    try {
      const res = await fetch('/api/memories');
      const data = await res.json();
      if (data.memories) {
        setMemories(data.memories);
      }
    } catch (err) {
      console.error('Fetch memories error:', err);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const filteredMemories = memories.filter((m) => {
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.content.toLowerCase().includes(q) ||
        m.normalizedSummary.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleDelete = async (id: string) => {
    await fetch(`/api/memories?id=${id}`, { method: 'DELETE' });
    fetchMemories();
  };

  const handleSaveEdit = async (id: string) => {
    await fetch('/api/memories', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, content: editContent, normalizedSummary: editContent }),
    });
    setEditingId(null);
    fetchMemories();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    await fetch('/api/memories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: newContent,
        normalizedSummary: newContent,
        category: newCategory,
        tags: ['manual_entry', newCategory],
      }),
    });

    setNewContent('');
    setShowAddModal(false);
    fetchMemories();
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(memories, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `jarvis_memory_backup_${new Date().toISOString().split('T')[0]}.json`;
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
            Context Sovereignty
          </span>
          <h1 className="heading-3 text-white font-semibold">Long-Term Memory Management</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Inspect, edit, search, export, and delete all persistent context retained across sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="button-sm bg-surface-dark2 hover:bg-surface-dark3 text-white border border-jarvis-surfaceBorder flex items-center gap-1.5 rounded-lg interactive-tap"
          >
            <DownloadSimple size={16} />
            <span>Export Backup</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-1.5 rounded-lg interactive-tap shadow-md"
          >
            <Plus size={16} weight="bold" />
            <span>Store Memory</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search memory graph..."
            className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl pl-9 pr-4 py-2 text-white text-xs focus:outline-none focus:border-jarvis-accentBlue"
          />
          <MagnifyingGlass size={16} className="absolute left-3 top-2.5 text-jarvis-textMuted" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="caption-3 text-jarvis-textSecondary">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-surface-dark2 border border-jarvis-surfaceBorder rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="preference">User Preferences</option>
            <option value="routine">Daily Routines</option>
            <option value="goal">Personal Goals</option>
            <option value="project">Project Context</option>
            <option value="fact">Personal Facts</option>
          </select>
        </div>
      </div>

      {/* Memories List */}
      <div className="space-y-3">
        {filteredMemories.map((mem) => {
          const isEditing = editingId === mem.id;
          return (
            <div key={mem.id} className="p-5 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2 py-0.5 rounded border border-jarvis-surfaceBorder">
                    {mem.category}
                  </span>
                  <span className="caption-5 font-mono text-jarvis-textMuted uppercase">
                    Src: {mem.language.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <button
                      onClick={() => handleSaveEdit(mem.id)}
                      className="button-xsm bg-jarvis-accentBlue text-white rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(mem.id);
                        setEditContent(mem.content);
                      }}
                      className="p-1.5 rounded-lg text-jarvis-textMuted hover:text-white hover:bg-surface-dark2"
                      aria-label="Edit memory"
                    >
                      <PencilSimple size={16} />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(mem.id)}
                    className="p-1.5 rounded-lg text-jarvis-textMuted hover:text-red-400 hover:bg-surface-dark2"
                    aria-label="Delete memory"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl p-3 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                />
              ) : (
                <div className="space-y-1">
                  <p className="body-4 text-white font-medium">{mem.content}</p>
                  <p className="caption-3 font-mono text-jarvis-textSecondary">
                    Normalized Graph: {mem.normalizedSummary}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-surface-dark2">
                {mem.tags.map((t) => (
                  <span key={t} className="caption-5 font-mono text-jarvis-textMuted bg-surface-dark2 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-6 shadow-2xl">
            <h3 className="title-2 text-white font-semibold mb-4">Add Memory Assertion</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="caption-3 text-white block mb-1">Memory Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as MemoryCategory)}
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                >
                  <option value="preference">User Preference</option>
                  <option value="routine">Daily Routine</option>
                  <option value="goal">Personal Goal</option>
                  <option value="project">Project Context</option>
                  <option value="fact">Personal Fact</option>
                </select>
              </div>

              <div>
                <label className="caption-3 text-white block mb-1">Content / Instruction to Remember</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="e.g. Operator prefers concise summaries with tables for metrics..."
                  rows={3}
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl p-3 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue resize-none"
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
                  Commit to Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
