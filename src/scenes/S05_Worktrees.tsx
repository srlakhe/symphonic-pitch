import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';

const branches = [
  { name: 'feat/api', color: C.codex, yOffset: -90, agent: 'Codex' },
  { name: 'feat/auth', color: C.claude, yOffset: 0, agent: 'Claude' },
  { name: 'feat/tests', color: C.claude, yOffset: 90, agent: 'Claude' },
];

export const S05_Worktrees: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineProgress = interpolate(frame, [15, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleProgress = spring({ frame: frame - 5, fps, config: SPRING.slow });
  const headingProgress = spring({ frame: frame - 15, fps, config: SPRING.slow });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 140,
      }}
    >
      {/* Left: Branch diagram */}
      <div style={{ position: 'relative', width: 440, height: 380 }}>
        <svg width="440" height="380" style={{ position: 'absolute', top: 0, left: 0 }}>
          <line
            x1="60" y1="40" x2="60" y2="340"
            stroke="rgba(0,0,0,0.10)"
            strokeWidth="2"
            strokeDasharray={`${lineProgress * 300}`}
          />
          {branches.map((branch, i) => {
            const branchDelay = 25 + i * 15;
            const bp = interpolate(frame, [branchDelay, branchDelay + 30], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const startY = 110 + i * 90;

            return (
              <g key={i}>
                <path
                  d={`M 60 ${startY} C 140 ${startY}, 140 ${startY + branch.yOffset * 0.25}, 220 ${startY + branch.yOffset * 0.25}`}
                  fill="none"
                  stroke={branch.color}
                  strokeWidth="2"
                  strokeDasharray={`${bp * 200}`}
                  opacity={0.7}
                />
                <circle cx="60" cy={startY} r="5" fill={C.bg} stroke={branch.color} strokeWidth="2" opacity={bp} />
                <rect
                  x="220"
                  y={startY + branch.yOffset * 0.25 - 14}
                  width={bp * 140}
                  height="28"
                  rx="6"
                  fill={`${branch.color}10`}
                  stroke={branch.color}
                  strokeWidth="1"
                  opacity={bp}
                />
                {bp > 0.5 && (
                  <text
                    x="236"
                    y={startY + branch.yOffset * 0.25 + 4}
                    fontFamily={FONT.mono}
                    fontSize="11"
                    fill={branch.color}
                    opacity={Math.min((bp - 0.5) * 2, 1)}
                  >
                    {branch.name}
                  </text>
                )}
              </g>
            );
          })}
          <text x="50" y="30" fontFamily={FONT.mono} fontSize="11" fill={C.textTertiary} textAnchor="middle" opacity={lineProgress}>
            main
          </text>
        </svg>
      </div>

      {/* Right: Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            fontFamily: FONT.body,
            color: C.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            opacity: Math.min(titleProgress * 2, 1),
          }}
        >
          Parallel by default
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            fontFamily: FONT.display,
            color: C.text,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            opacity: Math.min(headingProgress * 1.5, 1),
            transform: `translateY(${(1 - Math.min(headingProgress, 1)) * 20}px)`,
          }}
        >
          Every agent works in its own space.
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            fontFamily: FONT.body,
            color: C.textSecondary,
            lineHeight: 1.6,
            opacity: Math.min(headingProgress * 1.2, 1),
          }}
        >
          Isolated environments. No stepping on each other. Results merged automatically.
        </div>
      </div>
    </AbsoluteFill>
  );
};
