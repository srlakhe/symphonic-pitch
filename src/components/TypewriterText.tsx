import React from 'react';
import { useCurrentFrame } from 'remotion';
import { useTypewriter } from '../hooks/useTypewriter';
import { FONT, C } from '../theme/constants';

interface TypewriterTextProps {
  text: string;
  startFrame?: number;
  charsPerFrame?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  cursor?: boolean;
  style?: React.CSSProperties;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame = 0,
  charsPerFrame = 0.8,
  fontSize = 40,
  color = C.text,
  fontFamily = FONT.display,
  cursor = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { displayText, showCursor } = useTypewriter({
    text,
    startFrame,
    charsPerFrame,
    cursor,
  });

  return (
    <div
      style={{
        fontSize,
        fontFamily,
        color,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        whiteSpace: 'pre-wrap',
        ...style,
      }}
    >
      {displayText}
      {showCursor && (
        <span
          style={{
            display: 'inline-block',
            width: 3,
            height: fontSize * 0.85,
            backgroundColor: C.accent,
            marginLeft: 4,
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </div>
  );
};
