'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteScroll = React.forwardRef<HTMLDivElement, InfiniteScrollProps<any>>(
  ({ items, renderItem, speed = 'normal', direction = 'left', pauseOnHover = false, className = '' }, ref) => {
    const speedMap = {
      slow: 50,
      normal: 30,
      fast: 15,
    };

    const duration = speedMap[speed];
    const xOffset = direction === 'left' ? -100 : 100;

    return (
      <div ref={ref} className={`relative w-full overflow-hidden ${className}`}>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: direction === 'left' ? -2000 : 2000 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
          }}
          whileHover={pauseOnHover ? { animationPlayState: 'paused' } : {}}
        >
          {/* Original items */}
          {items.map((item, index) => (
            <div key={`original-${item.id || index}`} className="flex-shrink-0">
              {renderItem(item, index)}
            </div>
          ))}

          {/* Duplicate items for seamless loop */}
          {items.map((item, index) => (
            <div key={`duplicate-${item.id || index}`} className="flex-shrink-0">
              {renderItem(item, index)}
            </div>
          ))}
        </motion.div>
      </div>
    );
  }
);

InfiniteScroll.displayName = 'InfiniteScroll';
