// ── Light Keynote Design System ──────────────────────────────
// Clean whites. Massive type. One idea per frame.

export const C = {
  // Backgrounds — crisp, bright
  bg: '#FFFFFF',
  bgSubtle: '#F5F5F7',
  bgElevated: '#FFFFFF',

  // Typography — dark on light
  text: '#1D1D1F',
  textSecondary: 'rgba(0,0,0,0.50)',
  textTertiary: 'rgba(0,0,0,0.30)',

  // Accent — used sparingly
  accent: '#0071E3',            // Apple blue
  accentGlow: 'rgba(0,113,227,0.12)',

  // Agent colors
  codex: '#1A7F37',             // GitHub green
  claude: '#DA7756',            // Warm terracotta

  // Status
  statusRunning: '#34C759',
  statusPaused: '#FF9F0A',
  statusError: '#FF3B30',

  // Terminal
  terminal: '#1D1D1F',
  terminalText: '#E5E5E5',
  terminalPrompt: '#0071E3',
  terminalBorder: 'rgba(0,0,0,0.08)',

  // Light terminal
  terminalLight: '#F5F5F7',
  terminalLightText: '#1D1D1F',
  terminalLightBorder: 'rgba(0,0,0,0.10)',

  // Diff
  diffAdd: '#1A7F37',
  diffAddBg: 'rgba(26,127,55,0.08)',
  diffRemove: '#CF222E',
  diffRemoveBg: 'rgba(207,34,46,0.06)',

  // Surfaces
  cardBg: '#F5F5F7',
  cardBorder: 'rgba(0,0,0,0.08)',
  separator: 'rgba(0,0,0,0.06)',
} as const;

// ── Typography ──────────────────────────────────────────────
// SF Pro Display feel — clean, confident, system-native
export const FONT = {
  display: '-apple-system, "SF Pro Display", "Helvetica Neue", system-ui, sans-serif',
  body: '-apple-system, "SF Pro Text", "Helvetica Neue", system-ui, sans-serif',
  mono: '"SF Mono", "Fira Code", "JetBrains Mono", monospace',
} as const;

// ── Spring Presets ──────────────────────────────────────────
export const SPRING = {
  snappy: { damping: 20, mass: 0.8, stiffness: 200 },
  bouncy: { damping: 12, mass: 0.6, stiffness: 180 },
  gentle: { damping: 30, mass: 1, stiffness: 120 },
  slow: { damping: 40, mass: 1.2, stiffness: 80 },
} as const;

// ── Layout ──────────────────────────────────────────────────
export const LAYOUT = {
  width: 1920,
  height: 1080,
  fps: 30,
  totalFrames: 1560,
} as const;

// ── Scene timings (in frames) ───────────────────────────────
export const SCENES = {
  S01: { from: 0, duration: 120 },
  S02: { from: 120, duration: 150 },
  S03: { from: 270, duration: 120 },
  S04: { from: 390, duration: 210 },
  S05: { from: 600, duration: 150 },
  S06: { from: 750, duration: 180 },
  S07: { from: 930, duration: 180 },
  S08: { from: 1110, duration: 180 },
  S09: { from: 1290, duration: 150 },
  S10: { from: 1440, duration: 120 },
} as const;
