'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { DecryptedText } from './reactbits/DecryptedText';

const NODES = [
  { icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', name: 'GITHUB',     sub: 'SRC_REPOSITORIES / SYSTEM_ARCHITECTURE', href: 'https://github.com/trs-saurav' },
  { icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', name: 'LINKEDIN',   sub: 'NEURAL_NET / PROFESSIONAL_GRID',       href: 'https://linkedin.com/in/trs-saurav' },
  { icon: 'M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z', name: 'MAIL_RELAY', sub: 'DIRECT_COMM / ARCHITECT_PRIMARY',      href: 'mailto:saurav@example.com' },
];

const CSS = `
  @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}
  .corner-bracket{position:absolute;width:14px;height:14px;border-color:rgba(0,255,65,0.8);opacity:0;transition:opacity 0.2s;}
  .corner-tl{top:-1px;left:-1px;border-top:2px solid;border-left:2px solid;}
  .corner-tr{top:-1px;right:-1px;border-top:2px solid;border-right:2px solid;}
  .corner-bl{bottom:-1px;left:-1px;border-bottom:2px solid;border-left:2px solid;}
  .corner-br{bottom:-1px;right:-1px;border-bottom:2px solid;border-right:2px solid;}
  .node-card:hover .corner-bracket{opacity:1;}
  .tfill{background:var(--surface-container-high);border:none;color:var(--foreground);padding:0.9rem 1rem;font-size:0.85rem;width:100%;outline:none;font-family:var(--font-space-grotesk);transition:box-shadow 0.2s;box-sizing:border-box;}
  .tfill::placeholder{color:var(--outline);}
  .tfill:focus{box-shadow:inset 0 0 0 1px var(--primary-neon);}
  @media(max-width:900px){
    .contact-grid{grid-template-columns:1fr!important;}
    .input-grid{grid-template-columns:1fr!important;}
    .submit-row{flex-direction:column!important; align-items:stretch!important; gap:0.75rem;}
    .submit-row span{align-self: flex-start;}
    .status-grid{grid-template-columns:1fr!important;}
  }
`;

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'>('idle');
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const tick = () => setLocalTime(
      new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }) + ' (IST)'
    );
    tick();
    const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1400);
  };

  return (
    <section id="contact" style={{ width: '100%', padding: '0 2rem', boxSizing: 'border-box' }}>
      <div style={{ width: '80vw', maxWidth: 1200, margin: '0 auto', paddingTop: '6rem', paddingBottom: '4rem' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem', paddingLeft: '1.25rem', borderLeft: '2px solid rgba(0,255,65,0.35)' }}>
          <span className="hud-tag" style={{ display: 'block', marginBottom: '0.4rem' }}>SIGNAL_PROTOCOL // UPLINK</span>
          <h2 className="kinetic-text" style={{ fontSize: 'clamp(1.8rem, 7vw, 4rem)', color: 'var(--foreground)', overflowWrap: 'break-word' }}>
            <DecryptedText text="ESTABLISH_CONNECTION" maxIterations={12} speed={30} />
          </h2>
        </motion.div>

        {/* 3-column grid — equal height rows via CSS grid */}
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem', alignItems: 'stretch' }}>

          {/* ── COL 1: External Nodes ─────────────────── */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.55 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="hud-tag" style={{ display: 'block', marginBottom: '0.2rem' }}>DIRECTORY // 01</span>
              <h3 style={{ color: 'var(--foreground)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>EXTERNAL_NODES</h3>
            </div>
            {NODES.map(n => (
              <a key={n.name} href={n.href} target="_blank" rel="noreferrer" className="node-card"
                style={{ position: 'relative', display: 'block', background: 'var(--surface-container-low)', padding: '1rem 1.25rem', textDecoration: 'none', color: 'inherit', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-container-high)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface-container-low)')}>
                <div className="corner-bracket corner-tl" /><div className="corner-bracket corner-tr" />
                <div className="corner-bracket corner-bl" /><div className="corner-bracket corner-br" />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary-neon)" style={{ flexShrink: 0 }}><path d={n.icon} /></svg>
                    <span style={{ color: 'var(--foreground)', fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.04em' }}>{n.name}</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--outline)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </div>
                <p style={{ color: 'var(--on-surface-var)', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0.6rem 0 0' }}>{n.sub}</p>
              </a>
            ))}
          </motion.div>

          {/* ── COL 2: Message Composer ─────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.55, delay: 0.07 }}
            style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Terminal window */}
            <div style={{ background: 'linear-gradient(135deg,rgba(0,255,65,0.06),transparent)', padding: 1, marginBottom: '0.5rem', display: 'flex', flex: 1 }}>
              <div style={{ background: 'rgba(13, 17, 23, 0.45)', backdropFilter: 'blur(12px)', padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Title bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(70,72,77,0.45)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-neon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    <span style={{ color: 'var(--primary-neon)', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.1em' }}>Message_Composer.exe</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <div style={{ width: 9, height: 9, background: 'var(--outline-variant)' }} />
                    <div style={{ width: 9, height: 9, background: 'var(--outline-variant)' }} />
                    <div style={{ width: 9, height: 9, background: 'var(--primary-neon)', boxShadow: '0 0 6px rgba(0,255,65,0.5)' }} />
                  </div>
                </div>

                {status === 'sent' ? (
                  <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem 0', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, border: '2px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 14px rgba(74,222,128,0.25)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 style={{ color: 'var(--foreground)', fontSize: '1rem', letterSpacing: '0.08em', margin: 0, fontWeight: 800 }}>SIGNAL_TRANSMITTED</h3>
                    <p style={{ color: 'var(--outline)', fontSize: '0.82rem', margin: 0, fontFamily: 'monospace' }}>&gt; Response ETA &lt; 24h.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', flex: 1 }}>
                    <div className="input-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label className="hud-tag">IDENTITY_TOKEN</label>
                        <input id="c-name" type="text" required placeholder="GUEST_NAME_01" value={form.name} onChange={e => setForm(f => ({...f,name:e.target.value}))} className="tfill" />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <label className="hud-tag">RETURN_PATH</label>
                        <input id="c-email" type="email" required placeholder="USER@ENDPOINT.NET" value={form.email} onChange={e => setForm(f => ({...f,email:e.target.value}))} className="tfill" />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <label className="hud-tag">PAYLOAD_DATA</label>
                      <textarea id="c-msg" required placeholder="[ ENTER_ENCRYPTED_MESSAGE_HERE ]" value={form.message} onChange={e => setForm(f => ({...f,message:e.target.value}))} className="tfill" style={{ resize: 'none', lineHeight: 1.6, flex: 1, minHeight: '120px' }} />
                    </div>
                    <div className="submit-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem', marginTop: 'auto' }}>
                      <span style={{ color: 'var(--outline)', fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>ENCRYPTION: AES_256_ACTIVE</span>
                      <button type="submit" disabled={status==='sending'} style={{ background: 'var(--primary-neon)', color: '#003840', border: 'none', padding: '0.8rem 2rem', fontWeight: 800, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)', transition: 'filter 0.2s', opacity: status==='sending' ? 0.7 : 1 }}
                        onMouseEnter={e=>(e.currentTarget.style.filter='brightness(1.1)')} onMouseLeave={e=>(e.currentTarget.style.filter='none')}>
                        {status==='sending' ? 'TRANSMITTING...' : 'INITIALIZE_SEND'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Status strip */}
            <div className="status-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
              {[['Packet_Status','ENQUEUED'],['Sync_Latency','12ms'],['Server_Node','TK-SO-01']].map(([tag,val]) => (
                <div key={tag} style={{ background: 'var(--surface-container-low)', padding: '0.75rem', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.03)' }}>
                  <p style={{ color: 'var(--outline)', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.25rem' }}>{tag}</p>
                  <p style={{ color: 'var(--primary-neon)', fontSize: '0.8rem', fontWeight: 800, margin: 0 }}>{val}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── COL 3: System Coords ─────────────────── */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="hud-tag" style={{ display: 'block', marginBottom: '0.2rem' }}>LOCATION // 02</span>
              <h3 style={{ color: 'var(--foreground)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>SYSTEM_COORDS</h3>
            </div>

            {/* Map card */}
            <div style={{ background: 'var(--surface-container-low)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(0,255,65,0.12)', zIndex: 10, pointerEvents: 'none' }} />
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80" alt="Delhi"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) brightness(0.45) contrast(1.2)', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,rgba(0,255,65,0.03) 0px,transparent 1px,transparent 4px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top,var(--surface-container-low),transparent)', pointerEvents: 'none' }} />
              </div>
              <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ color: 'var(--foreground)', fontSize: '1rem', fontWeight: 800, margin: '0 0 0.15rem', letterSpacing: '-0.01em' }}>DELHI_IN</h4>
                    <p style={{ color: 'var(--primary-neon)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.14em', margin: 0 }}>28.6139° N, 77.2090° E</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--primary-neon)"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--outline)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Uptime_Status</span>
                    <span style={{ color: '#4ade80', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.16em', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ width: 3, height: 3, background: '#4ade80', borderRadius: '50%' }} />Online
                    </span>
                  </div>
                  <div style={{ height: 2, background: 'rgba(70,72,77,0.4)' }}>
                    <div style={{ height: '100%', width: '88%', background: 'var(--primary-neon)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--outline)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Local_Time</span>
                    <span style={{ color: 'var(--foreground)', fontSize: '0.55rem', fontWeight: 700 }}>{localTime}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--outline)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Timezone</span>
                    <span style={{ color: 'var(--foreground)', fontSize: '0.55rem', fontWeight: 700 }}>IST +5:30</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System metadata */}
            <div style={{ background: 'var(--surface-container-high)', padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', borderBottom: '1px solid rgba(70,72,77,0.25)', paddingBottom: '0.6rem', marginBottom: '0.75rem' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary-neon)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--foreground)' }}>System_Metadata</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--outline)', lineHeight: 1.65 }}>
                <p style={{ margin: 0 }}>&gt; Node status... <span style={{ color: 'var(--primary-neon)' }}>[OK]</span></p>
                <p style={{ margin: 0 }}>&gt; Signal: 94.2dBm</p>
                <p style={{ margin: 0 }}>&gt; Protocol: V_WORM_X9</p>
                <p style={{ margin: 0 }}>&gt; Core: v3.4.0-STABLE</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
      <style>{CSS}</style>
    </section>
  );
}
