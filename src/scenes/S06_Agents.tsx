import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { MockTerminal } from '../components/MockTerminal';
import { C, FONT, SPRING } from '../theme/constants';

const codexLines = [
  'symphonic agent:codex',
  'Reading project structure...',
  'Generating REST endpoints for /users',
  '✓ src/routes/users.ts created',
  '✓ src/routes/projects.ts created',
  '✓ Tests passing (10/10)',
  'Task complete.',
];

const claudeLines = [
  'symphonic agent:claude-code',
  'Analyzing codebase for auth patterns...',
  'Implementing JWT middleware',
  '✓ src/middleware/auth.ts created',
  '✓ src/routes/api.ts updated',
  '✓ Tests passing (12/12)',
  'Task complete.',
];

export const S06_Agents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame: frame - 5, fps, config: SPRING.slow });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          fontFamily: FONT.display,
          color: C.text,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          opacity: Math.min(titleProgress * 1.5, 1),
          transform: `translateY(${(1 - Math.min(titleProgress, 1)) * 20}px)`,
        }}
      >
        Run Codex and Claude Code side by side.
      </div>

      {/* Terminals */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* Codex */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: C.codex,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                color: '#FFF',
                fontFamily: FONT.display,
              }}
            >
              X
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.codex, fontFamily: FONT.body }}>
              Codex
            </span>
          </div>
          <MockTerminal
            title="Codex — rest-endpoints"
            lines={codexLines}
            startFrame={15}
            charsPerFrame={1.0}
            accentColor={C.codex}
            width={700}
            height={340}
          />
        </div>

        {/* Claude Code */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: C.claude,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                color: '#FFF',
                fontFamily: FONT.display,
              }}
            >
              C
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.claude, fontFamily: FONT.body }}>
              Claude Code
            </span>
          </div>
          <MockTerminal
            title="Claude Code — auth-middleware"
            lines={claudeLines}
            startFrame={20}
            charsPerFrame={1.0}
            accentColor={C.claude}
            variant="light"
            width={700}
            height={340}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
