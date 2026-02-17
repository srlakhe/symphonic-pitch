import React from 'react';
import { AbsoluteFill } from 'remotion';
import { MockAppUI } from '../components/MockAppUI';
import { C } from '../theme/constants';

export const S04_AppOverview: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bgSubtle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle radial glow behind the product */}
      <div
        style={{
          position: 'absolute',
          width: 1200,
          height: 800,
          background: `radial-gradient(ellipse at center, ${C.accentGlow} 0%, transparent 60%)`,
        }}
      />
      <MockAppUI startFrame={0} />
    </AbsoluteFill>
  );
};
