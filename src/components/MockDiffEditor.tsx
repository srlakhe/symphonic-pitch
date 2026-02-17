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

  const entryProgress = spring({ frame: frame - startFrame, fps, config: SPRING.gentle });
  const visibleLines = Math.floor(Math.min((frame - startFrame) / 3, lines.length));

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: C.bg,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${C.cardBorder}`,
        boxShadow: `0 24px 80px rgba(0,0,0,0.06)`,
        opacity: Math.min(entryProgress * 1.5, 1),
        transform: `translateY(${(1 - Math.min(entryProgress, 1)) * 30}px)`,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* File tab */}
      <div
        style={{
          height: 36,
          backgroundColor: C.bgSubtle,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 16,
          gap: 8,
          borderBottom: `1px solid ${C.separator}`,
        }}
      >
        <div
          style={{
            padding: '3px 12px',
            fontSize: 11,
            fontFamily: FONT.mono,
            color: C.textSecondary,
            backgroundColor: C.bg,
            borderRadius: 4,
          }}
        >
          {fileName}
        </div>
        <div style={{ fontSize: 10, color: C.textTertiary, fontFamily: FONT.body }}>
          +{lines.filter((l) => l.type === 'add').length} / −{lines.filter((l) => l.type === 'remove').length}
        </div>
      </div>

      {/* Lines */}
      <div style={{ flex: 1, padding: '8px 0', overflow: 'hidden' }}>
        {lines.slice(0, Math.max(0, visibleLines)).map((line, i) => {
          const prefix = line.type === 'add' ? '+' : line.type === 'remove' ? '−' : ' ';
          const textColor = line.type === 'add' ? C.diffAdd : line.type === 'remove' ? C.diffRemove : C.textTertiary;
          const bgColor = line.type === 'add' ? C.diffAddBg : line.type === 'remove' ? C.diffRemoveBg : 'transparent';

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                fontFamily: FONT.mono,
                fontSize: 12,
                lineHeight: '22px',
                backgroundColor: bgColor,
              }}
            >
              <span style={{ width: 40, textAlign: 'right', paddingRight: 12, color: C.textTertiary, userSelect: 'none' }}>
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
