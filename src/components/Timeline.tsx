'use client';

import { motion } from 'framer-motion';
import { DecryptedText } from './reactbits/DecryptedText';
import CountUp from './reactbits/CountUp';
import { Magnet } from './reactbits/Magnet';
import { NoisyCard } from './reactbits/NoisyCard';

const EXP = [
  {
    id: '01',
    title: 'WEB_DEV // CREATIVE_DESIGN',
    company: 'HACKHOUND',
    type: 'TECH_CLUB',
    date: '08/2024 — PRESENT',
    desc: [
      'Architecting high-fidelity UI clusters for event portals.',
      'Engineering design systems for technical club event deployments.',
      'Translating raw brand identity into production-ready assets.'
    ],
    tech: ['Next.js', 'Figma', 'React', 'Tailwind']
  },
  {
    id: '02',
    title: 'FREELANCE_DESIGNER',
    company: 'SELF_EMPLOYED',
    type: 'FREELANCE',
    date: '03/2020 — 12/2023',
    desc: [
      'Visual asset deployment for energy sector high-stakes clients.',
      'Technical branding and industrial brochure systems architecture.',
      'Identity engineering and workflow automation via process design.'
    ],
    tech: ['Photoshop', 'Illustrator', 'Tally Prime', 'Workflow Design']
  }
];

