import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
  style?: React.CSSProperties;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING.snappy,
  });

  return (
    <div
      style={{
        width: 320,
        padding: '28px 24px',
        backgroundColor: C.cardBg,
        borderRadius: 16,
        border: `1px solid ${C.cardBorder}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        opacity: Math.min(progress * 1.5, 1),
        transform: `translateY(${(1 - Math.min(progress, 1)) * 30}px)`,
        ...style,
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          fontFamily: FONT.display,
          color: C.text,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 14,
          fontFamily: FONT.body,
          color: C.textSecondary,
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </div>
  );
};
