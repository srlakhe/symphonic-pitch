import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';

const painPoints = [
  'Agents overwrite each other when they touch the same files',
  'Switching between Codex, Claude Code, and other agents is painful',
  'No single view of what each agent is building',
];

export const S02_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bgDark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
        padding: 120,
      }}
    >
      {painPoints.map((point, i) => {
        const delay = i * 25;
        const progress = spring({
          frame: frame - delay,
          fps,
          config: SPRING.snappy,
        });

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              opacity: Math.min(progress * 1.5, 1),
              transform: `translateX(${(1 - Math.min(progress, 1)) * -60}px)`,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: C.statusError,
                flexShrink: 0,
                boxShadow: `0 0 12px ${C.statusError}66`,
              }}
            />
            <span
              style={{
                fontFamily: FONT.ui,
                fontSize: 30,
                color: C.textOnDark,
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              {point}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
