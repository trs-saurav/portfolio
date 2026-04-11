'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';

/* ── Projects data ─────────────────────────────────────── */
const PROJECTS = [
  {
    id: '01',
    name: 'QLINIC',
    sub: 'HEALTHTECH_SAAS',
    status: 'Startup MVP',
    date: '12/2025 – Present',
    desc: 'Multi-tenant platform using Next.js App Router and dynamic subdomains. Event-driven background workflows via Inngest for near-zero UI overhead.',
    tech: ['Next.js 15', 'Inngest', 'NextAuth', 'Firebase'],
    href: '#',
  },
  {
    id: '02',
    name: 'POWER_ELECTRONICS',
    sub: 'B2C E-COMMERCE',
    status: 'B2C Platform',
    date: '08/2025 – 10/2025',
    desc: 'High-performance B2C platform with SSR for SEO gains and localized caching. Serverless Functions for industrial-scale inventory automation.',
    tech: ['Next.js', 'Inngest', 'Clerk', 'MongoDB'],
    href: '#',
  },
  {
    id: '03',
    name: 'URL_SHORTENER_PRO',
    sub: 'MERN_STACK_TOOL',
    status: 'Live Service',
    date: '04/2024 – 06/2024',
    desc: 'Full-stack URL shortening service with comprehensive link analytics and custom routing. Built on the MERN stack with JWT authentication and rate limiting.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: '#',
  },
  {
    id: '04',
    name: 'PLANT_DISEASE_ML',
    sub: 'DEEP_LEARNING_MODEL',
    status: 'Research Project',
    date: '01/2024 – 03/2024',
    desc: 'Convolutional Neural Network (CNN) pipeline for high-accuracy plant disease classification from leaf imagery. Features automated image augmentation and real-time inference.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Keras'],
    href: '#',
  },
];

/* ── Stat data ─────────────────────────────────────────── */
const LIVE_STATS = [
  { label: 'GITHUB_REPOS',     key: 'repos',     color: 'var(--primary-neon)',   accent: 'rgba(129,236,255,0.1)' },
  { label: 'GH_FOLLOWERS',     key: 'followers', color: 'var(--primary-neon)',   accent: 'rgba(129,236,255,0.07)' },
  { label: 'LEETCODE_SOLVED',  key: 'leetcode',  color: 'var(--secondary-neon)', accent: 'rgba(193,128,255,0.1)' },
  { label: 'ACCEPTANCE_RATE',  key: 'acc',       color: 'var(--foreground)',      accent: 'rgba(246,246,252,0.04)' },
  { label: 'AAA_TITLES_DONE',  key: 'aaa',       color: '#ff6daf',               accent: 'rgba(255,109,175,0.1)' },
];

/* ── Generate pseudo-random heat maps as fallback ──────── */
function makeHeat(seed: number) {
  return Array.from({ length: 52 * 7 }, (_, i) => {
    const v = Math.sin(i * seed + seed) * 0.5 + 0.5;
    return v > 0.85 ? 3 : v > 0.68 ? 2 : v > 0.45 ? 1 : 0;
  });
}

const FALLBACK_GH_HEAT = makeHeat(0.317);
const FALLBACK_LC_HEAT = makeHeat(0.823);

type HeatSrc = 'github' | 'leetcode';

type Stats = {
  repos: number | string;
  followers: number | string;
  leetcode: number | string;
  acc: string;
  aaa: string;
};

