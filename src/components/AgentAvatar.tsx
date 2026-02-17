import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT, SPRING } from '../theme/constants';

interface AgentAvatarProps {
  name: string;
  color: string;
  letter: string;
  delay?: number;
  size?: number;
  style?: React.CSSProperties;
}

export const AgentAvatar: React.FC<AgentAvatarProps> = ({
  name,
  color,
  letter,
  delay = 0,
  size = 64,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING.bouncy,
  });

  const scale = Math.min(progress, 1);
  const pulseScale =
    1 + Math.sin((frame - delay) * 0.08) * 0.03 * Math.min(progress, 1);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        opacity: Math.min(progress * 2, 1),
        transform: `scale(${scale * pulseScale})`,
        ...style,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF',
          fontSize: size * 0.4,
          fontWeight: 700,
          fontFamily: FONT.ui,
          boxShadow: `0 0 30px ${color}44`,
        }}
      >
        {letter}
      </div>
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          fontFamily: FONT.ui,
          color: color,
        }}
      >
        {name}
      </span>
    </div>
  );
};
