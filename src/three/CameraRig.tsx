import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sections } from './SectionAnchors';

interface CameraRigProps {
  scrollProgress: React.MutableRefObject<number>;
  onSectionChange: (index: number) => void;
  lookOffset?: [number, number, number];
}

export function CameraRig({ scrollProgress, onSectionChange, lookOffset = [0, 0, 0] }: CameraRigProps) {
  const { camera } = useThree();
  const currentSection = useRef(0);
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3());
  const lastReportedSection = useRef(-1);

  const { curve, totalPoints } = useMemo(() => {
    const points = sections.map((s) => new THREE.Vector3(...s.position));
    // Add intermediate points for smoother curves between sections
    const expandedPoints: THREE.Vector3[] = [points[0].clone()];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      const dist = a.distanceTo(b);
      const steps = Math.max(4, Math.ceil(dist / 3));
      for (let j = 1; j < steps; j++) {
        const t = j / steps;
        const pos = a.clone().lerp(b, t);
        // Add a gentle arc between sections
        pos.y += Math.sin(t * Math.PI) * 2.5;
        expandedPoints.push(pos);
      }
      expandedPoints.push(b.clone());
    }
    const curve = new THREE.CatmullRomCurve3(expandedPoints, false, 'catmullrom', 0.3);
    return { curve, totalPoints: 200 };
  }, []);

  useFrame(() => {
    const progress = scrollProgress.current;
    const clamped = THREE.MathUtils.clamp(progress, 0, 0.999);

    // Position camera along the spline
    const pos = curve.getPointAt(clamped);
    // Offset camera slightly above and outside the path
    targetPos.current.set(pos.x + lookOffset[0], pos.y + 2 + lookOffset[1], pos.z + 5 + lookOffset[2]);

    // Smoothly move camera toward target
    camera.position.lerp(targetPos.current, 0.08);

    // Determine which section to look at
    const sectionFloat = clamped * (sections.length - 1);
    const sectionIdx = Math.round(sectionFloat);
    const sectionFrac = sectionFloat - Math.floor(sectionFloat);

    // Look at current section or interpolate toward next
    const currentSectionPos = new THREE.Vector3(...sections[sectionIdx].position);
    const nextSectionPos =
      sectionIdx < sections.length - 1
        ? new THREE.Vector3(...sections[sectionIdx + 1].position)
        : currentSectionPos;
    targetLook.current.copy(
      currentSectionPos.lerp(nextSectionPos, sectionFrac * 0.5),
    );

    currentLook.current.lerp(targetLook.current, 0.06);
    camera.lookAt(currentLook.current);

    // Report section changes
    if (sectionIdx !== lastReportedSection.current) {
      lastReportedSection.current = sectionIdx;
      currentSection.current = sectionIdx;
      onSectionChange(sectionIdx);
    }
  });

  return null;
}
