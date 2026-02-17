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

  // Radial wipe: dark to light
  const wipeProgress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Logo spring
  const logoSpring = spring({
    frame: frame - 20,
    fps,
    config: SPRING.bouncy,
  });

  // Tagline
  const taglineProgress = spring({
    frame: frame - 45,
    fps,
    config: SPRING.snappy,
  });

  // Underline width
  const underlineWidth = interpolate(
    spring({ frame: frame - 55, fps, config: SPRING.gentle }),
    [0, 1],
    [0, 380]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bgDark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Radial gradient wipe */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${C.bg} ${wipeProgress * 120}%, ${C.bgDark} ${wipeProgress * 120 + 5}%)`,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          zIndex: 1,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity: Math.min(logoSpring * 2, 1),
            transform: `scale(${0.5 + Math.min(logoSpring, 1) * 0.5})`,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 40px ${C.accent}44`,
            }}
          >
            <span
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: '#FFF',
                fontFamily: FONT.ui,
              }}
            >
              S
            </span>
          </div>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              fontFamily: FONT.ui,
              color: C.text,
              letterSpacing: -2,
            }}
          >
            Symphonic
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: Math.min(taglineProgress * 1.5, 1),
            transform: `translateY(${(1 - Math.min(taglineProgress, 1)) * 20}px)`,
            fontSize: 28,
            fontFamily: FONT.ui,
            color: C.textMuted,
            fontWeight: 400,
          }}
        >
          Your AI agents, building in parallel.
        </div>

        {/* Underline */}
        <div
          style={{
            width: underlineWidth,
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
