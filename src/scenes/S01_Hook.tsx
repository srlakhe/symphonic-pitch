import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';

export const S01_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = spring({ frame: frame - 10, fps, config: SPRING.slow });
  const line2 = spring({ frame: frame - 40, fps, config: SPRING.slow });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          fontFamily: FONT.display,
          color: C.text,
          letterSpacing: '-0.03em',
          opacity: Math.min(line1 * 1.5, 1),
          transform: `translateY(${(1 - Math.min(line1, 1)) * 30}px)`,
          textAlign: 'center',
        }}
      >
        You have the best AI coding agents.
      </div>

      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          fontFamily: FONT.display,
          color: C.accent,
          letterSpacing: '-0.03em',
          opacity: Math.min(line2 * 1.5, 1),
          transform: `translateY(${(1 - Math.min(line2, 1)) * 30}px)`,
          textAlign: 'center',
        }}
      >
        What if they could build together?
      </div>
    </AbsoluteFill>
  );
};
