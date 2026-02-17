import React from 'react';
import { AbsoluteFill } from 'remotion';
import { MockAppUI } from '../components/MockAppUI';
import { C } from '../theme/constants';

export const S04_AppOverview: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, #EEF0F4 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MockAppUI startFrame={0} />
    </AbsoluteFill>
  );
};
