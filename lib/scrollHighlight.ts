import { animate } from 'framer-motion'

import { useTokenStore } from '@/stores/tokens'

/**
 * TOKEN_SECTION_MAP — maps every CSS custom property to the canvas section
 * whose id="" attribute it most visibly affects.
 *
 * Source: CLAUDE.md + PRISM-Addendum-v2.1.docx (authoritative).
 * Key correction vs CLAUDE.md: --r-2xl → 'overlays', not 'cards'.
 *
 * RULE: Every component that displays a token must add its key here.
 */
export const TOKEN_SECTION_MAP: Record<string, string> = {
  // ── Colors ─────────────────────────────────────────────────────────────────
  '--bg': 'colors', '--fg': 'colors',
  '--primary': 'colors', '--primary-hover': 'colors',
  '--secondary': 'colors', '--accent': 'colors', '--accent2': 'colors',
  '--border': 'colors', '--border-sub': 'colors',
  '--surface': 'colors', '--muted': 'colors', '--muted-bg': 'colors',
  '--c1': 'colors', '--c2': 'colors', '--c3': 'colors', '--c4': 'colors',
  '--c5': 'colors', '--c6': 'colors', '--c7': 'colors', '--c8': 'colors',

  // ── Status / feedback ──────────────────────────────────────────────────────
  '--success': 'feedback-section', '--warning': 'feedback-section',
  '--error': 'feedback-section', '--info': 'feedback-section',

  // ── Typography ────────────────────────────────────────────────────────────
  '--font-sans': 'typography', '--font-serif': 'typography',
  '--sz': 'typography', '--wt-h': 'typography', '--wt-b': 'typography',
  '--lh': 'typography', '--ls': 'typography',

  // ── Buttons ──────────────────────────────────────────────────────────────
  '--btn-radius': 'buttons', '--r-xs': 'buttons', '--r-sm': 'buttons',
  '--bw': 'buttons', '--grad-angle': 'buttons',

  // ── Forms ─────────────────────────────────────────────────────────────────
  '--r-md': 'forms',
  '--input-radius': 'forms', '--input-bw': 'forms',
  '--input-bg': 'forms', '--input-border-col': 'forms',
  '--input-focus-shadow': 'forms',

  // ── Cards ─────────────────────────────────────────────────────────────────
  '--r-lg': 'cards', '--r-xl': 'cards',
  '--sh-sm': 'cards', '--sh-md': 'cards', '--sh-col': 'cards', '--sh-lg': 'cards',

  // ── Overlays — correction from Addendum (CLAUDE.md had 'cards') ─────────
  '--r-2xl': 'overlays', '--sh-xl': 'overlays',

  // ── Interactions / FX ─────────────────────────────────────────────────────
  '--blur': 'interactions', '--glass-bg': 'interactions',
  '--tx-f': 'interactions', '--tx-m': 'interactions', '--tx-s': 'interactions',
}

/**
 * Scroll to a canvas section and animate a highlight pulse on it.
 *
 * @param sectionId  The id="" of the target <section> element.
 * @param forceScroll  true → always scroll; false → only scroll if off-screen
 *                     (use false while dragging, true on preset/shape apply).
 *
 * Highlight strategy: Framer Motion animate() on boxShadow rather than a CSS
 * outline class, so it is not clipped by nested overflow:hidden containers.
 * Duration matches the spec: 900 ms.
 */
export function scrollToSectionHighlight(
  sectionId: string,
  forceScroll: boolean
): void {
  if (typeof document === 'undefined') return

  const section = document.getElementById(sectionId)
  if (!section) return

  // ── Scroll ────────────────────────────────────────────────────────────────
  const rect = section.getBoundingClientRect()
  const inViewport =
    rect.top < window.innerHeight && rect.bottom > 0

  if (!inViewport || forceScroll) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ── Highlight pulse ───────────────────────────────────────────────────────
  // Read the live primary colour from the store (not getComputedStyle, per
  // CLAUDE.md rule 5) so the ring matches the current theme.
  const primary = useTokenStore.getState().tokens['--primary']

  animate(
    section,
    { boxShadow: [`0 0 0 3px ${primary}`, '0 0 0 3px transparent'] },
    { duration: 0.9, ease: 'easeOut' }
  )
}
