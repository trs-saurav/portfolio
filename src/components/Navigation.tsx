'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero',       label: 'HOME' },
  { id: 'about',      label: 'ABOUT' },
  { id: 'techstack',  label: 'EXP' },
  { id: 'projects',   label: 'WORK' },
  { id: 'creative',   label: 'DSGN' },
  { id: 'contact',    label: 'COMM' },
];

const SOCIAL_ICONS = [
  { label: 'GH', href: 'https://github.com/trs-saurav', path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { label: 'LN', href: 'https://linkedin.com/in/trs-saurav', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  { label: 'TW', href: 'https://twitter.com', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { label: 'IG', href: 'https://instagram.com', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label: 'FB', href: 'https://facebook.com', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
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
      if (document.getElementById('hero')) { setup(); clearInterval(iv); }
    }, 800);
    return () => { clearInterval(iv); observer.disconnect(); };
  }, []);

  /* ── Scroll progress from 3D bridge ──────── */
  useEffect(() => {
    const handler = (e: Event) => setScrollPct((e as CustomEvent).detail as number);
    window.addEventListener('portfolio-scroll', handler);
    return () => window.removeEventListener('portfolio-scroll', handler);
  }, []);

  const scroll = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.35}}
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
        
        .hamburger-line { width: 24px; height: 2px; background-color: var(--foreground); transition: all 0.3s ease; }
        .hamburger-active .line-1 { transform: translateY(6px) rotate(45deg); background-color: var(--primary-neon); }
        .hamburger-active .line-2 { opacity: 0; }
        .hamburger-active .line-3 { transform: translateY(-6px) rotate(-45deg); background-color: var(--primary-neon); }
      `}</style>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          background: 'rgba(12,14,18,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          height: 56,
        }}
      >
        {/* ── Left: Identity ──────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          borderLeft: '2px solid rgba(129,236,255,0.5)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          gap: '0.75rem',
          minWidth: 220,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            <span style={{ color: 'var(--foreground)', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.06em', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1 }}>
              SAURAV_KUMAR
            </span>
            <span className="hud-tag" style={{ opacity: 0.5 }}>FULL_STACK_DEV // DEL</span>
          </div>
          <div style={{ width: 5, height: 5, background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 8px #4ade80', animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0 }} />
        </div>

        {/* ── Center: Nav items (Desktop) ─────── */}
        <nav className="desktop-only" style={{ flex: 1, display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scroll(id)}
                style={{
                  background: isActive ? 'rgba(129,236,255,0.05)' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--primary-neon)' : '2px solid transparent',
                  borderTop: '2px solid transparent',
                  color: isActive ? 'var(--primary-neon)' : 'var(--outline)',
                  padding: '0 1.5rem',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-space-grotesk)',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'var(--foreground)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'var(--outline)'; }}
              >
                {isActive && (
                  <span style={{ width: 4, height: 4, background: 'var(--primary-neon)', borderRadius: '50%', flexShrink: 0 }} />
                )}
                {label}
              </button>
            );
          })}
        </nav>

        {/* ── Right: Socials + Scroll (Desktop) ─ */}
        <div className="desktop-only" style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
          borderRight: '2px solid rgba(193,128,255,0.4)',
          gap: '1.25rem',
        }}>
          {/* Scroll progress */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', alignItems: 'flex-end' }}>
            <span className="hud-tag" style={{ opacity: 0.35 }}>SYNC_LEVEL</span>
            <div style={{ width: 60, height: 2, background: 'rgba(255,255,255,0.06)' }}>
              <div style={{ height: '100%', width: `${scrollPct}%`, background: 'var(--primary-neon)', transition: 'width 0.3s ease' }} />
            </div>
          </div>

          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.06)' }} />

          {/* Social icons */}
          {SOCIAL_ICONS.map(({ label, href, path }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              title={label}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.45, transition: 'opacity 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.45')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--foreground)">
                <path d={path} />
              </svg>
            </a>
          ))}

          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.06)' }} />

          {/* Resume */}
          <a
            href="/resume.pdf"
            download
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}
          >
            <span className="hud-tag" style={{ opacity: 0.35, transition: 'opacity 0.2s' }}>ACCESS_POINT</span>
            <span style={{ color: 'var(--secondary-neon)', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.15em', transition: 'color 0.2s' }}>
              MANIFEST_PDF
            </span>
          </a>
        </div>

        {/* ── Mobile Hamburger Button ─────── */}
        <button
          className={`mobile-only \${mobileMenuOpen ? 'hamburger-active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ width: 60, height: 56, display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '4px', background: 'transparent', border: 'none', borderLeft: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
        >
          <div className="hamburger-line line-1" />
          <div className="hamburger-line line-2" />
          <div className="hamburger-line line-3" />
        </button>
      </motion.header>

      {/* ── Mobile Full-Screen Overlay Menu ──────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-only"
            style={{ position: 'fixed', top: 56, left: 0, width: '100%', height: 'calc(100vh - 56px)', background: 'rgba(12,14,18,0.98)', backdropFilter: 'blur(20px)', zIndex: 999, display: 'flex', flexDirection: 'column', padding: '2rem' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              {NAV_ITEMS.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => scroll(id)}
                    style={{ background: isActive ? 'rgba(129,236,255,0.08)' : 'transparent', border: 'none', borderLeft: isActive ? '4px solid var(--primary-neon)' : '4px solid transparent', padding: '1rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem', color: isActive ? 'var(--primary-neon)' : 'var(--outline)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.2em', fontFamily: 'var(--font-space-grotesk)', textTransform: 'uppercase' }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Nav Footer (Icons & Resume) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                {SOCIAL_ICONS.map(({ label, href, path }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" title={label} style={{ color: 'var(--outline)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
              <a href="/resume.pdf" download style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: '#003840', background: 'var(--primary-neon)', padding: '1rem', fontWeight: 900, textDecoration: 'none', letterSpacing: '0.15em' }}>
                MANIFEST_PDF (RESUME)
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
