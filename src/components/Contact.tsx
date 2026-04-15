'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { DecryptedText } from './reactbits/DecryptedText';
import { LetterGlitch } from './reactbits/LetterGlitch';
import { Magnet } from './reactbits/Magnet';
import { NoisyCard } from './reactbits/NoisyCard';

const NODES = [
  { icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', name: 'GITHUB', sub: 'SRC_REPOSITORIES // SYSTEM_ARCH', href: 'https://github.com/trs-saurav' },
  { icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', name: 'LINKEDIN', sub: 'NEURAL_NET // PROFESSIONAL_GRID', href: 'https://linkedin.com/in/trs-saurav' },
  { icon: 'M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z', name: 'MAIL_RELAY', sub: 'DIRECT_COMM // ARCHITECT_PRIMARY', href: 'mailto:saurav@example.com' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const tick = () => setLocalTime(
      new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }) + ' (IST)'
    );
    tick();
    const iv = setInterval(tick, 10000);
    return () => clearInterval(iv);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <section id="contact" className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto pb-12 md:pb-20">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-12 pl-4 sm:pl-6 border-l-2 border-[#00ff41]/40">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#00ff41] uppercase mb-2 block leading-none">SIGNAL_PROTOCOL // UPLINK</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            <LetterGlitch text="ESTABLISH_CONNECTION" interval={5000} />
          </h2>
        </motion.div>

        {/* Tactical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4 sm:gap-6 items-stretch auto-rows-max lg:auto-rows-[1fr]">
          
          {/* COL 1: EXTERNAL_NODES */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex flex-col gap-3 sm:gap-4 h-full">
            <span className="font-mono text-[8px] sm:text-[9px] text-[#849495] tracking-[0.3em] uppercase mb-1 sm:mb-2">Directory // 01</span>
            {NODES.map((n, idx) => (
              <Magnet key={n.name} magnetStrength={0.2}>
                <motion.a 
                  href={n.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group relative block bg-white/[0.03] border border-white/10 p-3 sm:p-4 transition-all hover:bg-white/[0.08] hover:border-[#00ff41]/30 hover:shadow-[0_0_15px_rgba(0,255,65,0.1)]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Corner Brackets */}
                  <motion.div className="absolute top-0 left-0 w-2 sm:w-3 h-2 sm:h-3 border-t border-l border-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} />
                  <motion.div className="absolute bottom-0 right-0 w-2 sm:w-3 h-2 sm:h-3 border-b border-r border-[#00ff41] opacity-0 group-hover:opacity-100 transition-opacity" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} />
                  
                  <motion.div className="flex items-center justify-between mb-1 sm:mb-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: idx * 0.1 + 0.05 }}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="#00ff41" className="sm:w-[18px] sm:h-[18px]" whileHover={{ scale: 1.2 }}><path d={n.icon} /></motion.svg>
                      <span className="text-xs sm:text-sm font-bold text-white tracking-widest uppercase">{n.name}</span>
                    </div>
                    <motion.svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#849495" strokeWidth="2" className="sm:w-3 sm:h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" animate={{ x: [0, 2, 0], y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}><path d="M7 17L17 7M17 7H7M17 7v10"/></motion.svg>
                  </motion.div>
                  <motion.p className="font-mono text-[7px] sm:text-[8px] text-[#849495] tracking-widest uppercase leading-none" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: idx * 0.1 + 0.1 }}>{n.sub}</motion.p>
                </motion.a>
              </Magnet>
            ))}

            <div className="p-3 sm:p-5  bg-white/[0.05] border border-white/20 shadow-xl backdrop-blur-md flex-1 ">
              <div className="flex items-center gap-2 mb-2 sm:mb-3 border-b border-white/10 pb-1 sm:pb-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00ff41]" />
                <span className="font-mono text-[7px] sm:text-[8px] font-black tracking-widest text-white uppercase">System_Metadata</span>
              </div>
              <div className="space-y-1  sm:space-y-2 font-mono text-[8px] sm:text-[9px] text-[#e5e7eb] leading-tight">
                <p>&gt; Node status... <span className="text-[#00ff41]">[OK]</span></p>
                <p>&gt; Signal: 94.2dBm</p>
                <p>&gt; Protocol: V_WORM_X9</p>
                <p>&gt; Core: v3.5.2-STABLE</p>
              </div>
            </div>
          </motion.div>

          {/* COL 2: TERMINAL COMPOSER */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
            <div className="bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-xl flex flex-col h-full shadow-2xl">
              {/* Terminal Title Bar */}
              <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00ff41" strokeWidth="2.5" className="sm:w-[14px] sm:h-[14px]"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                  <span className="font-mono text-[8px] sm:text-[9px] text-[#00ff41] tracking-widest uppercase font-bold">Message_Composer.exe</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/10" />
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#00ff41]/40 shadow-[0_0_8px_#00ff41]" />
                </div>
              </div>

              {/* Form Area */}
              <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
                {status === 'sent' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-10">
                    <div className="w-12 h-12 border border-[#00ff41] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff41" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 className="font-bold text-white uppercase tracking-widest mb-1 text-sm italic">SIGNAL_TRANSMITTED</h3>
                    <p className="font-mono text-[10px] text-[#849495] uppercase">&gt; ACK RECEIVED // ETA &lt; 24H</p>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} className="space-y-6 flex flex-col flex-1">
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1, staggerChildren: 0.1 }}>
                      <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        <label className="font-mono text-[8px] text-[#00ff41] tracking-widest uppercase">Identity_Token</label>
                        <motion.input required className="w-full bg-white/[0.03] border border-white/10 p-3 text-xs font-mono text-white outline-none focus:border-[#00ff41] focus:bg-white/[0.05] transition-all" placeholder="GUEST_NAME" value={form.name} onChange={e => setForm({...form, name: e.target.value})} whileFocus={{ boxShadow: "0 0 15px rgba(0, 255, 65, 0.2)" }} />
                      </motion.div>
                      <motion.div className="space-y-2" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <label className="font-mono text-[8px] text-[#00ff41] tracking-widest uppercase">Return_Path</label>
                        <motion.input required type="email" className="w-full bg-white/[0.03] border border-white/10 p-3 text-xs font-mono text-white outline-none focus:border-[#00ff41] focus:bg-white/[0.05] transition-all" placeholder="USER@ENDPOINT.NET" value={form.email} onChange={e => setForm({...form, email: e.target.value})} whileFocus={{ boxShadow: "0 0 15px rgba(0, 255, 65, 0.2)" }} />
                      </motion.div>
                    </motion.div>
                    <motion.div className="space-y-2 flex-1 flex flex-col" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                      <label className="font-mono text-[8px] text-[#00ff41] tracking-widest uppercase">Message_Payload</label>
                      <motion.textarea required className="w-full bg-white/[0.03] border border-white/10 p-3 text-xs font-mono text-white outline-none focus:border-[#00ff41] focus:bg-white/[0.05] transition-all flex-1 min-h-[140px] resize-none" placeholder="[ ENTER_ENCRYPTED_DATA ]" value={form.message} onChange={e => setForm({...form, message: e.target.value})} whileFocus={{ boxShadow: "0 0 15px rgba(0, 255, 65, 0.2)" }} />
                    </motion.div>
                    <motion.div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.45 }}>
                      <motion.span className="font-mono text-[8px] text-[#849495] tracking-[0.2em] uppercase" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>Encryption: AES_256_Active</motion.span>
                      <Magnet magnetStrength={0.15}>
                        <motion.button type="submit" disabled={status === 'sending'} className="px-8 py-3 border border-[#00ff41] text-[#00ff41] font-mono text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00ff41]/10 transition-all flex items-center gap-3 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                          {status === 'sending' ? 'TRANSMITTING...' : '[ INITIALIZE_SEND → ]'}
                        </motion.button>
                      </Magnet>
                    </motion.div>
                  </form>
                )}
              </div>
            </div>

            {/* Packet Status Bar */}
            <motion.div className="grid grid-cols-3 bg-[#0d1117] border border-white/10 mt-1 hover:border-[#00ff41]/30 transition-colors duration-300" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {[['Packet_Status','ENQUEUED'],['Sync_Latency','12ms'],['Node_Origin','TK-SO-01']].map(([tag,val], idx) => (
                <motion.div key={tag} className="p-3 text-center border-r border-white/5 last:border-none hover:bg-white/[0.03] transition-colors" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.25 + idx * 0.05 }}>
                  <motion.p className="font-mono text-[7px] text-[#849495] uppercase tracking-widest mb-1 leading-none" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}>{tag}</motion.p>
                  <p className="font-mono text-[9px] text-[#00ff41] font-bold leading-none">{val}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* COL 3: SYSTEM_COORDS */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="flex flex-col gap-6 h-full">
            <span className="font-mono text-[9px] text-[#849495] tracking-[0.3em] uppercase mb-2">Location // 02</span>
            
            {/* Digital Radar Viz */}
            <motion.div className="bg-white/[0.03] border border-white/10 overflow-hidden relative flex-1 flex flex-col hover:border-[#00ff41]/30 transition-colors duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <div className="h-40 relative bg-[#050505] flex items-center justify-center overflow-hidden">
                {/* Radar Grid */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#00ff41 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }} />
                <motion.div className="relative w-24 h-24 border border-[#00ff41]/20 rounded-full flex items-center justify-center" animate={{ scale: [0.95, 1.05, 0.95] }} transition={{ duration: 4, repeat: Infinity }}>
                  <motion.div className="absolute w-full h-full border border-[#00ff41]/40 rounded-full animate-ping opacity-20" />
                  <motion.div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full shadow-[0_0_8px_#00ff41]" animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
                  <motion.div className="absolute top-0 w-0.5 h-1/2 bg-gradient-to-t from-[#00ff41] to-transparent origin-bottom animate-[spin_4s_linear_infinite]" />
                </motion.div>
                <motion.div className="absolute bottom-2 left-2 font-mono text-[7px] text-[#00ff41]/40" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>SCANNING_REGION...</motion.div>
              </div>
              
              <motion.div className="p-5 border-t border-white/5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <motion.div className="flex justify-between items-start mb-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                  <div>
                    <h4 className="text-xl font-black text-white leading-none mb-1 italic">DELHI_IN</h4>
                    <span className="font-mono text-[8px] text-[#00ff41] tracking-widest uppercase">28.6139° N, 77.2090° E</span>
                  </div>
                </motion.div>
                <motion.div className="space-y-3 font-mono text-[9px] text-white/80 uppercase" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3, staggerChildren: 0.08 }}>
                  <motion.div className="flex justify-between border-b border-white/5 pb-1 hover:text-[#00ff41] transition-colors" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}>
                    <span className="text-[#849495] text-[7px]">Uptime_Status</span>
                    <span className="text-[#4ade80] flex items-center gap-1"><motion.span className="w-1 h-1 bg-[#4ade80] rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />Online</span>
                  </motion.div>
                  <motion.div className="flex justify-between border-b border-white/5 pb-1 hover:text-[#00ff41] transition-colors" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}>
                    <span className="text-[#849495] text-[7px]">Local_Time</span>
                    <motion.span animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>{localTime}</motion.span>
                  </motion.div>
                  <motion.div className="flex justify-between border-b border-white/5 pb-1 hover:text-[#00ff41] transition-colors" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}>
                    <span className="text-[#849495] text-[7px]">Sync_Offset</span>
                    <span>IST +5:30</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}