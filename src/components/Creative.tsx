'use client';

import { motion } from 'framer-motion';

const SHOWCASE_ITEMS = [
  { id: '01', title: 'VOX_MANIPULATION', tag: 'DATA_NODE_01', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-P3I-cy1tf9bUfXjYW5Us7H86bLLsOyRuim33yngQdpZ65gZI92CWUz_F4onxhb39oWFhQE9XUCj7UHT4xfXmVAZgUddila8WKd3K1CdKFBERLOjFSZ3arrvYbfDENT_DX20sW6zmt0v0YuLqLJ872kVbqqCdDX9yoPBT-gJ-EDTpyGiHJPTqzcJsLcTu3KdaiqtynS54115k9p33843BecK-Pa8LPkJir5AyxSYKsH03NyQfnE6kXVeVlR0aqfTuoqR35CbkgCY' },
  { id: '02', title: 'NEON_FLUIDITY', tag: 'DATA_NODE_02', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3KjZrJ_7WI6HJsZAKJ9IlHOXFjhDvrIsXoYn2gN76h-y6xLfG0jLcjNAc-clYFbiUHVorU9QnbSraFVaSsLyRaDrJZq0_kA5kQbRbrn_f1SeLVDczBzOZeW0QmEJtyG2CcEYXsJMeMsmrkKV44gKqh7ehJJ0SCLU9p8_O7XDieWOuNPsy9pLIvtyT2RsvSQ11JCoZjWb1kOGJZHllnjQNSlKglf24dUh6s6DYYCqpLlkwVs0e1YxLRogwYlEBZ9v8kX0iflMkVoc' },
  { id: '03', title: 'HARDWARE_RENDER', tag: 'DATA_NODE_03', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhfeN4g1kdb6ITI1htTrmH6e3cH84SK-_jx_swy2W12fTmpTVJ23ld6DzQbUjKnELj7XsP5iet_x7A10fiV7nd-uJQLxtxAILCpUHU7c3Vm3Mh95DVriE57gU_UkTTIe_I1TgQHpRyiF-DFZ28_FpHjlq4uRn_0epGZ161jNNZRI3EmnnK6P7Q1LvazSVbMfBPumcfqIhndvImmVhh53y_0e-d427QvucZaAhqH8-YicLcnBD549Z21u44FTTp_DcY_jO4_gLSZZ4' },
  { id: '04', title: 'MINIMAL_CONSTRUCT', tag: 'DATA_NODE_04', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHgnujKBE4wDqn7zgbTVHuMoc43yVEilfCFosEfQU4_16DBbAhxXeSJiuFtlNr1akQoCN_7QF_aVdUizxfblyg6kNJzF_gs0VVdOYeXVtoLpKBOkO37drsZ8iHdScCy-2aN1eccHqcuQGaLOxAP9Fr1xBZqglJuTg3Uyc7yABhaEcPEycQWQ2eWPHtoGZoeUwjVTgk3knU33WaRrA25lt0Gek8PyXxMdrvw73Hy3fbbJ9phcGrCgNIfLuaJsY9p-PMjJMdwmpRNFo' },
  { id: '05', title: 'GRADIENT_FLOW', tag: 'DATA_NODE_05', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQj07jUlYd-OhUZatmfgj6M7bedOQ0mhmGkaoNrxzjzl9ihlxzgixcQpM_9HCiw2A2D5Mp4KhIklsRRUwPUHwwdxzkBh8Jq7rvwfaM_9yBXw-OEszY-gq7cEDh95KMZ6K59PC53MRH5MS7FCuVcV735s5sDBKMUZvZVoxDNyDeKpV8CPlZso_5j23lNgxZ5q9smxC4e8Yuwi_SC4HCKXA9MEZyOezj-Z-bAway5q8yx9f9Bba6k_wP-rMaYm0SayMK_ccYvi2XuA' }
];

export default function Creative() {
  return (
    <section id="creative" className="w-full relative min-h-screen px-6 md:px-12 py-16 bg-[#0D1117] overflow-x-hidden">
      {/* Ensure Font is available locally if not globally imported */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        className="w-full max-w-7xl mx-auto flex flex-col pt-4"
      >
        {/* Header & Identity Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-l-4 border-[#14ffec] pl-6 w-full">
          <div>
            <p className="text-[#14ffec] font-jetbrains text-xs md:text-sm tracking-[0.3em] mb-2 uppercase drop-shadow-[0_0_8px_rgba(20,255,236,0.6)]">Core Protocol: Visual Synthesis</p>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold tracking-tighter uppercase leading-none text-white drop-shadow-md">Creative_Forge</h1>
            <div className="mt-4 flex flex-wrap gap-2 md:gap-4 items-center">
              <span className="bg-white/5 backdrop-blur-md px-3 py-1 text-[10px] md:text-xs font-jetbrains text-gray-300 border-l border-[#14ffec] rounded-sm">ID: SRMIST_2027</span>
              <span className="bg-white/5 backdrop-blur-md px-3 py-1 text-[10px] md:text-xs font-jetbrains text-gray-300 border-l border-[#14ffec] rounded-sm">STATUS: ACTIVE_CONSTRUCT</span>
              <span className="bg-white/5 backdrop-blur-md px-3 py-1 text-[10px] md:text-xs font-jetbrains text-gray-300 border-l border-[#14ffec] rounded-sm">LOC: VOID_NODE_04</span>
            </div>
          </div>
          <div className="text-left md:text-right hidden sm:block mt-6 md:mt-0">
            <p className="text-[10px] text-gray-400 font-inter uppercase tracking-widest mb-1">Last Data Sync</p>
            <p className="text-sm font-jetbrains text-[#14ffec] drop-shadow-[0_0_5px_rgba(20,255,236,0.4)]">04.MAY.2024 // 04:20:01</p>
          </div>
        </header>

        {/* Main Preview Console */}
        <section className="grid grid-cols-12 gap-8 mb-12 w-full">
          {/* Central Display Panel */}
          <div className="col-span-12 lg:col-span-9 relative group">
            <div className="aspect-video w-full bg-white/5 backdrop-blur-md relative overflow-hidden border border-[#14ffec]/20 rounded-lg shadow-lg">
              <img 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out" 
                alt="Abstract digital landscape" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgpFmYhds3l6pC82sszDV1GxqfQvcr_VdwaiJGtoFgnBIcsb1QYk9rpkyUE0ZVOKP4Pwem1XgM4pePuEZU_Agb5tZKP2GOCIetB5CnUlXB_wyzLHIsAr9lolso0pS9zsPi9rmrkaOewTWjxjU9Oo3eEM6RGrenALid6RSEaM7bd7PXwhjHn3eDvQxJyS4R7IF-B1guv2ZQnUShjso_qcgXfFuD3zjeQsTrmWemnJ99lZrw3-MPQNo_MZjyecA-pkONimo6aQVwh5I"
              />
              {/* Interface Overlays */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[8px] md:border-[12px] border-[#0D1117]/40 mix-blend-overlay rounded-lg"></div>
              
              <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-2">
                <div className="bg-[#0D1117]/80 backdrop-blur-md px-3 py-1 border-l-2 border-[#14ffec] rounded-r-md">
                  <span className="text-[8px] md:text-[10px] font-jetbrains text-[#14ffec] tracking-widest font-bold uppercase drop-shadow-[0_0_5px_rgba(20,255,236,0.3)]">Active_Project</span>
                </div>
                <h2 className="text-xl md:text-3xl font-orbitron font-bold uppercase tracking-tight text-white drop-shadow-2xl">Cyber-Ethereal_Concept</h2>
              </div>
              
              {/* Technical Readout Panel */}
              <div className="absolute bottom-0 right-0 w-full sm:w-72 p-4 md:p-6 bg-[#0D1117]/60 backdrop-blur-xl border-t border-l border-[#14ffec]/20 hidden sm:block rounded-tl-lg">
                <div className="mb-4">
                  <p className="text-[10px] text-gray-400 font-jetbrains uppercase tracking-widest mb-2">Technical_Specs</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#14ffec]/10 text-[#14ffec] text-[10px] font-jetbrains px-2 py-0.5 border border-[#14ffec]/30 rounded-sm">PHOTOSHOP</span>
                    <span className="bg-[#14ffec]/10 text-[#14ffec] text-[10px] font-jetbrains px-2 py-0.5 border border-[#14ffec]/30 rounded-sm">PREMIERE_PRO</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-jetbrains uppercase tracking-widest mb-2">Manifesto</p>
                  <p className="text-[10px] md:text-xs text-gray-300 font-inter leading-relaxed italic">"Deconstructing digital artifacts into a cohesive visual narrative exploring the intersection of human memory and machine processing."</p>
                </div>
              </div>
              
              {/* View Control */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex gap-2 md:gap-4">
                <button className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-[#14ffec] text-[#0D1117] hover:bg-white hover:text-[#0D1117] transition-all cursor-pointer rounded-sm shadow-[0_0_15px_rgba(20,255,236,0.4)]">
                  <span className="material-symbols-outlined text-[20px] md:text-[24px]">play_arrow</span>
                </button>
                <button className="px-4 md:px-6 h-10 md:h-12 bg-white/5 backdrop-blur-sm border border-[#14ffec]/30 text-[#14ffec] font-jetbrains font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#14ffec]/10 hover:shadow-[0_0_15px_rgba(20,255,236,0.2)] transition-all cursor-pointer rounded-sm">
                  _VIEW_FULL_SOURCE
                </button>
              </div>
            </div>
          </div>
          
          {/* Side System Status / Meta */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 w-full">
            <div className="p-4 md:p-6 bg-white/5 backdrop-blur-md border border-[#14ffec]/20 rounded-lg hover:-translate-y-1 hover:border-[#14ffec]/40 hover:shadow-[0_0_15px_rgba(20,255,236,0.1)] transition-all duration-300 w-full relative">
              {/* Mac-like Window Controls */}
              <div className="absolute top-3 left-4 flex gap-1.5 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <h3 className="text-[10px] md:text-xs font-orbitron font-bold text-[#14ffec] uppercase tracking-widest mb-4 mt-4 flex items-center gap-2 drop-shadow-[0_0_5px_rgba(20,255,236,0.4)]">
                <span className="material-symbols-outlined text-sm">analytics</span> TOOL_METRICS
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-jetbrains uppercase text-gray-300">
                    <span>Ps / Digital Manipulation</span>
                    <span className="text-[#14ffec]">92%</span>
                  </div>
                  <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                    <div className="h-full bg-[#14ffec] w-[92%] shadow-[0_0_10px_rgba(20,255,236,0.8)]"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-jetbrains uppercase text-gray-300">
                    <span>Pr / Motion Graphics</span>
                    <span className="text-[#14ffec]">78%</span>
                  </div>
                  <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                    <div className="h-full bg-[#14ffec] w-[78%] shadow-[0_0_10px_rgba(20,255,236,0.8)]"></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-jetbrains uppercase text-gray-300">
                    <span>Kn / Mobile Editing</span>
                    <span className="text-[#14ffec]">85%</span>
                  </div>
                  <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                    <div className="h-full bg-[#14ffec] w-[85%] shadow-[0_0_10px_rgba(20,255,236,0.8)]"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 md:p-6 bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-lg hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 flex-grow relative overflow-hidden w-full hidden md:block">
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <span className="material-symbols-outlined text-[120px] text-purple-400" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
              </div>
              {/* Mac-like Window Controls */}
              <div className="absolute top-3 left-4 flex gap-1.5 opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <h3 className="text-xs font-orbitron font-bold text-[#c180ff] uppercase tracking-widest mb-4 mt-4 flex items-center gap-2 drop-shadow-[0_0_5px_rgba(193,128,255,0.4)]">
                <span className="material-symbols-outlined text-sm">terminal</span> SYSTEM_LOG
              </h3>
              <div className="space-y-2 font-jetbrains text-[10px] text-gray-400">
                <p className="text-gray-300">&gt; BOOTING CREATIVE_ENGINE</p>
                <p>&gt; ASSET_LOADING: <span className="text-[#14ffec]">100%</span></p>
                <p>&gt; RENDER_MODE: PROTOCOL_VOID</p>
                <p className="text-[#ff6daf]">&gt; WARNING: HIGH_CREATIVITY_DETECTED</p>
                <p>&gt; USER: STUDENT_DESIGNER_SRM</p>
                <p className="animate-pulse text-[#14ffec]">&gt; _</p>
              </div>
            </div>
          </div>
        </section>

        {/* Thumbnails / Navigation Carousel */}
        <section className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg md:text-xl font-orbitron font-bold uppercase tracking-tighter text-white">Repository_Index</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-sm rounded hover:border-[#14ffec] hover:text-[#14ffec] hover:shadow-[0_0_10px_rgba(20,255,236,0.2)] text-gray-300 transition-all cursor-pointer">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-sm rounded hover:border-[#14ffec] hover:text-[#14ffec] hover:shadow-[0_0_10px_rgba(20,255,236,0.2)] text-gray-300 transition-all cursor-pointer">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 w-full">
            {SHOWCASE_ITEMS.map((item) => (
              <div key={item.id} className="group cursor-pointer bg-white/5 backdrop-blur-md rounded border border-white/10 hover:border-[#14ffec]/30 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(20,255,236,0.15)] transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-square w-full overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" 
                    alt={item.title} 
                    src={item.img}
                  />
                  <div className="absolute inset-0 bg-[#14ffec]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-2 md:p-3 pb-3">
                  <p className="text-[8px] md:text-[10px] text-gray-400 font-jetbrains uppercase font-bold tracking-tighter">{item.tag}</p>
                  <p className="text-xs md:text-sm font-inter font-bold uppercase tracking-tight text-gray-200 truncate w-full" title={item.title}>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </section>
  );
}
