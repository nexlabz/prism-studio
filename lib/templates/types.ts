import type { TokenMap } from '@/lib/tokens/schema'

// ── Template model ────────────────────────────────────────────────────────────
// A template is a complete, ready-to-edit design system: two themes, the fonts
// it ships with, the extra CSS variables its components rely on, and the
// component styling rules that make it look like itself (bracket buttons,
// square corners, mono labels …). The older `Preset` shape in
// stores/presets.ts is a subset and is wrapped by `fromPreset()`.

export type ThemeMode = 'light' | 'dark'

/** Any CSS custom property name. */
export type CssVar = `--${string}`

/** CSS variables a system needs beyond the PRISM TokenMap (terminal colours, motion steps …). */
export type CssVarMap = Partial<Record<CssVar, string>>

export interface TemplateTheme {
  /** PRISM tokens for this theme. The light theme is merged over BASE_TOKENS; dark is merged over light. */
  tokens: Partial<TokenMap>
  /** Extra system variables, written to :root next to the tokens. */
  vars?: CssVarMap
}

export type FontRole = 'sans' | 'serif' | 'mono' | 'display' | 'micro'

export interface TemplateFont {
  role: FontRole
  /** Family name as registered by @font-face, e.g. 'Urbanist Variable'. */
  family: string
  /** Where the files come from. 'fontsource' fonts are bundled by app/layout.tsx. */
  source: 'fontsource' | 'google' | 'system'
  /** npm package + entry CSS for fontsource fonts, e.g. '@fontsource-variable/urbanist/wght.css'. */
  importPath?: string
  /** What the face is for, shown in the picker and export header. */
  use: string
}

// ── Component styling rules ───────────────────────────────────────────────────
// Each rule becomes a `data-*` attribute on <html> (see TokenInjector), and
// app/rules.css restyles the canvas for every non-default value. Default values
// reproduce the original PRISM look exactly.

export interface ComponentRules {
  /**
   * What --primary is for. 'ink': it is also the accent for focus rings, active
   * tabs and thin marks (the PRISM default). 'fill': it is a fill colour only
   * (like a pale highlight band), so thin accents use --secondary and text on
   * primary uses --on-primary.
   */
  primaryRole: 'ink' | 'fill'
  /** `Label →` (plain) or `[Label]` (bracket). */
  buttonLabel: 'plain' | 'bracket'
  /** Filled/outline hover: colour swap (fill) or a striped bar that loads left to right (stripe). */
  buttonHover: 'fill' | 'stripe'
  /** Uppercase display headings, or sentence case. */
  headingCase: 'upper' | 'sentence'
  /** Section numbers: `01 — Foundation` (dash) or `( 01 )  Foundation` (paren). */
  sectionNumber: 'dash' | 'paren'
  /** System labels (kickers, group and field labels): sans or uppercase mono. */
  labelFont: 'sans' | 'mono'
  /** Badges and status chips: pills, or bracketed status words like `[live]`. */
  status: 'pill' | 'bracket'
  /** Cards and panels: plain surfaces, or hairline frames with corner brackets. */
  surface: 'plain' | 'frame'
  /** Code blocks: inverse of the page (fg on bg) or a terminal that stays dark in both themes. */
  code: 'inverse' | 'terminal'
  /** Pill-shaped chrome (nav pills, tags, toggles, progress): follow --r-full, or square it off. */
  corners: 'follow' | 'square'
  /** Page texture behind sections. */
  backdrop: 'none' | 'grid' | 'dots'
}

export const DEFAULT_RULES: ComponentRules = {
  primaryRole: 'ink',
  buttonLabel: 'plain',
  buttonHover: 'fill',
  headingCase: 'upper',
  sectionNumber: 'dash',
  labelFont: 'sans',
  status: 'pill',
  surface: 'plain',
  code: 'inverse',
  corners: 'follow',
  backdrop: 'none',
}

/** Rule key → the `data-*` attribute it is written to. */
export const RULE_ATTRS: Record<keyof ComponentRules, string> = {
  primaryRole: 'data-primary-role',
  buttonLabel: 'data-button-label',
  buttonHover: 'data-button-hover',
  headingCase: 'data-heading-case',
  sectionNumber: 'data-section-number',
  labelFont: 'data-label-font',
  status: 'data-status',
  surface: 'data-surface',
  code: 'data-code',
  corners: 'data-corners',
  backdrop: 'data-backdrop',
}

export type PaletteKey = '--c1' | '--c2' | '--c3' | '--c4' | '--c5' | '--c6' | '--c7' | '--c8'

export interface Template {
  id: string
  name: string
  emoji: string
  desc: string
  /** 8 colours for the light thumbnail (bg, fg, primary, accent, c1–c4). */
  colors: readonly string[]
  /** 8 colours for the dark thumbnail. Only set when the dark theme is the template's own. */
  darkColors?: readonly string[]
  themes: { light: TemplateTheme; dark?: TemplateTheme }
  /** True when `themes.dark` is designed for this template, not the generic PRISM dark patch. */
  ownDark?: boolean
  fonts?: readonly TemplateFont[]
  rules?: Partial<ComponentRules>
  /** Names for the c1–c8 palette, shown on canvas swatches. */
  palette?: Partial<Record<PaletteKey, string>>
  /** Short tags for the picker, e.g. ['ledger', 'terminal']. */
  tags?: readonly string[]
  /** Where the values were taken from. */
  source?: { label: string; href: string; ref?: string }
  /** Runtime flag for user-saved templates. */
  isCustom?: boolean
}
