'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { DecryptedText } from './reactbits/DecryptedText';

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
  { label: 'GITHUB_REPOS',     key: 'repos',     color: 'var(--primary-neon)',   accent: 'rgba(0,255,65,0.1)' },
  { label: 'GH_FOLLOWERS',     key: 'followers', color: 'var(--primary-neon)',   accent: 'rgba(0,255,65,0.07)' },
  { label: 'LEETCODE_SOLVED',  key: 'leetcode',  color: 'var(--secondary-neon)', accent: 'rgba(255,184,108,0.1)' },
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
           const padded = [...Array(Math.max(0, 364 - last364.length)).fill(0), ...last364.map((c: { level: number }) => Math.min(4, c.level))];
           setGhHeat(padded);
        }
      })
      .catch(() => {});

    // LeetCode Profile Stats & Heatmap (alfa proxy)
    fetch('https://alfa-leetcode-api.onrender.com/trs-saurav')
      .then(r => r.json())
      .then(d => {
         if (d.errors) {
            fetchLeetcodeHeroku();
         } else if (d.totalSolved !== undefined) {
            setStats(s => ({ ...s, leetcode: d.totalSolved, acc: '—%' }));
            fetch('https://alfa-leetcode-api.onrender.com/trs-saurav/calendar')
              .then(cr => cr.json())
              .then(cd => {
                 if (cd.submissionCalendar) {
                    const calData = JSON.parse(cd.submissionCalendar);
                    const arr = new Array(364).fill(0);
                    const now = Math.floor(Date.now() / 1000);
                    const daySecs = 86400;
                    Object.entries(calData).forEach(([timestamp, count]: [string, any]) => {
                       const c = count as number;
                       const daysAgo = Math.floor((now - parseInt(timestamp)) / daySecs);
                       if (daysAgo >= 0 && daysAgo < 364) {
                           arr[363 - daysAgo] = c > 3 ? 3 : c > 0 ? (c > 1 ? 2 : 1) : 0;
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
          setStats(s => ({ ...s, leetcode: '145+', acc: '68%' }));
        });
    }
  }, []);

  const heat = heatSrc === 'github' ? ghHeat : lcHeat;

  return (
    <section
      id="projects"
      style={{ width: '100%', padding: '0 2rem', boxSizing: 'border-box', minHeight: '100vh', background: 'transparent' }}
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
        {/* ══ PROJECTS SECTION ══════════════════════════ */}
        <div style={{ position: 'relative', marginBottom: '8rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            style={{ 
              marginBottom: '6rem', 
              paddingLeft: '1.25rem', 
              borderLeft: '2px solid rgba(255,109,175,0.4)',
              position: 'sticky',
              top: '8vh',
              zIndex: 100,
              backdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(13, 17, 23, 0.85)'
            }}
          >
            <span className="hud-tag" style={{ display: 'block', marginBottom: '0.4rem' }}>DEPLOYMENT_LOG // SECTOR_PROJECTS</span>
            <h2 className="kinetic-text" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--foreground)' }}>
              <DecryptedText text="MISSION_PROFILE" maxIterations={12} speed={30} />
            </h2>
          </motion.div>

          <div className="relative w-full flex flex-col items-center">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6 }}
                style={{ 
                  background: 'rgba(13, 17, 23, 0.65)', 
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  display: 'flex', 
                  flexDirection: 'column', 
                  width: '100%', 
                  maxWidth: '800px',
                  minHeight: '320px',
                  overflow: 'hidden', 
                  position: 'sticky', 
                  top: `calc(35vh + ${i * 40}px)`,
                  marginBottom: i === PROJECTS.length - 1 ? '10vh' : '40vh',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 -20px 60px rgba(0,0,0,0.6)',
                  zIndex: i,
                  borderTop: '1px solid rgba(0, 255, 65, 0.1)'
                }}
              >
                <span style={{ position: 'absolute', top: -10, right: 12, fontSize: '7rem', fontWeight: 900, color: 'rgba(0,255,65,0.04)', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{proj.id}</span>
                <div style={{ background: 'var(--surface-container-high)', padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="hud-tag" style={{ display: 'block', marginBottom: '0.25rem', opacity: 0.4 }}>PROJ_ID // {proj.id}</span>
                  <h3 style={{ color: 'var(--foreground)', fontSize: '1.1rem', fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>{proj.name}</h3>
                  <div style={{ color: 'var(--outline)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', marginTop: '0.15rem' }}>{proj.sub}</div>
                </div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '2px 9px', background: 'rgba(0,255,65,0.07)', border: '1px solid rgba(0,255,65,0.15)', color: 'var(--primary-neon)', fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.14em' }}>{proj.status}</span>
                    <span className="hud-tag" style={{ opacity: 0.35 }}>EST // {proj.date}</span>
                  </div>
                  <p style={{ color: 'var(--on-surface-var)', fontSize: '0.88rem', lineHeight: 1.75, margin: 0, flex: 1 }}>{proj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══ STATS SECTION ═══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '20vh', marginBottom: '2.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid rgba(255,184,108,0.4)' }}
        >
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.4rem' }}>TELEMETRY_LOG // BIOMETRIC</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: 'var(--foreground)' }}>
            <DecryptedText text="BIOMETRIC_DATA" maxIterations={12} speed={30} />
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1px', marginBottom: '1px' }}>
          {LIVE_STATS.map((s, i) => (
            <div
              key={s.label}
              style={{ background: 'var(--surface-container)', padding: '1.75rem', position: 'relative', borderTop: `2px solid ${s.color}`, overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: s.accent, pointerEvents: 'none' }} />
              <span className="hud-tag" style={{ display: 'block', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>{s.label}</span>
              <p style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, color: s.color, margin: 0, lineHeight: 1, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.03em', position: 'relative', zIndex: 1 }}>
                {stats[s.key as keyof Stats]}
              </p>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ background: 'rgba(255, 255, 255, 0.02)', marginTop: '2rem' }}
        >
          <div className="heat-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="hud-tag">ACTIVE_DAYS_STREAM</span>
              <button onClick={() => setHeatSrc(heatSrc === 'github' ? 'leetcode' : 'github')} style={{ background: 'var(--primary-neon)', border: 'none', padding: '4px 12px', fontSize: '10px', fontWeight: 800, cursor: 'pointer' }}>TOGGLE_SOURCE</button>
            </div>
          </div>
          <div className="hide-scroll" style={{ padding: '1.75rem', overflowX: 'auto' }}>
            <motion.div
              key={heatSrc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 1fr)', gap: 2, minWidth: '700px' }}
            >
              {Array.from({ length: 52 }, (_, week) => (
                <div key={week} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {Array.from({ length: 7 }, (_, day) => {
                    const level = heat[week * 7 + day] || 0;
                    const op = level === 0 ? 0.06 : level === 1 ? 0.22 : level === 2 ? 0.5 : 1;
                    return <div key={day} style={{ aspectRatio: '1', background: `rgba(0,255,65,${op})` }} />;
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
