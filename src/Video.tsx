import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { SCENES } from './theme/constants';

import { S01_Hook } from './scenes/S01_Hook';
import { S02_Problem } from './scenes/S02_Problem';
import { S03_Intro } from './scenes/S03_Intro';
import { S04_AppOverview } from './scenes/S04_AppOverview';
import { S05_Worktrees } from './scenes/S05_Worktrees';
import { S06_Agents } from './scenes/S06_Agents';
import { S07_DiffMerge } from './scenes/S07_DiffMerge';
import { S08_Montage } from './scenes/S08_Montage';
import { S09_CTA } from './scenes/S09_CTA';
import { S10_EndCard } from './scenes/S10_EndCard';

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0F1117' }}>
      <Sequence from={SCENES.S01.from} durationInFrames={SCENES.S01.duration} name="S01 — Hook">
        <S01_Hook />
      </Sequence>

      <Sequence from={SCENES.S02.from} durationInFrames={SCENES.S02.duration} name="S02 — Problem">
        <S02_Problem />
      </Sequence>

      <Sequence from={SCENES.S03.from} durationInFrames={SCENES.S03.duration} name="S03 — Logo Reveal">
        <S03_Intro />
      </Sequence>

      <Sequence from={SCENES.S04.from} durationInFrames={SCENES.S04.duration} name="S04 — App Overview">
        <S04_AppOverview />
      </Sequence>

      <Sequence from={SCENES.S05.from} durationInFrames={SCENES.S05.duration} name="S05 — Worktrees">
        <S05_Worktrees />
      </Sequence>

      <Sequence from={SCENES.S06.from} durationInFrames={SCENES.S06.duration} name="S06 — Parallel Agents">
        <S06_Agents />
      </Sequence>

      <Sequence from={SCENES.S07.from} durationInFrames={SCENES.S07.duration} name="S07 — Diff & Merge">
        <S07_DiffMerge />
      </Sequence>

      <Sequence from={SCENES.S08.from} durationInFrames={SCENES.S08.duration} name="S08 — Montage">
        <S08_Montage />
      </Sequence>

      <Sequence from={SCENES.S09.from} durationInFrames={SCENES.S09.duration} name="S09 — CTA">
        <S09_CTA />
      </Sequence>

      <Sequence from={SCENES.S10.from} durationInFrames={SCENES.S10.duration} name="S10 — End Card">
        <S10_EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
