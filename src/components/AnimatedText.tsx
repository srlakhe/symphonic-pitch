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
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 48,
  color = '#FFFFFF',
  fontWeight = 600,
  fontFamily = FONT.ui,
  springConfig = SPRING.snappy,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfig,
  });

  const opacity = Math.min(progress, 1);
  const translateY = (1 - progress) * 30;

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        fontFamily,
        color,
        opacity,
        transform: `translateY(${translateY}px)`,
        lineHeight: 1.3,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
