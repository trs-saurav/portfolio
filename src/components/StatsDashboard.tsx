'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LeetCodeHeatmapWrapper } from './LeetCodeHeatmapWrapper';

export default function StatsDashboard() {
  const [leetcode, setLeetcode] = useState({ totalSolved: 145, acceptanceRate: 68 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch LeetCode Data
    fetchLeetCodeData();

    setLoading(false);
  }, []);


  const fetchLeetCodeData = async () => {
    try {
      const response = await fetch('https://leetcode-stats-api.herokuapp.com/trs_saurav');
      const data = await response.json();

      if (data.status === "success") {
        setLeetcode({
          totalSolved: data.totalSolved || 145,
          acceptanceRate: data.acceptanceRate || 68
        });
      }
    } catch (err) {
      console.error('LeetCode fetch failed:', err);
    }
  };

  const STATS = [
    { label: 'GITHUB_REPOS',      value: '12', color: 'var(--primary-neon)',   accent: 'rgba(0,255,65,0.12)' },
    { label: 'LEETCODE_SOLVED',   value: leetcode.totalSolved, color: 'var(--secondary-neon)', accent: 'rgba(255,184,108,0.12)' },
    { label: 'ACCEPTANCE_RATE',   value: `${leetcode.acceptanceRate}%`, color: 'var(--foreground)', accent: 'rgba(246,246,252,0.05)' },
    { label: 'AAA_TITLES_DONE',   value: '15+',                color: '#ff6daf',               accent: 'rgba(255,109,175,0.12)' },
  ];

  return (
    <section id="stats" className="section-full" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '0' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        style={{ width: '100%', maxWidth: '80vw', paddingTop: '3rem', paddingBottom: '2rem', paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2rem', paddingLeft: '1rem', borderLeft: '2px solid rgba(255,184,108,0.35)' }}
        >
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>TELEMETRY_LOG // QUANTUM_STATS</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--foreground)', lineHeight: 1.1, wordBreak: 'break-word' }}>
            BIOMETRIC_DATA
          </h2>
        </motion.div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1px', marginBottom: '2rem', width: '100%' }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: 'var(--surface-container)',
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                position: 'relative',
                borderTop: `2px solid ${s.color}`,
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px -5px ${s.color}22`)}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* Tonal background accent */}
              <div style={{ position: 'absolute', inset: 0, background: s.accent, pointerEvents: 'none' }} />

              {/* Live dot */}
              <div style={{ position: 'absolute', top: 12, right: 12, width: 6, height: 6, background: s.color, borderRadius: '50%', animation: 'pulse-dot 2s ease-in-out infinite', boxShadow: `0 0 6px ${s.color}` }} />

              <span className="hud-tag" style={{ display: 'block', marginBottom: '1rem', position: 'relative', zIndex: 1, fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)', wordBreak: 'break-word' }}>{s.label}</span>
              <p style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', fontWeight: 900, color: s.color, margin: 0, lineHeight: 1, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.03em', textShadow: `0 0 24px ${s.color}44`, position: 'relative', zIndex: 1, wordBreak: 'break-word' }}>
                {s.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* LeetCode Contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ background: 'var(--surface-container-low)', borderTop: '2px solid rgba(255,184,108,0.35)' }}
        >
          {/* Header */}
          <div style={{ padding: 'clamp(1rem, 3vw, 1.5rem)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="hud-tag" style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' }}>CONTRIBUTION_TIMELINE</span>
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 900, color: 'var(--foreground)', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
              ACTIVE_STREAK_ANALYSIS
            </h3>
            <p style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', color: '#8B949E', margin: 0 }}>
              Past 365 days // SOURCE: LEETCODE
            </p>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 'clamp(0.75rem, 2vw, 1rem)', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap' }}>
            <span className="hud-tag" style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', whiteSpace: 'nowrap' }}>LESS</span>
            {[0, 1, 2, 3].map((level) => {
              const opacities = [0.08, 0.3, 0.55, 1];
              return (
                <div key={level} style={{ width: 'clamp(0.75rem, 2vw, 1rem)', height: 'clamp(0.75rem, 2vw, 1rem)', background: `rgba(255,184,108,${opacities[level]})`, borderRadius: '2px' }} />
              );
            })}
            <span className="hud-tag" style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', whiteSpace: 'nowrap' }}>MORE</span>
          </div>

          {/* Heatmap Grid */}
          <div style={{ padding: 'clamp(1rem, 3vw, 1.5rem)', overflowX: 'auto' }}>
            <LeetCodeHeatmapWrapper username="trs_saurav" />
          </div>

          {/* Footer Info */}
          <div style={{ padding: 'clamp(0.75rem, 2vw, 1rem)', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
            <p className="hud-tag" style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', margin: 0 }}>
              LeetCode submissions tracked across past year // Real-time data visualization
            </p>
          </div>
        </motion.div>
      </motion.div>

      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1;} 50%{opacity:.3;} }`}</style>
    </section>
  );
}
