import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';

export const S03_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame: frame - 15, fps, config: SPRING.gentle });
  const wordProgress = spring({ frame: frame - 30, fps, config: SPRING.slow });
  const taglineProgress = spring({ frame: frame - 55, fps, config: SPRING.slow });

  const glowOpacity = interpolate(frame, [15, 50], [0, 0.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.accent} 0%, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          zIndex: 1,
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 22,
            background: `linear-gradient(135deg, ${C.accent}, #0A84FF)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: Math.min(logoScale * 2, 1),
            transform: `scale(${0.3 + Math.min(logoScale, 1) * 0.7})`,
            boxShadow: `0 8px 40px ${C.accentGlow}`,
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: '#FFF',
              fontFamily: FONT.display,
            }}
          >
            S
          </span>
        </div>

        {/* Word */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            fontFamily: FONT.display,
            color: C.text,
            letterSpacing: '-0.04em',
            opacity: Math.min(wordProgress * 1.5, 1),
            transform: `translateY(${(1 - Math.min(wordProgress, 1)) * 20}px)`,
          }}
        >
          Symphonic
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            fontFamily: FONT.body,
            color: C.textSecondary,
            opacity: Math.min(taglineProgress * 1.5, 1),
            transform: `translateY(${(1 - Math.min(taglineProgress, 1)) * 15}px)`,
          }}
        >
          Your AI agents, building in parallel.
        </div>
      </div>
    </AbsoluteFill>
  );
};
