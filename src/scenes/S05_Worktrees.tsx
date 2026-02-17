import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';
import { GlowBadge } from '../components/GlowBadge';
import { AnimatedText } from '../components/AnimatedText';

const branches = [
  { name: 'feat/api', color: C.codex, y: -80, agent: 'Codex' },
  { name: 'feat/auth', color: C.claude, y: 0, agent: 'Claude' },
  { name: 'feat/tests', color: C.claude, y: 80, agent: 'Claude' },
];

export const S05_Worktrees: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Branch line drawing animation
  const lineProgress = interpolate(frame, [15, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${C.bg} 0%, #F0F0FF 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 120,
      }}
    >
      {/* Left: Branch diagram */}
      <div style={{ position: 'relative', width: 500, height: 400 }}>
        {/* Main trunk */}
        <svg
          width="500"
          height="400"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Main line */}
          <line
            x1="80"
            y1="50"
            x2="80"
            y2="350"
            stroke={C.textMuted}
            strokeWidth="3"
            strokeDasharray={`${lineProgress * 300}`}
            strokeDashoffset="0"
            opacity={0.3}
          />

          {/* Branch lines */}
          {branches.map((branch, i) => {
            const branchDelay = 25 + i * 15;
            const branchProgress = interpolate(
              frame,
              [branchDelay, branchDelay + 30],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            const startY = 120 + i * 80;

            return (
              <g key={i}>
                {/* Fork line */}
                <path
                  d={`M 80 ${startY} C 160 ${startY}, 160 ${startY + branch.y * 0.3}, 240 ${startY + branch.y * 0.3}`}
                  fill="none"
                  stroke={branch.color}
                  strokeWidth="2.5"
                  strokeDasharray={`${branchProgress * 200}`}
                  opacity={0.8}
                />
                {/* Branch dot */}
                <circle
                  cx="80"
                  cy={startY}
                  r="6"
                  fill={C.bg}
                  stroke={branch.color}
                  strokeWidth="2.5"
                  opacity={branchProgress}
                />
                {/* Worktree node */}
                <rect
                  x="240"
                  y={startY + branch.y * 0.3 - 16}
                  width={branchProgress * 160}
                  height="32"
                  rx="8"
                  fill={`${branch.color}18`}
                  stroke={branch.color}
                  strokeWidth="1.5"
                  opacity={branchProgress}
                />
                {branchProgress > 0.5 && (
                  <text
                    x="260"
                    y={startY + branch.y * 0.3 + 5}
                    fontFamily={FONT.mono}
                    fontSize="12"
                    fill={branch.color}
                    opacity={Math.min((branchProgress - 0.5) * 2, 1)}
                  >
                    {branch.name}
                  </text>
                )}
              </g>
            );
          })}

          {/* Main label */}
          <text
            x="60"
            y="40"
            fontFamily={FONT.mono}
            fontSize="13"
            fill={C.textMuted}
            textAnchor="middle"
            opacity={lineProgress}
          >
            main
          </text>
        </svg>
      </div>

      {/* Right: Feature text */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          maxWidth: 500,
        }}
      >
        <GlowBadge text="ISOLATION" delay={10} />

        <AnimatedText
          text="Each agent gets its own worktree"
          delay={25}
          fontSize={42}
          color={C.text}
          fontWeight={700}
        />

        <AnimatedText
          text="No conflicts. No locks. Full git history. Agents work on separate branches in parallel."
          delay={45}
          fontSize={20}
          color={C.textMuted}
          fontWeight={400}
          style={{ lineHeight: 1.6 }}
        />
      </div>
    </AbsoluteFill>
  );
};
