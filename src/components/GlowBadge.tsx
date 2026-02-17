import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';

interface GlowBadgeProps {
  text: string;
  color?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({
  text,
  color = C.accent,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING.bouncy,
  });

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 18px',
        borderRadius: 100,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: FONT.body,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color,
        backgroundColor: `${color}10`,
        border: `1px solid ${color}25`,
        opacity: Math.min(progress * 2, 1),
        transform: `scale(${Math.min(progress, 1)})`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
