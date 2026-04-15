'use client';

import { motion } from 'framer-motion';

interface LetterGlitchProps {
  text: string;
  className?: string;
  glitchIntensity?: number;
  interval?: number;
}

export const LetterGlitch = ({ 
  text, 
  className = '', 
  glitchIntensity = 3,
  interval = 4000 
}: LetterGlitchProps) => {
  const glitch = {
    animate: {
      y: [0, -glitchIntensity, glitchIntensity, -glitchIntensity, 0],
      opacity: [1, 0.8, 1],
    },
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatDelay: interval / 1000 - 0.2,
    },
  };

  return (
    <motion.span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 0 }}
          animate={glitch.animate}
          transition={{
            ...glitch.transition,
            delay: (i % 3) * 0.05,
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
