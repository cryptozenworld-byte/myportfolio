import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

interface EffectsProps {
  quality: 'high' | 'low';
}

export function Effects({ quality }: EffectsProps) {
  if (quality === 'low') {
    return (
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.7}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0008, 0.0008)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette
        eskil={false}
        offset={0.2}
        darkness={0.8}
      />
    </EffectComposer>
  );
}