export default function Timeline() {
  return (
    <section id="experience" className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-16 font-mono">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-12 pl-5 md:pl-8 border-l-4 border-[#ffb86c]/40"
        >
          <span className="text-[10px] md:text-[12px] tracking-[0.4em] md:tracking-[0.5em] text-[#ffb86c] uppercase mb-3 block">
            MISSION_CHRONOLOGY // EXP_LOG
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter">
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Entry list */}
        <div className="flex flex-col gap-1.5 bg-white/[0.05]">
          {EXP.map((exp, i) => (
            <Magnet key={exp.id} magnetStrength={0.15}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0a0a0a] border-l-4 border-white/10 hover:border-[#00ff41] transition-all duration-300 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(0,255,65,0.1)]"
              >
                <NoisyCard>
                  <div className="relative z-10">
                    {/* Ghost ID Decoration */}
                    <span className="absolute -left-4 top-0 text-[5rem] md:text-[8rem] font-black text-white/[0.03] select-none pointer-events-none">
                      {exp.id}
                    </span>

                    {/* Mobile layout: stacked */}
                    <div className="md:hidden p-3 relative z-10">
                      {/* Top row: ID + date + type */}
                      <motion.div className="flex items-start justify-between mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <motion.span className="text-2xl font-black text-[#00ff41]/20 group-hover:text-[#00ff41] transition-colors leading-none" whileHover={{ scale: 1.1 }}>{exp.id}</motion.span>
                        <motion.span className="px-2 py-1 bg-[#00ff41]/5 border border-[#00ff41]/20 text-[#00ff41] text-[9px] font-black tracking-widest uppercase hover:bg-[#00ff41]/10 transition-colors" whileHover={{ scale: 1.05 }}>
                          {exp.type}
                        </motion.span>
                      </motion.div>
                      <motion.div className="mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                        <span className="text-[8px] text-[#00ff41] tracking-[0.4em] uppercase block mb-0.5 opacity-70">Position_UID</span>
                        <h3 className="text-base font-black text-white tracking-tight uppercase leading-tight">
                          <DecryptedText text={exp.title} speed={40} maxIterations={10} />
                        </h3>
                      </motion.div>
                      <motion.div className="mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <span className="text-[8px] text-[#849495] tracking-[0.3em] uppercase block mb-0.5">Organisation</span>
                        <span className="text-[#00ff41] text-sm font-black tracking-widest uppercase">{exp.company}</span>
                        <p className="text-[8px] text-white/60 tracking-wider mt-0.5">// {exp.date}</p>
                      </motion.div>
                      <motion.div className="space-y-1 mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.25, staggerChildren: 0.05 }}>
                        {exp.desc.map((line, idx) => (
                          <motion.p key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="text-[#b9caca] text-xs leading-relaxed">
                            <span className="text-[#00ff41] mr-2 opacity-60">//</span> {line}
                          </motion.p>
                        ))}
                      </motion.div>
                      <motion.div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-2 border-t border-white/10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.35, staggerChildren: 0.08 }}>
                        {exp.tech.map(t => (
                          <motion.span key={t} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} whileHover={{ scale: 1.1, color: "#00ff41" }} className="text-[10px] text-[#849495] hover:text-[#00ff41] transition-colors cursor-default tracking-[0.15em] font-bold uppercase">
                            #{t}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Desktop layout: original two-column grid */}
                    <div className="hidden md:grid md:grid-cols-[120px_1fr] relative z-10">
                      {/* Left gutter */}
                      <motion.div className="bg-white/[0.02] p-3 flex flex-col justify-between border-r border-white/5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        <motion.span className="text-2xl font-black text-[#00ff41]/20 group-hover:text-[#00ff41] transition-colors leading-none" whileHover={{ scale: 1.15 }}>{exp.id}</motion.span>
                        <div className="mt-6">
                          <span className="text-[9px] text-white font-bold whitespace-nowrap tracking-wider">
                            <span className="text-[#00ff41] mr-2 opacity-50">//</span>{exp.date}
                          </span>
                        </div>
                      </motion.div>
                      {/* Right content */}
                      <motion.div className="p-3 lg:p-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                        <motion.div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-3" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                          <div>
                            <span className="text-[8px] text-[#00ff41] tracking-[0.4em] uppercase block mb-1 opacity-70">Position_UID</span>
                            <h3 className="text-base font-black text-white tracking-tight uppercase leading-none">
                              <DecryptedText text={exp.title} speed={40} maxIterations={10} />
                            </h3>
                          </div>
                          <motion.span className="px-4 py-1.5 bg-[#00ff41]/5 border border-[#00ff41]/20 text-[#00ff41] text-[10px] font-black tracking-widest uppercase hover:bg-[#00ff41]/10 transition-colors" whileHover={{ scale: 1.05 }}>
                            {exp.type}
                          </motion.span>
                        </motion.div>
                        <motion.div className="mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                          <span className="text-[8px] text-[#849495] tracking-[0.3em] uppercase block mb-0.5">Organisation</span>
                          <span className="text-[#00ff41] text-sm font-black tracking-widest uppercase">{exp.company}</span>
                        </motion.div>
                        <motion.div className="space-y-1.5 mb-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3, staggerChildren: 0.08 }}>
                          {exp.desc.map((line, idx) => (
                            <motion.p key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="text-[#b9caca] text-[13px] leading-relaxed">
                              <span className="text-[#00ff41] mr-4 opacity-60">//</span> {line}
                            </motion.p>
                          ))}
                        </motion.div>
                        <motion.div className="flex flex-wrap gap-x-4 gap-y-2 pt-4 border-t border-white/10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, staggerChildren: 0.1 }}>
                          {exp.tech.map(t => (
                            <motion.span key={t} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} whileHover={{ scale: 1.15, color: "#00ff41" }} className="text-[11px] text-[#849495] hover:text-[#00ff41] transition-colors cursor-default tracking-[0.2em] font-bold uppercase">
                              #{t}
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </NoisyCard>
              </motion.div>
            </Magnet>
          ))}
        </div>

        {/* Footer callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-1 bg-white/[0.04] p-2 md:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-white/5"
        >
          <div className="text-[10px] md:text-[12px] text-white/30 tracking-[0.3em] uppercase">
            EXP_LOG_COMPILED // ENTRIES: <span className="text-[#00ff41] font-bold"><CountUp from={0} to={EXP.length} duration={2} /></span>
          </div>
          <a
            href="#projects"
            className="text-white text-[11px] md:text-[12px] font-black tracking-[0.3em] uppercase hover:text-[#00ff41] transition-all flex items-center gap-3 group"
          >
            INITIALIZE_PROJECT_VIEW <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}