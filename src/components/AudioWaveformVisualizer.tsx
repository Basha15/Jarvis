'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
}

export const AudioWaveformVisualizer: React.FC<AudioVisualizerProps> = ({
  isListening,
  isSpeaking,
  isProcessing,
}) => {
  const bars = [16, 24, 38, 20, 48, 30, 56, 42, 60, 45, 52, 28, 40, 22, 18];

  let stateLabel = 'Ready • Speak or Type';
  let glowColor = 'rgba(59, 130, 246, 0.2)';

  if (isListening) {
    stateLabel = 'Listening to speech...';
    glowColor = 'rgba(6, 182, 212, 0.4)';
  } else if (isProcessing) {
    stateLabel = 'Analyzing intent...';
    glowColor = 'rgba(139, 92, 246, 0.4)';
  } else if (isSpeaking) {
    stateLabel = 'Speaking (Natural Male Voice)...';
    glowColor = 'rgba(168, 85, 247, 0.4)';
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Waveform Bars */}
      <div
        className="flex items-center justify-center gap-1.5 h-16 px-6 py-2 rounded-2xl bg-surface-dark1 border border-jarvis-surfaceBorder"
        style={{ boxShadow: `0 0 24px ${glowColor}` }}
      >
        {bars.map((height, i) => {
          let targetHeight = 8;
          let duration = 1.2;

          if (isListening) {
            targetHeight = Math.max(12, ((i * 7) % 36) + 16);
            duration = 0.3 + (i % 3) * 0.1;
          } else if (isSpeaking) {
            targetHeight = height;
            duration = 0.4 + (i % 4) * 0.08;
          } else if (isProcessing) {
            targetHeight = 24 + ((i * 4) % 20);
            duration = 0.6;
          }

          return (
            <motion.div
              key={i}
              className={`w-1 rounded-full ${
                isSpeaking
                  ? 'bg-jarvis-accentPurple'
                  : isListening
                  ? 'bg-jarvis-accentCyan'
                  : isProcessing
                  ? 'bg-jarvis-accentBlue'
                  : 'bg-jarvis-textMuted'
              }`}
              animate={{
                height: [8, targetHeight, 8],
                opacity: isListening || isSpeaking ? [0.6, 1, 0.6] : 0.4,
              }}
              transition={{
                repeat: Infinity,
                duration: duration,
                ease: 'easeInOut',
                delay: i * 0.04,
              }}
            />
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            isListening
              ? 'bg-jarvis-accentCyan animate-ping'
              : isSpeaking
              ? 'bg-jarvis-accentPurple animate-pulse'
              : isProcessing
              ? 'bg-jarvis-accentBlue animate-pulse'
              : 'bg-jarvis-success'
          }`}
        />
        <span className="caption-4 text-jarvis-textSecondary font-mono">{stateLabel}</span>
      </div>
    </div>
  );
};
