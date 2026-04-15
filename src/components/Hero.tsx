'use client';

import { motion, easeOut } from 'framer-motion';
import { useEffect, useState, Suspense } from 'react';
import { DecryptedText } from './reactbits/DecryptedText';
import { BlurText } from './reactbits/BlurText';
import { SplitText } from './reactbits/SplitText';
import { StarBorder } from './reactbits/StarBorder';
import { ShinyText } from './reactbits/ShinyText';

// --- THREE.JS IMPORTS ---
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, Environment, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const ITEM = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut, delay: d } }),
};

// ─── 3D AVATAR COMPONENT ───
function AvatarModel({ url = '/avatar.glb' }) {
  const { scene, nodes, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);
  
  const [isBowing, setIsBowing] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const actionNames = Object.keys(actions);
      const action = actions[actionNames[0]];
      if (action) action.play();
    }

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.morphTargetDictionary && child.morphTargetInfluences) {
        const smileLeft = child.morphTargetDictionary['mouthSmileLeft'];
        const smileRight = child.morphTargetDictionary['mouthSmileRight'];
        if (smileLeft !== undefined) child.morphTargetInfluences[smileLeft] = 0.65;
        if (smileRight !== undefined) child.morphTargetInfluences[smileRight] = 0.65;
      }
    });
  }, [actions, scene]);

  useEffect(() => {
    const timer = setTimeout(() => setIsBowing(false), 2500); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    const head = nodes.Head || nodes.Neck || scene.getObjectByName('Head');
    const spine = nodes.Spine || nodes.Spine1 || nodes.Spine2 || scene.getObjectByName('Spine') || scene.getObjectByName('Spine2');
    
    if (isBowing) {
      if (spine) spine.rotation.x = THREE.MathUtils.lerp(spine.rotation.x, 0.8, 0.05); 
      if (head) head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, 0.3, 0.05);   
      if (head) head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, 0, 0.05);
    } else {
      if (spine) spine.rotation.x = THREE.MathUtils.lerp(spine.rotation.x, 0, 0.05);
      if (head) {
        const targetRotationY = mouse.x * (Math.PI / 3.5);
        const targetRotationX = -mouse.y * (Math.PI / 4.5);
        head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetRotationY, 0.05);
        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetRotationX, 0.05);
      }
    }
  });

  return (
    <group dispose={null}>
      {/* Lowered Y to -9.8 to prevent head-cropping at the top */}
      <primitive object={scene} scale={6.5} position={[0, -9.8, 0]} />
      {isBowing && (
        <Html position={[1.8, -1.8, 0]} center>
          <div className="flex items-center gap-2 bg-[#050505]/90 backdrop-blur-md border border-[#00ff41]/30 px-3 py-1.5 shadow-[0_0_15px_rgba(0,255,65,0.2)]">
            <div className="w-1 h-1 bg-[#00ff41] animate-pulse"></div>
            <span className="text-[#00ff41] font-mono text-[9px] tracking-[0.4em] uppercase mt-0.5">SYS.READY_</span>
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload('/avatar.glb');

// ─── MAIN HERO COMPONENT ───
export default function Hero() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setGlitch(g => !g), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .hero-glow {
            background: radial-gradient(circle at center, rgba(0, 255, 65, 0.07) 0%, transparent 70%);
            pointer-events: none;
        }
        .local-scanline {
            width: 100%; height: 100%; z-index: 10;
            background: linear-gradient(to bottom, rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.01), rgba(0, 255, 0, 0.005), rgba(0, 0, 255, 0.01));
            background-size: 100% 2px, 3px 100%;
            pointer-events: none; position: absolute; top: 0; left: 0;
        }
        .avatar-fade-mask {
            mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
        }
        .data-label { font-family: monospace; letter-spacing: 0.25em; text-transform: uppercase; }
        .data-value { font-family: monospace; color: #00ff41; }
      `}</style>

      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-24 bg-transparent"
      >
        <div className="local-scanline"></div>
        <div className="hero-glow absolute inset-0"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-20 w-full max-w-6xl flex flex-col items-center justify-center mx-auto"
        >
          <motion.div variants={ITEM} custom={0.1} className="flex flex-col items-center w-full relative">
            
            {/* ── HUD DATA OVERLAYS ── */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
              
              {/* Top Left: System Status */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                className="absolute top-[10%] left-[2%] lg:left-[5%] text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 bg-[#00ff41] shadow-[0_0_5px_#00ff41]"></div>
                  <div className="data-label text-[10px] text-[#00ff41] font-bold">SYSTEM.STATUS</div>
                </div>
                <div className="space-y-1.5 border-l border-[#00ff41]/20 pl-3">
                  <div className="flex flex-col"><span className="data-label text-[8px] opacity-40">STACK</span><span className="data-value text-[11px] uppercase">Next.js 15</span></div>
                  <div className="flex flex-col"><span className="data-label text-[8px] opacity-40">COMMITS</span><span className="data-value text-[11px]">1.2K+</span></div>
                </div>
              </motion.div>

              {/* Top Right: Protocol (Anchored visually - Fix #4) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
                className="absolute top-[10%] right-[2%] lg:right-[5%] text-right"
              >
                <div className="flex items-center justify-end gap-2 mb-2">
                  <div className="data-label text-[10px] text-[#ffb86c] font-bold">PROTOCOL.ACTIVE</div>
                  <div className="w-1.5 h-1.5 bg-[#ffb86c] shadow-[0_0_5px_#ffb86c] animate-pulse"></div>
                </div>
                <div className="space-y-1.5 border-r border-[#ffb86c]/20 pr-3">
                  <div className="text-[#e9ffe9] text-[11px] font-mono tracking-[0.1em] font-bold uppercase">
                    <ShinyText text="Seeking_Roles" shimmerColor="#ffb86c" />
                  </div>
                  <div className="data-label text-[8px] opacity-60">LOC: DELHI_IN</div>
                </div>
              </motion.div>

              {/* Bottom Left: Archive */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                className="absolute bottom-[20%] left-[2%] lg:left-[5%] text-left"
              >
                <div className="data-label text-[10px] mb-2 opacity-80 flex items-center gap-2">
                  <span className="text-[#00ff41]">[</span> ARCHIVE.LOC <span className="text-[#00ff41]">]</span>
                </div>
                <div className="bg-[#00ff41]/5 border-l border-[#00ff41] p-3">
                  <div className="data-value text-[#e9ffe9] text-[12px] font-bold">SRMIST // 2027</div>
                </div>
              </motion.div>
            </div>

            {/* ── CENTRAL AVATAR HUB ── */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 border border-[#00ff41]/10 rounded-full animate-[spin_40s_linear_infinite]"></div>
              <div className="absolute inset-6 border border-[#e9ffe9]/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
              
              <div className="absolute w-[50%] h-[50%] bg-[#00ff41]/5 blur-[90px] rounded-full"></div>

              {/* Added avatar-fade-mask to prevent body/text overlap - Fix #3 */}
              <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto rounded-full overflow-hidden border border-[#00ff41]/10 avatar-fade-mask">
                <div className={`absolute inset-0 glitch-effect opacity-20 z-20 pointer-events-none ${glitch ? 'block' : 'hidden'}`}></div>
                <Canvas camera={{ position: [0, 0, 8], fov: 38 }} className="w-full h-full">
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[5, 5, 5]} intensity={1.5} color="#e9ffe9" />
                  <Environment preset="city" />
                  <Suspense fallback={<Html center><div className="text-[#00ff41] font-mono text-[9px] tracking-[0.5em] uppercase opacity-40 animate-pulse">Initializing...</div></Html>}>
                    <AvatarModel />
                  </Suspense>
                </Canvas>
              </div>
            </div>
            
            {/* ── IDENTITY & CTA ── */}
            <div className="text-center mt-8 space-y-6 z-30">
              <div className="space-y-3">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.2em] uppercase text-[#e9ffe9] drop-shadow-[0_0_15px_rgba(233,255,233,0.1)]">
                  <SplitText text="Saurav Kumar" delay={0.3} duration={0.08} />
                </h2>
                <p className="text-[10px] md:text-xs text-[#00ff41]/50 tracking-[0.6em] uppercase font-mono">
                  <DecryptedText text="Full_Stack // Systems_Designer" maxIterations={12} speed={50} />
                </p>
              </div>

              <motion.div variants={ITEM} custom={0.6} className="pt-6">
                <StarBorder color="#00ff41">
                  <button 
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative px-10 py-3.5 bg-[#00ff41] text-[#050505] font-mono text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-[#e9ffe9] transition-all duration-300 shadow-[0_0_25px_rgba(0,255,65,0.2)] active:scale-95"
                  >
                    <span className="relative z-10">View_Manifest_</span>
                  </button>
                </StarBorder>
              </motion.div>
            </div>

          </motion.div>
        </motion.div>

        {/* ── SCROLL ANCHOR (Fix #5 - breathing room) ── */}
        <div className="absolute bottom-8 flex flex-col items-center opacity-20">
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#00ff41] to-transparent animate-pulse"></div>
        </div>
      </section>
    </>
  );
}