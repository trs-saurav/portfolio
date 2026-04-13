'use client';

import { motion, easeOut } from 'framer-motion';
import { DecryptedText } from './reactbits/DecryptedText';
import { InteractiveLanyard } from './reactbits/Lanyard';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut, delay: d } }),
};

const SKILLS = [
  { label: 'CORE_FRAMEWORKS',  name: 'React / Next.js',   pct: 92 },
  { label: 'BACKEND_ENGINES',  name: 'Node.js / Python',  pct: 85 },
  { label: 'SPATIAL_WEB',      name: 'Three.js / GLSL',   pct: 78 },
  { label: 'ML_PIPELINE',      name: 'PyTorch / Sklearn',  pct: 80 },
  { label: 'SYSTEMS_LAYER',    name: 'C++ / Go',           pct: 72 },
  { label: 'DATA_INFRA',       name: 'SQL / MongoDB',      pct: 88 },
];

export default function About() {
  return (
    <section id="about" className="section-full" style={{ alignItems: 'flex-start', padding: '0 2rem' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        style={{ width: '80vw', maxWidth: 1200, margin: '0 auto', paddingTop: '6rem', paddingBottom: '4rem' }}
      >
        {/* ── Header ─────────────────────────────── */}
        <motion.div variants={fadeUp} custom={0} style={{ marginBottom: '3rem', paddingLeft: '1.25rem', borderLeft: '2px solid rgba(0,255,65,0.3)', position: 'relative' }}>
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.5rem' }}>USER_IDENTIFICATION // ARCHITECT_LOG</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: 'var(--foreground)' }}>
            <DecryptedText text="ABOUT_ME" maxIterations={12} speed={30} />
          </h2>
        </motion.div>

        {/* ── Grid ───────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>

          {/* Bio — 8 cols */}
          <motion.div
            variants={fadeUp} custom={0.05}
            style={{
              gridColumn: 'span 12',
              background: 'var(--surface-container-low)',
              borderLeft: '2px solid rgba(0,255,65,0.3)',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
            className="about-bio"
          >
            {/* Fingerprint watermark */}
            <svg style={{ position: 'absolute', top: 12, right: 12, opacity: 0.05, width: 56, height: 56 }} viewBox="0 0 24 24" fill="#81ecff">
              <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.87-1.14 1.96-2.08 3.22-2.78a9.38 9.38 0 0 1 8.8-.52 6.01 6.01 0 0 1 3.12 3.05c.13.24.03.54-.21.67-.24.13-.54.03-.67-.21a4.9 4.9 0 0 0-2.56-2.51 8.36 8.36 0 0 0-7.83.47c-1.12.63-2.1 1.49-2.89 2.52-.1.13-.25.2-.57.1zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15z"/>
            </svg>

            <span className="hud-tag" style={{ display: 'block', marginBottom: '1.5rem' }}>PRO_SUMMARY_STREAM</span>
            <p style={{ fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: 'var(--on-surface-var)', fontWeight: 300, lineHeight: 1.8, margin: '0 0 2rem' }}>
              I am a <span style={{ color: 'var(--primary-neon)', fontWeight: 700 }}>Synthetic Architect</span> bridging the gap between high-performance systems and cinematic user experiences.
              My focus lies in constructing scalable full-stack environments that prioritize technical precision,
              neural integration, and <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>structural integrity</span>.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {[
                { label: 'STATUS: ACTIVE_CONSTRUCT', color: 'var(--primary-neon)', dot: '#4ade80' },
                { label: 'LOCATION: LUCKNOW // INDIA', color: 'var(--secondary-neon)', dot: '#ffb86c' },
              ].map(b => (
                <div key={b.label} style={{ background: 'var(--surface-container)', border: '1px solid rgba(255,255,255,0.05)', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 5, height: 5, background: b.dot, borderRadius: '50%', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                  <span className="hud-tag" style={{ color: b.color, opacity: 1 }}>{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Lanyard Badge — 4 cols */}
          <motion.div
            variants={fadeUp} custom={0.08}
            style={{ 
              gridColumn: 'span 12', 
              minHeight: 400, 
              background: 'var(--surface-container-high)', 
              position: 'relative', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            className="about-photo cursor-crosshair"
          >
            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
              <span className="hud-tag" style={{ background: 'rgba(0,0,0,0.85)', padding: '3px 8px', border: '1px solid rgba(0,255,65,0.15)', opacity: 1 }}>AUTHENTICATION_CORE</span>
            </div>
            <InteractiveLanyard />
          </motion.div>

          {/* Academic — 5 cols */}
          <motion.div
            variants={fadeUp} custom={0.1}
            style={{ gridColumn: 'span 12', background: 'var(--surface-container-high)', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
            className="about-academic"
          >
            <svg style={{ position: 'absolute', right: -24, bottom: -24, opacity: 0.04, width: 130, height: 130 }} viewBox="0 0 24 24" fill="white">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
            <span className="hud-tag" style={{ display: 'block', marginBottom: '2rem' }}>ACADEMIC_HISTORY</span>
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="hud-tag" style={{ opacity: 0.45, marginBottom: '0.3rem' }}>INSTITUTION</div>
              <h3 style={{ color: 'var(--foreground)', fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>SRMIST</h3>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
              <div>
                <div className="hud-tag" style={{ opacity: 0.45, marginBottom: '0.3rem' }}>QUALIFICATION</div>
                <div style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.04em' }}>B.TECH COMPUTER SCIENCE</div>
              </div>
            </div>

          </motion.div>

          {/* Skills — 7 cols */}
          <motion.div
            variants={fadeUp} custom={0.12}
            style={{ gridColumn: 'span 12', background: 'var(--surface-container-low)', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            className="about-skills"
          >
            <div>
              <span className="hud-tag" style={{ display: 'block', marginBottom: '2rem' }}>SYSTEM_COMPETENCIES</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '1.5rem' }}>
                {SKILLS.map(({ label, name, pct }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div className="hud-tag" style={{ opacity: 0.45 }}>{label}</div>
                    <div style={{ color: 'var(--foreground)', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.04em' }}>{name}</div>
                    <div style={{ height: 2, background: 'rgba(0,255,65,0.1)', width: '100%' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
                        style={{ height: '100%', background: 'var(--primary-neon)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-container-high)', padding: '0.6rem 1rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <span className="hud-tag" style={{ opacity: 0.35 }}>TRANSFER_RATE: 1.2 GB/S // ENCRYPTION: AES-256</span>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1, 1, 0.2].map((o, i) => <div key={i} style={{ width: 4, height: 4, background: `rgba(0,255,65,${o})` }} />)}
              </div>
            </div>
          </motion.div>

          {/* CTA Strip */}
          <motion.div
            variants={fadeUp} custom={0.16}
            style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
            className="about-cta"
          >
            <div style={{ background: 'var(--primary-neon)', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: '#003840', lineHeight: 1, margin: '0 0 0.6rem', textTransform: 'uppercase', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
                READY TO<br />INITIALIZE?
              </h3>
              <span className="hud-tag" style={{ color: 'rgba(0,56,64,0.6)', opacity: 1 }}>SECURE_CHANNEL_OPENED</span>
            </div>
            <div style={{ background: 'var(--surface-container-high)', padding: '3rem 2.5rem', display: 'flex', alignItems: 'center' }}>
              <a
                href="#contact"
                style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', textDecoration: 'none', color: 'var(--foreground)', fontWeight: 700, fontSize: 'clamp(0.8rem,1.4vw,1.1rem)', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '2px solid var(--primary-neon)', paddingBottom: '0.4rem', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary-neon)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)')}
              >
                VIEW_EXPERIENCE_LOG
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @media (min-width: 1024px) {
          .about-bio      { grid-column: span 8 !important; }
          .about-photo    { grid-column: span 4 !important; min-height: 280px !important; }
          .about-academic { grid-column: span 5 !important; }
          .about-skills   { grid-column: span 7 !important; }
        }
        @media (max-width: 767px) {
          .about-cta { grid-template-columns: 1fr !important; }
        }
        @keyframes pulse-dot { 0%,100%{opacity:1;} 50%{opacity:.35;} }
      `}</style>
    </section>
  );
}
