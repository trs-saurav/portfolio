'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SplitTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export const SplitText = ({ text, delay = 0, duration = 0.05, className = '' }: SplitTextProps) => {
  const letters = text.split('');

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * duration,
            duration: 0.5,
            ease: 'easeOut',
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};
