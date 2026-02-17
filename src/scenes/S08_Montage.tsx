import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { C, FONT, SPRING } from '../theme/constants';

export const S08_Montage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Progress bar
  const progressPct = interpolate(frame, [0, 150], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Steps
  const steps = [
    { label: 'Session Created', icon: '📋', triggerFrame: 10 },
    { label: 'Agents Running', icon: '⚡', triggerFrame: 40 },
    { label: 'Code Written', icon: '📝', triggerFrame: 70 },
    { label: 'Auto-merged', icon: '🔀', triggerFrame: 100 },
    { label: 'Shipped', icon: '🚀', triggerFrame: 130 },
  ];

  // Counter animation
  const counterProgress = interpolate(frame, [100, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 48,
      }}
    >
      {/* Steps timeline */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          width: 1200,
        }}
      >
        {steps.map((step, i) => {
          const progress = spring({
            frame: frame - step.triggerFrame,
            fps,
            config: SPRING.bouncy,
          });
          const isActive = frame >= step.triggerFrame;
          const isDone = i < steps.length - 1 && frame >= steps[i + 1].triggerFrame;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  opacity: Math.min(progress * 2, 1),
                  transform: `scale(${Math.min(progress, 1)})`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    backgroundColor: isDone
                      ? `${C.statusRunning}15`
                      : isActive
                      ? `${C.accent}10`
                      : C.cardBg,
                    border: `1.5px solid ${
                      isDone ? C.statusRunning : isActive ? C.accent : C.cardBorder
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                  }}
                >
                  {isDone ? '✓' : step.icon}
                </div>
                <span
                  style={{
                    fontFamily: FONT.body,
                    fontSize: 13,
                    fontWeight: 500,
                    color: isActive ? C.text : C.textTertiary,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {step.label}
                </span>
              </div>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: isDone ? C.statusRunning : C.cardBorder,
                    marginLeft: -4,
                    marginRight: -4,
                    marginBottom: 30,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 800,
          height: 6,
          backgroundColor: C.cardBg,
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progressPct}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${C.accent}, ${C.statusRunning})`,
            borderRadius: 3,
          }}
        />
      </div>

      {/* Stats counter */}
      <div
        style={{
          display: 'flex',
          gap: 60,
          opacity: counterProgress,
          transform: `translateY(${(1 - counterProgress) * 20}px)`,
        }}
      >
        {[
          { value: '3', label: 'agents' },
          { value: '3', label: 'features' },
          { value: '1', label: 'PR' },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: FONT.display,
                fontSize: 56,
                fontWeight: 700,
                color: C.accent,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: FONT.body,
                fontSize: 16,
                color: C.textSecondary,
                fontWeight: 500,
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
