'use client';

import { useEffect, useRef } from 'react';

export const TerminalBackground = ({ color = '#00ff41', speed = 50 }: { color?: string, speed?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Characters to use in the matrix rain effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:\"<>?-=[]',./".split('');
    
    const fontSize = 14;
    const columns = Math.ceil(w / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start at random negative y positions so they drip in
    }

    let lastTime = 0;

    const draw = (time: number) => {
      // Throttle speed
      if (time - lastTime < speed) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;

      // Deep dark translucent background to create the trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset the drop to the top randomly, or if it goes off screen
        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      
      // Re-initialize array based on new width
      const newColumns = Math.ceil(w / fontSize);
      if (newColumns > drops.length) {
        for (let x = drops.length; x < newColumns; x++) {
          drops[x] = Math.random() * -100;
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, speed]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        opacity: 0.15, // Let it be subtle behind the real content
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
