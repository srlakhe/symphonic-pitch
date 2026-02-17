import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';

const painPoints = [
  { icon: '🔀', word: 'Conflicts', detail: 'Two agents, one branch. Constant rebasing.' },
  { icon: '🪟', word: 'Chaos', detail: 'A terminal per agent. No unified view.' },
  { icon: '🔍', word: 'Blindness', detail: 'Which agent changed what? No idea.' },
];

export const S02_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame: frame - 5, fps, config: SPRING.slow });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 80,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 500,
          fontFamily: FONT.body,
          color: C.textSecondary,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: Math.min(titleProgress * 2, 1),
        }}
      >
        The problem today
      </div>

      {/* Three pillars */}
      <div
        style={{
          display: 'flex',
          gap: 100,
          alignItems: 'flex-start',
        }}
      >
        {painPoints.map((point, i) => {
          const delay = 20 + i * 20;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: SPRING.gentle,
          });

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                width: 320,
                opacity: Math.min(progress * 1.5, 1),
                transform: `translateY(${(1 - Math.min(progress, 1)) * 40}px)`,
              }}
            >
              <div style={{ fontSize: 48 }}>{point.icon}</div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  fontFamily: FONT.display,
                  color: C.text,
                  letterSpacing: '-0.02em',
                }}
              >
                {point.word}
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  fontFamily: FONT.body,
                  color: C.textSecondary,
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                {point.detail}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
