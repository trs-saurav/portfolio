'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

export const GlitchText = ({ text, className = '', trigger = true }: GlitchTextProps) => {
  const [glitching, setGlitching] = useState(trigger);

  useEffect(() => {
    if (!trigger) return;
    setGlitching(true);
    const timer = setTimeout(() => setGlitching(false), 500);
    return () => clearTimeout(timer);
  }, [trigger]);

  const glitchVariants = {
    initial: { opacity: 1 },
    glitch: {
      x: [0, -2, 2, -2, 0],
      opacity: [1, 0.9, 1],
    },
  };

  return (
    <motion.span
      className={className}
      variants={glitchVariants}
      initial="initial"
      animate={glitching ? 'glitch' : 'initial'}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
  );
};
