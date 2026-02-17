import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';

export const S10_EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({
    frame: frame - 10,
    fps,
    config: SPRING.gentle,
  });

  const urlProgress = spring({
    frame: frame - 35,
    fps,
    config: SPRING.snappy,
  });

  // Fade to white at end
  const fadeOut = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          zIndex: 1,
          opacity: Math.min(logoProgress * 2, 1),
          transform: `scale(${0.8 + Math.min(logoProgress, 1) * 0.2})`,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${C.accent}, #0A84FF)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 6px 30px ${C.accentGlow}`,
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#FFF',
              fontFamily: FONT.display,
            }}
          >
            S
          </span>
        </div>
        <span
          style={{
            fontSize: 56,
            fontWeight: 700,
            fontFamily: FONT.display,
            color: C.text,
            letterSpacing: '-0.02em',
          }}
        >
          Symphonic
        </span>
      </div>

      {/* GitHub URL */}
      <div
        style={{
          opacity: Math.min(urlProgress * 1.5, 1),
          transform: `translateY(${(1 - Math.min(urlProgress, 1)) * 15}px)`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 20,
            color: C.accent,
            padding: '8px 24px',
            backgroundColor: `${C.accent}08`,
            borderRadius: 8,
            border: `1px solid ${C.accent}18`,
          }}
        >
          github.com/symphonic
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: FONT.body,
          fontSize: 18,
          color: C.textSecondary,
          zIndex: 1,
          opacity: Math.min(urlProgress * 1.5, 1),
        }}
      >
        Your AI agents, building in parallel.
      </div>

      {/* Fade to white */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FFFFFF',
          opacity: fadeOut,
          zIndex: 10,
        }}
      />
    </AbsoluteFill>
  );
};
