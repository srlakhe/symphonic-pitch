import React from 'react';
import { useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { FONT, SPRING } from '../theme/constants';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  fontFamily?: string;
  springConfig?: typeof SPRING.snappy;
  letterSpacing?: number;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 48,
  color = '#FFFFFF',
  fontWeight = 700,
  fontFamily = FONT.display,
  springConfig = SPRING.gentle,
  letterSpacing = -0.02,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfig,
  });

  const opacity = Math.min(progress * 1.5, 1);
  const translateY = (1 - Math.min(progress, 1)) * 40;

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        fontFamily,
        color,
        opacity,
        transform: `translateY(${translateY}px)`,
        lineHeight: 1.1,
        letterSpacing: `${letterSpacing}em`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
