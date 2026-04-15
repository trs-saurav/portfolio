'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import TargetCursor from './reactbits/TargetCursor';
import { LetterGlitch } from './reactbits/LetterGlitch';

const STACK = [
  {
    category: 'FRONTEND',
    color: '#00ff41',
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
    color: '#ffb86c',
    items: [
      { name: 'Node.js',    tag: 'RUNTIME',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Python',     tag: 'SCRIPTING',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'FastAPI',    tag: 'API_LAYER',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Express',    tag: 'SERVER',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Postman',    tag: 'API_TEST',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
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
      { name: 'Keras',       tag: 'NEURAL_NET',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg' },
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
      { name: 'Inngest',     tag: 'EVENT_BUS',   icon: 'https://www.inngest.com/favicon.ico' },
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
      { name: 'Vercel',      tag: 'DEPLOYMENT',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    ],
  },
];

export default function TechStack() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section 
      id="techstack" 
      className="group" 
      style={{ width: '100%', padding: '0 2rem', position: 'relative', cursor: 'none' }}
    >
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <TargetCursor targetSelector=".cursor-target" />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ width: '80vw', maxWidth: 1200, margin: '0 auto', paddingTop: '6rem', paddingBottom: '4rem' }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-14 pl-5 border-l-2 border-[#00ff41]/40"
        >
          <span className="hud-tag block mb-2 opacity-50">CAPABILITY_MATRIX // SYSTEM_STACK</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            <LetterGlitch text="TECH_ARSENAL" interval={5000} />
          </h2>
        </motion.div>

        {/* Category rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {STACK.map((cat, ci) => (
            <motion.div
              key={cat.category}
              className="tech-row group/row"
              onMouseEnter={() => setActiveRow(ci)}
              onMouseLeave={() => setActiveRow(null)}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(8px)',
                display: 'grid',
                gridTemplateColumns: 'minmax(180px, 200px) 1fr',
                borderLeft: `2px solid ${activeRow === ci ? cat.color : `${cat.color}22`}`,
                transition: 'border-color 0.3s ease',
              }}
            >
              {/* Left label (Sidebar Fixed state logic) */}
              <div style={{
                borderRight: '1px solid rgba(255,255,255,0.04)',
                padding: '1.5rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '0.35rem',
                background: activeRow === ci ? 'rgba(255,255,255,0.03)' : 'var(--surface-container-high)',
                transition: 'background 0.3s ease'
              }}>
                <span style={{ fontSize: '0.55rem', fontWeight: 700, color: cat.color, letterSpacing: '0.25em' }}>MODULE</span>
                <span style={{ color: 'var(--foreground)', fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.06em' }}>{cat.category}</span>
              </div>

              {/* Right: tech cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[1px]">
                {cat.items.map((tech, ti) => (
                  <motion.div
                    className="cursor-target relative p-5 flex items-center gap-3 overflow-hidden transition-colors"
                    key={tech.name}
                    style={{ background: 'rgba(13, 17, 23, 0.3)' }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    {/* Hover Corner Brackets (Fix #1: Transition handled via CSS group-hover) */}
                    <div className="absolute top-0 right-0 w-3 h-[1px] bg-[#00ff41]/40 opacity-0 group-hover/target:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-[1px] h-3 bg-[#00ff41]/40 opacity-0 group-hover/target:opacity-100 transition-opacity" />

                    <img
                      src={tech.icon}
                      alt={tech.name}
                      width={24}
                      height={24}
                      style={{
                        filter: tech.name === 'Next.js' || tech.name === 'Express' ? 'invert(1)' : 'none',
                        opacity: 0.9,
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-white text-[0.8rem] font-bold tracking-wide">{tech.name}</span>
                      <span style={{ color: cat.color, fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.15em' }}>{tech.tag}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary strip */}
        <motion.div
          className="mt-[1px] bg-white/[0.03] backdrop-blur-md p-4 flex justify-between items-center"
        >
          <span className="hud-tag text-[0.65rem] opacity-30 tracking-widest">
            TOTAL_MODULES: {STACK.reduce((a, c) => a + c.items.length, 0)} // CATEGORIES: 5
          </span>
          <span className="hud-tag text-[0.65rem] opacity-30 tracking-widest">STACK_VERSION: 2026.Q2</span>
        </motion.div>
      </motion.div>
    </section>
  );
}