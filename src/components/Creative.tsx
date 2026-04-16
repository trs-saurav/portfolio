
'use client';

import { motion, easeOut } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
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

/* ── PHOTOGRAPHY ARCHIVE — Variable aspect ratio images ── */
const PHOTO_FRAMES = [
  { id: 'f01', tag: 'FRAME_01', img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1000', cat: 'LANDSCAPE', width: 1600, height: 900, aspectRatio: 16/9 },
  { id: 'f02', tag: 'FRAME_02', img: 'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&q=80&w=1000', cat: 'URBAN', width: 800, height: 1200, aspectRatio: 2/3 },
  { id: 'f03', tag: 'FRAME_03', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1000', cat: 'NATURE', width: 1000, height: 1000, aspectRatio: 1 },
  { id: 'f04', tag: 'FRAME_04', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000', cat: 'PORTRAIT', width: 750, height: 1250, aspectRatio: 3/5 },
  { id: 'f05', tag: 'FRAME_05', img: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&q=80&w=1000', cat: 'ARCH', width: 1200, height: 800, aspectRatio: 3/2 },
  { id: 'f06', tag: 'FRAME_06', img: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=1000', cat: 'COSMOS', width: 1600, height: 900, aspectRatio: 16/9 },
  { id: 'f07', tag: 'FRAME_07', img: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1000', cat: 'STREET', width: 800, height: 1200, aspectRatio: 2/3 },
  { id: 'f08', tag: 'FRAME_08', img: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=80&w=1000', cat: 'NATURE', width: 1000, height: 1000, aspectRatio: 1 },
  { id: 'f09', tag: 'FRAME_09', img: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&q=80&w=1000', cat: 'AERIAL', width: 1400, height: 1000, aspectRatio: 7/5 },
  { id: 'f10', tag: 'FRAME_10', img: 'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?auto=format&fit=crop&q=80&w=1000', cat: 'MACRO', width: 900, height: 600, aspectRatio: 3/2 },
  { id: 'f11', tag: 'FRAME_11', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1000', cat: 'COSMOS', width: 1600, height: 900, aspectRatio: 16/9 },
  { id: 'f12', tag: 'FRAME_12', img: 'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&q=80&w=1000', cat: 'MOUNTAIN', width: 1000, height: 1000, aspectRatio: 1 },
  { id: 'f13', tag: 'FRAME_13', img: 'https://images.unsplash.com/photo-1520637836993-5e3c8a4b8b63?auto=format&fit=crop&q=80&w=1000', cat: 'OCEAN', width: 1200, height: 800, aspectRatio: 3/2 },
  { id: 'f14', tag: 'FRAME_14', img: 'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80&w=1000', cat: 'DESERT', width: 800, height: 1200, aspectRatio: 2/3 },
  { id: 'f15', tag: 'FRAME_15', img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1000', cat: 'FOREST', width: 1400, height: 1000, aspectRatio: 7/5 },
  { id: 'f16', tag: 'FRAME_16', img: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=1000', cat: 'SUNSET', width: 1000, height: 1000, aspectRatio: 1 },
];

/* ── PhotoFrame: individual tile with flexible aspect ratio ── */
function PhotoFrame({ frame, delay, onExpand, height, isFixedHeight }: { frame: typeof PHOTO_FRAMES[0] & { width?: number; height?: number; aspectRatio?: number }; delay: number; onExpand: (frame: typeof PHOTO_FRAMES[0]) => void; height?: number; isFixedHeight?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Calculate width based on aspect ratio and fixed height (justified layout)
  let styleProps: any = { aspectRatio: frame.aspectRatio || 1 };
  if (isFixedHeight && height) {
    const width = height * (frame.aspectRatio || 1);
    styleProps = { 
      width: `${width}px`,
      height: `${height}px`,
      aspectRatio: frame.aspectRatio || 1,
      flexShrink: 0
    };
  }

  return (
    <Magnet magnetStrength={0.15}>
      <motion.div
        variants={fadeUp}
        custom={delay}
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMouse({ x: 0, y: 0 }); }}
        onMouseMove={handleMouseMove}
        onClick={() => onExpand(frame)}
        className={`relative overflow-hidden border border-white/5 bg-[#0d1117] group cursor-zoom-in hover:border-[#00ff41]/30 transition-colors duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] ${isFixedHeight ? '' : 'w-full'}`}
        style={styleProps}
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

            {/* Image — in color with enhanced brightness on hover */}
            <img
              src={frame.img}
              alt={frame.tag}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-cover transition-all duration-500 ease-in-out brightness-90 group-hover:brightness-110 group-hover:saturate-110"
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
  const [photos, setPhotos] = useState(PHOTO_FRAMES);
  const [loading, setLoading] = useState(true);
  const [expandedImage, setExpandedImage] = useState<typeof PHOTO_FRAMES[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [displayPhotos, setDisplayPhotos] = useState<any[]>([]);

  // Calculate justified layout rows - only use for desktop (md+)
  const shouldUseJustified = containerWidth > 640;
  
  const calculateJustifiedLayout = (images: any[], width: number) => {
    if (!images || images.length === 0 || width <= 0) return [];
    
    // Use smaller row height on mobile, larger on desktop
    let targetRowHeight = 180;
    if (width > 640) targetRowHeight = 220;
    if (width > 1024) targetRowHeight = 260;
    
    const rows: any[][] = [];
    let currentRow: any[] = [];
    let currentRowWidth = 0;
    const gapSize = 12; // pixels

    images.forEach((img, idx) => {
      const aspectRatio = Math.max(0.5, Math.min(img.aspectRatio || 1, 5)); // Clamp ratio
      const imgWidth = targetRowHeight * aspectRatio;
      currentRowWidth += imgWidth + gapSize;
      currentRow.push(img);

      // If row is full or this is the last image, finalize the row
      if (currentRowWidth >= width || idx === images.length - 1) {
        if (currentRow.length > 0) {
          // Calculate actual heights to justify the row
          const totalGaps = gapSize * (currentRow.length - 1);
          const scaleFactor = (width - totalGaps) / (currentRowWidth - totalGaps - gapSize);
          const finalHeight = Math.round(Math.max(120, targetRowHeight * scaleFactor)); // Min 120px
          
          rows.push(currentRow.map(img => ({
            ...img,
            justifiedHeight: finalHeight,
          })));
          currentRow = [];
          currentRowWidth = 0;
        }
      }
    });

    return rows;
  };

  const justifiedRows = shouldUseJustified ? calculateJustifiedLayout(displayPhotos, containerWidth) : [];

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/cloudinary');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.photos.length > 0) {
            setPhotos(data.photos);
          }
        }
      } catch (error) {
        console.error('Error fetching Cloudinary images:', error);
        // Fallback to PHOTO_FRAMES if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Randomly select subset of photos (8-12 images) for display
  useEffect(() => {
    if (photos.length > 0) {
      const subset = Math.min(Math.max(8, Math.ceil(photos.length / 2)), 12);
      const randomPhotos = photos
        .sort(() => Math.random() - 0.5)
        .slice(0, subset);
      setDisplayPhotos(randomPhotos);
    }
  }, [photos]);

  // Track container width for responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Ensure we have a valid width
        if (width > 0) {
          setContainerWidth(width);
        } else {
          // Fallback: use window width if ref width is 0
          setContainerWidth(Math.min(window.innerWidth * 0.8, 1200));
        }
      }
    };

    // Initial measurement with slight delay to ensure DOM is ready
    const timer = setTimeout(handleResize, 150);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedImage(null);
    };
    if (expandedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [expandedImage]);
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
              FRAMES: {displayPhotos.length}/{photos.length} ARCHIVED
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

        {/* ════ MODULE 02: PHOTOGRAPHY ARCHIVE (Constrained to 80vw × 70vh) ════ */}
        <motion.div variants={fadeUp} custom={0.1} className="pb-8 flex flex-col items-center">
          {/* Module label */}
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10 pl-3 sm:pl-4 border-l-2 border-[#ffb86c]/30 w-full">
            <span className="font-mono text-[8px] sm:text-[9px] text-[#ffb86c] uppercase tracking-widest">
              Module: Photography_Archive
            </span>
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="font-mono text-[6px] sm:text-[7px] text-[#ffb86c]/50 uppercase tracking-widest">
              {photos.length} CAPTURES
            </span>
          </div>

          {/* Stats row */}
          <motion.div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8 w-full" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1, staggerChildren: 0.1 }}>
            {['LANDSCAPE', 'URBAN', 'COSMOS', 'NATURE'].map((cat, i) => (
              <motion.div key={cat} className="flex items-center gap-1.5 sm:gap-2 bg-white/[0.03] border border-white/5 px-2 sm:px-3 py-1 sm:py-1.5 hover:border-[#00ff41]/30 transition-colors" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }} whileHover={{ scale: 1.05 }}>
                <motion.div className="w-1 h-1 sm:w-1.5 sm:h-1.5" style={{ background: i === 0 ? '#00ff41' : i === 1 ? '#ffb86c' : i === 2 ? '#ff3131' : 'rgba(255,255,255,0.3)' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
                <span className="font-mono text-[7px] sm:text-[8px] text-white/40 tracking-widest uppercase">{cat}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Constrained Gallery Container (80vw × 80vh) with scroll ── */}
          <motion.div
            className="w-[80vw] max-h-[80vh] overflow-y-auto border border-[#ffb86c]/20 bg-[#050505]/50 p-4 sm:p-6 rounded-sm scrollbar-thin scrollbar-thumb-[#00ff41]/30 scrollbar-track-transparent hover:scrollbar-thumb-[#00ff41]/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* ── Justified Gallery Layout (auto-resize for different aspect ratios) ── */}
            <motion.div
              ref={containerRef}
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
            {justifiedRows && justifiedRows.length > 0 ? (
              // Justified layout
              justifiedRows.map((row, rowIdx) => (
                <motion.div
                  key={`row-${rowIdx}`}
                  className="flex gap-2 sm:gap-3 mb-2 sm:mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: easeOut,
                    delay: rowIdx * 0.08,
                  }}
                >
                  {row.map((frame, imgIdx) => (
                    <motion.div
                      key={frame.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: easeOut,
                        delay: rowIdx * 0.08 + imgIdx * 0.03,
                      }}
                      whileHover={{ scale: 1.02, y: -4 }}
                    >
                      <PhotoFrame 
                        frame={frame} 
                        delay={rowIdx * 0.08 + imgIdx * 0.03} 
                        onExpand={setExpandedImage}
                        height={frame.justifiedHeight}
                        isFixedHeight={true}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ))
            ) : displayPhotos && displayPhotos.length > 0 ? (
              // Fallback: simple responsive grid when justified layout fails
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {displayPhotos.map((frame, idx) => (
                  <motion.div
                    key={frame.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: easeOut,
                      delay: idx * 0.03,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <PhotoFrame 
                      frame={frame} 
                      delay={idx * 0.03} 
                      onExpand={setExpandedImage}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Empty state
              <motion.div className="w-full h-40 flex items-center justify-center text-white/40">
                <span className="font-mono text-sm tracking-widest">LOADING_ARCHIVE...</span>
              </motion.div>
            )}
            </motion.div>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* ── FULLSCREEN IMAGE VIEWER ── */}
      {expandedImage && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setExpandedImage(null)}
        >
          {/* Close button */}
          <motion.button
            onClick={() => setExpandedImage(null)}
            className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-[#00ff41]/20 hover:bg-[#00ff41]/40 border border-[#00ff41]/50 transition-colors duration-300 group cursor-pointer"
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0, 255, 65, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-mono text-[#00ff41] text-lg group-hover:text-white transition-colors w-full h-full flex items-center justify-center">×</span>
          </motion.button>

          {/* Image container with design palette */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0d1117] border border-[#00ff41]/30 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar with frame info */}
            <div className="h-12 border-b border-[#00ff41]/20 bg-black/50 px-4 sm:px-6 flex items-center justify-between">
              <motion.span className="font-mono text-[10px] sm:text-[11px] text-[#00ff41] uppercase tracking-[0.3em]">
                {expandedImage.tag}
              </motion.span>
              <motion.span className="font-mono text-[9px] sm:text-[10px] text-[#00ff41]/60 uppercase tracking-widest">
                {expandedImage.cat}
              </motion.span>
            </div>

            {/* Image display */}
            <motion.div
              className="relative w-full overflow-auto"
              style={{ maxHeight: "calc(90vh - 48px - 60px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.img
                src={expandedImage.img}
                alt={expandedImage.tag}
                className="w-full h-auto object-contain brightness-100"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: easeOut }}
              />

              {/* Scanlines overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                }}
              />

              {/* Corner brackets */}
              <motion.div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#00ff41]/60" />
              <motion.div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#00ff41]/60" />
              <motion.div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#00ff41]/60" />
              <motion.div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#00ff41]/60" />
            </motion.div>

            {/* Bottom bar with metadata */}
            <motion.div
              className="h-15 border-t border-[#00ff41]/20 bg-black/50 px-4 sm:px-6 py-3 flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="font-mono text-[8px] sm:text-[9px] text-white/40 uppercase tracking-widest">
                Press ESC or click outside to close
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-[#00ff41]/60 uppercase tracking-widest animate-pulse">
                FULLSCREEN_MODE
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      {/* ── FULLSCREEN IMAGE VIEWER ── */}
      {expandedImage && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setExpandedImage(null)}
        >
          {/* Close button */}
          <motion.button
            onClick={() => setExpandedImage(null)}
            className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-[#00ff41]/20 hover:bg-[#00ff41]/40 border border-[#00ff41]/50 transition-colors duration-300 group cursor-pointer"
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0, 255, 65, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-mono text-[#00ff41] text-lg group-hover:text-white transition-colors w-full h-full flex items-center justify-center">×</span>
          </motion.button>

          {/* Image container with design palette */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0d1117] border border-[#00ff41]/30 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar with frame info */}
            <div className="h-12 border-b border-[#00ff41]/20 bg-black/50 px-4 sm:px-6 flex items-center justify-between">
              <motion.span className="font-mono text-[10px] sm:text-[11px] text-[#00ff41] uppercase tracking-[0.3em]">
                {expandedImage.tag}
              </motion.span>
              <motion.span className="font-mono text-[9px] sm:text-[10px] text-[#00ff41]/60 uppercase tracking-widest">
                {expandedImage.cat}
              </motion.span>
            </div>

            {/* Image display */}
            <motion.div
              className="relative w-full overflow-auto"
              style={{ maxHeight: "calc(90vh - 48px - 60px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.img
                src={expandedImage.img}
                alt={expandedImage.tag}
                className="w-full h-auto object-contain brightness-100"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: easeOut }}
              />

              {/* Scanlines overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                }}
              />

              {/* Corner brackets */}
              <motion.div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#00ff41]/60" />
              <motion.div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#00ff41]/60" />
              <motion.div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#00ff41]/60" />
              <motion.div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#00ff41]/60" />
            </motion.div>

            {/* Bottom bar with metadata */}
            <motion.div
              className="h-15 border-t border-[#00ff41]/20 bg-black/50 px-4 sm:px-6 py-3 flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="font-mono text-[8px] sm:text-[9px] text-white/40 uppercase tracking-widest">
                Press ESC or click outside to close
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-[#00ff41]/60 uppercase tracking-widest animate-pulse">
                FULLSCREEN_MODE
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      {/* ── Persistent System Footer (mirrors other section footers) ── */}
      <motion.div className="w-full border-t border-white/10 bg-[#0a0a0a] px-4 sm:px-8 md:px-12 py-4 sm:py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 hover:border-[#00ff41]/30 transition-colors duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-6 font-mono text-[7px] sm:text-[8px] text-white/20 uppercase tracking-[0.3em]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>Archive_v4.2.0</motion.span>
          <motion.span className="text-[#00ff41]" animate={{ textShadow: ["0 0 0px rgba(0, 255, 65, 0)", "0 0 10px rgba(0, 255, 65, 0.5)", "0 0 0px rgba(0, 255, 65, 0)"] }} transition={{ duration: 2, repeat: Infinity }}>Telemetry: Active</motion.span>
          <span className="hidden md:inline">Seq: {KINETIC_NODES.length} │ Frames: {photos.length}</span>
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