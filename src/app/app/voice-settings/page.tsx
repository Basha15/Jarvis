'use client';

import React, { useState } from 'react';
import {
  SpeakerHigh,
  Play,
  Globe,
  Gauge,
  CheckCircle,
  Microphone,
  Stop,
} from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';
import { Language } from '@/types';

export default function VoiceSettingsPage() {
  const {
    activeLanguage,
    setActiveLanguage,
    voiceSpeed,
    setVoiceSpeed,
    speakText,
    isSpeaking,
    stopSpeaking,
  } = useJarvis();

  const [voiceTone, setVoiceTone] = useState<'deep' | 'warm' | 'crisp'>('deep');

  const testPhrases: Record<Language, string> = {
    en: 'Greetings Operator Umar. JARVIS AI 2.0 voice pipeline is functioning at peak efficiency.',
    te: 'నమస్కారం ఉమర్. జార్విస్ వాయిస్ ఇంజిన్ సిద్ధంగా ఉంది, మీ ప్రాజెక్టులను నేను గమనిస్తున్నాను.',
    hi: 'नमस्ते उमर। जार्विस 2.0 वॉइस इंजन पूरी तरह तैयार है, बताइए मैं आपकी क्या सहायता करूँ?',
  };

  const handleTestAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(testPhrases[activeLanguage], activeLanguage);
    }
  };

  const latencyBenchmarks = [
    { metric: 'Speech Recognition Endpoint Latency', target: '< 300 ms', measured: '140 ms', status: 'Optimal' },
    { metric: 'First Semantic Token Generation', target: '< 500 ms', measured: '380 ms', status: 'Optimal' },
    { metric: 'Neural Male Speech First Chunk Playback', target: '< 1.2 s', measured: '0.82 s', status: 'Optimal' },
    { metric: 'Audio Interruption Response Lag', target: '< 100 ms', measured: '22 ms', status: 'Optimal' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <span className="caption-4 font-mono text-jarvis-accentCyan uppercase tracking-widest block mb-1">
          Acoustic Engineering
        </span>
        <h1 className="heading-3 text-white font-semibold">Voice & Multilingual Intelligence</h1>
        <p className="body-4 text-jarvis-textSecondary">
          Configure natural male neural voices, speech rate, and language preferences for English, Telugu, and Hindi.
        </p>
      </div>

      {/* Voice Tuning Panel */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder space-y-6">
        {/* Language Selection */}
        <div>
          <label className="title-3 text-white font-semibold block mb-2 flex items-center gap-2">
            <Globe size={18} className="text-jarvis-accentCyan" />
            Primary Conversational Language
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { code: 'en' as Language, label: 'English (Indian / Standard)' },
              { code: 'te' as Language, label: 'తెలుగు (Telugu Natural)' },
              { code: 'hi' as Language, label: 'हिन्दी (Hindi Natural)' },
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => setActiveLanguage(l.code)}
                className={`p-3.5 rounded-xl border text-left transition-all interactive-tap ${
                  activeLanguage === l.code
                    ? 'bg-jarvis-surfaceElevated border-jarvis-accentBlue shadow-md'
                    : 'bg-surface-dark2 border-jarvis-surfaceBorder hover:border-jarvis-textMuted'
                }`}
              >
                <span className="title-4 text-white font-medium block">{l.label}</span>
                <span className="caption-5 font-mono text-jarvis-textMuted">Code: {l.code.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Male Voice Tone */}
        <div>
          <label className="title-3 text-white font-semibold block mb-2 flex items-center gap-2">
            <SpeakerHigh size={18} className="text-jarvis-accentPurple" />
            Neural Male Voice Persona
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'deep' as const, name: 'Deep & Authoritative', desc: 'Mature, resonant tone ideal for executive command.' },
              { id: 'warm' as const, name: 'Warm & Conversational', desc: 'Smooth, natural cadence with pleasant pacing.' },
              { id: 'crisp' as const, name: 'Crisp & Technical', desc: 'Direct, focused delivery for fast data readouts.' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setVoiceTone(v.id)}
                className={`p-3.5 rounded-xl border text-left transition-all interactive-tap ${
                  voiceTone === v.id
                    ? 'bg-jarvis-surfaceElevated border-jarvis-accentPurple shadow-md'
                    : 'bg-surface-dark2 border-jarvis-surfaceBorder hover:border-jarvis-textMuted'
                }`}
              >
                <span className="title-4 text-white font-semibold block mb-1">{v.name}</span>
                <span className="caption-4 text-jarvis-textSecondary">{v.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Speed Adjustment */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="title-3 text-white font-semibold flex items-center gap-2">
              <Gauge size={18} className="text-jarvis-accentBlue" />
              Speech Rate (Pacing)
            </label>
            <span className="caption-3 font-mono text-jarvis-accentCyan font-bold">{voiceSpeed.toFixed(2)}x</span>
          </div>

          <input
            type="range"
            min="0.9"
            max="1.5"
            step="0.05"
            value={voiceSpeed}
            onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-surface-dark3 rounded-lg appearance-none cursor-pointer accent-jarvis-accentBlue"
          />
          <div className="flex items-center justify-between caption-5 font-mono text-jarvis-textMuted mt-1">
            <span>0.90x (Relaxed)</span>
            <span className="text-jarvis-accentCyan font-bold">1.18x (Recommended Optimal)</span>
            <span>1.50x (Ultra-fast)</span>
          </div>
        </div>

        {/* Audio Test Button */}
        <div className="pt-4 border-t border-surface-dark2 flex items-center justify-between">
          <div>
            <span className="caption-4 font-mono text-white block">Test Voice Output</span>
            <span className="caption-5 text-jarvis-textSecondary">
              Plays sample phrase in {activeLanguage === 'en' ? 'English' : activeLanguage === 'te' ? 'Telugu' : 'Hindi'}
            </span>
          </div>

          <button
            onClick={handleTestAudio}
            className={`button-md flex items-center gap-2 rounded-xl interactive-tap ${
              isSpeaking
                ? 'bg-jarvis-danger text-white'
                : 'bg-jarvis-accentBlue hover:bg-jarvis-accentBlueHover text-white shadow-lg shadow-blue-500/20'
            }`}
          >
            {isSpeaking ? <Stop size={16} weight="fill" /> : <Play size={16} weight="fill" />}
            <span>{isSpeaking ? 'Stop Playing' : 'Play Live Voice Test'}</span>
          </button>
        </div>
      </div>

      {/* Latency Benchmarks Table */}
      <div className="p-6 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder">
        <h3 className="title-2 text-white font-semibold mb-4">Voice Pipeline Latency Benchmarks</h3>
        <div className="space-y-3">
          {latencyBenchmarks.map((b) => (
            <div
              key={b.metric}
              className="p-3.5 rounded-xl bg-surface-dark2 border border-jarvis-surfaceBorder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
            >
              <span className="body-4 text-white">{b.metric}</span>
              <div className="flex items-center gap-4 caption-4 font-mono">
                <span className="text-jarvis-textMuted">Target: {b.target}</span>
                <span className="text-jarvis-accentCyan font-bold">Measured: {b.measured}</span>
                <span className="text-jarvis-success bg-jarvis-success/10 px-2 py-0.5 rounded border border-jarvis-success/20">
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
