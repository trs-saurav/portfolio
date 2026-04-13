import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export const BlurText = ({ text = '', className = '', delay = 20 }: { text: string; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [elements, setElements] = useState<{ char: string; key: number }[]>([]);

  useEffect(() => {
    // eslint-disable-next-line
    setElements(text.split('').map((char, i) => ({ char, key: i })));
  }, [text]);

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((item, index) => (
        <motion.span
          key={item.key}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
          animate={
            isInView
              ? { filter: 'blur(0px)', opacity: 1, y: 0 }
              : { filter: 'blur(10px)', opacity: 0, y: 5 }
          }
          transition={{
            duration: 0.4,
            delay: index * (delay / 1000),
            ease: 'easeOut',
          }}
          className="inline-block"
        >
          {item.char === ' ' ? '\u00A0' : item.char}
        </motion.span>
      ))}
    </span>
  );
};
