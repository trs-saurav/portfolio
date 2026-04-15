'use client';

import { useEffect } from 'react';

interface PixelTrailProps {
  color?: string;
  size?: number;
}

export const PixelTrail = ({ color = '#00ff41', size = 8 }: PixelTrailProps) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Create pixel trail effect
      const pixel = document.createElement('div');
      pixel.style.position = 'fixed';
      pixel.style.left = e.clientX + 'px';
      pixel.style.top = e.clientY + 'px';
      pixel.style.width = size + 'px';
      pixel.style.height = size + 'px';
      pixel.style.backgroundColor = color;
      pixel.style.pointerEvents = 'none';
      pixel.style.borderRadius = '2px';
      pixel.style.opacity = '0.8';
      pixel.style.zIndex = '9999';

      document.body.appendChild(pixel);

      // Animate fade out
      let opacity = 0.8;
      let scale = 1;
      const fade = setInterval(() => {
        opacity -= 0.05;
        scale -= 0.02;
        pixel.style.opacity = opacity.toString();
        pixel.style.transform = `scale(${scale})`;

        if (opacity <= 0) {
          clearInterval(fade);
          pixel.remove();
        }
      }, 16);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [color, size]);

  return null;
};
