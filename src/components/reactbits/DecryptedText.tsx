import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?-=[]\',./';

export const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 10,
  className = '',
  revealDirection = 'start', // 'start', 'end', 'center'
}: {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  revealDirection?: 'start' | 'end' | 'center';
}) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      // eslint-disable-next-line
      setShouldAnimate(true);
    }
  }, [isInView]);

  useEffect(() => {
    if (!shouldAnimate) return;

    let iteration = 0;
    let interval: NodeJS.Timeout | null = null;
    const length = text.length;

    interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            
            let revealCondition = false;
            if (revealDirection === 'start') {
              revealCondition = index < iteration;
            } else if (revealDirection === 'end') {
              revealCondition = index > length - iteration;
            } else if (revealDirection === 'center') {
              const middle = length / 2;
              revealCondition = Math.abs(index - middle) < iteration;
            }

            if (revealCondition || iteration >= maxIterations) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('');
      });

      if (iteration >= maxIterations) {
        clearInterval(interval!);
      }

      iteration += 1 / 3; // Slow down the reveal
    }, speed);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [text, speed, maxIterations, shouldAnimate, revealDirection]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {displayText}
    </motion.span>
  );
};
