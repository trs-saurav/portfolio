'use client';

import { motion } from 'framer-motion';

const EXP = [
  {
    id: '01',
    title: 'WEB_DEV // CREATIVE_DESIGN',
    company: 'Hackhound',
    type: 'TECH_CLUB',
    date: '08/2024',
    desc: 'Architecting high-fidelity UI clusters. Engineering design systems for technical club event portals. Translating raw brand identity into production-ready assets.'
  },
  {
    id: '02',
    title: 'FREELANCE_DESIGNER',
    company: 'Self-Employed',
    type: 'FREELANCE',
    date: '03/2020 – 12/2023',
    desc: 'Visual asset deployment for energy sector high-stakes clients. Technical branding, brochure systems, and identity engineering.'
  }
];

export default function Timeline() {
  return (
    <section id="experience" className="section-full" style={{ alignItems: 'flex-start', padding: '0 2rem' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        style={{ width: '80vw', maxWidth: 1200, margin: '0 auto', paddingTop: '6rem', paddingBottom: '4rem' }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid rgba(193,128,255,0.35)' }}
        >
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.5rem' }}>MISSION_CHRONOLOGY // EXP_LOG</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--foreground)' }}>
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Entry list — left-wall layout, tonal separation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {EXP.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                background: i % 2 === 0 ? 'var(--surface-container)' : 'var(--surface-container-low)',
                borderLeft: '2px solid rgba(129,236,255,0.2)',
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: 0,
                transition: 'border-color 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderLeftColor = 'rgba(129,236,255,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'rgba(129,236,255,0.2)')}
              className="exp-entry"
            >
              {/* Left gutter — date + ID */}
              <div style={{ background: 'var(--surface-container-high)', padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: 'rgba(129,236,255,0.12)', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1 }}>{exp.id}</span>
                <div>
                  <span className="hud-tag" style={{ display: 'block', opacity: 0.45, marginBottom: '0.2rem' }}>DATE</span>
                  <span style={{ color: 'var(--outline)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em' }}>{exp.date}</span>
                </div>
              </div>

              {/* Right content */}
              <div style={{ padding: '2rem 2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span className="hud-tag" style={{ display: 'block', marginBottom: '0.4rem', opacity: 0.5 }}>POSITION</span>
                    <h3 style={{ color: 'var(--foreground)', fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 800, margin: 0, letterSpacing: '0.04em' }}>{exp.title}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ padding: '3px 10px', background: 'rgba(129,236,255,0.06)', border: '1px solid rgba(129,236,255,0.15)', color: 'var(--primary-neon)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em' }}>{exp.type}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <span className="hud-tag" style={{ opacity: 0.45, marginRight: '0.5rem' }}>ORGANISATION</span>
                  <span style={{ color: 'var(--primary-neon)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em' }}>{exp.company}</span>
                </div>

                <p style={{ color: 'var(--on-surface-var)', fontSize: '0.95rem', lineHeight: 1.75, margin: 0 }}>{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '1px', background: 'var(--surface-container-high)', padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span className="hud-tag" style={{ opacity: 0.35 }}>EXP_LOG_COMPILED // ENTRIES: {EXP.length}</span>
          <a
            href="#projects"
            style={{ color: 'var(--foreground)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary-neon)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)')}
          >
            VIEW_PROJECTS →
          </a>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .exp-entry { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
