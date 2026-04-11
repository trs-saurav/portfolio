'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function GamerController() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[8, 4, -5]} scale={0.8}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main Body - Obsidian Brutalism style (sharp edges) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 1.5, 0.8]} />
          <meshStandardMaterial color="#131313" metalness={1} roughness={0.1} />
        </mesh>

        {/* Left Grip */}
        <mesh position={[-2.5, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <capsuleGeometry args={[0.8, 2, 4, 16]} />
          <meshStandardMaterial color="#131313" metalness={1} roughness={0.1} />
        </mesh>

        {/* Right Grip */}
        <mesh position={[2.5, -0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <capsuleGeometry args={[0.8, 2, 4, 16]} />
          <meshStandardMaterial color="#131313" metalness={1} roughness={0.1} />
        </mesh>

        {/* Left Glow Joystic */}
        <group position={[-1.2, 0, 0.5]}>
           <mesh>
              <sphereGeometry args={[0.4, 32, 32]} />
              <meshStandardMaterial color="#00fbfb" emissive="#00fbfb" emissiveIntensity={5} />
           </mesh>
           <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.5, 0.05, 16, 100]} />
              <meshStandardMaterial color="#00fbfb" emissive="#00fbfb" emissiveIntensity={2} />
           </mesh>
        </group>

        {/* Right Glow Joystic */}
        <group position={[1.2, -0.4, 0.5]}>
           <mesh>
              <sphereGeometry args={[0.4, 32, 32]} />
              <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={5} />
           </mesh>
           <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.5, 0.05, 16, 100]} />
              <meshStandardMaterial color="#7000ff" emissive="#7000ff" emissiveIntensity={2} />
           </mesh>
        </group>

        {/* Glass Face Plate */}
        <mesh position={[0, 0, 0.45]}>
           <boxGeometry args={[3.8, 1.3, 0.1]} />
           <MeshTransmissionMaterial 
             backside 
             thickness={0.5} 
             transmission={1} 
             chromaticAberration={0.1} 
             roughness={0} 
             color="#ffffff" 
           />
        </mesh>

        {/* Action Buttons (Right) - Subtle Glowing nodes */}
        {[0, 1, 2, 3].map((i) => (
           <mesh key={i} position={[2.8 + Math.cos(i * Math.PI/2) * 0.4, 0.2 + Math.sin(i * Math.PI/2) * 0.4, 0.5]}>
              <boxGeometry args={[0.15, 0.15, 0.1]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
           </mesh>
        ))}

        {/* D-Pad (Left) */}
        <mesh position={[-2.8, 0.2, 0.5]}>
           <boxGeometry args={[0.6, 0.15, 0.1]} />
           <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-2.8, 0.2, 0.5]}>
           <boxGeometry args={[0.15, 0.6, 0.1]} />
           <meshStandardMaterial color="#ffffff" />
        </mesh>
      </Float>
    </group>
  );
}