export default function ProjectsAndStats() {
  const [stats, setStats] = useState<Stats>({
    repos: '—', followers: '—', leetcode: '—', acc: '—%', aaa: '15+',
  });
  const [heatSrc, setHeatSrc] = useState<HeatSrc>('github');
  const [ghHeat, setGhHeat] = useState<number[]>(FALLBACK_GH_HEAT);
  const [lcHeat, setLcHeat] = useState<number[]>(FALLBACK_LC_HEAT);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    }
  };

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // GitHub Profile Stats
    fetch('https://api.github.com/users/trs-saurav')
      .then(r => r.json())
      .then(d => {
        if (d.public_repos !== undefined) {
          setStats(s => ({ ...s, repos: d.public_repos, followers: d.followers }));
        }
      })
      .catch(() => {});

    // GitHub Daily Heatmap
    fetch('https://github-contributions-api.jogruber.de/v4/trs-saurav')
      .then(r => r.json())
      .then(d => {
        if (d.contributions) {
           const last364 = d.contributions.slice(-364);
           const padded = [...Array(Math.max(0, 364 - last364.length)).fill(0), ...last364.map((c: any) => Math.min(4, c.level))];
           setGhHeat(padded);
        }
      })
      .catch(() => {});

    // LeetCode Profile Stats & Heatmap (alfa proxy)
    fetch('https://alfa-leetcode-api.onrender.com/trs-saurav')
      .then(r => r.json())
      .then(d => {
         if (d.errors) {
            // fallback if user not found on alfa
            fetchLeetcodeHeroku();
         } else if (d.totalSolved !== undefined) {
            setStats(s => ({ ...s, leetcode: d.totalSolved, acc: '—%' })); // alfa doesn't always return acc right away
            // fetch LC calendar
            fetch('https://alfa-leetcode-api.onrender.com/trs-saurav/calendar')
              .then(cr => cr.json())
              .then(cd => {
                 if (cd.submissionCalendar) {
                    const calData = JSON.parse(cd.submissionCalendar);
                    // generate last 364 days array
                    const arr = new Array(364).fill(0);
                    const now = Math.floor(Date.now() / 1000);
                    const daySecs = 86400;
                    Object.entries(calData).forEach(([timestamp, count]: [string, any]) => {
                       const daysAgo = Math.floor((now - parseInt(timestamp)) / daySecs);
                       if (daysAgo >= 0 && daysAgo < 364) {
                           arr[363 - daysAgo] = count > 3 ? 3 : count > 0 ? (count > 1 ? 2 : 1) : 0;
                       }
                    });
                    setLcHeat(arr);
                 }
              })
              .catch(() => {});
         }
      })
      .catch(() => fetchLeetcodeHeroku());

    function fetchLeetcodeHeroku() {
      fetch('https://leetcode-stats-api.herokuapp.com/trs-saurav')
        .then(r => r.json())
        .then(d => {
          if (d.totalSolved !== undefined) {
            setStats(s => ({
              ...s,
              leetcode: d.totalSolved,
              acc: `${d.acceptanceRate?.toFixed(1) ?? '—'}%`,
            }));
          }
        })
        .catch(() => {
          // Fallback if API is down
          setStats(s => ({ ...s, leetcode: '145+', acc: '68%' }));
        });
    }
  }, []);

  const heat = heatSrc === 'github' ? ghHeat : lcHeat;

  return (
    <section
      id="projects"
      style={{ width: '100vw', padding: '0 2rem', boxSizing: 'border-box', minHeight: '100vh' }}
    >
      <style>{`
        @media (max-width: 768px) {
          .heat-toolbar { flex-direction: column !important; gap: 1rem; align-items: flex-start !important; }
        }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        style={{ width: '80vw', maxWidth: 1200, margin: '0 auto', paddingTop: '6rem', paddingBottom: '4rem' }}
      >
        {/* ══ PROJECTS ════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid rgba(255,109,175,0.4)' }}
        >
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.4rem' }}>DEPLOYMENT_LOG // SECTOR_PROJECTS</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--foreground)' }}>
            MISSION_PROFILE
          </h2>
        </motion.div>

        <div ref={scrollRef} onScroll={handleScroll} className="hide-scroll" style={{ display: 'flex', overflowX: 'auto', gap: '1.25rem', paddingBottom: '1rem', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{ background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', flex: '0 0 auto', width: 'clamp(280px, 80vw, 420px)', scrollSnapAlign: 'start', overflow: 'hidden', position: 'relative', transition: 'box-shadow 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px -5px rgba(129,236,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Watermark number */}
              <span style={{ position: 'absolute', top: -10, right: 12, fontSize: '7rem', fontWeight: 900, color: 'rgba(129,236,255,0.04)', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{proj.id}</span>

              {/* Header */}
              <div style={{ background: 'var(--surface-container-high)', padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="hud-tag" style={{ display: 'block', marginBottom: '0.25rem', opacity: 0.4 }}>PROJ_ID // {proj.id}</span>
                <h3 style={{ color: 'var(--foreground)', fontSize: '1.1rem', fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>{proj.name}</h3>
                <div style={{ color: 'var(--outline)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', marginTop: '0.15rem' }}>{proj.sub}</div>
              </div>

              {/* Body */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ padding: '2px 9px', background: 'rgba(129,236,255,0.07)', border: '1px solid rgba(129,236,255,0.15)', color: 'var(--primary-neon)', fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.14em' }}>{proj.status}</span>
                  <span className="hud-tag" style={{ opacity: 0.35 }}>EST // {proj.date}</span>
                </div>
                <p style={{ color: 'var(--on-surface-var)', fontSize: '0.88rem', lineHeight: 1.75, margin: 0, flex: 1 }}>{proj.desc}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.9rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {proj.tech.map(t => <span key={t} style={{ color: 'var(--outline)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>#{t}</span>)}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <a href={proj.href} style={{ color: 'var(--outline)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--outline)')}>
                    ACCESS_SOURCE
                  </a>
                  <a href={proj.href} style={{ background: 'var(--primary-neon)', color: '#003840', padding: '7px 18px', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'filter 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.filter = 'brightness(1.08)'; el.style.boxShadow = '0 0 20px rgba(129,236,255,0.3)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.filter = 'none'; el.style.boxShadow = 'none'; }}>
                    RUN_DEMO ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4rem', padding: '0 0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => scrollByAmount(-350)} style={{ border: '1px solid rgba(129,236,255,0.2)', background: 'transparent', color: 'var(--primary-neon)', width: 36, height: 36, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(129,236,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              &lt;
            </button>
            <button onClick={() => scrollByAmount(350)} style={{ border: '1px solid rgba(129,236,255,0.2)', background: 'transparent', color: 'var(--primary-neon)', width: 36, height: 36, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(129,236,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              &gt;
            </button>
          </div>
          <div style={{ flex: 1, maxWidth: '300px', height: '2px', background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
            <div style={{ width: `${scrollProgress * 100}%`, height: '100%', background: 'var(--primary-neon)', position: 'absolute', left: 0, top: 0, transition: 'width 0.15s ease' }} />
          </div>
        </div>

        {/* ══ STATS ═══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid rgba(193,128,255,0.4)' }}
        >
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.4rem' }}>TELEMETRY_LOG // BIOMETRIC</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--foreground)' }}>
            BIOMETRIC_DATA
          </h2>
        </motion.div>

        {/* Stat cards row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1px', marginBottom: '1px' }}>
          {LIVE_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              style={{ background: 'var(--surface-container)', padding: '1.75rem', position: 'relative', borderTop: `2px solid ${s.color}`, overflow: 'hidden', transition: 'box-shadow 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 36px -5px ${s.color}22`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ position: 'absolute', inset: 0, background: s.accent, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 10, right: 10, width: 5, height: 5, background: s.color, borderRadius: '50%', animation: 'pulse-dot 2s ease-in-out infinite', boxShadow: `0 0 6px ${s.color}` }} />
              <span className="hud-tag" style={{ display: 'block', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>{s.label}</span>
              <p style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, color: s.color, margin: 0, lineHeight: 1, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.03em', textShadow: `0 0 20px ${s.color}44`, position: 'relative', zIndex: 1 }}>
                {stats[s.key as keyof Stats]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Heatmap with toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ background: 'var(--surface-container-low)' }}
        >
          {/* Heatmap toolbar */}
          <div className="heat-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="hud-tag">ACTIVE_DAYS_STREAM</span>
              {/* Toggle */}
              <div style={{ display: 'flex', background: 'var(--surface-container-high)', padding: '3px' }}>
                {(['github', 'leetcode'] as HeatSrc[]).map(src => (
                  <button
                    key={src}
                    onClick={() => setHeatSrc(src)}
                    style={{
                      background: heatSrc === src ? 'var(--primary-neon)' : 'transparent',
                      color: heatSrc === src ? '#003840' : 'var(--outline)',
                      border: 'none',
                      padding: '4px 14px',
                      fontSize: '0.58rem',
                      fontWeight: 800,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-space-grotesk)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {src === 'github' ? 'GITHUB' : 'LEETCODE'}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <span className="hud-tag" style={{ opacity: 0.3, marginRight: '0.4rem' }}>LESS</span>
              {[0.07, 0.22, 0.5, 1].map((o, i) => <div key={i} style={{ width: 9, height: 9, background: `rgba(129,236,255,${o})` }} />)}
              <span className="hud-tag" style={{ opacity: 0.3, marginLeft: '0.4rem' }}>MORE</span>
            </div>
          </div>

          {/* Grid */}
          <div style={{ padding: '1.25rem 1.75rem 1.75rem' }}>
            <motion.div
              key={heatSrc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 1fr)', gap: 2 }}
            >
              {Array.from({ length: 52 }, (_, week) => (
                <div key={week} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {Array.from({ length: 7 }, (_, day) => {
                    const level = heat[week * 7 + day];
                    const op = level === 0 ? 0.06 : level === 1 ? 0.22 : level === 2 ? 0.5 : 1;
                    return (
                      <div
                        key={day}
                        title={level > 0 ? `${level} contribution${level > 1 ? 's' : ''}` : 'No activity'}
                        style={{
                          aspectRatio: '1',
                          background: `rgba(129,236,255,${op})`,
                          boxShadow: level === 3 ? '0 0 4px rgba(129,236,255,0.35)' : 'none',
                          transition: 'opacity 0.15s',
                          cursor: 'default',
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </section>
  );
}
