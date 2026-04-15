'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  magnetStrength?: number;
}

export const Magnet = React.forwardRef<HTMLDivElement, MagnetProps>(
  ({ children, className = '', magnetStrength = 0.5 }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = (e.clientX - centerX) * magnetStrength * 0.1;
      const distY = (e.clientY - centerY) * magnetStrength * 0.1;

      x.set(distX);
      y.set(distY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={containerRef}
        className={`relative cursor-pointer ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x, y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }
);

Magnet.displayName = 'Magnet';
