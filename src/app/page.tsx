'use client';

import { Suspense, useState, useEffect } from 'react';
import Scene3D from '@/components/Scene3D';
import Navigation from '@/components/Navigation';
import WelcomeLoader from '@/components/WelcomeLoader';
import GamerHUD from '@/components/GamerHUD';
import { TerminalBackground } from '@/components/reactbits/TerminalBackground';

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
      {!loading && <GamerHUD />}

      {/* Native scroll content - Only render after loading so animations sync perfectly */}
      {!loading && (
        <main
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
        </main>
      )}
    </>
  );
}
