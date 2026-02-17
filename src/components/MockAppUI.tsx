import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';
import { useTypewriter } from '../hooks/useTypewriter';

interface MockAppUIProps {
  startFrame?: number;
  style?: React.CSSProperties;
}

const sessions = [
  { name: 'Scaffold REST endpoints', agent: 'Codex', status: 'running' as const, color: C.codex },
  { name: 'Add auth middleware', agent: 'Claude Code', status: 'completed' as const, color: C.claude },
  { name: 'Write API tests', agent: 'Claude Code', status: 'paused' as const, color: C.claude },
];

const statusColor = {
  running: C.statusRunning,
  completed: C.statusRunning,
  paused: C.statusPaused,
};

const terminalLines = [
  '$ symphonic run --agent codex --task "Scaffold REST endpoints"',
  'Creating worktree: .worktrees/rest-endpoints',
  'Agent codex started on branch feat/rest-endpoints',
  'Watching for changes...',
  '✓ Created: src/routes/users.ts',
  '✓ Created: src/routes/projects.ts',
  '✓ Agent completed task in 38s',
];

export const MockAppUI: React.FC<MockAppUIProps> = ({
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Overall fly-in
  const flyIn = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING.gentle,
  });

  const scale = interpolate(flyIn, [0, 1], [0.85, 1]);
  const opacity = Math.min(flyIn * 1.5, 1);

  // Sequential panel highlights
  const highlightPhase = Math.floor(
    interpolate(frame - startFrame, [60, 180], [0, 3], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Terminal typewriter
  const termText = terminalLines.join('\n');
  const { displayText, showCursor } = useTypewriter({
    text: termText,
    startFrame: startFrame + 30,
    charsPerFrame: 1.5,
  });

  return (
    <div
      style={{
        width: 1400,
        height: 800,
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.15)',
        border: '1px solid rgba(0,0,0,0.08)',
        backgroundColor: C.bg,
        opacity,
        transform: `scale(${scale})`,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          height: 48,
          backgroundColor: C.cardBg,
          borderBottom: `1px solid ${C.cardBorder}`,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          boxShadow: highlightPhase === 0 ? `0 0 0 2px ${C.accent}` : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        {/* App icon */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
            marginRight: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: FONT.ui,
          }}
        >
          S
        </div>
        <span
          style={{
            fontFamily: FONT.ui,
            fontWeight: 600,
            fontSize: 15,
            color: C.text,
          }}
        >
          Symphonic
        </span>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 12,
            color: C.textMuted,
            marginLeft: 16,
            backgroundColor: C.sidebar,
            padding: '3px 10px',
            borderRadius: 4,
          }}
        >
          myorg/backend-api
        </span>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            fontSize: 12,
            color: C.textMuted,
            fontFamily: FONT.ui,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: C.statusRunning,
            }}
          />
          2 agents active
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 280,
            backgroundColor: C.sidebar,
            borderRight: `1px solid ${C.cardBorder}`,
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            boxShadow: highlightPhase === 1 ? `inset 0 0 0 2px ${C.accent}` : 'none',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              fontFamily: FONT.ui,
              color: C.textMuted,
              textTransform: 'uppercase',
              letterSpacing: 1,
              padding: '4px 8px',
            }}
          >
            Sessions
          </div>
          {sessions.map((s, i) => (
            <div
              key={i}
              style={{
                backgroundColor: i === 0 ? C.cardBg : 'transparent',
                borderRadius: 8,
                padding: '10px 12px',
                border: i === 0 ? `1px solid ${C.cardBorder}` : '1px solid transparent',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: statusColor[s.status],
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT.ui,
                    fontSize: 13,
                    fontWeight: 500,
                    color: C.text,
                  }}
                >
                  {s.name}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  paddingLeft: 16,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    backgroundColor: s.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 8,
                    color: '#FFF',
                    fontWeight: 700,
                  }}
                >
                  {s.agent === 'Claude Code' ? 'C' : 'X'}
                </div>
                <span
                  style={{
                    fontFamily: FONT.ui,
                    fontSize: 11,
                    color: C.textMuted,
                  }}
                >
                  {s.agent}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal + Diff area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Terminal */}
          <div
            style={{
              flex: 1,
              backgroundColor: C.terminal,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: highlightPhase === 2 ? `inset 0 0 0 2px ${C.accent}` : 'none',
            }}
          >
            {/* Terminal tabs */}
            <div
              style={{
                height: 32,
                backgroundColor: 'rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                gap: 2,
              }}
            >
              {['Agent: Codex', 'Agent: Claude Code'].map((tab, i) => (
                <div
                  key={i}
                  style={{
                    padding: '4px 14px',
                    fontSize: 11,
                    fontFamily: FONT.ui,
                    color: i === 0 ? '#FFF' : 'rgba(255,255,255,0.4)',
                    backgroundColor: i === 0 ? 'rgba(255,255,255,0.1)' : 'transparent',
                    borderRadius: '4px 4px 0 0',
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>
            {/* Terminal content */}
            <div
              style={{
                flex: 1,
                padding: 16,
                fontFamily: FONT.mono,
                fontSize: 12,
                lineHeight: 1.8,
                color: C.terminalText,
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
              }}
            >
              {displayText}
              {showCursor && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 7,
                    height: 14,
                    backgroundColor: C.terminalText,
                    marginLeft: 1,
                    verticalAlign: 'text-bottom',
                    opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0,
                  }}
                />
              )}
            </div>
          </div>

          {/* Diff panel (slides up) */}
          <div
            style={{
              height: 200,
              backgroundColor: '#1A1D26',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              transform: `translateY(${interpolate(
                frame - startFrame,
                [100, 140],
                [200, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              )}px)`,
              padding: 12,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontFamily: FONT.ui,
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 8,
              }}
            >
              Changes — src/middleware/auth.ts
            </div>
            {[
              { type: 'remove', text: '  // TODO: Add authentication' },
              { type: 'add', text: '  const token = req.headers.authorization;' },
              { type: 'add', text: '  if (!token) return res.status(401).json({ error: "Unauthorized" });' },
              { type: 'context', text: '  const user = await verifyToken(token);' },
              { type: 'add', text: '  req.user = user;' },
              { type: 'add', text: '  next();' },
            ].map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 11,
                  lineHeight: '20px',
                  color:
                    line.type === 'add'
                      ? C.diffAdd
                      : line.type === 'remove'
                      ? C.diffRemove
                      : 'rgba(255,255,255,0.4)',
                  backgroundColor:
                    line.type === 'add'
                      ? C.diffAddBg
                      : line.type === 'remove'
                      ? C.diffRemoveBg
                      : 'transparent',
                  paddingLeft: 8,
                }}
              >
                {line.type === 'add' ? '+ ' : line.type === 'remove' ? '− ' : '  '}
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
