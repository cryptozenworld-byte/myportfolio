import { useState, useEffect, useRef } from 'react';
import { Scene } from '@/three/Scene';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ProgressBar } from '@/components/ProgressBar';
import { ScrollHint } from '@/components/ScrollHint';
import { SectionContent } from '@/components/SectionContent';
import { useScrollProgress, useQualityDetect, useJumpToSection } from '@/hooks/useScroll';
import { sections } from '@/three/SectionAnchors';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollProgress, progress } = useScrollProgress();
  const quality = useQualityDetect();
  const maxScrollRef = useRef(1);

  const jumpToSection = useJumpToSection(scrollProgress, maxScrollRef);

  useEffect(() => {
    const update = () => {
      maxScrollRef.current = document.documentElement.scrollHeight - window.innerHeight || 1;
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [loading]);

  const showHint = activeIndex === 0 && progress < 0.01 && !loading;
  const sectionColor = sections[activeIndex]?.color || '#22d3ee';

  return (
    <div className="relative w-full h-full">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Scrollable spacer — drives the journey */}
      <div style={{ height: '500vh' }} className="relative w-full" />

      {/* Fixed 3D scene */}
      <div className="fixed inset-0 z-0">
        <Scene
          scrollProgress={scrollProgress}
          activeIndex={activeIndex}
          onSectionChange={setActiveIndex}
          quality={quality}
        />
      </div>

      {/* Vignette overlay for depth — kept light to not harm readability */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(3,2,8,0.4) 100%)',
        }}
      />

      {/* Section content overlay */}
      <SectionContent activeIndex={activeIndex} />

      {/* Top-left brand */}
      <div className="fixed top-6 left-6 z-30 pointer-events-none">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full transition-colors duration-1000"
            style={{
              backgroundColor: sectionColor,
              boxShadow: `0 0 8px ${sectionColor}`,
            }}
          />
          <span className="font-mono-tech text-white/40 text-xs tracking-widest uppercase">
            Synapse
          </span>
        </div>
      </div>

      {/* Section indicator (top) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <p
          className="font-mono-tech text-xs tracking-[0.3em] uppercase transition-colors duration-700"
          style={{ color: `${sectionColor}99` }}
        >
          {String(activeIndex + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')} —{' '}
          {sections[activeIndex]?.label}
        </p>
      </div>

      {/* Right-side progress bar / nav */}
      <ProgressBar activeIndex={activeIndex} onJump={jumpToSection} />

      {/* Scroll hint */}
      <ScrollHint visible={showHint} />
    </div>
  );
}

export default App;
