'use client';

import { motion } from 'framer-motion';
import { DecryptedText } from './reactbits/DecryptedText';
import CountUp from './reactbits/CountUp';

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
    <section id="experience" className="w-full px-8 md:px-12 py-32 font-mono">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 pl-8 border-l-4 border-[#ffb86c]/40"
        >
          <span className="text-[12px] tracking-[0.5em] text-[#ffb86c] uppercase mb-3 block">MISSION_CHRONOLOGY // EXP_LOG</span>
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter">
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Entry list */}
        <div className="flex flex-col gap-1.5 bg-white/[0.05]">
          {EXP.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] bg-[#0a0a0a] border-l-4 border-white/10 hover:border-[#00ff41] transition-colors duration-300 relative overflow-hidden group"
            >
              {/* Ghost ID Decoration (Untouched as requested) */}
              <span className="absolute -left-4 top-0 text-[12rem] font-black text-white/[0.03] select-none pointer-events-none">
                {exp.id}
              </span>

              {/* Left gutter — date + ID */}
              <div className="bg-white/[0.02] p-10 flex flex-col justify-between border-r border-white/5 relative z-10">
                <span className="text-4xl font-black text-[#00ff41]/20 group-hover:text-[#00ff41] transition-colors leading-none">{exp.id}</span>
                <div className="mt-12">
                  <span className="text-[11px] text-white font-bold whitespace-nowrap tracking-wider">
                    <span className="text-[#00ff41] mr-2 opacity-50">//</span>{exp.date}
                  </span>
                </div>
              </div>

              {/* Right content */}
              <div className="p-10 md:p-16 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
                  <div>
                    <span className="text-[10px] text-[#00ff41] tracking-[0.4em] uppercase block mb-3 opacity-70">Position_UID</span>
                    <h3 className="text-2xl md:text-[26px] font-black text-white tracking-tight uppercase leading-none">
                      <DecryptedText text={exp.title} speed={40} maxIterations={10} />
                    </h3>
                  </div>
                  <span className="px-4 py-1.5 bg-[#00ff41]/5 border border-[#00ff41]/20 text-[#00ff41] text-[10px] font-black tracking-widest uppercase">
                    {exp.type}
                  </span>
                </div>

                <div className="mb-10">
                  <span className="text-[10px] text-[#849495] tracking-[0.3em] uppercase block mb-2">Organisation</span>
                  <span className="text-[#00ff41] text-lg font-black tracking-widest uppercase">{exp.company}</span>
                </div>

                {/* Description (Increased to 14px) */}
                <div className="space-y-3 mb-12">
                   {exp.desc.map((line, idx) => (
                     <p key={idx} className="text-[#b9caca] text-[15px] leading-relaxed">
                        <span className="text-[#00ff41] mr-4 opacity-60">//</span> {line}
                     </p>
                   ))}
                </div>

                {/* Tech Stack Tags (Increased to 12px + Spacing) */}
                <div className="flex flex-wrap gap-x-10 gap-y-4 pt-8 border-t border-white/10">
                    {exp.tech.map(t => (
                        <span key={t} className="text-[13px] text-[#849495] hover:text-[#00ff41] transition-colors cursor-default tracking-[0.2em] font-bold uppercase">
                            #{t}
                        </span>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-1 bg-white/[0.04] p-10 flex justify-between items-center border-t border-white/5"
        >
          <div className="text-[12px] text-white/30 tracking-[0.3em] uppercase">
            EXP_LOG_COMPILED // ENTRIES: <span className="text-[#00ff41] font-bold"><CountUp from={0} to={EXP.length} duration={2} /></span>
          </div>
          <a
            href="#projects"
            className="text-white text-[12px] font-black tracking-[0.3em] uppercase hover:text-[#00ff41] transition-all flex items-center gap-4 group"
          >
            INITIALIZE_PROJECT_VIEW <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}