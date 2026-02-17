import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';
import { TypewriterText } from '../components/TypewriterText';
import { AnimatedText } from '../components/AnimatedText';
import { ParticleField } from '../components/ParticleField';
import { C, FONT, SPRING } from '../theme/constants';

export const S09_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glow button
  const btnProgress = spring({
    frame: frame - 90,
    fps,
    config: SPRING.bouncy,
  });

  const glowPulse = Math.sin(frame * 0.08) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bgDark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
      }}
    >
      <ParticleField count={25} color="rgba(129,140,248,0.2)" />

      {/* Typewriter line */}
      <TypewriterText
        text="Build whatever you want."
        startFrame={10}
        charsPerFrame={1.2}
        fontSize={48}
        color={C.textOnDark}
        fontFamily={FONT.ui}
        style={{ zIndex: 1, fontWeight: 300 }}
      />

      {/* Spring-in line */}
      <AnimatedText
        text="Let your agents build it together."
        delay={55}
        fontSize={52}
        color={C.accentLight}
        fontWeight={700}
        style={{ zIndex: 1 }}
      />

      {/* Logo + Button */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          marginTop: 20,
          zIndex: 1,
          opacity: Math.min(btnProgress * 2, 1),
          transform: `scale(${Math.min(btnProgress, 1)})`,
        }}
      >
        {/* Small logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700,
              color: '#FFF',
              fontFamily: FONT.ui,
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: C.textOnDark,
              fontFamily: FONT.ui,
            }}
          >
            Symphonic
          </span>
        </div>

        {/* CTA Button */}
        <div
          style={{
            padding: '16px 48px',
            borderRadius: 14,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
            color: '#FFF',
            fontFamily: FONT.ui,
            fontSize: 20,
            fontWeight: 600,
            boxShadow: `0 0 ${40 * glowPulse}px ${C.accent}88`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          Get Started →
        </div>
      </div>
    </AbsoluteFill>
  );
};
