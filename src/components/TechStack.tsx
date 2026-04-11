'use client';

import { motion } from 'framer-motion';

const STACK: { category: string; color: string; items: { name: string; tag: string; icon: string }[] }[] = [
  {
    category: 'FRONTEND',
    color: 'var(--primary-neon)',
    items: [
      { name: 'React',      tag: 'UI_KERNEL',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js',    tag: 'APP_ROUTER',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'TypeScript', tag: 'TYPE_SYSTEM',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Three.js',   tag: 'SPATIAL_WEB',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
      { name: 'Tailwind',   tag: 'STYLE_ENGINE', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    category: 'BACKEND',
    color: 'var(--secondary-neon)',
    items: [
      { name: 'Node.js',    tag: 'RUNTIME',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Python',     tag: 'SCRIPTING',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'FastAPI',    tag: 'API_LAYER',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Express',    tag: 'SERVER',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    ],
  },
  {
    category: 'AI / ML',
    color: '#10b981',
    items: [
      { name: 'PyTorch',     tag: 'DEEP_LEARN',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'TensorFlow',  tag: 'ML_KERNEL',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'Scikit-learn',tag: 'SKLEARN',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'OpenCV',      tag: 'VISION',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
    ],
  },
  {
    category: 'DATABASE',
    color: '#f59e0b',
    items: [
      { name: 'MongoDB',     tag: 'DOCUMENT_DB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL',  tag: 'RELATIONAL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Redis',       tag: 'CACHE_STORE', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      { name: 'Firebase',    tag: 'REALTIME_DB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg' },
    ],
  },
  {
    category: 'DEVOPS / TOOLS',
    color: '#ff6daf',
    items: [
      { name: 'Docker',      tag: 'CONTAINER',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Git',         tag: 'VCS',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Linux',       tag: 'OS_KERNEL',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'Figma',       tag: 'DESIGN_SYS',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="techstack" style={{ width: '100vw', padding: '0 2rem', boxSizing: 'border-box' }}>
      <style>{`
        @media (max-width: 768px) {
          .tech-row { grid-template-columns: 1fr !important; }
          .techstack-head { font-size: 2.5rem !important; }
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        style={{ width: '80vw', maxWidth: 1200, margin: '0 auto', paddingTop: '6rem', paddingBottom: '4rem' }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid rgba(129,236,255,0.35)' }}
        >
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.4rem' }}>CAPABILITY_MATRIX // SYSTEM_STACK</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--foreground)' }}>
            TECH_ARSENAL
          </h2>
        </motion.div>

        {/* Category rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {STACK.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.55, delay: ci * 0.08 }}
              className="tech-row"
              style={{
                background: ci % 2 === 0 ? 'var(--surface-container)' : 'var(--surface-container-low)',
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                borderLeft: `2px solid ${cat.color}22`,
                transition: 'border-color 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderLeftColor = cat.color)}
              onMouseLeave={e => (e.currentTarget.style.borderLeftColor = `${cat.color}22`)}
            >
              {/* Left label */}
              <div style={{
                backgrounds: 'var(--surface-container-high)',
                borderRight: '1px solid rgba(255,255,255,0.04)',
                padding: '1.5rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '0.35rem',
                background: 'var(--surface-container-high)',
              }}>
                <span style={{ fontSize: '0.55rem', fontWeight: 700, color: cat.color, letterSpacing: '0.25em', textTransform: 'uppercase' }}>MODULE</span>
                <span style={{ color: 'var(--foreground)', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.06em' }}>{cat.category}</span>
              </div>

              {/* Right: tech cards */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', padding: '1px' }}>
                {cat.items.map((tech, ti) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: ci * 0.06 + ti * 0.04 }}
                    style={{
                      background: 'var(--surface-container-high2)',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      flex: '1 1 160px',
                      transition: 'background 0.2s, box-shadow 0.2s',
                      cursor: 'default',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    whileHover={{ backgroundColor: 'var(--surface-bright)' } as any}
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      width={28}
                      height={28}
                      style={{
                        filter: tech.name === 'Next.js' || tech.name === 'Express' ? 'invert(1)' : 'none',
                        opacity: 0.85,
                        flexShrink: 0,
                      }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <span style={{ color: 'var(--foreground)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em' }}>{tech.name}</span>
                      <span style={{ color: cat.color, fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7 }}>{tech.tag}</span>
                    </div>
                    {/* Top-right accent corner */}
                    <div style={{ position: 'absolute', top: 0, right: 0, width: 12, height: 1, background: `${cat.color}40` }} />
                    <div style={{ position: 'absolute', top: 0, right: 0, width: 1, height: 12, background: `${cat.color}40` }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: '1px', background: 'var(--surface-container-high)', padding: '0.9rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span className="hud-tag" style={{ opacity: 0.35 }}>
            TOTAL_MODULES: {STACK.reduce((a, c) => a + c.items.length, 0)} // CATEGORIES: {STACK.length}
          </span>
          <span className="hud-tag" style={{ opacity: 0.35 }}>STACK_VERSION: 2026.Q2</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
