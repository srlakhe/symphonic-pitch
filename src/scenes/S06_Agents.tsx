import React from 'react';
import { AbsoluteFill } from 'remotion';
import { MockTerminal } from '../components/MockTerminal';
import { AgentAvatar } from '../components/AgentAvatar';
import { AnimatedText } from '../components/AnimatedText';
import { C } from '../theme/constants';

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
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, #F5F3FF 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
      }}
    >
      {/* Title */}
      <AnimatedText
        text="Run Codex and Claude Code side by side"
        delay={5}
        fontSize={36}
        color={C.text}
        fontWeight={600}
        style={{ textAlign: 'center', marginBottom: 10 }}
      />

      {/* Side-by-side terminals */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          alignItems: 'flex-start',
        }}
      >
        {/* Codex */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <AgentAvatar
            name="OpenAI Codex"
            color={C.codex}
            letter="X"
            delay={10}
            size={48}
          />
          <MockTerminal
            title="Codex — rest-endpoints"
            lines={codexLines}
            startFrame={15}
            charsPerFrame={1.0}
            accentColor={C.codex}
            width={680}
            height={340}
          />
        </div>

        {/* Claude Code */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <AgentAvatar
            name="Claude Code"
            color={C.claude}
            letter="C"
            delay={20}
            size={48}
          />
          <MockTerminal
            title="Claude Code — auth-middleware"
            lines={claudeLines}
            startFrame={20}
            charsPerFrame={1.0}
            accentColor={C.claude}
            variant="light"
            width={680}
            height={340}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
