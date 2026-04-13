import React from 'react';

interface GradualBlurProps {
  color?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function GradualBlur({
  color = 'var(--background)',
  side = 'bottom',
  className = '',
}: GradualBlurProps) {
  // Gradual mask gradient parameters
  let backgroundGradient = '';
  switch (side) {
    case 'top':
      backgroundGradient = `linear-gradient(to bottom, ${color} 0%, transparent 100%)`;
      break;
    case 'bottom':
      backgroundGradient = `linear-gradient(to top, ${color} 0%, transparent 100%)`;
      break;
    case 'left':
      backgroundGradient = `linear-gradient(to right, ${color} 0%, transparent 100%)`;
      break;
    case 'right':
      backgroundGradient = `linear-gradient(to left, ${color} 0%, transparent 100%)`;
      break;
  }

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        [side]: 0,
        left: side === 'top' || side === 'bottom' ? 0 : undefined,
        top: side === 'left' || side === 'right' ? 0 : undefined,
        width: side === 'top' || side === 'bottom' ? '100%' : '150px',
        height: side === 'left' || side === 'right' ? '100%' : '150px',
        zIndex: 50,
      }}
    >
      <div className="absolute inset-0 z-10" style={{ background: backgroundGradient }} />
      <div className="absolute inset-0 z-0 backdrop-blur-sm" style={{ WebkitMaskImage: backgroundGradient, maskImage: backgroundGradient }} />
      <div className="absolute inset-0 z-0 backdrop-blur-md" style={{ WebkitMaskImage: backgroundGradient, maskImage: backgroundGradient }} />
      <div className="absolute inset-0 z-0 backdrop-blur-lg" style={{ WebkitMaskImage: backgroundGradient, maskImage: backgroundGradient }} />
    </div>
  );
}
