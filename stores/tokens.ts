import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_TOKENS } from '@/lib/tokens/defaults'
import type { TokenMap } from '@/lib/tokens/schema'
import {
  DEFAULT_RULES,
  DEFAULT_TEMPLATE,
  findTemplate,
  LEGACY_DARK,
  resolveRules,
  resolveTheme,
  themePatch,
  type ComponentRules,
  type CssVarMap,
  type PaletteKey,
  type Template,
  type ThemeMode,
} from '@/lib/templates'

// ── Shape language ────────────────────────────────────────────────────────────
// From CLAUDE.md "Shape Language System" table.
// applyShapeLanguage sets all 8 radius tokens at once so every surface
// changes in one coordinated motion.

export type ShapeMode = 'pill' | 'rounded' | 'square'

const SHAPE_TOKENS: Record<ShapeMode, Pick<
  TokenMap,
  '--btn-radius' | '--input-radius' |
  '--r-xs' | '--r-sm' | '--r-md' | '--r-lg' | '--r-xl' | '--r-2xl'
>> = {
  pill: {
    '--btn-radius': '9999px',
    '--input-radius': '9999px',
    '--r-xs': '.25rem',
    '--r-sm': '.5rem',
    '--r-md': '.75rem',
    '--r-lg': '1.25rem',
    '--r-xl': '1.75rem',
    '--r-2xl': '2.5rem',
  },
  rounded: {
    '--btn-radius': '.75rem',
    '--input-radius': '.75rem',
    '--r-xs': '.25rem',
    '--r-sm': '.45rem',
    '--r-md': '.65rem',
    '--r-lg': '1.0rem',
    '--r-xl': '1.4rem',
    '--r-2xl': '2.0rem',
  },
  square: {
    '--btn-radius': '0',
    '--input-radius': '0',
    '--r-xs': '0',
    '--r-sm': '0',
    '--r-md': '0',
    '--r-lg': '0',
    '--r-xl': '0',
    '--r-2xl': '0',
  },
}

// ── State ─────────────────────────────────────────────────────────────────────

interface TokenState {
  /** PRISM tokens, written to :root by TokenInjector. */
  tokens: TokenMap
  /** The active template's extra CSS variables for the current theme. */
  vars: CssVarMap
  /** Component styling rules, written to <html> as data-* attributes. */
  rules: ComponentRules
  /** Canvas names for the c1–c8 palette. */
  paletteNames: Partial<Record<PaletteKey, string>>
  /** Template the tokens came from. Reset and theme switching read it. */
  templateId: string | null
  /** True once a token has been edited by hand since the template was applied. */
  edited: boolean
  mode: ThemeMode
  /** Templates the user saved, persisted with the rest of the store. */
  customTemplates: Template[]
}

interface TokenStore extends TokenState {
  setToken: (key: keyof TokenMap, value: string) => void
  applyTemplate: (template: Template) => void
  setMode: (mode: ThemeMode) => void
  saveCustomTemplate: (name: string, emoji: string) => void
  deleteCustomTemplate: (id: string) => void
  applyShapeLanguage: (mode: ShapeMode) => void
  /** Back to the active template, as shipped, in the current theme. */
  resetAll: () => void
}

function templateState(template: Template, mode: ThemeMode): Omit<TokenState, 'customTemplates'> {
  const { tokens, vars } = resolveTheme(template, mode)
  return {
    tokens,
    vars,
    rules: resolveRules(template),
    paletteNames: { ...template.palette },
    templateId: template.id,
    edited: false,
    mode,
  }
}

const INITIAL_STATE: TokenState = {
  ...templateState(DEFAULT_TEMPLATE, 'light'),
  customTemplates: [],
}

// ── Store ──────────────────────────────────────────────────────────────────────

