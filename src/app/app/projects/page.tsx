'use client';

import React, { useState } from 'react';
import {
  Kanban,
  Plus,
  CalendarCheck,
  CheckCircle,
  Clock,
  WarningCircle,
  CurrencyDollar,
  Tag,
  ArrowRight,
  ShieldCheck,
} from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';
import { Project, ProjectCategory, Priority } from '@/types';

export default function ProjectsPage() {
  const { projects, refreshData } = useJarvis();
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('technical');
  const [priority, setPriority] = useState<Priority>('high');
  const [deadline, setDeadline] = useState('');
  const [budgetEstimated, setBudgetEstimated] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        objective,
        description: objective,
        category,
        priority,
        deadline,
        budgetEstimated: budgetEstimated ? parseFloat(budgetEstimated) : undefined,
        milestones: [
          { id: `m_${Date.now()}_1`, title: 'Discovery & Requirements', targetDate: deadline, completed: true },
          { id: `m_${Date.now()}_2`, title: 'Core Implementation', targetDate: deadline, completed: false },
          { id: `m_${Date.now()}_3`, title: 'Verification & QA Pass', targetDate: deadline, completed: false },
        ],
        nextAction: 'Execute core implementation milestone',
      }),
    });

    setName('');
    setObjective('');
    setShowCreateModal(false);
    refreshData();
  };

  const handleToggleMilestone = async (proj: Project, milestoneId: string) => {
    const updatedMilestones = proj.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );

    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const progressPercentage = Math.round((completedCount / (updatedMilestones.length || 1)) * 100);

    await fetch('/api/projects', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: proj.id,
        milestones: updatedMilestones,
        progressPercentage,
      }),
    });

    refreshData();
  };

  const active = selectedProject || projects[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <div>
          <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
            Program Governance
          </span>
          <h1 className="heading-3 text-white font-semibold">Project Management Workspace</h1>
          <p className="body-4 text-jarvis-textSecondary">
            Milestone roadmaps, dependency graphs, and automated progress reports for technical and business initiatives.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="button-sm bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white flex items-center gap-1.5 rounded-lg interactive-tap shadow-md"
        >
          <Plus size={16} weight="bold" />
          <span>New Project</span>
        </button>
      </div>

      {/* Main Grid: Projects List + Detailed Inspection View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Selector List (1 Col) */}
        <div className="space-y-3">
          <span className="caption-4 font-mono text-jarvis-textMuted uppercase px-1 block">Active Initiatives</span>
          {projects.map((p) => {
            const isSelected = active?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={`w-full p-4 rounded-xl border text-left transition-all interactive-tap ${
                  isSelected
                    ? 'bg-jarvis-surfaceElevated border-jarvis-accentBlue shadow-lg'
                    : 'bg-surface-dark1 border-jarvis-surfaceBorder hover:border-jarvis-textMuted'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2 py-0.5 rounded border border-jarvis-surfaceBorder">
                    {p.category}
                  </span>
                  <span className="caption-4 font-mono text-white font-semibold">{p.progressPercentage}%</span>
                </div>
                <h3 className="title-3 text-white font-semibold mb-2 truncate">{p.name}</h3>

                {/* Progress Mini Bar */}
                <div className="w-full h-1.5 bg-surface-dark3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-jarvis-accentBlue to-jarvis-accentPurple rounded-full"
                    style={{ width: `${p.progressPercentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Project Deep Dive (2 Cols) */}
        {active && (
          <div className="lg:col-span-2 p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder space-y-6">
            {/* Title & Metadata */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-jarvis-surfaceBorder pb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-2.5 py-0.5 rounded border border-jarvis-surfaceBorder">
                    {active.category}
                  </span>
                  <span className="caption-5 font-mono text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {active.priority} Priority
                  </span>
                </div>
                <h2 className="heading-4 text-white font-bold">{active.name}</h2>
                <p className="body-4 text-jarvis-textSecondary mt-1">{active.objective}</p>
              </div>

              <div className="text-right sm:self-center shrink-0">
                <span className="caption-4 font-mono text-jarvis-textMuted block">Completion</span>
                <span className="heading-3 text-jarvis-accentCyan font-bold">{active.progressPercentage}%</span>
              </div>
            </div>

            {/* Next Action Callout */}
            <div className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex items-start gap-3">
              <Clock size={20} className="text-jarvis-accentBlue shrink-0 mt-0.5" />
              <div>
                <span className="caption-4 font-mono text-jarvis-accentBlue uppercase font-bold block">
                  Next Recommended Action
                </span>
                <p className="body-4 text-white">{active.nextAction}</p>
              </div>
            </div>

            {/* Milestones Checklist */}
            <div>
              <h3 className="title-3 text-white font-semibold mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-jarvis-success" />
                Roadmap Milestones
              </h3>
              <div className="space-y-2">
                {active.milestones.map((m) => (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={m.completed}
                        onChange={() => handleToggleMilestone(active, m.id)}
                        className="w-4 h-4 rounded text-jarvis-accentBlue focus:ring-0 cursor-pointer"
                      />
                      <span className={`body-4 ${m.completed ? 'line-through text-jarvis-textMuted' : 'text-white'}`}>
                        {m.title}
                      </span>
                    </div>
                    <span className="caption-5 font-mono text-jarvis-textMuted">{m.targetDate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependencies & Budget Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-jarvis-surfaceBorder">
              <div className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <span className="caption-4 font-mono text-jarvis-textMuted uppercase block mb-1">Dependencies</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {active.dependencies.map((dep) => (
                    <span key={dep} className="caption-4 text-white bg-surface-dark3 px-2 py-0.5 rounded border border-jarvis-surfaceBorder">
                      {dep}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder">
                <span className="caption-4 font-mono text-jarvis-textMuted uppercase block mb-1">Financial Resources</span>
                <div className="mt-2 text-white font-mono text-sm">
                  Allocated: ${active.budgetEstimated?.toLocaleString() || '12,000'} • Spent: ${active.budgetSpent?.toLocaleString() || '4,200'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-6 shadow-2xl">
            <h3 className="title-2 text-white font-semibold mb-4">Initialize New Initiative</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="caption-3 text-white block mb-1">Project Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Autonomous Mobile Agent Pipeline"
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                />
              </div>

              <div>
                <label className="caption-3 text-white block mb-1">Objective / Deliverable</label>
                <textarea
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="Core goal and primary metric of success..."
                  rows={3}
                  required
                  className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="caption-3 text-white block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                    className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  >
                    <option value="technical">Technical</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                    <option value="career">Career</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="caption-3 text-white block mb-1">Target Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                    className="w-full bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-2.5 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-dark2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="button-sm bg-surface-dark2 text-jarvis-textSecondary hover:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button-sm bg-jarvis-accentBlue text-white rounded-lg interactive-tap shadow-md"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
