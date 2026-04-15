'use client';

import { motion, easeOut } from 'framer-motion';
import { DecryptedText } from './reactbits/DecryptedText';
import { InteractiveLanyard } from './reactbits/Lanyard';
import { BlurText } from './reactbits/BlurText';

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut, delay: d } }),
};

export default function About() {
  return (
    <section id="about" className="relative w-full overflow-hidden bg-transparent py-8 px-6 md:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-6xl mx-auto"
      >
        {/* ── Compact Header ── */}
        <motion.div variants={fadeUp} custom={0} className="mb-6 pl-4 border-l-2 border-[#00ff41]/30">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#00ff41] uppercase mb-1 block">
            IDENTITY_VERIFICATION // ARCHITECT_LOG
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white uppercase leading-none">
            <DecryptedText text="ABOUT_ME" maxIterations={10} speed={30} />
          </h2>
        </motion.div>

        {/* ── High-Density Grid ── */}
        <div className="grid grid-cols-12 gap-3">

          {/* 1. The Core Narrative */}
          {/* 1. Expanded Multi-Threaded Narrative (Fills Container) */}
          <motion.div
            variants={fadeUp} custom={0.05}
            className="col-span-12 lg:col-span-8 bg-white/5 backdrop-blur-md border border-white/10 p-6 relative overflow-hidden h-full flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[8px] tracking-[0.2em] text-[#849495] mb-4 block uppercase">Mission_Brief</span>
              <div className="text-sm md:text-base font-light leading-relaxed text-[#b9caca] space-y-4">
                <p>
                  I am a <span className="text-[#00ff41] font-medium">Full-Stack Architect</span> and Founder of Qlinic [cite: 23], where I architected a multi-tenant healthtech platform using <span className="text-white font-semibold">Next.js 15 and event-driven Inngest workflows</span>[cite: 25, 26]. Currently a Pre-final year student at <span className="text-white font-semibold">SRMIST (2027 Batch)</span> [cite: 4, 14], I maintain a 9.31 CGPA while engineering production-ready solutions that utilize <span className="text-white font-semibold">RBAC and real-time Firebase integration</span>[cite: 14, 27].
                </p>
                <p>
                  Beyond full-stack engineering, I bridge the gap into <span className="text-[#ffb86c]">Deep Learning research</span>, utilizing <span className="text-white font-semibold">PyTorch and Scikit-learn</span> to design domain-adapted CNN architectures. My background as a <span className="text-white font-semibold">Freelance Creative Designer</span> for various clients [cite: 37] allows me to fuse technical precision with visual storytelling. 
                </p>
                <p>
                  Whether I am establishing <span className="text-[#00ff41]">brand identities</span> via high-fidelity digital assets  or optimizing <span className="text-white font-semibold">UI/UX mockups in Photoshop</span>[cite: 10], I ensure every system is as aesthetically sound as its underlying architecture. I am driven by the intersection of <span className="text-[#ffb86c]">Machine Intelligence</span> and immersive human-centric design.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <div className="bg-[#00ff41]/5 border border-[#00ff41]/20 px-2 py-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-[#00ff41] rounded-full animate-pulse" />
                <span className="font-mono text-[9px] text-[#00ff41] tracking-widest uppercase font-bold">FOUNDER // QLINIC</span>
              </div>
              <div className="bg-[#ffb86c]/5 border border-[#ffb86c]/20 px-2 py-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-[#ffb86c] rounded-full" />
                <span className="font-mono text-[9px] text-[#ffb86c] tracking-widest uppercase font-bold">CREATIVE_LEAD</span>
              </div>
              <div className="bg-white/5 border border-white/10 px-2 py-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-white/40 rounded-full" />
                <span className="font-mono text-[9px] text-[#849495] tracking-widest uppercase">SRMIST // 9.31 CGPA</span>
              </div>
            </div>
          </motion.div>

          {/* 2. Authentication Badge */}
          <motion.div
            variants={fadeUp} custom={0.1}
            className="col-span-12 lg:col-span-4 h-[300px] lg:h-auto bg-white/5 border border-white/10 relative flex flex-col items-center justify-center overflow-hidden group"
          >
            <div className="absolute top-3 left-3 z-10">
              <span className="font-mono text-[7px] tracking-[0.3em] bg-[#0a0a0a] border border-[#00ff41]/30 px-2 py-0.5 text-[#00ff41] uppercase">
                Access_Token_Active
              </span>
            </div>
            <div className="w-full h-full scale-75 lg:scale-90">
               <InteractiveLanyard />
            </div>
          </motion.div>

          {/* 3. Deep Learning Research */}
          <motion.div
            variants={fadeUp} custom={0.15}
            className="col-span-12 lg:col-span-6 bg-[#0d1117]/40 backdrop-blur-xl border border-[#ffb86c]/20 p-6 relative group overflow-hidden"
          >
            <span className="font-mono text-[8px] tracking-[0.3em] text-[#ffb86c] mb-4 block uppercase">Research_Intelligence</span>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white tracking-widest uppercase">Domain-Adapted MobileNetV2</h3>
              <p className="text-xs font-light text-[#b9caca] leading-relaxed">
                Successfully architected a PyTorch-based CNN for plant disease detection. 
                Achieved <span className="text-white font-bold">87.00% accuracy</span> on field-captured datasets through 
                domain-adapted MobileNetV2 architectures.
              </p>
              <div className="flex gap-2">
                <span className="font-mono text-[8px] text-[#ffb86c] bg-[#ffb86c]/5 px-2 py-0.5 border border-[#ffb86c]/20 uppercase">ACCURACY: 87.00%</span>
                <span className="font-mono text-[8px] text-[#ffb86c] bg-[#ffb86c]/5 px-2 py-0.5 border border-[#ffb86c]/20 uppercase">PYTORCH_V2</span>
              </div>
            </div>
          </motion.div>

          {/* 4. Academic Metrics (Academic Cap Version) */}
          <motion.div
            variants={fadeUp} custom={0.2}
            className="col-span-12 lg:col-span-6 bg-white/5 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Academic Cap Icon Watermark */}
            <svg className="absolute -right-4 -bottom-4 opacity-5 w-24 h-24 text-white" viewBox="0 0 24 24" fill="currentColor">
               <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>

            <span className="font-mono text-[8px] text-[#849495] tracking-[0.3em] mb-4 block uppercase">Academic_Credentials</span>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-[#00ff41] tracking-widest mb-1 opacity-50 uppercase">Institution</span>
                  <h3 className="text-xl font-bold text-white tracking-tight uppercase">SRM Institute of Science and Technology</h3>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[8px] text-[#849495] tracking-[0.3em] mb-1 block uppercase">CGPA</span>
                  <div className="text-2xl font-black text-white leading-none">9.31 <span className="text-[10px] font-normal opacity-40">/ 10</span></div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-[#00ff41] tracking-widest mb-1 opacity-50 uppercase">Qualification</span>
                  <span className="text-[10px] font-bold text-[#e9ffe9] uppercase tracking-wider">B.Tech Computer Science // 2027</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-[#00ff41]" />
                  <div className="w-1 h-1 bg-[#00ff41]/40" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5. Compact Footer CTA */}
          <motion.div
            variants={fadeUp} custom={0.25}
            className="col-span-12 grid grid-cols-1 md:grid-cols-2 mt-1 border border-white/10 overflow-hidden"
          >
            <div className="bg-[#00ff41] p-6">
              <h3 className="text-2xl font-black text-[#050505] leading-none uppercase">
                <BlurText text="SYSTEM_INITIALIZED" delay={80} />
              </h3>
              <p className="font-mono text-[8px] tracking-[0.2em] text-[#050505]/60 mt-1 uppercase leading-none">Ready for Software Engineering Internship_</p>
            </div>
            <div className="bg-[#111111] p-6 flex items-center justify-end">
              <a
                href="/resume.pdf"
                className="group flex items-center gap-4 text-white font-bold text-xs tracking-[0.2em] uppercase border-b border-[#00ff41] pb-1 hover:text-[#00ff41] transition-all"
              >
                REQUEST_CV_v2.0
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}