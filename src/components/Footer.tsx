'use client';

const NAV_LINKS = ['HOME', 'ABOUT', 'EXPERIENCE', 'WORK', 'CONTACT'];
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/trs-saurav', path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/trs-saurav', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  { label: 'Twitter', href: 'https://twitter.com', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { label: 'Instagram', href: 'https://instagram.com', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
];

export default function Footer() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer
      style={{
        width: '100vw',
        background: 'var(--surface-container-low)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: '0 2rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '80vw', maxWidth: 1200, margin: '0 auto', padding: '3rem 0 1.5rem' }}>
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'start', marginBottom: '2.5rem', flexWrap: 'wrap' }} className="footer-top">
          {/* Brand */}
          <div>
            <div style={{ paddingLeft: '1.25rem', borderLeft: '2px solid rgba(129,236,255,0.4)', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--foreground)', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.06em', display: 'block' }}>SAURAV_KUMAR</span>
              <span className="hud-tag" style={{ opacity: 0.5 }}>SYNTHETIC_ARCHITECT // DEL_IN</span>
            </div>
            <p style={{ color: 'var(--on-surface-var)', fontSize: '0.82rem', lineHeight: 1.7, margin: 0, maxWidth: 300 }}>
              Building high-performance full-stack systems and AI pipelines. Based in Delhi, India.
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'center' }}>
            <span className="hud-tag" style={{ opacity: 0.35, marginBottom: '0.25rem' }}>NAVIGATION</span>
            {NAV_LINKS.map(l => (
              <button
                key={l}
                onClick={() => scroll(l.toLowerCase())}
                style={{ background: 'none', border: 'none', color: 'var(--outline)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)', padding: '2px 0', transition: 'color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-neon)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--outline)')}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Socials + resume */}
          <div className="footer-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
            <span className="hud-tag" style={{ opacity: 0.35 }}>EXTERNAL_NODES</span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, background: 'var(--surface-container)', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(129,236,255,0.08)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(129,236,255,0.2)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--surface-container)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.05)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--on-surface-var)"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
            <a href="/resume.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary-neon)', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', padding: '6px 14px', border: '1px solid rgba(193,128,255,0.25)', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(193,128,255,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              ⬇ MANIFEST_PDF
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginBottom: '1.25rem' }} />

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className="hud-tag" style={{ opacity: 0.25 }}>© 2026 SAURAV_KUMAR // ALL_RIGHTS_RESERVED // SERIAL: DEL-IN-001</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['SESSION_ID: 0x8FF5', 'BUILD: STABLE', 'POWER: MAX'].map(t => (
              <span key={t} className="hud-tag" style={{ opacity: 0.2 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .footer-top{grid-template-columns:1fr!important;text-align:left;}
          .footer-right{align-items:flex-start!important;}
          .footer-bottom{flex-direction:column; align-items:flex-start!important; gap:1.25rem!important;}
        }
      `}</style>
    </footer>
  );
}
