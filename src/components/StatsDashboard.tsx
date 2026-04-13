'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function StatsDashboard() {
  const [github, setGithub] = useState({ public_repos: 12, followers: 5 });
  const [leetcode] = useState({ totalSolved: 145, acceptanceRate: 68 });

  useEffect(() => {
    fetch('https://api.github.com/users/trs-saurav')
      .then(r => r.json())
      .then(d => { if (d.id) setGithub(d); })
      .catch(() => {});
  }, []);

  const STATS = [
    { label: 'GITHUB_REPOS',      value: github.public_repos, color: 'var(--primary-neon)',   accent: 'rgba(0,255,65,0.12)' },
    { label: 'LEETCODE_SOLVED',   value: leetcode.totalSolved, color: 'var(--secondary-neon)', accent: 'rgba(255,184,108,0.12)' },
    { label: 'ACCEPTANCE_RATE',   value: `${leetcode.acceptanceRate}%`, color: 'var(--foreground)', accent: 'rgba(246,246,252,0.05)' },
    { label: 'AAA_TITLES_DONE',   value: '15+',                color: '#ff6daf',               accent: 'rgba(255,109,175,0.12)' },
  ];

  const [HEAT] = useState(() => Array.from({ length: 52 * 7 }, () => {
    const r = Math.random();
    return r > 0.85 ? 3 : r > 0.7 ? 2 : r > 0.5 ? 1 : 0;
  }));

  return (
    <section id="stats" className="section-full" style={{ alignItems: 'flex-start', padding: '0 2rem' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        style={{ width: '80vw', maxWidth: 1200, margin: '0 auto', paddingTop: '6rem', paddingBottom: '4rem' }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid rgba(255,184,108,0.35)' }}
        >
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.5rem' }}>TELEMETRY_LOG // QUANTUM_STATS</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--foreground)' }}>
            BIOMETRIC_DATA
          </h2>
        </motion.div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1px', marginBottom: '1px' }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: 'var(--surface-container)',
                padding: '2rem',
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

              <span className="hud-tag" style={{ display: 'block', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>{s.label}</span>
              <p style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 900, color: s.color, margin: 0, lineHeight: 1, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.03em', textShadow: `0 0 24px ${s.color}44`, position: 'relative', zIndex: 1 }}>
                {s.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ background: 'var(--surface-container-low)', padding: '2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span className="hud-tag">CONTRIBUTION_STREAM // Y_2025</span>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span className="hud-tag" style={{ opacity: 0.35, marginRight: '0.5rem' }}>LESS</span>
              {[0.08, 0.25, 0.55, 1].map((o, i) => (
                <div key={i} style={{ width: 10, height: 10, background: `rgba(0,255,65,${o})` }} />
              ))}
              <span className="hud-tag" style={{ opacity: 0.35, marginLeft: '0.5rem' }}>MORE</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 1fr)', gap: 2, width: '100%' }}>
            {Array.from({ length: 52 }, (_, week) => (
              <div key={week} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Array.from({ length: 7 }, (_, day) => {
                  const level = HEAT[week * 7 + day];
                  const op = level === 0 ? 0.06 : level === 1 ? 0.25 : level === 2 ? 0.55 : 1;
                  return (
                    <div
                      key={day}
                      style={{
                        aspectRatio: '1',
                        background: `rgba(0,255,65,${op})`,
                        boxShadow: level === 3 ? '0 0 4px rgba(0,255,65,0.4)' : 'none',
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1;} 50%{opacity:.3;} }`}</style>
    </section>
  );
}
