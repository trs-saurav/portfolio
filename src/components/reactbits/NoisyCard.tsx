'use client';

import React from 'react';

interface NoisyCardProps {
  children: React.ReactNode;
  className?: string;
}

export const NoisyCard = React.forwardRef<HTMLDivElement, NoisyCardProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div ref={ref} className={`relative ${className}`}>
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="relative z-0">{children}</div>
      </div>
    );
  }
);

NoisyCard.displayName = 'NoisyCard';
