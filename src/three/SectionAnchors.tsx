import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NeuronCluster } from './NeuronNode';
import { AxonBundle } from './Axon';

interface SectionAnchorProps {
  position: [number, number, number];
  color: string;
  label: string;
  index: number;
  active: boolean;
}

export function SectionAnchor({ position, color, index, active }: SectionAnchorProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const discRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      const s = active ? 1 + Math.sin(t * 4) * 0.15 : 1;
      ringRef.current.scale.setScalar(s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = active ? 0.6 : 0.25;
    }
    if (discRef.current) {
      const mat = discRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = active ? 0.15 : 0.05;
    }
  });

  return (
    <group position={position}>
      <NeuronCluster center={[0, 0, 0]} count={12} radius={3} color={color} seed={index * 1000 + 42} />
      <mesh ref={discRef} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.5, 5, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export interface SectionConfig {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
}

export const sections: SectionConfig[] = [
  { id: 'intro', label: 'Intro', position: [0, 0, 0], color: '#22d3ee' },
  { id: 'about', label: 'About', position: [12, 4, -8], color: '#818cf8' },
  { id: 'projects', label: 'Projects', position: [26, -2, -16], color: '#e879f9' },
  { id: 'experience', label: 'Experience', position: [40, 3, -10], color: '#34d399' },
  { id: 'contact', label: 'Contact', position: [52, -1, 4], color: '#fbbf24' },
];

export function SectionConnections() {
  const connections = useMemo(() => {
    const result: { start: [number, number, number]; end: [number, number, number] }[] = [];
    for (let i = 0; i < sections.length - 1; i++) {
      result.push({ start: sections[i].position, end: sections[i + 1].position });
    }
    // Add cross-connections for visual richness
    result.push({ start: sections[0].position, end: sections[2].position });
    result.push({ start: sections[1].position, end: sections[3].position });
    result.push({ start: sections[2].position, end: sections[4].position });
    return result;
  }, []);

  return <AxonBundle connections={connections} color="#22d3ee" />;
}

export function AllSectionAnchors({ activeIndex }: { activeIndex: number }) {
  return (
    <group>
      {sections.map((s, i) => (
        <SectionAnchor
          key={s.id}
          position={s.position}
          color={s.color}
          label={s.label}
          index={i}
          active={i === activeIndex}
        />
      ))}
    </group>
  );
}
