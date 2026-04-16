'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { DecryptedText } from './reactbits/DecryptedText';
import { LetterGlitch } from './reactbits/LetterGlitch';
import { LeetCodeHeatmap } from './LeetCodeHeatmap';

/* ── DATA ────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: '01',
    name: 'QLINIC',
    sub: 'HEALTHTECH_SAAS',
    status: 'ACTIVE_DEPLOYMENT',
    date: '12/2025 – PRESENT',
    desc: 'Architected a multi-tenant platform using Next.js 15 and Inngest for event-driven workflows. Features strict subdomain isolation and real-time Firebase communication.',
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
    desc: 'High-performance commerce engine leveraging SSR for SEO. Integrated Clerk RBAC to secure administrative inventory dashboards.',
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const response = await fetch('/api/leetcode?username=trs_saurav');
        if (response.ok) {
          const data = await response.json();
          setStats(prev => ({
            ...prev,
            leetcode: `${data.stats.totalSolved}+`,
            acc: data.stats.acceptanceRate
          }));
        }
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  return (
    <section id="projects" className="relative w-full px-4 sm:px-6 md:px-12 bg-transparent pb-20 sm:pb-32">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-0 relative border-t border-white/5 pt-16 sm:pt-24" style={{ maxWidth: '1400px', margin: '0 auto' }}>

        <div className="relative lg:hidden mb-12 pl-6 border-l-4 border-[#ff6daf] col-span-full">
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
            <LetterGlitch text="PROJECT_LOG" interval={5000} />
          </h2>
          <span className="font-mono text-[8px] tracking-[0.3em] text-[#ff6daf] uppercase opacity-60 mt-2 block">
            DEPLOYMENT_LOG // MISSION_PROFILES
          </span>
        </div>
        
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

        <div className="flex flex-col items-center gap-[30vh] sm:gap-[35vh] lg:gap-[45vh] lg:pl-20 pb-12 sm:pb-20 lg:pb-[20vh] px-0">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              className="sticky w-full bg-[#0d1117]/95 backdrop-blur-2xl border border-white/15 p-5 sm:p-8 shadow-2xl group hover:border-[#00ff41]/50 transition-all duration-300"
              style={{ 
                top: `calc(15vh + ${i * 40}px)`,
                maxWidth: 'calc(100% - 2rem)',
                margin: '0 auto',
                zIndex: i + 1
              }}
            >
              <span className="absolute -top-4 -right-4 text-9xl font-black text-white/[0.03] font-mono pointer-events-none select-none">
                {proj.id}
              </span>

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 mb-6 border-b border-white/10 pb-4">
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-[#849495] uppercase block">UID // {proj.id}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase leading-tight mt-1 break-words">{proj.name}</h3>
                    <p className="font-mono text-[9px] sm:text-[10px] text-[#00ff41]/70 tracking-widest uppercase mt-1 break-words">{proj.sub}</p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                     <span className="inline-block px-2 py-1 bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] font-mono text-[7px] sm:text-[8px] uppercase font-bold mb-2 break-words max-w-xs sm:max-w-none">
                       {proj.status}
                     </span>
                     <p className="font-mono text-[7px] sm:text-[8px] text-[#849495] uppercase whitespace-nowrap">{proj.date}</p>
                  </div>
                </div>

                <p className="font-mono text-[#b9caca] text-[12px] sm:text-[13px] leading-relaxed mb-8 opacity-90 break-words">
                  <span className="text-[#00ff41] mr-2 font-bold">//_DESC:</span>
                  {proj.desc}
                </p>

                <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 border-t border-white/10 pt-6 mb-8">
                  {proj.tech.map(t => (
                    <span key={t} className="font-mono text-[8px] sm:text-[9px] text-[#849495] uppercase tracking-widest hover:text-[#00ff41] transition-colors cursor-default whitespace-nowrap">#{t}</span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <a href={proj.src} target="_blank" rel="noopener noreferrer" className="font-mono text-[8px] sm:text-[10px] tracking-[0.2em] text-[#849495] hover:text-white transition-colors underline decoration-[#00ff41]/30 underline-offset-4 uppercase whitespace-nowrap">
                    [ ACCESS_SOURCE ]
                  </a>
                  <a href={proj.live} className="relative px-4 sm:px-6 py-2 bg-[#00ff41] text-[#050505] font-mono text-[8px] sm:text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,65,0.5)] active:scale-95 whitespace-nowrap">
                    INIT_DEPLOYMENT ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-[80vw] mx-auto pt-4 sm:pt-6 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-8 sm:mb-12 pl-4 sm:pl-6 border-l-4 border-[#ffb86c]"
        >
          <span className="font-mono text-[8px] sm:text-[10px] tracking-[0.5em] text-[#ffb86c] uppercase mb-2 block">
            BIOMETRIC_DATA // TELEMETRY
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight break-words">
            <DecryptedText text="SYSTEM_TELEMETRY" maxIterations={12} speed={30} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {LIVE_STATS.map((s) => (
            <div key={s.label} className="bg-[#0d1117] border-t-2 p-4 sm:p-6 relative overflow-hidden group border-white/10" style={{ borderTopColor: s.color }}>
              <span className="font-mono text-[7px] sm:text-[9px] text-[#849495] tracking-widest uppercase block mb-3 sm:mb-4 break-words">{s.label}</span>
              <p className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter break-words" style={{ color: s.color }}>
                {stats[s.key as keyof typeof stats]}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#0d1117] border border-white/10 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
            <div className="flex-1">
              <span className="font-mono text-[8px] sm:text-[10px] tracking-[0.3em] text-[#ffb86c] uppercase block mb-1">CONTRIBUTION_TIMELINE</span>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">ACTIVE_STREAK_ANALYSIS</h3>
              <p className="font-mono text-[7px] sm:text-[8px] text-[#849495] mt-1">Past 365 days // SOURCE: {heatSrc.toUpperCase()}</p>
            </div>
            <button 
              onClick={() => setHeatSrc(heatSrc === 'github' ? 'leetcode' : 'github')}
              className="bg-[#00ff41] text-[#0a0a0a] font-mono text-[7px] sm:text-[9px] font-black px-3 sm:px-4 py-2 uppercase hover:bg-white transition-colors whitespace-nowrap"
            >
              Toggle_Source
            </button>
          </div>

          <div className="flex justify-between items-center px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-3">

            <div className="flex gap-1 sm:gap-2 items-center flex-1 mx-2 sm:mx-4">
              {[0, 1, 2, 3, 4].map((level) => {
                const opacities = [0.08, 0.3, 0.55, 0.8, 1];
                return (
                  <div
                    key={level}
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-[1px]"
                    style={{ background: `rgba(0, 255, 65, ${opacities[level]})` }}
                  />
                );
              })}
            </div>
            <span className="font-mono text-[7px] sm:text-[8px] text-[#849495] uppercase">MORE</span>
          </div>

          <div className="p-2 sm:p-4 w-full flex flex-col justify-center items-center min-h-[180px] sm:min-h-[200px]">
            <style>{`
              .leetcode-heatmap {
                display: flex;
                justify-content: center;
              }
              
              .leetcode-heatmap svg {
                width: auto !important;
                height: auto !important;
              }
              
              .leetcode-heatmap svg rect {
                stroke: rgba(0, 255, 65, 0.3) !important;
                stroke-width: 1 !important;
              }
              
              /* Target all rect elements and apply green gradient */
              .leetcode-heatmap svg rect[fill] {
                fill: rgba(0, 255, 65, 0.15) !important;
              }
              
              /* Month labels */
              .leetcode-heatmap svg text {
                fill: #849495 !important;
                font-family: 'Courier New', monospace !important;
                font-size: 11px !important;
              }
              
              /* Day number labels inside cells */
              .leetcode-heatmap svg tspan {
                fill: #849495 !important;
              }
            `}</style>
            <div className="overflow-x-auto scrollbar-hide w-full flex justify-center">
              {heatSrc === 'github' ? (
                <GitHubCalendar username="trs-saurav" />
              ) : (
                <LeetCodeHeatmap username="trs_saurav" />
              )}
            </div>
          </div>

          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-white/[0.02]">
            <p className="font-mono text-[7px] sm:text-[8px] text-[#849495] uppercase">
              {heatSrc === 'github' ? 'GITHUB contributions tracked across 52 weeks' : 'LEETCODE activities tracked across 52 weeks'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}