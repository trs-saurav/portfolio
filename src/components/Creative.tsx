'use client';

import { motion, easeOut } from 'framer-motion';
import { useState, useRef } from 'react';
import { DecryptedText } from './reactbits/DecryptedText';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { InfiniteScroll } from './reactbits/InfiniteScroll';
import { Magnet } from './reactbits/Magnet';
import { NoisyCard } from './reactbits/NoisyCard';
import { LetterGlitch } from './reactbits/LetterGlitch';

/* ── fade-up variant (mirrors other sections) ── */
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut, delay: d } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (d = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut, delay: d } }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut, delay: d } }),
};

/* ── KINETIC SEQUENCE (scrolling strip) ── */
const KINETIC_NODES = [
  { id: 's1', tag: 'SEQ_01', img: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=900&h=506' },
  { id: 's2', tag: 'SEQ_02', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=900&h=506' },
  { id: 's3', tag: 'SEQ_03', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=900&h=506' },
  { id: 's4', tag: 'SEQ_04', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900&h=506' },
  { id: 's5', tag: 'SEQ_05', img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=900&h=506' },
  { id: 's6', tag: 'SEQ_06', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=900&h=506' },
];

/* ── PHOTOGRAPHY ARCHIVE — 4:3 masonry images ── */
const PHOTO_FRAMES = [
  { id: 'f01', tag: 'FRAME_01', img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=800&h=600', cat: 'LANDSCAPE' },
  { id: 'f02', tag: 'FRAME_02', img: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&q=80&w=800&h=600', cat: 'URBAN' },
  { id: 'f03', tag: 'FRAME_03', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=800&h=600', cat: 'NATURE' },
  { id: 'f04', tag: 'FRAME_04', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=600', cat: 'PORTRAIT' },
  { id: 'f05', tag: 'FRAME_05', img: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&q=80&w=800&h=600', cat: 'ARCH' },
  { id: 'f06', tag: 'FRAME_06', img: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=800&h=600', cat: 'COSMOS' },
  { id: 'f07', tag: 'FRAME_07', img: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=800&h=600', cat: 'STREET' },
  { id: 'f08', tag: 'FRAME_08', img: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=80&w=800&h=600', cat: 'NATURE' },
  { id: 'f09', tag: 'FRAME_09', img: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&q=80&w=800&h=600', cat: 'AERIAL' },
  { id: 'f10', tag: 'FRAME_10', img: 'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?auto=format&fit=crop&q=80&w=800&h=600', cat: 'MACRO' },
  { id: 'f11', tag: 'FRAME_11', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800&h=600', cat: 'COSMOS' },
  { id: 'f12', tag: 'FRAME_12', img: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&q=80&w=800&h=600', cat: 'MOUNTAIN' },
  { id: 'f13', tag: 'FRAME_13', img: 'https://images.unsplash.com/photo-1520637836993-5e3c8a4b8b63?auto=format&fit=crop&q=80&w=800&h=600', cat: 'OCEAN' },
  { id: 'f14', tag: 'FRAME_14', img: 'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80&w=800&h=600', cat: 'DESERT' },
  { id: 'f15', tag: 'FRAME_15', img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=800&h=600', cat: 'FOREST' },
  { id: 'f16', tag: 'FRAME_16', img: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=800&h=600', cat: 'SUNSET' },
];

/* ── PhotoFrame: individual 4:3 tile ── */
function PhotoFrame({ frame, delay }: { frame: typeof PHOTO_FRAMES[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Magnet magnetStrength={0.15}>
      <motion.div
        variants={fadeUp}
        custom={delay}
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMouse({ x: 0, y: 0 }); }}
        onMouseMove={handleMouseMove}
        className="relative w-full overflow-hidden border border-white/5 bg-[#0d1117] group cursor-crosshair hover:border-[#00ff41]/30 transition-colors duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.1)]"
        style={{ aspectRatio: '4/3' }}
        whileHover={{ scale: 1.02 }}
      >
        <NoisyCard>
          <div className="w-full h-full relative">
            {/* Spotlight glow */}
            {hovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: `radial-gradient(circle 140px at ${mouse.x}px ${mouse.y}px, rgba(0,255,65,0.12), transparent 80%)`,
                }}
              />
            )}

            {/* Image — grayscale→color on hover */}
            <img
              src={frame.img}
              alt={frame.tag}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"
            />

            {/* Scan-line overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
              }}
            />

            {/* Corner brackets with animations */}
            <motion.div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20 z-30 group-hover:border-[#00ff41]/50 transition-colors duration-500" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: delay + 0.1 }} />
            <motion.div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20 z-30 group-hover:border-[#00ff41]/50 transition-colors duration-500" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: delay + 0.15 }} />
            <motion.div className="absolute bottom-8 left-2 w-4 h-4 border-b border-l border-white/20 z-30 group-hover:border-[#00ff41]/50 transition-colors duration-500" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: delay + 0.2 }} />
            <motion.div className="absolute bottom-8 right-2 w-4 h-4 border-b border-r border-white/20 z-30 group-hover:border-[#00ff41]/50 transition-colors duration-500" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: delay + 0.25 }} />

            {/* Hover green border */}
            <div className="absolute inset-0 border border-transparent group-hover:border-[#00ff41]/30 transition-colors duration-500 z-30 pointer-events-none" />

            {/* Bottom meta bar with animations */}
            <motion.div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-2 py-1.5 bg-black/70 border-t border-white/5" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: delay + 0.1 }}>
              <motion.span className="font-mono text-[7px] tracking-[0.3em] text-white/70 uppercase group-hover:text-[#00ff41] transition-colors duration-300" whileHover={{ letterSpacing: "0.4em" }}>
                {frame.tag}
              </motion.span>
              <motion.span className="font-mono text-[7px] tracking-[0.2em] text-white/20 uppercase" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>
                {frame.cat}
              </motion.span>
            </motion.div>
          </div>
        </NoisyCard>
      </motion.div>
    </Magnet>
  );
}

export default function Creative() {
  return (
    <section
      id="creative"
      className="relative w-full bg-[#050505] overflow-hidden select-none"
    >
      {/* ── HUD Header (mirrors About/Timeline header pattern) ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <motion.div variants={fadeUp} custom={0} className="pl-3 sm:pl-4 border-l-2 border-[#00ff41]/30 space-y-1 sm:space-y-2">
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.5em] text-[#00ff41] uppercase block leading-none">
              VISUAL_ARCHIVE // FORGE_v4.2
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none">
              <DecryptedText text="CREATIVE_FORGE" maxIterations={12} speed={40} />
            </h2>
          </motion.div>

          {/* Status badges */}
          <motion.div variants={fadeUp} custom={0.1} className="flex flex-wrap gap-2 sm:gap-3 items-start md:items-center self-start md:self-auto">
            <motion.span className="bg-[#ff3131]/10 border border-[#ff3131]/30 px-2 py-1 font-mono text-[7px] sm:text-[8px] text-[#ff3131] uppercase animate-pulse" whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 49, 49, 0.2)" }}>
              INTERACTION_LOCK: ACTIVE
            </motion.span>
            <motion.span className="bg-[#ffb86c]/5 border border-[#ffb86c]/20 px-2 py-1 font-mono text-[7px] sm:text-[8px] text-[#ffb86c] uppercase" whileHover={{ scale: 1.05, borderColor: "#ffb86c" }}>
              FRAMES: {PHOTO_FRAMES.length} ARCHIVED
            </motion.span>
          </motion.div>        </div>      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16"
      >

        {/* ════ MODULE 01: KINETIC SEQUENCE ════ */}
        <motion.div variants={fadeUp} custom={0} className="mb-16 sm:mb-20 lg:mb-24">
          {/* Module label */}
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 pl-3 sm:pl-4 border-l-2 border-[#00ff41]/30">
            <span className="font-mono text-[8px] sm:text-[9px] text-[#00ff41] uppercase tracking-widest">
              Module: Kinetic_Sequence
            </span>
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="font-mono text-[6px] sm:text-[7px] text-white/20 uppercase tracking-widest\">
              {KINETIC_NODES.length} FEEDS           </span>      </div>

          {/* Scrolling strip */}
          <div className="relative w-full overflow-hidden py-2 sm:py-3 group">
            <InfiniteScroll
              items={KINETIC_NODES}
              speed="slow"
              direction="left"
              pauseOnHover={true}
              renderItem={(item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="relative mx-1 sm:mx-2 md:mx-3 lg:mx-4 overflow-hidden border border-white/10 bg-[#0a0a0a] group/card cursor-crosshair"
                  style={{ width: 'clamp(140px, 45vw, 380px)', aspectRatio: '16/9' }}
                >
                  <img
                    src={item.img}
                    alt={item.tag}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover/card:grayscale-0 group-hover/card:opacity-90 transition-all duration-700 ease-in-out"
                  />
                  {/* Scanlines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
                    }}
                  />
                  {/* Border glow on hover */}
                  <div className="absolute inset-0 border border-transparent group-hover/card:border-[#00ff41]/20 transition-colors duration-500 pointer-events-none" />
                  {/* Corner TL */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20 group-hover/card:border-[#00ff41]/60 transition-colors duration-500" />
                  {/* Corner TR */}
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20 group-hover/card:border-[#00ff41]/60 transition-colors duration-500" />
                  {/* Tag */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-black/60 border-t border-white/5">
                    <span className="font-mono text-[8px] text-white/60 tracking-[0.4em] uppercase group-hover/card:text-[#00ff41] transition-colors duration-300">
                      {item.tag}
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-white/10 group-hover/card:bg-[#00ff41] transition-colors duration-500" />
                      <div className="w-1 h-1 bg-white/10 group-hover/card:bg-[#00ff41]/50 transition-colors duration-700" />
                    </div>
                  </div>
                </motion.div>
              )}
            />
            {/* Edge fade L */}
            <div className="absolute left-0 top-0 h-full w-16 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
            {/* Edge fade R */}
            <div className="absolute right-0 top-0 h-full w-16 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />
          </div>
        </motion.div>

        {/* ════ MODULE 02: PHOTOGRAPHY ARCHIVE (4:3 Masonry) ════ */}
        <motion.div variants={fadeUp} custom={0.1} className="pb-8">
          {/* Module label */}
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 pl-3 sm:pl-4 border-l-2 border-[#ffb86c]/30">
            <span className="font-mono text-[8px] sm:text-[9px] text-[#ffb86c] uppercase tracking-widest">
              Module: Photography_Archive
            </span>
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="font-mono text-[6px] sm:text-[7px] text-[#ffb86c]/50 uppercase tracking-widest">
              {PHOTO_FRAMES.length} CAPTURES // 4:3
            </span>
          </div>

          {/* Stats row */}
          <motion.div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1, staggerChildren: 0.1 }}>
            {['LANDSCAPE', 'URBAN', 'COSMOS', 'NATURE'].map((cat, i) => (
              <motion.div key={cat} className="flex items-center gap-1.5 sm:gap-2 bg-white/[0.03] border border-white/5 px-2 sm:px-3 py-1 sm:py-1.5 hover:border-[#00ff41]/30 transition-colors" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }} whileHover={{ scale: 1.05 }}>
                <motion.div className="w-1 h-1 sm:w-1.5 sm:h-1.5" style={{ background: i === 0 ? '#00ff41' : i === 1 ? '#ffb86c' : i === 2 ? '#ff3131' : 'rgba(255,255,255,0.3)' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
                <span className="font-mono text-[7px] sm:text-[8px] text-white/40 tracking-widest uppercase">{cat}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Responsive grid layout (optimized for mobile) ── */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {PHOTO_FRAMES.map((frame, i) => (
              <div key={frame.id} className="w-full">
                <PhotoFrame frame={frame} delay={i * 0.03} />
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>

      {/* ── Persistent System Footer (mirrors other section footers) ── */}
      <motion.div className="w-full border-t border-white/10 bg-[#0a0a0a] px-4 sm:px-8 md:px-12 py-4 sm:py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 hover:border-[#00ff41]/30 transition-colors duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-6 font-mono text-[7px] sm:text-[8px] text-white/20 uppercase tracking-[0.3em]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>Archive_v4.2.0</motion.span>
          <motion.span className="text-[#00ff41]" animate={{ textShadow: ["0 0 0px rgba(0, 255, 65, 0)", "0 0 10px rgba(0, 255, 65, 0.5)", "0 0 0px rgba(0, 255, 65, 0)"] }} transition={{ duration: 2, repeat: Infinity }}>Telemetry: Active</motion.span>
          <span className="hidden md:inline">Seq: {KINETIC_NODES.length} │ Frames: {PHOTO_FRAMES.length}</span>
        </motion.div>
        <motion.div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="hidden md:flex gap-1 items-center">
            {[1, 1, 0, 1].map((v, i) => (
              <motion.div key={i} className={`w-1 h-1 ${v ? 'bg-[#00ff41]' : 'bg-white/10'}`} animate={v ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.5 }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
            ))}
          </div>
          <motion.button className="bg-white text-black font-mono text-[9px] font-black px-5 py-2 uppercase hover:bg-[#00ff41] transition-all duration-200 tracking-widest w-full sm:w-auto" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)" }} whileTap={{ scale: 0.95 }}>
            Initialize_Scan
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}