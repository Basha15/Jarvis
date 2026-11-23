'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Microphone,
  PaperPlaneRight,
  SpeakerHigh,
  Stop,
  ArrowCounterClockwise,
  Globe,
  Sparkle,
  User,
  ShieldCheck,
  CheckCircle,
  WarningCircle,
  X,
} from '@phosphor-icons/react';
import { useJarvis } from '@/context/JarvisContext';
import { AudioWaveformVisualizer } from '@/components/AudioWaveformVisualizer';
import { Language } from '@/types';

export default function JarvisAssistantPage() {
  const {
    messages,
    sendMessage,
    isListening,
    isSpeaking,
    isProcessing,
    startListening,
    stopListening,
    stopSpeaking,
    speakText,
    repeatLastResponse,
    activeLanguage,
    setActiveLanguage,
    permissionStatus,
    requestNotificationPermission,
  } = useJarvis();

  const [input, setInput] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [correctionText, setCorrectionText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    const textToSend = input;
    setInput('');
    await sendMessage(textToSend);
  };

  const handleCorrectCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionText.trim()) return;
    const corrected = correctionText;
    setEditingMessageId(null);
    setCorrectionText('');
    await sendMessage(`Correction: ${corrected}`);
  };

  const sampleCommandsByLanguage: Record<Language, string[]> = {
    en: [
      'Remind me to call the client at 4 PM.',
      'What is my schedule tomorrow?',
      'Create a new software development project.',
      'I finished my workout.',
      'Show me the progress of my current projects.',
    ],
    te: [
      'Repu morning 7 ki workout reminder pettu.',
      'Naa project progress entha undi?',
      'Nenu task complete chesanu.',
      'Ee meeting ni Friday ki reschedule cheyyi.',
    ],
    hi: [
      'Kal mera interview hai, mujhe prepare karwao.',
      'Is task ko complete mark karo.',
      'Kal ka timetable batao.',
    ],
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-7.5rem)]">
      {/* Top Status & Language Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-3 px-5 mb-4 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isListening
                  ? 'bg-jarvis-accentCyan animate-ping'
                  : isSpeaking
                  ? 'bg-jarvis-accentPurple animate-pulse'
                  : isProcessing
                  ? 'bg-jarvis-accentBlue animate-pulse'
                  : 'bg-jarvis-success'
              }`}
            />
            <span className="caption-3 font-mono text-white">
              {isListening
                ? 'LISTENING (SPEECH-TO-TEXT ACTIVE)'
                : isSpeaking
                ? 'SPEAKING (NATURAL MALE NEURAL AUDIO)'
                : isProcessing
                ? 'STREAMING INFERENCE'
                : 'SYSTEM READY'}
            </span>
          </div>

          <div className="hidden sm:block text-jarvis-textMuted caption-4 font-mono">|</div>

          <div className="hidden sm:flex items-center gap-1.5 caption-4 font-mono text-jarvis-accentCyan">
            <span>MIC: {permissionStatus === 'granted' ? 'AUTHORIZED' : 'READY'}</span>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1 bg-surface-dark2 p-1 rounded-xl border border-jarvis-surfaceBorder">
          {(['en', 'te', 'hi'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLanguage(lang)}
              className={`px-2.5 py-1 rounded-lg caption-4 font-medium transition-colors interactive-tap ${
                activeLanguage === lang
                  ? 'bg-jarvis-accentBlue text-white font-semibold shadow-sm'
                  : 'text-jarvis-textSecondary hover:text-white'
              }`}
            >
              {lang === 'en' ? 'English' : lang === 'te' ? 'తెలుగు' : 'हिन्दी'}
            </button>
          ))}
        </div>
      </div>

      {/* Visualizer Panel */}
      <div className="shrink-0 mb-4 bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-4 shadow-sm relative overflow-hidden">
        <AudioWaveformVisualizer
          isListening={isListening}
          isSpeaking={isSpeaking}
          isProcessing={isProcessing}
        />

        {/* Controls Overlay */}
        <div className="flex items-center justify-center gap-3 mt-1">
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="button-sm bg-jarvis-danger/20 text-jarvis-danger border border-jarvis-danger/40 flex items-center gap-1.5 interactive-tap"
              aria-label="Stop audio playback"
            >
              <Stop size={14} weight="fill" />
              <span>Stop Audio</span>
            </button>
          )}

          <button
            onClick={repeatLastResponse}
            className="button-sm bg-surface-dark2 hover:bg-surface-dark3 text-jarvis-textSecondary hover:text-white border border-jarvis-surfaceBorder flex items-center gap-1.5 interactive-tap"
            title="Repeat last response spoken"
            aria-label="Repeat last response"
          >
            <ArrowCounterClockwise size={14} />
            <span>Repeat Response</span>
          </button>
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 overflow-y-auto space-y-4 px-1 py-2 pr-2">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="caption-5 font-mono text-jarvis-textMuted uppercase">
                  {isUser ? 'Operator' : 'JARVIS AI 2.0'}
                </span>
                <span className="caption-5 font-mono text-jarvis-textMuted">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.language && (
                  <span className="caption-5 font-mono text-jarvis-accentCyan uppercase bg-surface-dark2 px-1.5 py-0.5 rounded border border-jarvis-surfaceBorder">
                    {msg.language}
                  </span>
                )}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-md ${
                  isUser
                    ? 'bg-jarvis-accentBlue text-white rounded-tr-none'
                    : 'bg-surface-dark1 text-white border border-jarvis-surfaceBorder rounded-tl-none'
                }`}
              >
                <div className="body-4 whitespace-pre-wrap">{msg.content}</div>

                {msg.actionTaken && (
                  <div className="mt-2.5 pt-2 border-t border-jarvis-surfaceBorder/60 flex items-center gap-1.5 text-xs text-jarvis-accentCyan font-mono">
                    <CheckCircle size={14} weight="fill" />
                    <span>Action: {msg.actionTaken}</span>
                  </div>
                )}
              </div>

              {/* Message Actions */}
              <div className="flex items-center gap-2 mt-1 px-1">
                {!isUser && (
                  <button
                    onClick={() => speakText(msg.content, msg.language || 'en')}
                    className="caption-5 text-jarvis-textMuted hover:text-jarvis-accentCyan flex items-center gap-1 py-0.5"
                    aria-label="Re-speak message"
                  >
                    <SpeakerHigh size={12} /> Play Voice
                  </button>
                )}
                {isUser && (
                  <button
                    onClick={() => {
                      setEditingMessageId(msg.id);
                      setCorrectionText(msg.content);
                    }}
                    className="caption-5 text-jarvis-textMuted hover:text-jarvis-accentCyan flex items-center gap-1 py-0.5"
                    aria-label="Correct misunderstood command"
                  >
                    Correct Command
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}

        {isProcessing && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-dark1 border border-jarvis-surfaceBorder text-jarvis-textSecondary caption-3">
            <span className="w-2 h-2 rounded-full bg-jarvis-accentBlue animate-ping" />
            <span className="font-mono">JARVIS is processing instruction across semantic database...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Misunderstood Command Correction Modal / Drawer */}
      <AnimatePresence>
        {editingMessageId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-3 bg-surface-dark2 border border-jarvis-accentBlue/40 rounded-xl mb-3 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="caption-3 font-semibold text-white flex items-center gap-1.5">
                <WarningCircle size={16} className="text-jarvis-warning" />
                Correct Misunderstood Instruction
              </span>
              <button
                onClick={() => setEditingMessageId(null)}
                className="text-jarvis-textMuted hover:text-white"
                aria-label="Cancel correction"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleCorrectCommand} className="flex gap-2">
              <input
                type="text"
                value={correctionText}
                onChange={(e) => setCorrectionText(e.target.value)}
                placeholder="Clarify what you meant..."
                className="flex-1 bg-surface-dark1 border border-jarvis-surfaceBorder rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-jarvis-accentBlue"
              />
              <button
                type="submit"
                className="button-sm bg-jarvis-accentBlue text-white rounded-lg interactive-tap"
              >
                Update Instruction
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Console */}
      <div className="shrink-0 mt-3 bg-surface-dark1 border border-jarvis-surfaceBorder rounded-2xl p-3 shadow-lg">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Prominent Microphone Control */}
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 interactive-tap ${
              isListening
                ? 'bg-jarvis-accentCyan text-surface-dark0 animate-pulse shadow-lg shadow-cyan-500/30'
                : 'bg-surface-dark2 hover:bg-surface-dark3 text-white border border-jarvis-surfaceBorder'
            }`}
            title={isListening ? 'Click to stop listening' : 'Click to speak (English, Telugu, Hindi)'}
            aria-label={isListening ? 'Stop voice recording' : 'Start voice input'}
          >
            <Microphone size={22} weight={isListening ? 'fill' : 'bold'} />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Speak or type in ${activeLanguage === 'en' ? 'English' : activeLanguage === 'te' ? 'Telugu' : 'Hindi'} (e.g., "${sampleCommandsByLanguage[activeLanguage][0]}")`}
            className="flex-1 bg-surface-dark2 border border-jarvis-surfaceBorder rounded-xl px-4 py-3 text-white body-5 focus:outline-none focus:border-jarvis-accentBlue transition-colors"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all interactive-tap ${
              input.trim() && !isProcessing
                ? 'bg-jarvis-accentBlue text-white shadow-lg shadow-blue-500/20'
                : 'bg-surface-dark2 text-jarvis-textMuted border border-jarvis-surfaceBorder cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <PaperPlaneRight size={20} weight="fill" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2.5 px-2 caption-5 font-mono text-jarvis-textMuted">
          <span>Auto-detects English, Telugu & Hindi code-switching</span>
          <span>Press Space or Speak to Interrupt</span>
        </div>
      </div>
    </div>
  );
}
