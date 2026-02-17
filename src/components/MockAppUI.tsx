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

const statusColors = {
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

  const flyIn = spring({ frame: frame - startFrame, fps, config: SPRING.slow });
  const scale = interpolate(flyIn, [0, 1], [0.88, 1]);
  const opacity = Math.min(flyIn * 1.5, 1);

  const termText = terminalLines.join('\n');
  const { displayText, showCursor } = useTypewriter({
    text: termText,
    startFrame: startFrame + 40,
    charsPerFrame: 1.5,
  });

  const diffSlide = interpolate(frame - startFrame, [110, 150], [200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 1400,
        height: 800,
        borderRadius: 20,
        overflow: 'hidden',
        border: `1px solid ${C.cardBorder}`,
        boxShadow: `0 40px 120px rgba(0,0,0,0.10), 0 0 0 1px ${C.cardBorder}`,
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
          height: 44,
          backgroundColor: C.bgSubtle,
          borderBottom: `1px solid ${C.separator}`,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <div style={{ display: 'flex', gap: 7, marginRight: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28C840' }} />
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: `linear-gradient(135deg, ${C.accent}, #0A84FF)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: '#FFF', fontFamily: FONT.display }}>S</span>
        </div>
        <span style={{ fontFamily: FONT.body, fontWeight: 600, fontSize: 13, color: C.text }}>Symphonic</span>
        <span
          style={{
            fontFamily: FONT.mono,
            fontSize: 11,
            color: C.textTertiary,
            marginLeft: 12,
            padding: '2px 8px',
            borderRadius: 4,
            backgroundColor: C.cardBg,
            border: `1px solid ${C.cardBorder}`,
          }}
        >
          myorg/backend-api
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.textTertiary, fontFamily: FONT.body }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.statusRunning }} />
          2 agents active
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 260,
            backgroundColor: C.bgSubtle,
            borderRight: `1px solid ${C.separator}`,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              fontFamily: FONT.body,
              color: C.textTertiary,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '8px 8px 4px',
            }}
          >
            Sessions
          </div>
          {sessions.map((s, i) => (
            <div
              key={i}
              style={{
                backgroundColor: i === 0 ? C.bg : 'transparent',
                borderRadius: 8,
                padding: '8px 10px',
                border: i === 0 ? `1px solid ${C.cardBorder}` : '1px solid transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: statusColors[s.status] }} />
                <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 500, color: C.text }}>{s.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, paddingLeft: 13 }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: s.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 7,
                    color: '#FFF',
                    fontWeight: 700,
                  }}
                >
                  {s.agent === 'Codex' ? 'X' : 'C'}
                </div>
                <span style={{ fontFamily: FONT.body, fontSize: 10, color: C.textTertiary }}>{s.agent}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal + Diff */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Tabs */}
            <div
              style={{
                height: 30,
                backgroundColor: C.bgSubtle,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                gap: 2,
                borderBottom: `1px solid ${C.separator}`,
              }}
            >
              {['Agent: Codex', 'Agent: Claude Code'].map((tab, i) => (
                <div
                  key={i}
                  style={{
                    padding: '3px 12px',
                    fontSize: 10,
                    fontFamily: FONT.body,
                    color: i === 0 ? C.text : C.textTertiary,
                    backgroundColor: i === 0 ? C.bg : 'transparent',
                    borderRadius: '4px 4px 0 0',
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div
              style={{
                flex: 1,
                padding: 16,
                fontFamily: FONT.mono,
                fontSize: 11,
                lineHeight: 1.8,
                color: C.terminal,
                backgroundColor: '#1D1D1F',
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
              }}
            >
              <span style={{ color: C.terminalText }}>
                {displayText}
              </span>
              {showCursor && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 2,
                    height: 13,
                    backgroundColor: C.terminalPrompt,
                    marginLeft: 1,
                    verticalAlign: 'text-bottom',
                    opacity: Math.floor(frame / 15) % 2 === 0 ? 0.8 : 0,
                  }}
                />
              )}
            </div>
          </div>

          {/* Diff panel */}
          <div
            style={{
              height: 180,
              backgroundColor: C.bgSubtle,
              borderTop: `1px solid ${C.separator}`,
              transform: `translateY(${diffSlide}px)`,
              padding: 12,
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: 10, fontFamily: FONT.body, color: C.textTertiary, marginBottom: 6 }}>
              Changes — src/routes/users.ts
            </div>
            {[
              { type: 'remove', text: '  // TODO: Add user routes' },
              { type: 'add', text: '  router.get("/users", listUsers);' },
              { type: 'add', text: '  router.get("/users/:id", getUser);' },
              { type: 'add', text: '  router.post("/users", createUser);' },
              { type: 'context', text: '  export default router;' },
            ].map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 10,
                  lineHeight: '18px',
                  color: line.type === 'add' ? C.diffAdd : line.type === 'remove' ? C.diffRemove : C.textTertiary,
                  backgroundColor: line.type === 'add' ? C.diffAddBg : line.type === 'remove' ? C.diffRemoveBg : 'transparent',
                  paddingLeft: 8,
                }}
              >
                {line.type === 'add' ? '+ ' : line.type === 'remove' ? '− ' : '  '}{line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
