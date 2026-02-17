import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';
import { LAYOUT } from './theme/constants';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SymphonicPitch"
        component={Video}
        durationInFrames={LAYOUT.totalFrames}
        fps={LAYOUT.fps}
        width={LAYOUT.width}
        height={LAYOUT.height}
      />
    </>
  );
};
