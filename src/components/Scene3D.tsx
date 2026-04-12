'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stars,
  Float,
  PerspectiveCamera,
  MeshDistortMaterial,
  Sphere,
  Grid,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────
   Camera Rig — driven by native scroll progress
───────────────────────────────────────────────────────────── */
function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      progress.current = el.scrollTop / (el.scrollHeight - el.clientHeight);
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

    cameraRef.current.position.lerp(new THREE.Vector3(x, y, z), 0.04);
    cameraRef.current.rotation.x = THREE.MathUtils.lerp(cameraRef.current.rotation.x, rotX, 0.04);
    cameraRef.current.rotation.y = THREE.MathUtils.lerp(cameraRef.current.rotation.y, rotY, 0.04);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={60} />;
}

/* ─────────────────────────────────────────────────────────────
   Core Orb
───────────────────────────────────────────────────────────── */
function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.4;
    meshRef.current.rotation.y = t * 0.2;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.6, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial color="#00fbfb" emissive="#009999" emissiveIntensity={1.2} distort={0.35} speed={2} roughness={0.1} metalness={0.9} transparent opacity={0.85} />
      </Sphere>
    </Float>
  );
}

/* ─────────────────────────────────────────────────────────────
   Orbital Rings
───────────────────────────────────────────────────────────── */
function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef  = useRef<THREE.Mesh>(null);
  const innerRef  = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current)  groupRef.current.rotation.y  = t * 0.08;
    if (outerRef.current)  outerRef.current.rotation.z  = t * 0.15;
    if (innerRef.current)  innerRef.current.rotation.x  = t * 0.25;
  });
  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      <mesh ref={outerRef} rotation={[Math.PI / 2.8, 0.3, 0]}>
        <torusGeometry args={[3.2, 0.006, 6, 256]} />
        <meshStandardMaterial color="#d674ff" emissive="#d674ff" emissiveIntensity={4} transparent opacity={0.55} />
      </mesh>
      <mesh ref={innerRef} rotation={[Math.PI / 2, 0.6, 0]}>
        <torusGeometry args={[2.5, 0.008, 6, 256]} />
        <meshStandardMaterial color="#00fbfb" emissive="#00fbfb" emissiveIntensity={4} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scroll progress bridge — fires native scroll % on event
───────────────────────────────────────────────────────────── */
function ScrollBridge() {
  useEffect(() => {
    const send = () => {
      const el = document.documentElement;
      const pct = Math.floor((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      window.dispatchEvent(new CustomEvent('portfolio-scroll', { detail: pct }));
    };
    window.addEventListener('scroll', send, { passive: true });
    return () => window.removeEventListener('scroll', send);
  }, []);
  return null;
}

/* ─────────────────────────────────────────────────────────────
   Root — Canvas is a FIXED background; HTML sections are native
───────────────────────────────────────────────────────────── */
export default function Scene3D() {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <CameraRig />
      <ambientLight intensity={0.25} />
      <pointLight position={[8,  8,  4]}  intensity={4} color="#8ff5ff" />
      <pointLight position={[-8, -8, -4]} intensity={3} color="#d674ff" />
      <Stars radius={180} depth={50} count={3500} factor={4} saturation={0} fade speed={0.5} />
      <Grid
        infiniteGrid
        fadeDistance={50}
        fadeStrength={8}
        cellSize={1}
        sectionSize={5}
        sectionColor="#7000ff"
        cellColor="#00fbfb"
        position={[0, -12, 0]}
      />
      <ScrollBridge />
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={1.2} mipmapBlur intensity={1.2} radius={0.4} />
        <Vignette darkness={1.2} offset={0.3} />
      </EffectComposer>
    </Canvas>
  );
}
