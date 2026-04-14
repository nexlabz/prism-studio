'use client'

import { useCallback, useState } from 'react'
import type { TokenMap } from '@/lib/tokens/schema'
import { useTokenStore } from '@/stores/tokens'

// ── Token patches ─────────────────────────────────────────────────────────────
// Ported from DARK / LIGHT objects in legacy/prism-design-system.html (line 2751-2752).
// These override surface/shadow tokens while preserving the active preset's brand colours.

const DARK_TOKENS: Partial<TokenMap> = {
  '--bg':              '#0f0c17',
  '--fg':              '#ede5f8',
  '--border':          'rgba(237,229,248,.25)',
  '--border-sub':      'rgba(237,229,248,.1)',
  '--surface':         'rgba(255,255,255,.05)',
  '--muted-bg':        'rgba(255,255,255,.04)',
  '--sh-sm':           '0 1px 4px rgba(0,0,0,.4)',
  '--sh-md':           '0 4px 16px rgba(0,0,0,.5)',
  '--sh-lg':           '0 12px 40px rgba(0,0,0,.6)',
  '--sh-xl':           '0 24px 64px rgba(0,0,0,.7)',
  '--input-bg':        'rgba(255,255,255,.06)',
  '--input-border-col':'rgba(237,229,248,.15)',
}

const LIGHT_TOKENS: Partial<TokenMap> = {
  '--bg':              '#ede5f8',
  '--fg':              '#1a0835',
  '--border':          '#1a0835',
  '--border-sub':      'rgba(26,8,53,.15)',
  '--surface':         'rgba(255,255,255,.5)',
  '--muted-bg':        'rgba(26,8,53,.06)',
  '--sh-sm':           '0 1px 4px rgba(0,0,0,.08)',
  '--sh-md':           '0 4px 16px rgba(0,0,0,.12)',
  '--sh-lg':           '0 12px 40px rgba(0,0,0,.16)',
  '--sh-xl':           '0 24px 64px rgba(0,0,0,.2)',
  '--input-bg':        'rgba(255,255,255,.5)',
  '--input-border-col':'rgba(26,8,53,.15)',
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ThemeFAB() {
  const [isDark, setIsDark] = useState(false)
  const { setToken } = useTokenStore()

  const toggle = useCallback(() => {
    const next = !isDark
    setIsDark(next)
    const patch = next ? DARK_TOKENS : LIGHT_TOKENS
    Object.entries(patch).forEach(([k, v]) => {
      setToken(k as keyof TokenMap, v as string)
    })
  }, [isDark, setToken])

  return (
    <button
      id="theme-fab"
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{isDark ? '☀' : '🌙'}</span>
      <span className="fab-label">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
