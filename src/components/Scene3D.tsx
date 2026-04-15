'use client';

import { useRef, useEffect, Suspense, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stars,
  PerspectiveCamera,
  Grid,
  useGLTF,
  useAnimations,
  Float,
  Environment,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
// @ts-ignore
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

// Initialize rect area light shaders
if (typeof window !== 'undefined') {
  RectAreaLightUniformsLib.init();
}


/* ─────────────────────────────────────────────────────────────
   Camera Rig — driven by native scroll progress
───────────────────────────────────────────────────────────── */
function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      progress.current = total > 0 ? el.scrollTop / total : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(() => {
    if (!cameraRef.current) return;
    const o = progress.current;
    let x = 0, y = 0, z = 10, rotX = 0, rotY = 0;

    if (o < 0.2) {
      const p = o / 0.2;
      x = THREE.MathUtils.lerp(0, 4, p);
      y = THREE.MathUtils.lerp(0, -1, p);
      z = THREE.MathUtils.lerp(10, 8, p);
      rotY = THREE.MathUtils.lerp(0, 0.15, p);
    } else if (o < 0.4) {
      const p = (o - 0.2) / 0.2;
      x = THREE.MathUtils.lerp(4, -6, p);
      y = THREE.MathUtils.lerp(-1, 3, p);
      z = THREE.MathUtils.lerp(8, 12, p);
    } else if (o < 0.6) {
      const p = (o - 0.4) / 0.2;
      x = THREE.MathUtils.lerp(-6, 2, p);
      y = THREE.MathUtils.lerp(3, -2, p);
      z = THREE.MathUtils.lerp(12, 9, p);
      rotX = THREE.MathUtils.lerp(0, -0.1, p);
    } else if (o < 0.8) {
      const p = (o - 0.6) / 0.2;
      x = THREE.MathUtils.lerp(2, -3, p);
      y = THREE.MathUtils.lerp(-2, 0, p);
      z = THREE.MathUtils.lerp(9, 11, p);
    } else {
      const p = (o - 0.8) / 0.2;
      x = THREE.MathUtils.lerp(-3, 0, p);
      y = THREE.MathUtils.lerp(0, 0, p);
      z = THREE.MathUtils.lerp(11, 10, p);
    }

    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
      x = 0; y = 0; z = 10;
    }

    cameraRef.current.position.lerp(new THREE.Vector3(x, y, z), 0.04);
    cameraRef.current.rotation.x = THREE.MathUtils.lerp(cameraRef.current.rotation.x, rotX || 0, 0.04);
    cameraRef.current.rotation.y = THREE.MathUtils.lerp(cameraRef.current.rotation.y, rotY || 0, 0.04);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={60} />;
}

/* ─────────────────────────────────────────────────────────────
   Scroll progress bridge
───────────────────────────────────────────────────────────── */
function ScrollBridge() {
  useEffect(() => {
    const send = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const val = total > 0 ? el.scrollTop / total : 0;
      const pct = Math.floor(val * 100);
      window.dispatchEvent(new CustomEvent('portfolio-scroll', { detail: pct }));
    };
    window.addEventListener('scroll', send, { passive: true });
    return () => window.removeEventListener('scroll', send);
  }, []);
  return null;
}

/* ─────────────────────────────────────────────────────────────
   Main Scene Component
───────────────────────────────────────────────────────────── */
export default function Scene3D() {
  return (
    <Canvas
      // FIX: Changed zIndex from -1 to 1 so the canvas renders above
      // the page background but below the UI content (which uses z-20+).
      // Also kept pointerEvents none so clicks pass through to the UI.
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
      dpr={[1, 1.25]}
      gl={{
        antialias: false,
        alpha: true,           // keeps the canvas background transparent
        powerPreference: 'high-performance',
      }}
      // FIX: Explicitly set a transparent clear colour so Three.js
      // does not paint a solid black background over the page.
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <CameraRig />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[8, 8, 4]} intensity={4} color="#8ff5ff" />
      <pointLight position={[-8, -8, -4]} intensity={3} color="#d674ff" />



      {/* Background Elements */}
      <Stars radius={180} depth={50} count={3500} factor={4} saturation={0} fade speed={0.5} />
      <Grid
        infiniteGrid
        fadeDistance={50}
        fadeStrength={8}
        cellSize={1}
        sectionSize={5}
        sectionColor="#00ff41"
        cellColor="#004411"
        position={[0, -12, 0]}
      />

      <ScrollBridge />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={1} intensity={1} radius={0.3} />
        <Vignette darkness={0.8} offset={0.3} />
      </EffectComposer>
    </Canvas>
  );
}