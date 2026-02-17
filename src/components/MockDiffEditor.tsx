import React from 'react';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';

interface DiffLine {
  type: 'add' | 'remove' | 'context';
  content: string;
}

interface MockDiffEditorProps {
  fileName?: string;
  lines: DiffLine[];
  startFrame?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export const MockDiffEditor: React.FC<MockDiffEditorProps> = ({
  fileName = 'src/api/handler.ts',
  lines,
  startFrame = 0,
  width = 900,
  height = 460,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING.snappy,
  });

  const visibleLines = Math.floor(
    Math.min((frame - startFrame) / 3, lines.length)
  );

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#1E1E2E',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        opacity: Math.min(entryProgress, 1),
        transform: `translateY(${(1 - Math.min(entryProgress, 1)) * 40}px)`,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* File tab bar */}
      <div
        style={{
          height: 36,
          backgroundColor: 'rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          gap: 4,
        }}
      >
        <div
          style={{
            padding: '4px 14px',
            fontSize: 12,
            fontFamily: FONT.mono,
            color: 'rgba(255,255,255,0.7)',
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderRadius: 4,
          }}
        >
          {fileName}
        </div>
        <div
          style={{
            marginLeft: 8,
            fontSize: 11,
            color: 'rgba(255,255,255,0.3)',
            fontFamily: FONT.ui,
          }}
        >
          +{lines.filter((l) => l.type === 'add').length} / −
          {lines.filter((l) => l.type === 'remove').length}
        </div>
      </div>

      {/* Diff lines */}
      <div style={{ flex: 1, padding: '8px 0', overflow: 'hidden' }}>
        {lines.slice(0, Math.max(0, visibleLines)).map((line, i) => {
          const bgColor =
            line.type === 'add'
              ? C.diffAddBg
              : line.type === 'remove'
              ? C.diffRemoveBg
              : 'transparent';
          const prefix =
            line.type === 'add' ? '+' : line.type === 'remove' ? '−' : ' ';
          const textColor =
            line.type === 'add'
              ? C.diffAdd
              : line.type === 'remove'
              ? C.diffRemove
              : 'rgba(255,255,255,0.5)';

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                fontFamily: FONT.mono,
                fontSize: 13,
                lineHeight: '24px',
                backgroundColor: bgColor,
              }}
            >
              <span
                style={{
                  width: 40,
                  textAlign: 'right',
                  paddingRight: 12,
                  color: 'rgba(255,255,255,0.2)',
                  userSelect: 'none',
                }}
              >
                {i + 1}
              </span>
              <span style={{ width: 20, color: textColor }}>{prefix}</span>
              <span style={{ color: textColor }}>{line.content}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
