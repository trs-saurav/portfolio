'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export const StarBorder = React.forwardRef<HTMLDivElement, StarBorderProps>(
  ({ children, className = '', color = '#00ff41' }, ref) => {
    return (
      <div ref={ref} className={`relative ${className}`}>
        {/* Background glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
          style={{ boxShadow: `0 0 30px ${color}50` }}
        />

        {/* Animated border */}
        <svg
          className="absolute inset-0 w-full h-full rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          viewBox={`0 0 ${100} ${100}`}
          preserveAspectRatio="none"
        >
          <motion.rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="none"
            stroke={color}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileHover={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
        </svg>

        {children}
      </div>
    );
  }
);

StarBorder.displayName = 'StarBorder';
