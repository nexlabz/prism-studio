/**
 * converters.ts — CSS colour utility functions for the export system.
 * These run in Node (build time) and in the browser — no DOM required.
 */

// ── Internal helper ────────────────────────────────────────────────────────────

function hslToRgbChannels(h: number, s: number, l: number): [number, number, number] {
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))))
  }
  return [f(0), f(8), f(4)]
}

// ── toHex ─────────────────────────────────────────────────────────────────────

/**
 * Normalise any CSS colour string to lowercase #rrggbb.
 * Handles: #rgb, #rrggbb, rgb(), rgba(), hsl(), hsla().
 * Unknown/complex values (e.g. CSS vars, named colours) → '#000000'.
 */
export function toHex(value: string): string {
  const v = value.trim()

  // #rrggbb
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v.toLowerCase()

  // #rgb → #rrggbb
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    const c = v.slice(1)
    return `#${c[0]}${c[0]}${c[1]}${c[1]}${c[2]}${c[2]}`.toLowerCase()
  }

  // rgb(r, g, b) / rgba(r, g, b, a)
  const rgb = v.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/)
  if (rgb) {
    const channels = [rgb[1], rgb[2], rgb[3]]
      .map(n => Math.round(parseFloat(n)).toString(16).padStart(2, '0'))
      .join('')
    return `#${channels}`
  }

  // hsl(h, s%, l%) / hsla(…)
  const hsl = v.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/)
  if (hsl) {
    const [r, g, b] = hslToRgbChannels(
      parseFloat(hsl[1]),
      parseFloat(hsl[2]) / 100,
      parseFloat(hsl[3]) / 100,
    )
    return '#' + [r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')
  }

  return '#000000'
}

// ── hexToHsl ──────────────────────────────────────────────────────────────────

/**
 * Convert any CSS colour to shadCN-compatible HSL string: "H S% L%"
 * (no `hsl()` wrapper — shadCN injects its own).
 * Falls back via toHex() so it accepts the same broad input as toHex().
 */
export function hexToHsl(value: string): string {
  const hex = toHex(value)

  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d   = max - min
  const l   = (max + min) / 2
  const s   = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))

  let hue = 0
  if (d !== 0) {
    if (max === r)      hue = ((g - b) / d + 6) % 6
    else if (max === g) hue = (b - r) / d + 2
    else                hue = (r - g) / d + 4
    hue *= 60
  }

  return `${Math.round(hue)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}
