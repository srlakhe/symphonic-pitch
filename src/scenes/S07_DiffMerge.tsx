import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
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

export const S07_DiffMerge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame: frame - 5, fps, config: SPRING.slow });

  const toastProgress = spring({ frame: frame - 120, fps, config: SPRING.gentle });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
      }}
    >
      {/* Title — agents ship, not the user */}
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          fontFamily: FONT.display,
          color: C.text,
          letterSpacing: '-0.03em',
          opacity: Math.min(titleProgress * 1.5, 1),
          transform: `translateY(${(1 - Math.min(titleProgress, 1)) * 20}px)`,
        }}
      >
        Agents commit, merge, and ship.
      </div>

      {/* Diff */}
      <MockDiffEditor
        fileName="src/api/handler.ts"
        lines={diffLines}
        startFrame={15}
        width={1000}
        height={380}
      />

      {/* Status badges — automated pipeline feel */}
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { label: '✓ Tests passing', color: C.codex },
          { label: '✓ Auto-merged', color: C.accent },
          { label: '✓ PR opened', color: C.claude },
        ].map((action, i) => {
          const bp = spring({ frame: frame - (75 + i * 10), fps, config: SPRING.gentle });
          return (
            <div
              key={i}
              style={{
                padding: '10px 28px',
                borderRadius: 8,
                backgroundColor: `${action.color}10`,
                border: `1px solid ${action.color}30`,
                color: action.color,
                fontFamily: FONT.body,
                fontSize: 15,
                fontWeight: 600,
                opacity: Math.min(bp * 1.5, 1),
                transform: `scale(${Math.min(bp, 1)})`,
              }}
            >
              {action.label}
            </div>
          );
        })}
      </div>

      {/* Toast */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          right: 50,
          padding: '12px 20px',
          backgroundColor: C.bg,
          borderRadius: 12,
          border: `1px solid ${C.cardBorder}`,
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          opacity: Math.min(toastProgress * 2, 1),
          transform: `translateX(${(1 - Math.min(toastProgress, 1)) * 80}px)`,
        }}
      >
        <div style={{ fontSize: 16, color: C.codex }}>✓</div>
        <div>
          <div style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: C.text }}>PR #142 Auto-created</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 11, color: C.textTertiary }}>feat/auth-middleware → main</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
