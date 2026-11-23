'use client';

import React, { useState } from 'react';
import {
  CheckSquareOffset,
  Plus,
  Trash,
  CheckCircle,
  Clock,
  Tag,
  Funnel,
  Check,
} from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';
import { Task, TaskCategory, Priority } from '@/types';

export default function TasksPage() {
  const { tasks, refreshData } = useJarvis();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('work');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  const filteredTasks = tasks.filter((t) => {
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    if (filterStatus === 'pending' && t.status === 'completed') return false;
    if (filterStatus === 'completed' && t.status !== 'completed') return false;
    return true;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        category,
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
      }),
    });

    setTitle('');
    setDescription('');
    setShowAddModal(false);
    refreshData();
  };

  const handleToggleTask = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });
    refreshData();
  };

  const handleToggleSubtask = async (task: Task, subtaskId: string) => {
    const updatedSubtasks = task.subtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: task.id, subtasks: updatedSubtasks }),
    });
    refreshData();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' });
    refreshData();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            Execution Center
          </span>
          <h1 className="heading-3 text-white font-semibold">Task & Subtask Manager</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Manage daily actions and granular subtasks. Voice commands like "Jarvis, completed" update items instantly.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-1.5 rounded-lg interactive-tap shadow-md"
        >
          <Plus size={16} weight="bold" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div className="flex items-center gap-2">
          <Funnel size={16} className="text-jarvis-accentCyan" />
          <span className="caption-3 text-jarvis-textSecondary">Filters:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-surface-dark2 border border-jarvis-surfaceBorder rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="health">Health</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="flex items-center gap-1 bg-surface-dark2 p-1 rounded-lg border border-jarvis-surfaceBorder">
          {(['all', 'pending', 'completed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-0.5 rounded text-xs capitalize transition-colors ${
                filterStatus === st ? 'bg-jarvis-accentBlue text-white font-semibold' : 'text-jarvis-textSecondary hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((t) => {
            const isCompleted = t.status === 'completed';
            return (
              <div
                key={t.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-surface-dark2/40 border-jarvis-surfaceBorder opacity-60'
                    : 'bg-surface-dark1 border-jarvis-surfaceBorder hover:border-jarvis-accentBlue/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={() => handleToggleTask(t.id, t.status)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors interactive-tap ${
                        isCompleted
                          ? 'bg-jarvis-success border-jarvis-success text-white'
                          : 'border-jarvis-surfaceBorder bg-surface-dark2 text-transparent hover:border-jarvis-accentBlue'
                      }`}
                    >
                      <Check size={14} weight="bold" />
                    </button>

                    <div>
                      <h3 className={`title-3 font-semibold ${isCompleted ? 'line-through text-jarvis-textMuted' : 'text-white'}`}>
                        {t.title}
                      </h3>
                      {t.description && (
                        <p className="caption-2 text-jarvis-textSecondary mt-1">{t.description}</p>
                      )}

                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2 py-0.5 rounded border border-jarvis-surfaceBorder">
                          {t.category}
                        </span>
                        <span
                          className={`caption-5 font-mono uppercase px-2 py-0.5 rounded border ${
                            t.priority === 'urgent'
                              ? 'text-red-400 bg-red-500/10 border-red-500/20'
                              : t.priority === 'high'
                              ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                              : 'text-jarvis-textMuted bg-surface-dark2 border-jarvis-surfaceBorder'
                          }`}
                        >
                          {t.priority}
                        </span>
                        {t.sourceLanguage && (
                          <span className="caption-5 font-mono text-jarvis-textMuted">
                            Src: {t.sourceLanguage.toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Subtasks */}
                      {t.subtasks && t.subtasks.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-surface-dark2 space-y-1.5">
                          <span className="caption-5 font-mono text-jarvis-textMuted uppercase block">
                            Milestone Subtasks ({t.subtasks.filter((s) => s.completed).length}/{t.subtasks.length}):
                          </span>
                          {t.subtasks.map((st) => (
                            <div key={st.id} className="flex items-center gap-2 caption-3 text-jarvis-textSecondary">
                              <input
                                type="checkbox"
                                checked={st.completed}
                                onChange={() => handleToggleSubtask(t, st.id)}
                                className="w-3.5 h-3.5 rounded text-jarvis-accentBlue focus:ring-0 cursor-pointer"
                              />
                              <span className={st.completed ? 'line-through text-jarvis-textMuted' : 'text-white'}>
                                {st.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 rounded-lg text-jarvis-textMuted hover:text-red-400 hover:bg-surface-dark2 transition-colors"
                    title="Delete Task"
                    aria-label="Delete Task"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-surface-dark1 rounded-2xl border border-jarvis-surfaceBorder text-jarvis-textMuted caption-2">
            No matching tasks found. Speak or tap "New Task" to create one.
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-6 shadow-2xl">
            <h3 className="title-2 text-white font-semibold mb-4">Create Master Task</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="caption-3 text-white block mb-1">Task Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Prepare presentation for business meeting"
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                />
              </div>

              <div>
                <label className="caption-3 text-white block mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional context or requirements..."
                  rows={2}
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="caption-3 text-white block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TaskCategory)}
                    className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                    <option value="business">Business</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="caption-3 text-white block mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="caption-3 text-white block mb-1">Due Date</label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-dark2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="button-sm bg-surface-dark2 text-jarvis-textSecondary hover:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button-sm bg-jarvis-accentBlue text-white rounded-lg interactive-tap shadow-md"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
