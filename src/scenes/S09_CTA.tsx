import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';
import { TypewriterText } from '../components/TypewriterText';
import { AnimatedText } from '../components/AnimatedText';
import { C, FONT, SPRING } from '../theme/constants';

export const S09_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const btnProgress = spring({
    frame: frame - 90,
    fps,
    config: SPRING.bouncy,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
      }}
    >
      {/* Typewriter line */}
      <TypewriterText
        text="Build whatever you want."
        startFrame={10}
        charsPerFrame={1.2}
        fontSize={56}
        color={C.textSecondary}
        fontFamily={FONT.display}
        style={{ zIndex: 1, fontWeight: 300 }}
      />

      {/* Spring-in line */}
      <AnimatedText
        text="Let your agents build it together."
        delay={55}
        fontSize={60}
        color={C.text}
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
              background: `linear-gradient(135deg, ${C.accent}, #0A84FF)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700,
              color: '#FFF',
              fontFamily: FONT.display,
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: C.text,
              fontFamily: FONT.display,
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
            background: `linear-gradient(135deg, ${C.accent}, #0A84FF)`,
            color: '#FFF',
            fontFamily: FONT.body,
            fontSize: 20,
            fontWeight: 600,
            boxShadow: `0 4px 20px ${C.accentGlow}`,
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
