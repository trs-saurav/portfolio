'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Scene3D from '@/components/Scene3D';
import Navigation from '@/components/Navigation';
import WelcomeLoader from '@/components/WelcomeLoader';
import { TerminalBackground } from '@/components/reactbits/TerminalBackground';
import { PixelTrail } from '@/components/reactbits/PixelTrail';

import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Timeline from '@/components/Timeline';
import ProjectsAndStats from '@/components/ProjectsAndStats';
import Creative from '@/components/Creative';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  return (
    <>
      {/* Sitewide pixel trail cursor effect */}
      <PixelTrail color="#00ff41" size={8} />

      {/* Fixed 3D canvas background (disabled or kept along with terminal) */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Terminal Matrix Rain Background */}
      <TerminalBackground color="#00ff41" />

      {/* Welcome Screen */}
      <WelcomeLoader onCompleteAction={() => setLoading(false)} />

      {/* Fixed overlays */}
      <Navigation />


      {/* Native scroll content - Only render after loading so animations sync perfectly */}
      {!loading && (
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'relative',
            zIndex: 1,
            pointerEvents: 'auto',
          }}
        >
          <Hero />
          <About />
          <TechStack />
          <Timeline />
          <ProjectsAndStats />
          <Creative />
          <Contact />
          <Footer />
        </motion.main>
      )}
    </>
  );
}
