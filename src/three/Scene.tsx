import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';

import { ParticleField } from './ParticleField';
import { CoreNucleus } from './CoreNucleus';
import { AllSectionAnchors, SectionConnections, sections } from './SectionAnchors';
import { CameraRig } from './CameraRig';
import { Effects } from './Effects';

interface SceneProps {
  scrollProgress: React.MutableRefObject<number>;
  activeIndex: number;
  onSectionChange: (index: number) => void;
  quality: 'high' | 'low';
}

function SceneContent({ scrollProgress, activeIndex, onSectionChange }: Omit<SceneProps, 'quality'>) {
  return (
    <>
      <CameraRig scrollProgress={scrollProgress} onSectionChange={onSectionChange} />

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 0]} intensity={2} color="#22d3ee" distance={50} />
      <pointLight position={[20, -5, -10]} intensity={1.5} color="#e879f9" distance={50} />
      <pointLight position={[40, 5, 0]} intensity={1} color="#34d399" distance={50} />

      <fog attach="fog" args={['#030208', 15, 55]} />

      <ParticleField count={1500} areaSize={120} areaHeight={50} />
      <CoreNucleus position={sections[0].position} color={sections[0].color} />
      <AllSectionAnchors activeIndex={activeIndex} />
      <SectionConnections />
    </>
  );
}

export function Scene({ scrollProgress, activeIndex, onSectionChange, quality }: SceneProps) {
  const glProps = useMemo(
    () => ({
      antialias: quality === 'high',
      alpha: false,
      powerPreference: 'high-performance' as const,
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 1.2,
    }),
    [quality],
  );

  return (
    <Canvas
      gl={glProps}
      camera={{ fov: 65, near: 0.1, far: 200, position: [0, 2, 10] }}
      dpr={quality === 'high' ? [1, 2] : 1}
    >
      <Suspense fallback={null}>
        <SceneContent
          scrollProgress={scrollProgress}
          activeIndex={activeIndex}
          onSectionChange={onSectionChange}
        />
        <Effects quality={quality} />
      </Suspense>
    </Canvas>
  );
}
