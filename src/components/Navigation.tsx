'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DecryptedText } from './reactbits/DecryptedText';

const NAV_ITEMS = [
  { id: 'home',       label: 'HOME' },
  { id: 'about',      label: 'ABOUT' },
  { id: 'techstack',  label: 'EXP' },
  { id: 'projects',   label: 'WORK' },
  { id: 'creative',   label: 'DSGN' },
  { id: 'contact',    label: 'COMM' },
];

const SOCIAL_ICONS = [
  { label: 'GH', href: 'https://github.com/trs-saurav', path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { label: 'LN', href: 'https://linkedin.com/in/trs-saurav', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  { label: 'TW', href: 'https://twitter.com/ksaurav1402', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { label: 'IG', href: 'https://instagram.com/trs_saurav', path: 'M160,128a32,32,0,1,1-32-32A32.03667,32.03667,0,0,1,160,128Zm68-44v88a56.06353,56.06353,0,0,1-56,56H84a56.06353,56.06353,0,0,1-56-56V84A56.06353,56.06353,0,0,1,84,28h88A56.06353,56.06353,0,0,1,228,84Zm-52,44a48,48,0,1,0-48,48A48.05436,48.05436,0,0,0,176,128Zm16-52a12,12,0,1,0-12,12A12,12,0,0,0,192,76Z' },
];

export default function Navigation() {
  const [active, setActive] = useState('hero');
  const [scrollPct, setScrollPct] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ── Section observer ─────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    const setup = () => {
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };
    const iv = setInterval(() => {
      if (document.getElementById('home')) { setup(); clearInterval(iv); }
    }, 800);
    return () => { clearInterval(iv); observer.disconnect(); };
  }, []);

  /* ── Scroll progress from 3D bridge ──────── */
  useEffect(() => {
    const handler = (e: Event) => {
      const event = e as CustomEvent<number>;
      setScrollPct(event.detail);
    };
    window.addEventListener('portfolio-scroll', handler);
    return () => window.removeEventListener('portfolio-scroll', handler);
  }, []);

  const scroll = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        // Removed the soft glassmorphism, added hard dark terminal background with green border
        className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#00ff41]/20 flex items-stretch justify-between h-14"
      >
        {/* ── Left: Identity ──────────────────── */}
        <div className="flex items-center px-6 border-l-4 border-[#00ff41] border-r border-[#00ff41]/20 gap-3 min-w-[220px] bg-[#00ff41]/5 group cursor-default">
          <div className="flex flex-col gap-0.5">
            <span className="text-[#e9ffe9] font-black text-[13px] tracking-[0.15em] leading-none uppercase">
              {/* React Bits DecryptedText for a cool hover effect */}
              <DecryptedText text="trs-saurav" speed={40} maxIterations={12} />
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#00ff41]/60 uppercase">FULL_STACK_DEV // DEL</span>
          </div>
          <div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full shadow-[0_0_8px_#00ff41] animate-pulse shrink-0 ml-auto" />
        </div>

        {/* ── Center: Nav items (Desktop) ─────── */}
        <nav className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex items-center gap-2 px-4">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => scroll(id)}
                  className={`relative px-4 py-4 text-[10px] font-bold tracking-[0.2em] font-mono uppercase cursor-pointer transition-colors duration-300 z-10 ${isActive ? 'text-[#00ff41]' : 'text-[#849495] hover:text-[#e9ffe9]'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      // Changed from a solid background to a sleek bottom-glow line
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00ff41] shadow-[0_0_10px_#00ff41]"
                      transition={{ type: 'spring', bounce: 0.2, stiffness: 100, damping: 15 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* ── Right: Socials + Scroll (Desktop) ─ */}
        <div className="hidden md:flex items-center px-6 border-l border-[#00ff41]/20 gap-6">
          {/* Scroll progress */}
          <div className="flex flex-col gap-1 items-end">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#849495] uppercase">SYNC_LEVEL</span>
            <div className="w-[60px] h-[2px] bg-[#1c1b1e] relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#00ff41] shadow-[0_0_8px_#00ff41] transition-all duration-300" style={{ width: `${scrollPct}%` }} />
            </div>
          </div>

          <div className="w-px h-6 bg-[#00ff41]/20" />

          {/* Social icons */}
          <div className="flex gap-4">
            {SOCIAL_ICONS.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                title={label}
                className="flex items-center justify-center text-[#849495] hover:text-[#00ff41] transition-colors duration-300 hover:drop-shadow-[0_0_5px_#00ff41]"
              >
                <svg width="14" height="14" viewBox={label === 'IG' ? '0 0 256 256' : '0 0 24 24'} fill="currentColor">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>

          <div className="w-px h-6 bg-[#00ff41]/20" />

          {/* Resume */}
          <a
            href="/resume.pdf"
            download
            className="flex flex-col gap-0.5 no-underline group"
          >
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#849495] uppercase group-hover:text-[#ffb86c]/60 transition-colors">ACCESS_POINT</span>
            <span className="text-[#ffb86c] text-[10px] font-bold tracking-[0.15em] group-hover:text-[#ff9d00] transition-colors">
              MANIFEST_PDF
            </span>
          </a>
        </div>

        {/* ── Mobile Hamburger Button ─────── */}
        <button
          className="flex md:hidden flex-col justify-center items-center gap-1.5 w-14 h-14 bg-transparent border-none border-l border-[#00ff41]/20 cursor-pointer hover:bg-[#00ff41]/5 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={`w-5 h-0.5 transition-all duration-300 ${mobileMenuOpen ? 'translate-y-2 rotate-45 bg-[#00ff41] shadow-[0_0_5px_#00ff41]' : 'bg-[#e9ffe9]'}`} />
          <div className={`w-5 h-0.5 bg-[#e9ffe9] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`w-5 h-0.5 transition-all duration-300 ${mobileMenuOpen ? '-translate-y-2 -rotate-45 bg-[#00ff41] shadow-[0_0_5px_#00ff41]' : 'bg-[#e9ffe9]'}`} />
        </button>
      </motion.header>

      {/* ── Mobile Full-Screen Overlay Menu ──────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex md:hidden fixed top-14 left-0 w-full h-[calc(100vh-56px)] bg-[#0a0a0a]/95 backdrop-blur-xl z-[99] flex-col p-8 border-t border-[#00ff41]/20"
          >
            {/* Subtle background scanline effect for mobile menu */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20" />

            <div className="flex flex-col gap-4 flex-1 relative z-10">
              <div className="text-[10px] text-[#849495] uppercase tracking-[0.3em] mb-4 border-b border-[#00ff41]/20 pb-2">System.Directories</div>
              
              {NAV_ITEMS.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => scroll(id)}
                    className={`text-left p-4 flex items-center gap-4 text-base font-bold tracking-widest font-mono uppercase border-l-2 transition-all duration-200 ${isActive ? 'bg-[#00ff41]/10 border-l-[#00ff41] text-[#00ff41] translate-x-2' : 'bg-[#1c1b1e]/50 border-transparent text-[#849495] hover:text-[#e9ffe9] hover:bg-[#1c1b1e]'}`}
                  >
                    {isActive && <span className="text-[#00ff41] text-xs">►</span>}
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Nav Footer (Icons & Resume) */}
            <div className="flex flex-col gap-8 border-t border-[#00ff41]/20 pt-8 mt-auto relative z-10">
              <div className="flex gap-8 justify-center">
                {SOCIAL_ICONS.map(({ label, href, path }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" title={label} className="text-[#849495] hover:text-[#00ff41] transition-colors hover:drop-shadow-[0_0_8px_#00ff41]">
                    <svg width="24" height="24" viewBox={label === 'IG' ? '0 0 256 256' : '0 0 24 24'} fill="currentColor">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
              <a href="/resume.pdf" download className="flex justify-center items-center gap-2 text-[#0a0a0a] bg-[#00ff41] p-4 font-bold tracking-[0.15em] hover:bg-[#e9ffe9] transition-colors uppercase font-mono shadow-[0_0_15px_rgba(0,255,65,0.3)]">
                MANIFEST_PDF (RESUME)
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}