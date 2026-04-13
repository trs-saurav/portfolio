'use client';

import { motion, easeOut } from 'framer-motion';
import { useEffect, useState } from 'react';
import { DecryptedText } from './reactbits/DecryptedText';
import { BlurText } from './reactbits/BlurText';

const ITEM = {
  hidden: { opacity: 0, y: 16 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut, delay: d } }),
};

export default function Hero() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setGlitch(g => !g), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .local-scanline {
            width: 100%;
            height: 100%;
            z-index: 10;
            background: linear-gradient(to bottom, rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
            background-size: 100% 2px, 3px 100%;
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
        }
        .glitch-effect {
            background: repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.15) 0px, rgba(0, 255, 65, 0.15) 1px, transparent 1px, transparent 2px);
        }
      `}</style>
      
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 md:px-12 pt-24"
        style={{
          color: '#e5e1e4',
        }}
      >
        <div className="local-scanline"></div>

        {/* Main Grid Wrapper */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-20 w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center mx-auto pb-12"
        >
          {/* ── LEFT DATA COLUMN ── */}
          <motion.div variants={ITEM} custom={0.1} className="flex order-2 md:order-1 md:col-span-3 flex-col gap-8 md:gap-12 relative pt-8 md:pt-0">
            <div className="space-y-2 group">
              <div className="text-[10px] text-[#849495] uppercase tracking-[0.3em]">System.Status</div>
              <div className="h-[2px] w-12 bg-[#00ff41]"></div>
              <div className="text-sm font-mono text-[#b9caca] flex flex-col gap-1 mt-2">
                <span className="flex justify-between"><span>MAIN_STACK</span> <span className="text-[#00ff41]">NEXT.JS</span></span>
                <span className="flex justify-between"><span>DATABASE</span> <span className="text-[#00ff41]">POSTGRES</span></span>
                <span className="flex justify-between"><span>REPO_COMMITS</span> <span className="text-[#00ff41]">1.2K+</span></span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] text-[#849495] uppercase tracking-[0.3em]">Archive.Location</div>
              <div className="bg-[#1c1b1e] p-4 border-l-2 border-[#00ff41] group hover:bg-[#2a2a2c] transition-colors cursor-default">
                <div className="text-lg font-bold tracking-tight">SRMIST // 2027</div>
                <div className="text-[10px] text-[#849495] uppercase tracking-widest mt-1">Undergraduate_Researcher</div>
              </div>
            </div>

            <div className="text-[10px] text-[#849495] uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr] absolute -left-12 top-0 opacity-20 hidden lg:block">
              ARCHITECT_USER_INTERFACE_v4.0.2
            </div>
          </motion.div>

          {/* ── CENTER: IDENTITY CORE ── */}
          <motion.div variants={ITEM} custom={0.2} className="col-span-1 md:col-span-6 flex flex-col items-center gap-12 order-1 md:order-2">
            <div className="identity-core relative w-72 h-72 md:w-[450px] md:h-[450px] flex items-center justify-center cursor-crosshair">
              {/* Outer Rings */}
              <div className="absolute inset-0 border border-[#00ff41]/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-[#e9ffe9]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-10 border-t-2 border-[#00ff41]/40 rounded-full animate-[spin_8s_linear_infinite]"></div>
              
              {/* Invisible touch area to allow model rotation through the UI layer */}
              <div className="relative w-full h-full p-12 pointer-events-auto cursor-grab active:cursor-grabbing">
                <div className={`absolute inset-0 glitch-effect opacity-30 z-20 pointer-events-none ${glitch ? 'block' : 'hidden'}`}></div>
                {/* 3D Model renders behind this via fixed positioning from Scene3D */}
              </div>

              {/* Compass Metadata */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-[10px] font-mono text-[#00ff41] hidden sm:block">N_001</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 text-[10px] font-mono text-[#00ff41] hidden sm:block">S_001</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 text-[10px] font-mono text-[#00ff41] hidden sm:block">W_001</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 text-[10px] font-mono text-[#00ff41] hidden sm:block">E_001</div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter uppercase text-[#e9ffe9]">
                <DecryptedText text="Saurav Kumar" maxIterations={15} speed={40} />
              </h2>
              <p className="text-sm md:text-base text-[#849495] tracking-[0.4em] uppercase font-light">
                <BlurText text="Full_Stack // Systems_Designer" delay={30} />
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT DATA COLUMN ── */}
          <motion.div variants={ITEM} custom={0.3} className="flex order-3 md:col-span-3 flex-col gap-8 md:gap-12 items-start md:items-end text-left md:text-right h-full pb-32 md:pb-0">
            <div className="space-y-2 w-full">
              <div className="text-[10px] text-[#849495] uppercase tracking-[0.3em]">Protocol.Active</div>
              <div className="h-[2px] w-12 bg-[#ffb86c] md:ml-auto"></div>
              <div className="text-sm font-mono text-[#b9caca] flex flex-col gap-1 mt-2">
                <span className="text-[#ffb86c] tracking-widest animate-pulse">SEEKING_OPPORTUNITIES</span>
                <span>FOCUS: FULL_STACK/AI</span>
                <span className="text-[#00ff41]/60">LOCATION: DELHI_IN</span>
              </div>
            </div>

            <div className="space-y-6 flex-1 w-full flex flex-col pt-8">
              <div className="text-[10px] text-[#849495] uppercase tracking-[0.3em]">Quick_Actions</div>
              <div className="flex flex-col gap-3 w-full">
                <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-3 text-[#e9ffe9] text-sm uppercase tracking-widest hover:text-[#00ff41] transition-colors md:justify-end group cursor-pointer bg-transparent border-none">
                  _VIEW_PROJECTS
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:translate-x-1 transition-transform group-hover:opacity-100"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-3 text-[#e9ffe9] text-sm uppercase tracking-widest hover:text-[#00ff41] transition-colors md:justify-end group cursor-pointer bg-transparent border-none mt-2">
                  _ENCRYPT_MESSAGE
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:translate-x-1 transition-transform group-hover:opacity-100"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </button>
                <button onClick={() => window.open('https://github.com/trs-saurav', '_blank')} className="flex items-center gap-3 text-[#e9ffe9] text-sm uppercase tracking-widest hover:text-[#00ff41] transition-colors md:justify-end group cursor-pointer bg-transparent border-none mt-2">
                  _SOURCE_CODE
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:translate-x-1 transition-transform group-hover:opacity-100"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </button>
              </div>
            </div>

            <div className="mt-auto bg-[#00ff41]/10 p-6 backdrop-blur-md border-r-2 border-[#00ff41] text-left w-full mt-12">
              <div className="text-[10px] text-[#00ff41] font-bold mb-2">LAST_UPDATE</div>
              <div className="text-xs font-mono text-[#e9ffe9] opacity-80">2026.04.12_T14:42:01Z</div>
            </div>
          </motion.div>
        </motion.div>

      </section>
    </>
  );
}
