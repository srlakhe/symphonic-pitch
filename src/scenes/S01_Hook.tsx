import React from 'react';
import { AbsoluteFill } from 'remotion';
import { AnimatedText } from '../components/AnimatedText';
import { ParticleField } from '../components/ParticleField';
import { C } from '../theme/constants';

export const S01_Hook: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bgDark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <ParticleField count={35} color="rgba(79,70,229,0.2)" />

      <AnimatedText
        text="You have the best AI coding agents."
        delay={15}
        fontSize={52}
        color={C.textOnDark}
        fontWeight={300}
        style={{ textAlign: 'center', maxWidth: 1200, zIndex: 1 }}
      />

      <AnimatedText
        text="What if they could build together?"
        delay={35}
        fontSize={52}
        color={C.accentLight}
        fontWeight={600}
        style={{ textAlign: 'center', maxWidth: 1200, zIndex: 1 }}
      />
    </AbsoluteFill>
  );
};
