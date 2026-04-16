'use client';

import { motion } from 'framer-motion';
import { Magnet } from './reactbits/Magnet';

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d },
  }),
};

const NAV_LINKS = ['HOME', 'ABOUT', 'EXPERIENCE', 'WORK', 'CONTACT'];
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/trs-saurav', path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/trs-saurav', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  { label: 'Twitter', href: 'https://twitter.com', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { label: 'Instagram', href: 'https://instagram.com', path: 'M160,128a32,32,0,1,1-32-32A32.03667,32.03667,0,0,1,160,128Zm68-44v88a56.06353,56.06353,0,0,1-56,56H84a56.06353,56.06353,0,0,1-56-56V84A56.06353,56.06353,0,0,1,84,28h88A56.06353,56.06353,0,0,1,228,84Zm-52,44a48,48,0,1,0-48,48A48.05436,48.05436,0,0,0,176,128Zm16-52a12,12,0,1,0-12,12A12,12,0,0,0,192,76Z' },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.footer 
      className="w-full bg-[#0a0a0a] border-t border-white/[0.04] px-4 sm:px-6 md:px-8 lg:px-12 font-mono"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto pt-12 sm:pt-16 pb-6 sm:pb-8">
        
        {/* Top Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 items-start mb-12 sm:mb-16">
          
          {/* Column 1: Brand & Bio */}
          <motion.div 
            className="space-y-4 sm:space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="pl-3 sm:pl-5 border-l-2 border-[#00ff41]/50">
              <motion.span 
                className="text-white font-black text-lg sm:text-xl tracking-wider block leading-none"
                whileHover={{ color: '#00ff41', x: 4 }}
                transition={{ duration: 0.3 }}
              >
                SAURAV_KUMAR
              </motion.span>
              <span className="text-[#00ff41]/50 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mt-1 sm:mt-2 block">SYNTHETIC_ARCHITECT // DEL_IN</span>
            </div>
            <motion.div 
              className="space-y-1 text-[10px] sm:text-[11px] leading-relaxed text-[#849495]"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>&gt; BUILDING_FULL_STACK_SYSTEMS</motion.p>
              <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>&gt; AI_PIPELINES // DEL_IN</motion.p>
              <motion.p 
                className="mt-4 opacity-60"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.6 } }}
              >
                AVAILABLE_FOR_DIRECT_INTEGRATION_2026
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div 
            className="flex flex-col items-center space-y-3 sm:space-y-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.1}
            viewport={{ once: true }}
          >
            <span className="text-white/20 text-[8px] sm:text-[9px] tracking-[0.4em] uppercase">Navigation</span>
            <motion.div 
              className="flex flex-col items-center space-y-1.5 sm:space-y-2"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {NAV_LINKS.map((link, idx) => (
                <motion.button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-[#849495] text-[9px] sm:text-[10px] font-bold tracking-[0.1em] hover:text-[#00ff41] transition-colors uppercase"
                  whileHover={{ scale: 1.1, x: 4, color: '#00ff41' }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  {link}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Column 3: External Nodes & Reboot */}
          <motion.div 
            className="flex flex-col items-center md:items-end space-y-4 sm:space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0.2}
            viewport={{ once: true }}
          >
            <div className="text-center md:text-right space-y-3 sm:space-y-4">
              <span className="text-white/20 text-[8px] sm:text-[9px] tracking-[0.4em] uppercase block">External_Nodes</span>
              <motion.div 
                className="flex gap-2 sm:gap-3 justify-center md:justify-end"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {SOCIALS.map((s) => (
                  <Magnet key={s.label} magnetStrength={0.2}>
                    <motion.a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-7 sm:w-9 h-7 sm:h-9 flex items-center justify-center border border-white/10 bg-white/[0.02] hover:border-[#00ff41]/40 hover:bg-[#00ff41]/5 transition-all group"
                      whileHover={{ scale: 1.2, borderColor: '#00ff41' }}
                      whileTap={{ scale: 0.9 }}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                    >
                      <svg width="14" height="14" viewBox={s.label === 'Instagram' ? '0 0 256 256' : '0 0 24 24'} className="sm:w-[16px] sm:h-[16px] fill-[#849495] group-hover:fill-[#00ff41] transition-colors">
                        <path d={s.path} />
                      </svg>
                    </motion.a>
                  </Magnet>
                ))}
              </motion.div>
            </div>

            <motion.div 
              className="flex flex-col items-center md:items-end gap-2 sm:gap-3 pt-2 sm:pt-4 md:pt-0"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Magnet magnetStrength={0.15}>
                <motion.a 
                  href="/resume.pdf" 
                  download 
                  className="text-[#ffb86c] text-[9px] sm:text-[10px] font-black tracking-widest border border-[#ffb86c]/30 px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-[#ffb86c]/10 transition-all uppercase"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    boxShadow: '0 0 20px rgba(255, 184, 108, 0.2)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  ⬇ MANIFEST_PDF
                </motion.a>
              </Magnet>
              <Magnet magnetStrength={0.15}>
                <motion.button 
                  onClick={() => scrollTo('home')}
                  className="text-[#00ff41] text-[8px] sm:text-[9px] font-bold tracking-[0.2em] hover:underline underline-offset-4 transition-all"
                  whileHover={{ 
                    scale: 1.1,
                    textShadow: '0 0 10px rgba(0, 255, 65, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  [ ↑ REBOOT_SEQUENCE ]
                </motion.button>
              </Magnet>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="h-[1px] w-full bg-white/[0.04] mb-6 sm:mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Bottom Bar */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-[8px] sm:text-[9px] tracking-widest text-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="uppercase text-center md:text-left"
            whileHover={{ color: '#00ff41' }}
          >
            © 2026 SAURAV_KUMAR // ALL_RIGHTS_RESERVED // SERIAL: DEL-IN-001
          </motion.span>
          
          <div className="flex gap-8 items-center">
            <motion.div 
              className="flex gap-4"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>SESSION_ID: 0x8FF5</motion.span>
              <motion.span 
                className="text-[#00ff41]/40"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                animate={{ color: ['rgba(0, 255, 65, 0.4)', 'rgba(0, 255, 65, 0.8)', 'rgba(0, 255, 65, 0.4)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                BUILD: STABLE
              </motion.span>
              <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>POWER: MAX</motion.span>
            </motion.div>
            <motion.div 
              className="flex gap-1"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="w-1 h-1 bg-[#00ff41]"
                animate={{ 
                  opacity: [1, 0.3, 1],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              />
              <motion.div 
                className="w-1 h-1 bg-[#00ff41]/40"
                animate={{ 
                  opacity: [0.4, 0.1, 0.4],
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              />
              <motion.div 
                className="w-1 h-1 bg-[#00ff41]/10"
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}