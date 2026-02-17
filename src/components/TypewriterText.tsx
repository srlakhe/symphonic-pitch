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
  color = C.textOnDark,
  fontFamily = FONT.mono,
  cursor = true,
  style,
}) => {
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
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        ...style,
      }}
    >
      {displayText}
      {showCursor && (
        <span
          style={{
            display: 'inline-block',
            width: fontSize * 0.55,
            height: fontSize * 1.1,
            backgroundColor: color,
            marginLeft: 2,
            verticalAlign: 'text-bottom',
            opacity: 0.8,
          }}
        />
      )}
    </div>
  );
};
