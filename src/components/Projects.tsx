'use client';

import { motion } from 'framer-motion';

const PROJECTS = [
  {
    id: '01',
    name: 'QLINIC',
    sub: 'HEALTHTECH_SAAS',
    status: 'Startup MVP',
    date: '12/2025 – Present',
    desc: 'Architected a multi-tenant platform using Next.js App Router and dynamic subdomains. Engineered event-driven background workflows using Inngest to handle critical asynchronous tasks with near-zero UI overhead.',
    tech: ['Next.js 15', 'Inngest', 'NextAuth', 'Firebase'],
    live: '#',
    src: '#',
  },
  {
    id: '02',
    name: 'POWER_ELECTRONICS',
    sub: 'B2C E-COMMERCE',
    status: 'B2C Platform',
    date: '08/2025 – 10/2025',
    desc: 'High-performance B2C platform utilizing SSR for massive SEO gains and localized caching. Event-Driven Architecture using Serverless Functions to automate industrial-scale inventory and global distributions.',
    tech: ['Next.js', 'Inngest', 'Clerk', 'MongoDB'],
    live: '#',
    src: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-full" style={{ alignItems: 'flex-start', padding: '0 2rem' }}>
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
          style={{ marginBottom: '3.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid rgba(255,109,175,0.35)' }}
        >
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.5rem' }}>DEPLOYMENT_LOG // SECTOR_PROJECTS</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--foreground)' }}>
            MISSION_PROFILE
          </h2>
        </motion.div>

        {/* Project cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '1rem' }}>
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                background: 'var(--surface-container)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px -5px rgba(129,236,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* Large watermark number */}
              <span style={{ position: 'absolute', top: -12, right: 16, fontSize: '8rem', fontWeight: 900, color: 'rgba(129,236,255,0.04)', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                {proj.id}
              </span>

              {/* Header strip */}
              <div style={{ background: 'var(--surface-container-high)', padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="hud-tag" style={{ display: 'block', marginBottom: '0.3rem', opacity: 0.4 }}>PROJ_ID // {proj.id}</span>
                <h3 style={{ color: 'var(--foreground)', fontSize: '1.2rem', fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>{proj.name}</h3>
                <div style={{ color: 'var(--on-surface-var)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', marginTop: '0.2rem' }}>{proj.sub}</div>
              </div>

              {/* Body */}
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ padding: '3px 10px', background: 'rgba(129,236,255,0.07)', border: '1px solid rgba(129,236,255,0.15)', color: 'var(--primary-neon)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em' }}>{proj.status}</span>
                  <span className="hud-tag" style={{ opacity: 0.35 }}>EST // {proj.date}</span>
                </div>

                <p style={{ color: 'var(--on-surface-var)', fontSize: '0.9rem', lineHeight: 1.75, margin: 0, flex: 1 }}>{proj.desc}</p>

                {/* Tech stack */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {proj.tech.map(t => (
                    <span key={t} style={{ color: 'var(--outline)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>#{t}</span>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.25rem' }}>
                  <a href={proj.src} style={{ color: 'var(--outline)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--outline)')}>
                    ACCESS_SOURCE
                  </a>
                  <a href={proj.live} style={{ background: 'var(--primary-neon)', color: '#003840', padding: '8px 20px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'filter 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.filter = 'brightness(1.08)'; el.style.boxShadow = '0 0 20px rgba(129,236,255,0.3)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.filter = 'none'; el.style.boxShadow = 'none'; }}>
                    RUN_DEMO ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
