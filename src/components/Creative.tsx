'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const SHOWCASE_ITEMS = [
  { id: '01', title: 'VOX_MANIPULATION', tag: 'NODE_01', height: 'h-64', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-P3I-cy1tf9bUfXjYW5Us7H86bLLsOyRuim33yngQdpZ65gZI92CWUz_F4onxhb39oWFhQE9XUCj7UHT4xfXmVAZgUddila8WKd3K1CdKFBERLOjFSZ3arrvYbfDENT_DX20sW6zmt0v0YuLqLJ872kVbqqCdDX9yoPBT-gJ-EDTpyGiHJPTqzcJsLcTu3KdaiqtynS54115k9p33843BecK-Pa8LPkJir5AyxSYKsH03NyQfnE6kXVeVlR0aqfTuoqR35CbkgCY' },
  { id: '02', title: 'NEON_FLUIDITY', tag: 'NODE_02', height: 'h-80', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3KjZrJ_7WI6HJsZAKJ9IlHOXFjhDvrIsXoYn2gN76h-y6xLfG0jLcjNAc-clYFbiUHVorU9QnbSraFVaSsLyRaDrJZq0_kA5kQbRbrn_f1SeLVDczBzOZeW0QmEJtyG2CcEYXsJMeMsmrkKV44gKqh7ehJJ0SCLU9p8_O7XDieWOuNPsy9pLIvtyT2RsvSQ11JCoZjWb1kOGJZHllnjQNSlKglf24dUh6s6DYYCqpLlkwVs0e1YxLRogwYlEBZ9v8kX0iflMkVoc' },
  { id: '03', title: 'HARDWARE_RENDER', tag: 'NODE_03', height: 'h-96', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhfeN4g1kdb6ITI1htTrmH6e3cH84SK-_jx_swy2W12fTmpTVJ23ld6DzQbUjKnELj7XsP5iet_x7A10fiV7nd-uJQLxtxAILCpUHU7c3Vm3Mh95DVriE57gU_UkTTIe_I1TgQHpRyiF-DFZ28_FpHjlq4uRn_0epGZ161jNNZRI3EmnnK6P7Q1LvazSVbMfBPumcfqIhndvImmVhh53y_0e-d427QvucZaAhqH8-YicLcnBD549Z21u44FTTp_DcY_jO4_gLSZZ4' },
].concat(Array(4).fill(null).map((_, i) => ({ id: `p-${i}`, title: 'EMPTY_DATA_NODE', tag: 'READY_FOR_INIT', height: i % 2 === 0 ? 'h-72' : 'h-80', img: null } as any)));

const GALLERY_ITEMS = [
  { id: 'g1', title: 'SYNTHETIC_VISION', desc: 'AI-assisted procedural generation model testing.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHgnujKBE4wDqn7zgbTVHuMoc43yVEilfCFosEfQU4_16DBbAhxXeSJiuFtlNr1akQoCN_7QF_aVdUizxfblyg6kNJzF_gs0VVdOYeXVtoLpKBOkO37drsZ8iHdScCy-2aN1eccHqcuQGaLOxAP9Fr1xBZqglJuTg3Uyc7yABhaEcPEycQWQ2eWPHtoGZoeUwjVTgk3knU33WaRrA25lt0Gek8PyXxMdrvw73Hy3fbbJ9phcGrCgNIfLuaJsY9p-PMjJMdwmpRNFo' },
  { id: 'g2', title: 'KINETIC_FLOW', desc: 'Exploring motion dynamics in reactive UI surfaces.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTQj07jUlYd-OhUZatmfgj6M7bedOQ0mhmGkaoNrxzjzl9ihlxzgixcQpM_9HCiw2A2D5Mp4KhIklsRRUwPUHwwdxzkBh8Jq7rvwfaM_9yBXw-OEszY-gq7cEDh95KMZ6K59PC53MRH5MS7FCuVcV735s5sDBKMUZvZVoxDNyDeKpV8CPlZso_5j23lNgxZ5q9smxC4e8Yuwi_SC4HCKXA9MEZyOezj-Z-bAway5q8yx9f9Bba6k_wP-rMaYm0SayMK_ccYvi2XuA' },
  { id: 'g3', title: 'ATMOSPHERIC_VOID', desc: 'Brutalist aesthetic study with high-contrast elements.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgpFmYhds3l6pC82sszDV1GxqfQvcr_VdwaiJGtoFgnBIcsb1QYk9rpkyUE0ZVOKP4Pwem1XgM4pePuEZU_Agb5tZKP2GOCIetB5CnUlXB_wyzLHIsAr9lolso0pS9zsPi9rmrkaOewTWjxjU9Oo3eEM6RGrenALid6RSEaM7bd7PXwhjHn3eDvQxJyS4R7IF-B1guv2ZQnUShjso_qcgXfFuD3zjeQsTrmWemnJ99lZrw3-MPQNo_MZjyecA-pkONimo6aQVwh5I' },
];

export default function Creative() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <section id="creative" className="w-full relative min-h-screen px-6 md:px-12 py-24 bg-[#0D1117] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="w-full max-w-7xl mx-auto flex flex-col"
      >
        {/* Header */}
        <header className="mb-16 border-l-4 border-[#00ff41] pl-6">
          <p className="text-[#00ff41] font-jetbrains text-xs tracking-[0.4em] mb-2 uppercase">Core Protocol: Visual Synthesis</p>
          <h1 className="text-4xl md:text-6xl font-orbitron font-extrabold tracking-tighter uppercase leading-none text-white">Creative_Forge</h1>
          <div className="mt-6 flex flex-wrap gap-4">
            <span className="bg-[#00ff41]/5 px-3 py-1 text-[10px] font-jetbrains text-[#00ff41] border border-[#00ff41]/20">ID: FORGE_NODE_07</span>
            <span className="bg-[#ffb86c]/5 px-3 py-1 text-[10px] font-jetbrains text-[#ffb86c] border border-[#ffb86c]/20">STATUS: ACTIVE_CONSTRUCT</span>
          </div>
        </header>

        {/* Slide Gallery - Auto-Scrolling & Draggable */}
        <div className="mb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-orbitron font-bold uppercase tracking-tight text-white flex items-center gap-3">
              <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
              SLIDE_GALLERY_SHOWCASE
            </h2>
            <div className="hidden md:flex gap-2 text-[10px] font-jetbrains text-gray-500 uppercase tracking-widest">
              [DRAG_TO_EXPLORE // AUTO_PHASE_ACTIVE]
            </div>
          </div>

          <motion.div 
            ref={carousel} 
            className="cursor-grab active:cursor-grabbing overflow-hidden rounded-xl"
          >
            <motion.div 
              drag="x" 
              dragConstraints={{ right: 0, left: -width }}
              animate={{ x: [0, -width, 0] }}
              transition={{ 
                duration: 60, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 2
              }}
              whileHover={{ animationPlayState: 'paused' }}
              className="flex gap-6 w-max"
            >
              {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, idx) => (
                <div 
                  key={`${item.id}-${idx}`}
                  className="w-[300px] md:w-[600px] aspect-[16/10] bg-[#1a1f26] border border-white/5 relative group overflow-hidden"
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[10px] font-jetbrains text-[#00ff41] mb-1 tracking-widest">PROJECT_NODE_{idx.toString().padStart(2, '0')}</p>
                    <h3 className="text-xl md:text-2xl font-orbitron font-black text-white">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-2 font-inter max-w-md hidden md:block">{item.desc}</p>
                  </div>
                  <div className="absolute top-6 right-6 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] text-white/60 font-jetbrains">
                    {idx % 2 === 0 ? "STABLE_DATA" : "LIVE_STREAM"}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Masonry Grid - Repository Index */}
        <div>
          <h2 className="text-xl font-orbitron font-bold uppercase tracking-tight text-white mb-10 flex items-center gap-3">
            <span className="w-2 h-2 bg-[#ffb86c] rounded-full" />
            REPOSITORY_INDEX // MASONRY_GRID
          </h2>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {SHOWCASE_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className={`break-inside-avoid bg-[#1a1f26]/40 border border-white/5 hover:border-[#00ff41]/30 transition-all group relative ${item.height} flex flex-col`}
              >
                {item.img ? (
                  <>
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 bg-[#0D1117]/80 backdrop-blur-md p-3 border-l-2 border-[#00ff41]">
                      <p className="text-[9px] font-jetbrains text-[#00ff41] tracking-widest uppercase">{item.tag}</p>
                      <h4 className="text-sm font-orbitron font-bold text-white mt-1">{item.title}</h4>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/5 group-hover:border-[#00ff41]/20 transition-all">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[#ffb86c] opacity-40">data_object</span>
                    </div>
                    <p className="text-[10px] font-jetbrains text-gray-500 tracking-[0.2em] mb-1">PROTO_SYNC_WAITING</p>
                    <div className="text-xs font-orbitron font-bold text-gray-500 group-hover:text-[#00ff41] transition-colors">{item.title}</div>
                    <div className="mt-4 flex gap-1 opacity-20">
                      {[1,1,1,0].map((o, i) => <div key={i} style={{ width: 4, height: 4, background: '#00ff41', opacity: o }} />)}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
