'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TiltedScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export const TiltedScroll = React.forwardRef<HTMLDivElement, TiltedScrollProps<any>>(
  ({ items, renderItem, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative w-full ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: false, amount: 0.2 }}
              className="perspective"
              style={{
                perspective: '1000px',
              }}
            >
              <motion.div
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ duration: 0.3 }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {renderItem(item, index)}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
);

TiltedScroll.displayName = 'TiltedScroll';
