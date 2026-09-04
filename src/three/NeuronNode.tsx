import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuronNodeProps {
  position: [number, number, number];
  color?: string;
  size?: number;
  pulsePhase?: number;
  active?: boolean;
}

export function NeuronNode({
  position,
  color = '#22d3ee',
  size = 0.3,
  pulsePhase = 0,
  active = false,
}: NeuronNodeProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + pulsePhase;
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.08;
      coreRef.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.15;
      glowRef.current.scale.setScalar(s);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.sin(t * 1.5) * 0.05;
    }
    if (ringRef.current && active) {
      ringRef.current.rotation.z = t * 0.5;
      const s = 1 + Math.sin(t * 3) * 0.1;
      ringRef.current.scale.setScalar(s);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.3 + Math.sin(t * 3) * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[size * 2.5, 1]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
      {active && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 3.5, size * 4, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

export function NeuronCluster({
  center,
  count,
  radius,
  color,
  seed,
}: {
  center: [number, number, number];
  count: number;
  radius: number;
  color: string;
  seed: number;
}) {
  const nodes = useMemo(() => {
    const rng = mulberry32(seed);
    return Array.from({ length: count }, () => {
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      const r = radius * (0.3 + rng() * 0.7);
      return {
        position: [
          center[0] + r * Math.sin(phi) * Math.cos(theta),
          center[1] + r * Math.sin(phi) * Math.sin(theta),
          center[2] + r * Math.cos(phi),
        ] as [number, number, number],
        size: 0.15 + rng() * 0.25,
        phase: rng() * Math.PI * 2,
      };
    });
  }, [center, count, radius, seed]);

  return (
    <group>
      {nodes.map((n, i) => (
        <NeuronNode
          key={i}
          position={n.position}
          color={color}
          size={n.size}
          pulsePhase={n.phase}
        />
      ))}
    </group>
  );
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
