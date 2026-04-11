'use client';

export default function BackgroundMarquee() {
  const lines = [
    "WEB DEVELOPMENT • NEXT.JS • REACT • TAILWIND • TYPESCRIPT • UI/UX DESIGN • WEB DEVELOPMENT • NEXT.JS • REACT • TAILWIND • TYPESCRIPT • UI/UX DESIGN • ",
    "ARTIFICIAL INTELLIGENCE • MACHINE LEARNING • NEURAL NETWORKS • DEEP LEARNING • ARTIFICIAL INTELLIGENCE • MACHINE LEARNING • NEURAL NETWORKS • ",
    "SYSTEM DESIGN • SCALABILITY • CLOUD ARCHITECTURE • SERVERLESS • DATABASE DESIGN • SYSTEM DESIGN • SCALABILITY • CLOUD ARCHITECTURE • SERVERLESS • ",
    "PYTHON • PYTORCH • TENSORFLOW • SCIKIT-LEARN • DATA SCIENCE • PANDAS • PYTHON • PYTORCH • TENSORFLOW • SCIKIT-LEARN • DATA SCIENCE • PANDAS • ",
    "C++ • CORE ALGORITHMS • DATA STRUCTURES • LEETCODE • PROBLEM SOLVING • C++ • CORE ALGORITHMS • DATA STRUCTURES • LEETCODE • PROBLEM SOLVING • ",
    "FULL-STACK ENGINEERING • EVENT ARCHITECTURE • INNGEST • FIREBASE • FULL-STACK ENGINEERING • EVENT ARCHITECTURE • INNGEST • FIREBASE • ",
    "ELDEN RING • THE WITCHER 3 • CYBERPUNK 2077 • GOD OF WAR • RED DEAD REDEMPTION 2 • SEKIRO • DARK SOULS • ELDEN RING • THE WITCHER 3 • ",
    "INNOVATION • PERFORMANCE • OPTIMIZATION • CLEAN CODE • RESPONSIVE DESIGN • INNOVATION • PERFORMANCE • OPTIMIZATION • CLEAN CODE • ",
    "WEB DEVELOPMENT • ARTIFICIAL INTELLIGENCE • ENGINEERING • SOFTWARE ARCHITECTURE • WEB DEVELOPMENT • ARTIFICIAL INTELLIGENCE • ENGINEERING • "
  ];

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        pointerEvents: 'none', 
        zIndex: 0,
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        padding: '2vh 0'
      }}
    >
      {lines.map((text, idx) => {
        const fullText = text + text + text + text;
        const isLeft = idx % 2 === 0;
        
        return (
          <div key={idx} style={{ whiteSpace: 'nowrap', width: '200vw' }}>
            <h1 className={isLeft ? "marquee-left" : "marquee-right"} style={{ color: 'var(--primary-neon)', opacity: 0.02, fontWeight: 900 }}>
              {fullText}
            </h1>
          </div>
        );
      })}
    </div>
  );
}
