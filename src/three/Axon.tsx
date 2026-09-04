import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AxonProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  flowSpeed?: number;
}

export function Axon({
  start,
  end,
  color = '#22d3ee',
  flowSpeed = 1,
}: AxonProps) {
  const pulseRef = useRef<THREE.Mesh>(null);

  const { curve, lineObject } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = s.clone().lerp(e, 0.5);
    const dist = s.distanceTo(e);
    mid.add(
      new THREE.Vector3(
        (Math.random() - 0.5) * dist * 0.2,
        (Math.random() - 0.5) * dist * 0.2,
        (Math.random() - 0.5) * dist * 0.2,
      ),
    );
    const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
    const points = curve.getPoints(64);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 });
    const lineObject = new THREE.Line(geo, mat);
    return { curve, lineObject };
  }, [start, end, color]);

  useFrame((state) => {
    const t = (state.clock.elapsedTime * flowSpeed * 0.3) % 1;
    if (pulseRef.current) {
      const pos = curve.getPoint(t);
      pulseRef.current.position.copy(pos);
      const m = pulseRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = Math.sin(t * Math.PI) * 0.8;
    }
  });

  return (
    <group>
      <primitive object={lineObject} />
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export function AxonBundle({
  connections,
  color,
}: {
  connections: { start: [number, number, number]; end: [number, number, number] }[];
  color: string;
}) {
  return (
    <group>
      {connections.map((c, i) => (
        <Axon key={i} start={c.start} end={c.end} color={color} flowSpeed={0.5 + (i % 3) * 0.3} />
      ))}
    </group>
  );
}
