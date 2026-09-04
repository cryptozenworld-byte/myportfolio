import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField({
  count = 2000,
  areaSize = 120,
  areaHeight = 60,
}: {
  count?: number;
  areaSize?: number;
  areaHeight?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colorA = new THREE.Color('#22d3ee');
    const colorB = new THREE.Color('#e879f9');
    const colorC = new THREE.Color('#818cf8');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * areaSize;
      positions[i3 + 1] = (Math.random() - 0.5) * areaHeight;
      positions[i3 + 2] = (Math.random() - 0.5) * areaSize;

      const pick = Math.random();
      const c = pick < 0.4 ? colorA : pick < 0.7 ? colorB : colorC;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions, colors, velocities };
  }, [count, areaSize, areaHeight]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3] * delta * 60;
      arr[i3 + 1] += velocities[i3 + 1] * delta * 60;
      arr[i3 + 2] += velocities[i3 + 2] * delta * 60;

      const halfS = areaSize / 2;
      const halfH = areaHeight / 2;
      if (Math.abs(arr[i3]) > halfS) velocities[i3] *= -1;
      if (Math.abs(arr[i3 + 1]) > halfH) velocities[i3 + 1] *= -1;
      if (Math.abs(arr[i3 + 2]) > halfS) velocities[i3 + 2] *= -1;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.12}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
