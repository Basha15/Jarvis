'use client';

import React from 'react';
import { List, Moon, Sun, Microphone, SpeakerHigh, Stop, Globe } from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';
import { Language } from '@/types';

interface HeaderProps {
  onOpenSidebar: () => void;
  title: string;
}

export const AppHeader: React.FC<HeaderProps> = ({ onOpenSidebar, title }) => {
  const {
    theme,
    toggleTheme,
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    stopSpeaking,
    activeLanguage,
    setActiveLanguage,
  } = useJarvis();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
  ];

  return (
    <header className="h-16 border-b border-jarvis-surfaceBorder bg-surface-dark1/90 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-lg text-jarvis-textSecondary hover:text-white hover:bg-surface-dark2 lg:hidden"
          aria-label="Open sidebar navigation"
        >
          <List size={22} weight="bold" />
        </button>
        <h1 className="title-2 font-semibold text-white tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="flex items-center gap-1.5 bg-surface-dark2 px-2.5 py-1.5 rounded-lg border border-jarvis-surfaceBorder">
          <Globe size={16} className="text-jarvis-accentCyan" />
          <select
            value={activeLanguage}
            onChange={(e) => setActiveLanguage(e.target.value as Language)}
            aria-label="Select voice and assistant language"
            className="bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code} className="bg-surface-dark1 text-white">
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Active Audio Stop Button (Interrupt speech immediately) */}
        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="button-sm bg-jarvis-danger/20 text-jarvis-danger border border-jarvis-danger/40 flex items-center gap-1.5 animate-pulse interactive-tap"
            title="Stop audio playback"
            aria-label="Stop audio playback"
          >
            <Stop size={14} weight="fill" />
            <span className="caption-4 font-mono hidden sm:inline">Interrupt Voice</span>
          </button>
        )}

        {/* Global Quick Microphone Toggle */}
        <button
          onClick={isListening ? stopListening : startListening}
          className={`button-sm flex items-center gap-1.5 rounded-lg interactive-tap ${
            isListening
              ? 'bg-jarvis-accentCyan text-surface-dark0 font-bold shadow-lg shadow-cyan-500/30'
              : 'bg-surface-dark2 text-jarvis-textSecondary hover:text-white border border-jarvis-surfaceBorder'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Start voice recognition'}
        >
          <Microphone size={16} weight={isListening ? 'fill' : 'bold'} />
          <span className="caption-4 hidden sm:inline font-mono">
            {isListening ? 'Listening...' : 'Voice Input'}
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-lg text-jarvis-textSecondary hover:text-white hover:bg-surface-dark2 transition-colors interactive-tap"
        >
          {theme === 'dark' ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
        </button>
      </div>
    </header>
  );
};
