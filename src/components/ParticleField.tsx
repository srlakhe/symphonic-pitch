import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  style?: React.CSSProperties;
}

// Simple seeded random for deterministic particles
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 40,
  color = 'rgba(79,70,229,0.25)',
  style,
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: count }, (): Particle => ({
      x: rand() * 1920,
      y: rand() * 1080,
      size: 2 + rand() * 4,
      speed: 0.2 + rand() * 0.6,
      opacity: 0.15 + rand() * 0.4,
      drift: (rand() - 0.5) * 0.3,
    }));
  }, [count]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {particles.map((p, i) => {
        const y = (p.y - frame * p.speed) % 1080;
        const adjustedY = y < 0 ? y + 1080 : y;
        const x = p.x + Math.sin(frame * 0.02 + i) * 20 * p.drift;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: adjustedY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: p.opacity * (0.7 + Math.sin(frame * 0.05 + i * 2) * 0.3),
            }}
          />
        );
      })}
    </div>
  );
};
