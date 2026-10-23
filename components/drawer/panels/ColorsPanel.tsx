'use client'

import { useCallback } from 'react'
import type { TokenMap } from '@/lib/tokens/schema'
import { useTokenStore } from '@/stores/tokens'

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Best-effort: return hex if value is a plain hex, else return '#000000' for the color input */
function toHexInputValue(val: string): string {
  const trimmed = val.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed.match(/^#(.)(.)(.)?$/) ?? []
    return `#${r}${r}${g}${g}${b}${b}`
  }
  return '#000000'
}

// ── Sub-component ─────────────────────────────────────────────────────────────

function ColorRow({ label, tokenKey }: { label: string; tokenKey: keyof TokenMap }) {
  const { tokens, setToken } = useTokenStore()
  const value = tokens[tokenKey]
  const hexValue = toHexInputValue(value)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(tokenKey, e.target.value)
  }, [tokenKey, setToken])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.5rem' }}>
      <label
        htmlFor={`color-${tokenKey}`}
        style={{ position: 'relative', width: '1.8rem', height: '1.8rem', borderRadius: 'var(--r-sm)', border: 'var(--bw) solid var(--border-sub)', overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}
      >
        <div style={{ position: 'absolute', inset: 0, background: value }} />
        <input
          id={`color-${tokenKey}`}
          type="color"
          value={hexValue}
          onChange={handleChange}
          style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
        />
      </label>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: '.68rem', marginBottom: '.1rem' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', opacity: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
      </div>
    </div>
  )
}

// ── Groups ────────────────────────────────────────────────────────────────────

const BRAND_COLORS: { label: string; key: keyof TokenMap }[] = [
  { label: 'Background',    key: '--bg' },
  { label: 'Foreground',    key: '--fg' },
  { label: 'Primary',       key: '--primary' },
  { label: 'Primary Hover', key: '--primary-hover' },
  { label: 'On Primary',    key: '--on-primary' },
  { label: 'Secondary',     key: '--secondary' },
  { label: 'Accent',        key: '--accent' },
  { label: 'Accent 2',      key: '--accent2' },
  { label: 'Border',        key: '--border' },
  { label: 'Border Sub',    key: '--border-sub' },
  { label: 'Surface',       key: '--surface' },
  { label: 'Muted BG',      key: '--muted-bg' },
]

const PALETTE_SWATCHES: { label: string; key: keyof TokenMap }[] = [
  { label: 'C1', key: '--c1' }, { label: 'C2', key: '--c2' },
  { label: 'C3', key: '--c3' }, { label: 'C4', key: '--c4' },
  { label: 'C5', key: '--c5' }, { label: 'C6', key: '--c6' },
  { label: 'C7', key: '--c7' }, { label: 'C8', key: '--c8' },
]

const STATUS_COLORS: { label: string; key: keyof TokenMap }[] = [
  { label: 'Success', key: '--success' },
  { label: 'Warning', key: '--warning' },
  { label: 'Error',   key: '--error' },
  { label: 'Info',    key: '--info' },
]

// ── Component ──────────────────────────────────────────────────────────────────

export function ColorsPanel() {
  const { tokens } = useTokenStore()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Brand */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Brand</div>
        {BRAND_COLORS.map(({ label, key }) => (
          <ColorRow key={key} label={label} tokenKey={key} />
        ))}
      </div>

      {/* Palette swatches */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Card Palette</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '.4rem', marginBottom: '.85rem' }}>
          {PALETTE_SWATCHES.map(({ key }) => (
            <label
              key={key}
              htmlFor={`swatch-${key}`}
              style={{ position: 'relative', aspectRatio: '1', borderRadius: 'var(--r-sm)', overflow: 'hidden', border: 'var(--bw) solid var(--border-sub)', cursor: 'pointer' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: tokens[key] }} />
              <input
                id={`swatch-${key}`}
                type="color"
                value={toHexInputValue(tokens[key])}
                onChange={() => {}}
                style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                readOnly
              />
            </label>
          ))}
        </div>
        {PALETTE_SWATCHES.map(({ label, key }) => (
          <ColorRow key={key} label={label} tokenKey={key} />
        ))}
      </div>

      {/* Status */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Status</div>
        {STATUS_COLORS.map(({ label, key }) => (
          <ColorRow key={key} label={label} tokenKey={key} />
        ))}
      </div>
    </div>
  )
}
