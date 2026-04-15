'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
}

export default function CountUp({ from = 0, to = 100, duration = 2 }: CountUpProps) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const totalDuration = duration * 1000; // Convert to milliseconds

    const animateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const newCount = Math.floor(from + (to - from) * progress);
      setCount(newCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}
