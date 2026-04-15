'use client';

const NAV_LINKS = ['HOME', 'ABOUT', 'EXPERIENCE', 'WORK', 'CONTACT'];
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/trs-saurav', path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/trs-saurav', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  { label: 'Twitter', href: 'https://twitter.com', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
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
    <footer className="w-full bg-[#0a0a0a] border-t border-white/[0.04] px-8 font-mono">
      <div className="max-w-7xl mx-auto pt-16 pb-8">
        
        {/* Top Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <div className="pl-5 border-l-2 border-[#00ff41]/50">
              <span className="text-white font-black text-xl tracking-wider block leading-none">SAURAV_KUMAR</span>
              <span className="text-[#00ff41]/50 text-[10px] tracking-[0.3em] uppercase mt-2 block">SYNTHETIC_ARCHITECT // DEL_IN</span>
            </div>
            <div className="space-y-1 text-[11px] leading-relaxed text-[#849495]">
              <p>&gt; BUILDING_FULL_STACK_SYSTEMS</p>
              <p>&gt; AI_PIPELINES // DEL_IN</p>
              <p className="mt-4 opacity-60">AVAILABLE_FOR_DIRECT_INTEGRATION_2026</p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col items-center space-y-4">
            <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase">Navigation</span>
            <div className="flex flex-col items-center space-y-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-[#849495] text-[10px] font-bold tracking-[0.1em] hover:text-[#00ff41] transition-colors uppercase"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: External Nodes & Reboot */}
          <div className="flex flex-col items-end space-y-6">
            <div className="text-right space-y-4">
              <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase block">External_Nodes</span>
              <div className="flex gap-3 justify-end">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 flex items-center justify-center border border-white/10 bg-white/[0.02] hover:border-[#00ff41]/40 hover:bg-[#00ff41]/5 transition-all group"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" className="fill-[#849495] group-hover:fill-[#00ff41] transition-colors">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 pt-2">
              <a 
                href="/resume.pdf" 
                download 
                className="text-[#ffb86c] text-[10px] font-black tracking-widest border border-[#ffb86c]/30 px-4 py-2 hover:bg-[#ffb86c]/10 transition-all uppercase"
              >
                ⬇ MANIFEST_PDF
              </a>
              <button 
                onClick={() => scrollTo('home')}
                className="text-[#00ff41] text-[9px] font-bold tracking-[0.2em] hover:underline underline-offset-4 transition-all"
              >
                [ ↑ REBOOT_SEQUENCE ]
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/[0.04] mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] tracking-widest text-white/20">
          <span className="uppercase">© 2026 SAURAV_KUMAR // ALL_RIGHTS_RESERVED // SERIAL: DEL-IN-001</span>
          
          <div className="flex gap-8 items-center">
            <div className="flex gap-4">
              <span>SESSION_ID: 0x8FF5</span>
              <span className="text-[#00ff41]/40">BUILD: STABLE</span>
              <span>POWER: MAX</span>
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-[#00ff41] animate-pulse" />
              <div className="w-1 h-1 bg-[#00ff41]/40" />
              <div className="w-1 h-1 bg-[#00ff41]/10" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}