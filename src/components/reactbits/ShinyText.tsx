'use client';

import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  className?: string;
  shimmerColor?: string;
}

export const ShinyText = ({
  text,
  className = '',
  shimmerColor = '#ffffff',
}: ShinyTextProps) => {
  return (
    <motion.span className={`relative inline-block ${className}`}>
      {text}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}40, transparent)`,
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.span>
  );
};
