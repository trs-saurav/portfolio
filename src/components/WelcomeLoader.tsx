'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import BackgroundMarquee from './BackgroundMarquee';

export default function WelcomeLoader({ onCompleteAction }: { onCompleteAction: () => void }) {
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onCompleteAction();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, scale: 1.1 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           style={{
             position: 'fixed',
             top: 0,
             left: 0,
             width: '100vw',
             height: '100vh',
             background: '#0e0e12',
             zIndex: 9999,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             color: '#fff',
             overflow: 'hidden'
           }}
        >
          {/* Subtle Marquee Background */}
          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
             <BackgroundMarquee />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}
          >
             <div style={{ display: 'flex', gap: '1rem', fontSize: '2rem' }}>
                <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🚀</motion.span>
                <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}>🤖</motion.span>
                <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}>💻</motion.span>
             </div>

             <div style={{ width: '100%' }}>
                <h1 style={{ fontSize: '0.8rem', letterSpacing: '4px', textAlign: 'center', fontWeight: 600, color: '#94a3b8', marginBottom: '1.5rem' }}>
                   {isReady ? 'SYSTEM_INITIALIZED' : 'CORE_BOOT_SEQUENCE'}
                </h1>

                {/* Cyber Progress Bar */}
                <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                   <motion.div 
                      style={{ 
                        height: '100%', 
                        background: 'var(--primary-neon)', 
                        width: `${progress}%`,
                        boxShadow: '0 0 10px var(--primary-neon)' 
                      }} 
                    />
                </div>
             </div>

             <AnimatePresence>
                {isReady && (
                   <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="btn-primary"
                      onClick={handleEnter}
                      style={{ marginTop: '1rem' }}
                   >
                      INITIATE INTERFACE ↗
                   </motion.button>
                )}
             </AnimatePresence>

             <span style={{ fontSize: '0.65rem', color: '#475569', letterSpacing: '1px', fontWeight: 600 }}>SAURAV_KUMAR // VERSION 1.0</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