export const useTokenStore = create<TokenStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setToken: (key, value) =>
        set((s) => ({ tokens: { ...s.tokens, [key]: value }, edited: true })),

      applyTemplate: (template) =>
        set((s) => templateState(template, s.mode)),

      setMode: (mode) => {
        const s = get()
        const template = findTemplate(s.templateId, s.customTemplates)
        const patch = template
          ? themePatch(template, mode)
          : { tokens: mode === 'dark' ? LEGACY_DARK : {}, vars: s.vars }
        set({ mode, tokens: { ...s.tokens, ...patch.tokens }, vars: patch.vars })
      },

      saveCustomTemplate: (name, emoji) => {
        const s = get()
        const base = findTemplate(s.templateId, s.customTemplates)
        const current = { tokens: { ...s.tokens }, vars: { ...s.vars } }
        // The current theme is saved as edited; the other theme comes from the base template.
        const themes = s.mode === 'light'
          ? { light: current, dark: base?.themes.dark }
          : { light: base?.themes.light ?? current, dark: current }
        const template: Template = {
          id: `custom-${Date.now()}`,
          name,
          emoji,
          desc: base ? `Saved from ${base.name}` : 'Custom saved template',
          colors: [
            s.tokens['--bg'], s.tokens['--fg'], s.tokens['--primary'], s.tokens['--accent2'],
            s.tokens['--c1'], s.tokens['--c2'], s.tokens['--c3'], s.tokens['--c4'],
          ],
          themes,
          ownDark: base?.ownDark,
          fonts: base?.fonts,
          rules: { ...s.rules },
          palette: { ...s.paletteNames },
          isCustom: true,
        }
        set({ customTemplates: [template, ...s.customTemplates], templateId: template.id, edited: false })
      },

      deleteCustomTemplate: (id) =>
        set((s) => ({
          customTemplates: s.customTemplates.filter(t => t.id !== id),
          templateId: s.templateId === id ? null : s.templateId,
        })),

      applyShapeLanguage: (mode) =>
        set((s) => ({ tokens: { ...s.tokens, ...SHAPE_TOKENS[mode] }, edited: true })),

      resetAll: () => {
        const s = get()
        const template = findTemplate(s.templateId, s.customTemplates) ?? DEFAULT_TEMPLATE
        set(templateState(template, s.mode))
      },
    }),
    {
      name: 'prism-tokens-v2', // localStorage key — NEVER change this string
      version: 3,
      partialize: (s): TokenState => ({
        tokens: s.tokens,
        vars: s.vars,
        rules: s.rules,
        paletteNames: s.paletteNames,
        templateId: s.templateId,
        edited: s.edited,
        mode: s.mode,
        customTemplates: s.customTemplates,
      }),
      migrate: (persisted, version): TokenState => {
        const stored = (persisted ?? {}) as Partial<TokenState>
        const storedTokens: Partial<TokenMap> = stored.tokens ?? {}

        if (version < 3) {
          // v2 stored tokens only, built from the purple-based presets. Keep
          // the user's work: fill the new keys from the tokens they replace,
          // and treat the session as an edited Purple Editorial.
          return {
            ...INITIAL_STATE,
            tokens: {
              ...DEFAULT_TOKENS,
              '--on-primary': storedTokens['--fg'] ?? DEFAULT_TOKENS['--on-primary'],
              '--font-display': storedTokens['--font-sans'] ?? DEFAULT_TOKENS['--font-display'],
              '--font-micro': storedTokens['--font-sans'] ?? DEFAULT_TOKENS['--font-micro'],
              ...storedTokens,
            },
            vars: {},
            rules: DEFAULT_RULES,
            paletteNames: {},
            templateId: 'purple',
            edited: true,
          }
        }

        // Same version shape: merge onto current defaults so new keys get values.
        return {
          ...INITIAL_STATE,
          ...stored,
          tokens: { ...DEFAULT_TOKENS, ...storedTokens },
          rules: { ...DEFAULT_RULES, ...stored.rules },
        }
      },
    }
  )
)
