'use client'

import { useCallback } from 'react'

import type { TokenMap } from '@/lib/tokens/schema'
import { TOKEN_SECTION_MAP, scrollToSectionHighlight } from '@/lib/scrollHighlight'
import type { PaletteKey } from '@/lib/templates'
import { useTokenStore } from '@/stores/tokens'

// ── Types ─────────────────────────────────────────────────────────────────────

interface SwatchProps {
  varName: keyof TokenMap
  label: string
  size: 'sm' | 'md'
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * <input type="color"> requires a 6-digit hex string.
 * Expand #rgb shorthand; fall back to #000000 for non-hex values
 * (rgba, hsl, etc.) so the browser colour picker still opens.
 */
function toHexInputValue(val: string): string {
  if (/^#[0-9a-f]{6}$/i.test(val)) return val
  const shorthand = val.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
  if (shorthand) {
    const [, r, g, b] = shorthand
    return `#${r}${r}${g}${g}${b}${b}`
  }
  return '#000000'
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Swatch — an interactive colour tile that reads from and writes to the
 * Zustand token store.
 *
 * The coloured box IS the clickable area: a visually-hidden
 * <input type="color"> is stretched over it (position:absolute, opacity:0)
 * so any click on the box opens the native colour picker.
 *
 * size='md' → .sw-box   (used in 4-column brand + status grids)
 * size='sm' → .sw-box-sm (used in 8-column card palette grid)
 */
export function Swatch({ varName, label, size }: SwatchProps) {
  const value = useTokenStore((s) => s.tokens[varName])
  // Templates can name their c1–c8 palette (e.g. Suture's Vanilla … Rust).
  const name = useTokenStore((s) => s.paletteNames[varName as PaletteKey]) ?? label
  const setToken = useTokenStore((s) => s.setToken)

  const hexValue = toHexInputValue(value)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value
      setToken(varName, next)

      const sectionId = TOKEN_SECTION_MAP[varName]
      if (sectionId) scrollToSectionHighlight(sectionId, false)
    },
    [varName, setToken]
  )

  if (size === 'sm') {
    return (
      <div>
        <div className="sw-box-sm" style={{ background: value }}>
          <input
            type="color"
            value={hexValue}
            onChange={handleChange}
            aria-label={name}
          />
        </div>
        <span className="sw-name-sm">{name}</span>
        <span className="sw-var-sm">{varName}</span>
      </div>
    )
  }

  return (
    <div>
      <div className="sw-box" style={{ background: value }}>
        <input
          type="color"
          value={hexValue}
          onChange={handleChange}
          aria-label={name}
        />
      </div>
      <span className="sw-name">{name}</span>
      <span className="sw-var">{varName}</span>
    </div>
  )
}
