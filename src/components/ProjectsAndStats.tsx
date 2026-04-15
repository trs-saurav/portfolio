'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { DecryptedText } from './reactbits/DecryptedText';
import { LetterGlitch } from './reactbits/LetterGlitch';

/* ── DATA ────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: '01',
    name: 'QLINIC',
    sub: 'HEALTHTECH_SAAS',
    status: 'ACTIVE_DEPLOYMENT',
    date: '12/2025 – PRESENT',
    desc: 'Architected a multi-tenant platform using Next.js 15 and Inngest for event-driven workflows[cite: 5, 25]. Features strict subdomain isolation and real-time Firebase communication[cite: 25, 27].',
    tech: ['Next.js 15', 'Inngest', 'NextAuth', 'Firebase'],
    src: 'https://github.com/trs-saurav',
    live: '#'
  },
  {
    id: '02',
    name: 'PLANT_DISEASE_ML',
    sub: 'NEURAL_RESEARCH',
    status: 'EXPERIMENTAL_VALIDATION',
    date: '01/2026 – 04/2026',
    desc: 'Deep Learning pipeline achieving 87.00% accuracy using domain-adapted MobileNetV2 architectures for real-time leaf disease classification.',
    tech: ['PyTorch', 'MobileNetV2', 'OpenCV', 'Python'],
    src: 'https://github.com/trs-saurav',
    live: '#'
  },
  {
    id: '03',
    name: 'POWER_ELECTRONICS',
    sub: 'B2C_COMMERCE_ENGINE',
    status: 'SYSTEM_STABLE',
    date: '08/2025 – 10/2025',
    desc: 'High-performance commerce engine leveraging SSR for SEO[cite: 29, 31]. Integrated Clerk RBAC to secure administrative inventory dashboards[cite: 33].',
    tech: ['Next.js', 'Clerk', 'MongoDB', 'Tailwind'],
    src: 'https://github.com/trs-saurav',
    live: '#'
  },
];

const LIVE_STATS = [
  { label: 'GITHUB_REPOS',    key: 'repos',     color: '#00ff41' },
  { label: 'GH_FOLLOWERS',    key: 'followers', color: '#00ff41' },
  { label: 'LEETCODE_SOLVED', key: 'leetcode',  color: '#ffb86c' },
  { label: 'ACCEPTANCE_RATE', key: 'acc',       color: '#ffffff' },
];

export default function ProjectsAndStats() {
  const [stats, setStats] = useState({ repos: '22+', followers: '12+', leetcode: '80+', acc: '68.5%' });
  const [heatSrc, setHeatSrc] = useState('github');
  const [ghHeat, setGhHeat] = useState(new Array(364).fill(0));

  useEffect(() => {
    // 1. Fetch GitHub Profile
    fetch('https://api.github.com/users/trs-saurav')
      .then(r => r.json())
      .then(d => setStats(s => ({ ...s, repos: d.public_repos || '22+', followers: d.followers || '12+' })))
      .catch(() => {});

    // 2. Fetch GitHub Contributions (Heatmap)
    fetch('https://github-contributions-api.jogruber.de/v4/trs-saurav')
      .then(r => r.json())
      .then(d => {
        if (d.contributions) {
           const levels = d.contributions.slice(-364).map((c: any) => c.level);
           setGhHeat(levels);
        }
      });

    // 3. Fetch LeetCode Data (Correct API Endpoint)
    fetch('https://leetcode-stats-api.herokuapp.com/trs-saurav')
      .then(r => r.json())
      .then(d => {
        if (d.status === "success") {
          setStats(s => ({ 
            ...s, 
            leetcode: d.totalSolved || '80+', 
            acc: `${d.acceptanceRate?.toFixed(1)}%` || '68%' 
          }));
        }
      })
      .catch(() => {});
  }, []);

  const heat = heatSrc === 'github' ? ghHeat : new Array(364).fill(0);

  return (
    <section id="projects" className="relative w-full px-6 md:px-12 bg-transparent pb-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-0 relative border-t border-white/5 pt-24">
        
        {/* ── SIDEBAR ── */}
        <div className="relative border-r border-white/10 hidden lg:block">
          <div className="sticky top-[15vh] flex flex-col items-center py-12 rotate-180 [writing-mode:vertical-lr]">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter whitespace-nowrap leading-none">
                <LetterGlitch text="PROJECT_LOG" interval={5000} />
              </h2>
              <span className="font-mono text-[9px] tracking-[0.5em] text-[#ff6daf] uppercase whitespace-nowrap opacity-60 mt-4 border-l border-[#ff6daf]/30 pl-2 leading-none">
                DEPLOYMENT_LOG // MISSION_PROFILES
              </span>
          </div>
        </div>

        {/* ── PROJECT STACK ── */}
        <div className="flex flex-col items-center gap-[45vh] lg:pl-20 pb-[20vh]">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              className="sticky w-full max-w-2xl bg-[#0d1117]/95 backdrop-blur-2xl border border-white/15 p-8 shadow-2xl group hover:border-[#00ff41]/50 transition-all duration-300"
              style={{ top: `calc(15vh + ${i * 40}px)`, zIndex: i }}
            >
              <span className="absolute -top-4 -right-4 text-9xl font-black text-white/[0.03] font-mono pointer-events-none select-none">
                {proj.id}
              </span>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#849495] uppercase">UID // {proj.id} [cite: 2, 25]</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight uppercase leading-none mt-1">{proj.name} [cite: 23, 29]</h3>
                    <p className="font-mono text-[10px] text-[#00ff41]/70 tracking-widest uppercase mt-1">{proj.sub} [cite: 23, 29]</p>
                  </div>
                  <div className="text-right">
                     <span className="inline-block px-2 py-1 bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] font-mono text-[8px] uppercase font-bold mb-2">
                       {proj.status} [cite: 28]
                     </span>
                     <p className="font-mono text-[8px] text-[#849495] uppercase">{proj.date} [cite: 24, 30]</p>
                  </div>
                </div>

                <p className="font-mono text-[#b9caca] text-[13px] leading-relaxed mb-8 opacity-90">
                  <span className="text-[#00ff41] mr-2 font-bold">//_DESC:</span>
                  {proj.desc} [cite: 25, 26, 31, 32]
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 mb-8">
                  {proj.tech.map(t => (
                    <span key={t} className="font-mono text-[9px] text-[#849495] uppercase tracking-widest hover:text-[#00ff41] transition-colors cursor-default">#{t} [cite: 17, 19, 29]</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <a href={proj.src} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.2em] text-[#849495] hover:text-white transition-colors underline decoration-[#00ff41]/30 underline-offset-4 uppercase">
                    [ ACCESS_SOURCE ] [cite: 2]
                  </a>
                  <a href={proj.live} className="relative px-6 py-2 bg-[#00ff41] text-[#050505] font-mono text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,65,0.5)] active:scale-95">
                    INIT_DEPLOYMENT ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── TELEMETRY & HEATMAP SECTION ── */}
      <div className="max-w-6xl mx-auto pt-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-12 pl-6 border-l-4 border-[#ffb86c]"
        >
          <span className="font-mono text-[10px] tracking-[0.5em] text-[#ffb86c] uppercase mb-2 block">
            BIOMETRIC_DATA // TELEMETRY
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
            <DecryptedText text="SYSTEM_TELEMETRY" maxIterations={12} speed={30} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {LIVE_STATS.map((s) => (
            <div key={s.label} className="bg-[#0d1117] border-t-2 p-6 relative overflow-hidden group border-white/10" style={{ borderTopColor: s.color }}>
              <span className="font-mono text-[9px] text-[#849495] tracking-widest uppercase block mb-4">{s.label} [cite: 2, 45]</span>
              <p className="text-4xl md:text-5xl font-black tracking-tighter" style={{ color: s.color }}>
                {stats[s.key as keyof typeof stats]}
              </p>
            </div>
          ))}
        </div>

        {/* Activity Heatmap - Visibility Fixed */}
        <div className="bg-[#0d1117] border border-white/10 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/[0.02]">
            <span className="font-mono text-[9px] tracking-widest text-[#849495]">ACTIVE_STREAK_ANALYSIS // SOURCE: {heatSrc.toUpperCase()} [cite: 44]</span>
            <button 
              onClick={() => setHeatSrc(heatSrc === 'github' ? 'leetcode' : 'github')}
              className="bg-[#00ff41] text-[#0a0a0a] font-mono text-[9px] font-black px-4 py-1 uppercase hover:bg-white transition-colors"
            >
              Toggle_Heatmap
            </button>
          </div>
          <div className="p-6 overflow-x-auto scrollbar-hide">
             {/* Heatmap Grid Fix: Ensuring columns are visible */}
            <div className="flex gap-1.5 min-w-[850px] justify-between">
              {Array.from({ length: 52 }).map((_, week) => (
                <div key={week} className="flex flex-col gap-1.5">
                  {Array.from({ length: 7 }).map((_, day) => {
                    const val = (heatSrc === 'github' ? ghHeat : [])[week * 7 + day] || 0;
                    const opacity = val === 0 ? 0.08 : val === 1 ? 0.35 : val === 2 ? 0.65 : 1;
                    return (
                      <div 
                        key={day} 
                        className="w-3 h-3 rounded-[1px] transition-all duration-500" 
                        style={{ background: `rgba(0, 255, 65, ${opacity})` }} 
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}