'use client'

import { useMounted } from '@/lib/useMounted'
import { useTokenStore } from '@/stores/tokens'

// ── Component ──────────────────────────────────────────────────────────────────
// Light/dark toggle. The active template decides what "dark" means: its own
// dark theme when it ships one (Suture), otherwise the generic PRISM dark patch
// (LEGACY_DARK in lib/templates/legacy.ts). See setMode() in stores/tokens.ts.

export function ThemeFAB() {
  const mode = useTokenStore((s) => s.mode)
  const setMode = useTokenStore((s) => s.setMode)
  // The persisted mode is only known on the client; render the default until then.
  const isDark = useMounted() && mode === 'dark'

  return (
    <button
      id="theme-fab"
      type="button"
      onClick={() => setMode(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{isDark ? '☀' : '🌙'}</span>
      <span className="fab-label">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
