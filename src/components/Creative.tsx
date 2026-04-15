'use client';

import { motion } from 'framer-motion';
import { DecryptedText } from './reactbits/DecryptedText';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { InfiniteScroll } from './reactbits/InfiniteScroll';

/* == DATA NODES ========================================== */
const DESIGN_NODES = [
  { id: 'd1', title: 'LAUNCH_SEQUENCE', img: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=800' },
  { id: 'd2', title: 'RETRO_COMPUTING', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
  { id: 'd3', title: 'HARDWARE_CIRCUIT', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
  { id: 'd4', title: 'INDUSTRIAL_VOID', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
];

export default function Creative() {
  return (
    <section 
      id="creative" 
      className="relative w-screen h-screen bg-[#050505] overflow-hidden select-none flex flex-col"
    >
      {/* HUD Header */}
      <header className="z-50 px-6 md:px-12 py-10 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[9px] tracking-[0.5em] text-[#00ff41] uppercase block leading-none">
              VISUAL_ARCHIVE // FORGE_v4.2
            </span>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
              <DecryptedText text="CREATIVE_FORGE" maxIterations={12} speed={40} />
            </h1>
          </div>
          <span className="bg-[#ff3131]/10 border border-[#ff3131]/30 px-2 py-1 font-mono text-[8px] text-[#ff3131] uppercase animate-pulse self-start md:self-auto">
            INTERACTION_LOCK: ACTIVE
          </span>
        </div>
      </header>

      {/* Main Interaction Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-transparent relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          
          {/* Module 01: Kinetic Sequence (The Carousel) */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
               <span className="font-mono text-[9px] text-[#00ff41] uppercase tracking-widest">Module: Kinetic_Sequence</span>
               <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            
            {/* Carousel Track Fix: Added overflow-hidden and group to handle hover pause */}
            <div className="relative w-full overflow-hidden py-4 group">
              <InfiniteScroll 
                items={DESIGN_NODES} 
                speed="slow" 
                direction="left"
                pauseOnHover={true}
                renderItem={(item) => (
                  <motion.div 
                    key={item.id} 
                    whileHover={{ scale: 1.02 }}
                    className="relative w-[300px] md:w-[450px] aspect-video mx-4 overflow-hidden border border-white/10 bg-[#0a0a0a] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-none"
                  >
                     <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                        onContextMenu={(e) => e.preventDefault()}
                     />
                     <div className="absolute inset-0 border-[0.5px] border-white/5 pointer-events-none" />
                     <div className="absolute bottom-4 left-4 z-20">
                        <span className="font-mono text-[8px] text-white bg-black/80 px-2 py-1 border border-white/10 uppercase tracking-widest leading-none">
                          {item.title}
                        </span>
                     </div>
                  </motion.div>
                )}
              />
            </div>
          </div>

          {/* Module 02: High Density Archive (Masonry) */}
          <div className="pb-32">
             <div className="flex items-center gap-4 mb-12">
               <span className="font-mono text-[9px] text-[#ffb86c] uppercase tracking-widest">Module: Static_Archive</span>
               <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            
            {/* Masonry Grid Logic */}
            <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
               {/* 20+ Images would be mapped here */}
               {Array.from({ length: 12 }).map((_, i) => (
                 <div key={i} className="break-inside-avoid shadow-2xl">
                    <SpotlightCard className="bg-[#0d1117] border border-white/5 overflow-hidden group">
                       <div className="relative w-full aspect-square md:aspect-auto h-auto overflow-hidden">
                          <img 
                            src={`https://picsum.photos/seed/${i + 20}/800/1000`} 
                            className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 transition-all duration-1000"
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          <div className="absolute inset-0 z-10 bg-transparent cursor-crosshair" />
                       </div>
                    </SpotlightCard>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent System Footer */}
      <footer className="h-16 border-t border-white/10 bg-[#0a0a0a] px-6 md:px-12 flex items-center justify-between z-[60]">
        <div className="flex gap-8 font-mono text-[8px] text-white/20 uppercase tracking-[0.3em]">
          <span>Archive_v4.2.0</span>
          <span className="text-[#00ff41]">Telemetry: Active</span>
        </div>
        <div className="flex gap-4">
           <div className="hidden md:flex gap-1 items-center">
              {[1,1,0].map((v, i) => <div key={i} className={`w-1 h-1 ${v ? 'bg-[#00ff41]' : 'bg-white/10'}`} />)}
           </div>
           <button className="bg-white text-black font-mono text-[9px] font-black px-4 py-1.5 uppercase hover:bg-[#00ff41] transition-all">
             Initialize_Scan
           </button>
        </div>
      </footer>
    </section>
  );
}