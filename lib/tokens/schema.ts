import { z } from 'zod'

/**
 * TokenMap — every key is a CSS custom property name from the PRISM token system.
 * Derived from the D object and :root block in legacy/prism-design-system.html.
 *
 * All values are plain strings (CSS value syntax).
 * Never add/remove keys here without also updating defaults.ts and the store migration.
 */
export const TokenMapSchema = z.object({
  // ── Brand colours ─────────────────────────────────────────────────────────
  '--bg': z.string(),
  '--fg': z.string(),
  '--primary': z.string(),
  '--primary-hover': z.string(),
  '--secondary': z.string(),
  '--accent': z.string(),
  '--accent2': z.string(),
  /** Text and icons placed on --primary (filled buttons, primary badges). */
  '--on-primary': z.string(),

  // ── Surface / border / muted ──────────────────────────────────────────────
  '--surface': z.string(),
  '--border': z.string(),
  '--border-sub': z.string(),
  '--muted': z.string(),
  '--muted-bg': z.string(),

  // ── Palette swatches ─────────────────────────────────────────────────────
  '--c1': z.string(),
  '--c2': z.string(),
  '--c3': z.string(),
  '--c4': z.string(),
  '--c5': z.string(),
  '--c6': z.string(),
  '--c7': z.string(),
  '--c8': z.string(),

  // ── Semantic status colours ───────────────────────────────────────────────
  '--success': z.string(),
  '--warning': z.string(),
  '--error': z.string(),
  '--info': z.string(),

  // ── Typography ────────────────────────────────────────────────────────────
  '--font-sans': z.string(),
  '--font-serif': z.string(),
  '--font-mono': z.string(),
  /** Display face: big numerals, stat values, emphasis words. */
  '--font-display': z.string(),
  /** Micro face: badges, status chips, tiny labels. */
  '--font-micro': z.string(),
  '--sz': z.string(),
  '--wt-h': z.string(),
  '--wt-b': z.string(),
  '--lh': z.string(),
  '--ls': z.string(),

  // ── Border radius (shape language) ───────────────────────────────────────
  '--r-xs': z.string(),
  '--r-sm': z.string(),
  '--r-md': z.string(),
  '--r-lg': z.string(),
  '--r-xl': z.string(),
  '--r-2xl': z.string(),
  '--r-full': z.string(),
  '--btn-radius': z.string(),
  '--input-radius': z.string(),

  // ── Stroke / spacing ─────────────────────────────────────────────────────
  '--bw': z.string(),
  '--px': z.string(),
  '--py': z.string(),
  '--gap': z.string(),

  // ── Shadows ──────────────────────────────────────────────────────────────
  '--sh-sm': z.string(),
  '--sh-md': z.string(),
  '--sh-lg': z.string(),
  '--sh-xl': z.string(),
  '--sh-col': z.string(),

  // ── Effects ───────────────────────────────────────────────────────────────
  '--blur': z.string(),
  '--glass-bg': z.string(),
  '--grad-angle': z.string(),

  // ── Transitions ──────────────────────────────────────────────────────────
  '--tx-f': z.string(),
  '--tx-m': z.string(),
  '--tx-s': z.string(),

  // ── Input composite tokens ────────────────────────────────────────────────
  '--input-bw': z.string(),
  '--input-bg': z.string(),
  '--input-border-col': z.string(),
  '--input-focus-shadow': z.string(),
})

export type TokenMap = z.infer<typeof TokenMapSchema>

/**
 * Validates an unknown object against the full TokenMap shape.
 * Returns the parsed TokenMap on success, throws ZodError on failure.
 */
export function validateTokens(obj: unknown): TokenMap {
  return TokenMapSchema.parse(obj)
}
