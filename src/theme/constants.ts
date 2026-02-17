// ── Colors ───────────────────────────────────────────────────
export const C = {
  bg: '#FAFBFC',
  bgDark: '#0F1117',
  accent: '#4F46E5',
  accentLight: '#818CF8',

  text: '#1A1D26',
  textMuted: '#6B7280',
  textOnDark: '#E5E7EB',

  claude: '#C67A4A',
  codex: '#1A7F37',

  statusRunning: '#22C55E',
  statusPaused: '#F59E0B',
  statusError: '#EF4444',

  terminal: '#1E1E2E',
  terminalText: '#A6E3A1',
  terminalPrompt: '#89B4FA',

  diffAdd: '#22C55E',
  diffAddBg: 'rgba(34,197,94,0.12)',
  diffRemove: '#EF4444',
  diffRemoveBg: 'rgba(239,68,68,0.12)',

  cardBg: '#FFFFFF',
  cardBorder: '#E5E7EB',
  sidebar: '#F3F4F6',
} as const;

// ── Fonts ────────────────────────────────────────────────────
export const FONT = {
  ui: 'Inter, "DM Sans", system-ui, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", monospace',
} as const;

// ── Spring Presets ───────────────────────────────────────────
export const SPRING = {
  snappy: { damping: 20, mass: 0.8, stiffness: 200 },
  bouncy: { damping: 12, mass: 0.6, stiffness: 180 },
  gentle: { damping: 30, mass: 1, stiffness: 120 },
} as const;

// ── Layout ───────────────────────────────────────────────────
export const LAYOUT = {
  width: 1920,
  height: 1080,
  fps: 30,
  totalFrames: 1560,
} as const;

// ── Scene timings (in frames) ────────────────────────────────
export const SCENES = {
  S01: { from: 0, duration: 120 },      // Hook: 0–4s
  S02: { from: 120, duration: 150 },     // Problem: 4–9s
  S03: { from: 270, duration: 120 },     // Logo Reveal: 9–13s
  S04: { from: 390, duration: 210 },     // App Overview: 13–20s
  S05: { from: 600, duration: 150 },     // Worktrees: 20–25s
  S06: { from: 750, duration: 180 },     // Agents: 25–31s
  S07: { from: 930, duration: 180 },     // Diff & Merge: 31–37s
  S08: { from: 1110, duration: 180 },    // Montage: 37–43s
  S09: { from: 1290, duration: 150 },    // CTA: 43–48s
  S10: { from: 1440, duration: 120 },    // End Card: 48–52s
} as const;
