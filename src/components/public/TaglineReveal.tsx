'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TaglineRevealProps {
  phrase?: string;
}

export const TaglineReveal: React.FC<TaglineRevealProps> = ({
  phrase = "An intelligent executive operating system that speaks your language and manages your life with absolute precision.",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = phrase.split(' ');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  return (
    <div ref={containerRef} className="py-24 px-6 max-w-4xl mx-auto text-center">
      <p className="caption-3 uppercase tracking-widest text-jarvis-accentBlue mb-6">
        The Core Operating Philosophy
      </p>
      <div className="heading-2 sm:heading-1 font-semibold flex flex-wrap justify-center gap-x-3 gap-y-2">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
        })}
      </div>
    </div>
  );
};

const Word: React.FC<{ word: string; range: [number, number]; progress: any }> = ({
  word,
  range,
  progress,
}) => {
  const opacity = useTransform(progress, range, [0.28, 1]);
  const color = useTransform(progress, range, ['#64748B', '#F8FAFC']);

  return (
    <motion.span style={{ opacity, color }} className="inline-block transition-colors duration-200">
      {word}
    </motion.span>
  );
};
