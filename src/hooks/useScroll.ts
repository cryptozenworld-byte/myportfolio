import { useState, useEffect, useRef } from 'react';

export function useScrollProgress() {
  const scrollProgress = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
      scrollProgress.current = p;
      setProgress(p);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrollProgress, progress };
}

export function useQualityDetect(): 'high' | 'low' {
  const [quality, setQuality] = useState<'high' | 'low'>('high');

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || cores <= 2 || memory <= 2 || isReduced) {
      setQuality('low');
    }
  }, []);

  return quality;
}

export function useJumpToSection(
  scrollProgress: React.MutableRefObject<number>,
  maxScrollRef: React.MutableRefObject<number>,
) {
  return (index: number) => {
    const sectionCount = 5;
    const targetProgress = sectionCount > 1 ? index / (sectionCount - 1) : 0;
    const targetScroll = targetProgress * maxScrollRef.current;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };
}
