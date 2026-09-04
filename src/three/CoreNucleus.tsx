import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CoreNucleus({
  position = [0, 0, 0] as [number, number, number],
  color = '#22d3ee',
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const innerShellRef = useRef<THREE.Mesh>(null);

  const ringRefs = useRef<THREE.Mesh[]>([]);
  const setRingRef = (el: THREE.Mesh | null, i: number) => {
    if (el) ringRefs.current[i] = el;
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.2;
      coreRef.current.rotation.x = t * 0.1;
      const s = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.setScalar(s);
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = -t * 0.1;
      shellRef.current.rotation.z = t * 0.05;
    }
    if (innerShellRef.current) {
      innerShellRef.current.rotation.x = t * 0.15;
      innerShellRef.current.rotation.y = t * 0.12;
    }
    if (groupRef.current) {
      groupRef.current.position.set(...position);
    }
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = t * (0.3 + i * 0.1);
        ring.rotation.y = t * (0.2 + i * 0.15);
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.15 + Math.sin(t * 2 + i) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <mesh ref={innerShellRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[3.5, 1]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => setRingRef(el, i)}
          rotation={[Math.PI / 2 + i * 0.5, i * 0.3, 0]}
        >
          <ringGeometry args={[4 + i * 0.8, 4.3 + i * 0.8, 64]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
