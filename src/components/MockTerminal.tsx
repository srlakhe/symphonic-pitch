import React from 'react';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { useTypewriter } from '../hooks/useTypewriter';
import { C, FONT, SPRING } from '../theme/constants';

interface MockTerminalProps {
  title?: string;
  lines: string[];
  startFrame?: number;
  charsPerFrame?: number;
  accentColor?: string;
  width?: number;
  height?: number;
  variant?: 'dark' | 'light';
  style?: React.CSSProperties;
}

export const MockTerminal: React.FC<MockTerminalProps> = ({
  title = 'Terminal',
  lines,
  startFrame = 0,
  charsPerFrame = 1.2,
  accentColor = C.terminalPrompt,
  width = 800,
  height = 400,
  variant = 'dark',
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fullText = lines.join('\n');

  const { displayText, showCursor } = useTypewriter({
    text: fullText,
    startFrame,
    charsPerFrame,
  });

  const entryProgress = spring({
    frame: frame - Math.max(0, startFrame - 10),
    fps,
    config: SPRING.snappy,
  });

  const isDark = variant === 'dark';
  const bgColor = isDark ? C.terminal : '#FAFBFC';
  const titleBarBg = isDark ? 'rgba(255,255,255,0.06)' : '#F0F1F3';
  const titleColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const textColor = isDark ? C.terminalText : '#1A1D26';
  const cursorColor = isDark ? C.terminalText : '#1A1D26';
  const shadowColor = isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.12)';

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: bgColor,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: `0 20px 60px ${shadowColor}`,
        border: isDark ? 'none' : '1px solid #E5E7EB',
        opacity: Math.min(entryProgress, 1),
        transform: `scale(${0.9 + entryProgress * 0.1})`,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 36,
          backgroundColor: titleBarBg,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 14,
          paddingRight: 14,
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28C840' }} />
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 12,
            color: titleColor,
            fontFamily: FONT.ui,
          }}
        >
          {title}
        </div>
      </div>

      {/* Terminal content */}
      <div
        style={{
          flex: 1,
          padding: 16,
          fontFamily: FONT.mono,
          fontSize: 14,
          color: textColor,
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
        }}
      >
        <span style={{ color: accentColor }}>❯ </span>
        {displayText}
        {showCursor && (
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 16,
              backgroundColor: cursorColor,
              marginLeft: 1,
              verticalAlign: 'text-bottom',
              opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0,
            }}
          />
        )}
      </div>
    </div>
  );
};
