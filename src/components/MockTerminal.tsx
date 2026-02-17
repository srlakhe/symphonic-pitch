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
  accentColor = C.accent,
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
    config: SPRING.gentle,
  });

  const isLight = variant === 'light';

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: isLight ? '#F5F5F7' : '#1D1D1F',
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isLight
          ? '0 20px 60px rgba(0,0,0,0.06)'
          : '0 20px 60px rgba(0,0,0,0.15)',
        opacity: Math.min(entryProgress * 1.5, 1),
        transform: `scale(${0.92 + Math.min(entryProgress, 1) * 0.08}) translateY(${(1 - Math.min(entryProgress, 1)) * 20}px)`,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 36,
          backgroundColor: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 14,
          gap: 8,
          borderBottom: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FF5F57', opacity: 0.8 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FEBC2E', opacity: 0.8 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28C840', opacity: 0.8 }} />
        </div>
        <span
          style={{
            fontSize: 11,
            fontFamily: FONT.body,
            color: isLight ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)',
            marginLeft: 4,
          }}
        >
          {title}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: '12px 16px',
          fontFamily: FONT.mono,
          fontSize: 12,
          lineHeight: 1.7,
          color: isLight ? '#1D1D1F' : '#E5E5E5',
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
        }}
      >
        <span style={{ color: accentColor, opacity: 0.8 }}>❯ </span>
        {displayText}
        {showCursor && (
          <span
            style={{
              display: 'inline-block',
              width: 2,
              height: 14,
              backgroundColor: accentColor,
              marginLeft: 2,
              verticalAlign: 'text-bottom',
              opacity: Math.floor(frame / 15) % 2 === 0 ? 0.9 : 0,
            }}
          />
        )}
      </div>
    </div>
  );
};
