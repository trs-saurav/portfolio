'use client';

import { motion } from 'framer-motion';

const CREATIVE_TOOLS = [
  { name: 'Photoshop', role: 'PIXEL_MANIPULATION', color: '#31a8ff' },
  { name: 'Premiere Pro', role: 'TIMELINE_ENGINE', color: '#9999ff' },
  { name: 'Canva', role: 'RAPID_PROTOTYPING', color: '#00c4cc' },
];

const SHOWCASE_ITEMS = [
  { id: 1, title: 'CYBER_COMPOSITE_01', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', span: 'col-span-1 md:col-span-2 md:row-span-2' },
  { id: 2, title: 'UI_UX_MOCKUP_V3', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80', span: 'col-span-1 md:row-span-1' },
  { id: 3, title: 'VOID_RENDER_FINAL', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', span: 'col-span-1 md:row-span-1' },
  { id: 4, title: 'BRAND_IDENTITY_SYS', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80', span: 'col-span-1 md:col-span-3 md:row-span-1' },
];

export default function Creative() {
  return (
    <section
      id="creative"
      style={{ width: '100vw', padding: '0 2rem', boxSizing: 'border-box', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
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
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid rgba(0,196,204,0.4)' }}
        >
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.4rem' }}>AESTHETICS // VISUAL_ENGINE</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--foreground)' }}>
            CREATIVE_ARRAY
          </h2>
        </motion.div>

        {/* Tools */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          {CREATIVE_TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                background: 'var(--surface-container)',
                padding: '1rem 1.5rem',
                borderTop: `2px solid ${tool.color}66`,
                flex: '1 1 200px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: -20, right: -20, width: 60, height: 60, background: tool.color, opacity: 0.05, borderRadius: '50%', filter: 'blur(20px)' }} />
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--foreground)' }}>{tool.name}</span>
              <span className="hud-tag" style={{ color: tool.color, opacity: 0.8 }}>{tool.role}</span>
            </motion.div>
          ))}
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {SHOWCASE_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative group overflow-hidden bg-[var(--surface-container)] cursor-crosshair ${item.span}`}
              style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent opacity-80" />
              
              {/* Overlay UI */}
              <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-[#00c4cc] rounded-full animate-pulse shadow-[0_0_8px_#00c4cc]" />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#00c4cc]">RENDER_COMPLETE</span>
                </div>
                <h3 className="text-white font-black tracking-wide text-lg m-0">{item.title}</h3>
              </div>
              
              {/* Tech corner */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#00c4cc]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#00c4cc]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
