import type { TokenMap } from './schema'

/**
 * DEFAULT_TOKENS — ported from the vanilla prototype's `const D = { ... }` object
 * and the CSS :root block in legacy/prism-design-system.html.
 *
 * All values are fully resolved strings (no var() references) so they can be
 * written directly to CSS custom properties and read back without a browser.
 *
 * IMPORTANT: Never add or remove keys here without also updating:
 *   1. lib/tokens/schema.ts  (add/remove from TokenMapSchema)
 *   2. stores/tokens.ts      (bump version + add migration logic)
 */
export const DEFAULT_TOKENS: TokenMap = {
  // ── Brand colours ─────────────────────────────────────────────────────────
  '--bg': '#ede5f8',
  '--fg': '#1a0835',
  '--primary': '#b08aec',
  '--primary-hover': '#8c4de8',
  '--secondary': '#7b4fcc',
  '--accent': '#4b2280',
  '--accent2': '#d859f5',
  '--on-primary': '#1a0835', // = --fg, which filled buttons used before this token existed

  // ── Surface / border / muted ──────────────────────────────────────────────
  '--surface': 'rgba(255,255,255,.5)',
  '--border': '#1a0835',
  '--border-sub': 'rgba(26,8,53,.15)',
  '--muted': 'rgba(26,8,53,.5)',
  '--muted-bg': 'rgba(26,8,53,.06)',

  // ── Palette swatches (c1–c8) ──────────────────────────────────────────────
  '--c1': '#e8c828',
  '--c2': '#a87dd4',
  '--c3': '#cc44d8',
  '--c4': '#5898d4',
  '--c5': '#f07898',
  '--c6': '#38c888',
  '--c7': '#f07840',
  '--c8': '#c0b0f0',

  // ── Semantic status colours ───────────────────────────────────────────────
  '--success': '#22c55e',
  '--warning': '#f59e0b',
  '--error': '#ef4444',
  '--info': '#3b82f6',

  // ── Typography ────────────────────────────────────────────────────────────
  '--font-sans': "'Syne',sans-serif",
  '--font-serif': "'Lora',Georgia,serif",
  '--font-mono': "'JetBrains Mono','Courier New',monospace",
  '--font-display': "'Syne',sans-serif", // = --font-sans until a template sets its own
  '--font-micro': "'Syne',sans-serif",
  '--sz': '16px',
  '--wt-h': '800',
  '--wt-b': '400',
  '--lh': '1.65',
  '--ls': '-.01em',

  // ── Border radius (shape language) ───────────────────────────────────────
  // pill defaults: btn=9999px, inputs=.75rem, scale unchanged from D
  '--r-xs': '.25rem',
  '--r-sm': '.5rem',
  '--r-md': '.75rem',
  '--r-lg': '1.25rem',
  '--r-xl': '1.75rem',
  '--r-2xl': '2.5rem',
  '--r-full': '9999px',
  '--btn-radius': '9999px',
  '--input-radius': '.75rem',

  // ── Stroke / spacing ─────────────────────────────────────────────────────
  '--bw': '2px',
  '--px': '5rem',
  '--py': '4rem',
  '--gap': '1.5rem',

  // ── Shadows ──────────────────────────────────────────────────────────────
  '--sh-sm': '0 1px 4px rgba(0,0,0,.08)',
  '--sh-md': '0 4px 16px rgba(0,0,0,.12)',
  '--sh-lg': '0 12px 40px rgba(0,0,0,.16)',
  '--sh-xl': '0 24px 64px rgba(0,0,0,.2)',
  '--sh-col': 'rgba(176,138,236,.3)',

  // ── Effects ───────────────────────────────────────────────────────────────
  '--blur': '0px',
  '--glass-bg': 'rgba(255,255,255,.08)',
  '--grad-angle': '135deg',

  // ── Transitions ──────────────────────────────────────────────────────────
  '--tx-f': '150ms ease-in-out',
  '--tx-m': '300ms ease-in-out',
  '--tx-s': '500ms cubic-bezier(.34,1,.64,1)',

  // ── Input composite tokens (resolved, not var() refs) ────────────────────
  '--input-bw': '2px',
  '--input-bg': 'rgba(255,255,255,.5)',
  '--input-border-col': 'rgba(26,8,53,.15)',
  '--input-focus-shadow': '0 0 0 3px rgba(176,138,236,.3)',
}
