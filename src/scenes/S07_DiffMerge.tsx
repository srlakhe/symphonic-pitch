import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { MockDiffEditor } from '../components/MockDiffEditor';
import { C, FONT, SPRING } from '../theme/constants';

const diffLines = [
  { type: 'context' as const, content: 'import { Request, Response } from "express";' },
  { type: 'context' as const, content: '' },
  { type: 'remove' as const, content: '// TODO: Add authentication check' },
  { type: 'remove' as const, content: 'export function handler(req: Request, res: Response) {' },
  { type: 'add' as const, content: 'import { verifyToken } from "./auth";' },
  { type: 'add' as const, content: '' },
  { type: 'add' as const, content: 'export async function handler(req: Request, res: Response) {' },
  { type: 'add' as const, content: '  const token = req.headers.authorization;' },
  { type: 'add' as const, content: '  if (!token) return res.status(401).json({ error: "Unauthorized" });' },
  { type: 'add' as const, content: '  const user = await verifyToken(token);' },
  { type: 'context' as const, content: '  const data = await fetchData(req.query);' },
  { type: 'context' as const, content: '  return res.json({ data });' },
  { type: 'context' as const, content: '}' },
];

const actions = [
  { label: '📸 Checkpoint', color: C.accent },
  { label: '🔀 Merge', color: C.statusRunning },
  { label: '📤 Create PR', color: C.codex },
];

export const S07_DiffMerge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Toast notification
  const toastProgress = spring({
    frame: frame - 120,
    fps,
    config: SPRING.bouncy,
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, #F0FDF4 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      {/* Diff editor */}
      <MockDiffEditor
        fileName="src/api/handler.ts"
        lines={diffLines}
        startFrame={10}
        width={1000}
        height={420}
      />

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 16 }}>
        {actions.map((action, i) => {
          const btnProgress = spring({
            frame: frame - (70 + i * 12),
            fps,
            config: SPRING.bouncy,
          });

          return (
            <div
              key={i}
              style={{
                padding: '12px 28px',
                borderRadius: 10,
                backgroundColor: action.color,
                color: '#FFF',
                fontFamily: FONT.ui,
                fontSize: 16,
                fontWeight: 600,
                opacity: Math.min(btnProgress * 1.5, 1),
                transform: `scale(${Math.min(btnProgress, 1)}) translateY(${
                  (1 - Math.min(btnProgress, 1)) * 20
                }px)`,
                boxShadow: `0 4px 16px ${action.color}44`,
              }}
            >
              {action.label}
            </div>
          );
        })}
      </div>

      {/* PR Toast notification */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 40,
          padding: '14px 24px',
          backgroundColor: C.cardBg,
          borderRadius: 12,
          border: `1px solid ${C.cardBorder}`,
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: Math.min(toastProgress * 2, 1),
          transform: `translateX(${(1 - Math.min(toastProgress, 1)) * 100}px)`,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            backgroundColor: `${C.statusRunning}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}
        >
          ✓
        </div>
        <div>
          <div
            style={{
              fontFamily: FONT.ui,
              fontSize: 14,
              fontWeight: 600,
              color: C.text,
            }}
          >
            PR #142 Created
          </div>
          <div
            style={{
              fontFamily: FONT.ui,
              fontSize: 12,
              color: C.textMuted,
            }}
          >
            feat/auth-middleware → main
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
