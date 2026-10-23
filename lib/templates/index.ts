import type { TokenMap } from '@/lib/tokens/schema'
import { DEFAULT_TOKENS } from '@/lib/tokens/defaults'
import { LEGACY_DARK, LEGACY_TEMPLATES } from './legacy'
import { SUTURE_TEMPLATE } from './suture'
import { DEFAULT_RULES, RULE_ATTRS, type ComponentRules, type CssVarMap, type Template, type ThemeMode } from './types'

export * from './types'
export { LEGACY_DARK, fromPreset } from './legacy'
export { SUTURE_TEMPLATE } from './suture'

// ── Registry ──────────────────────────────────────────────────────────────────
// Order is the order of the picker. The first entry is what a new visitor sees.

export const TEMPLATES: readonly Template[] = [SUTURE_TEMPLATE, ...LEGACY_TEMPLATES]

export const DEFAULT_TEMPLATE: Template = TEMPLATES[0]

export function findTemplate(id: string | null, custom: readonly Template[] = []): Template | undefined {
  if (!id) return undefined
  return TEMPLATES.find(t => t.id === id) ?? custom.find(t => t.id === id)
}

// ── Resolution ────────────────────────────────────────────────────────────────

export interface ResolvedTheme {
  tokens: TokenMap
  vars: CssVarMap
}

/** Full token map + extra vars for one theme of a template. */
export function resolveTheme(template: Template, mode: ThemeMode): ResolvedTheme {
  const { light, dark } = template.themes
  const useDark = mode === 'dark' && dark
  return {
    tokens: { ...DEFAULT_TOKENS, ...light.tokens, ...(useDark ? dark.tokens : {}) },
    vars: { ...light.vars, ...(useDark ? dark.vars : {}) },
  }
}

/**
 * Just the tokens a theme switch should change. Switching keeps the user's
 * edits to anything the dark theme does not touch (fonts, radii, spacing …).
 */
export function themePatch(template: Template, mode: ThemeMode): { tokens: Partial<TokenMap>; vars: CssVarMap } {
  const darkTokens = template.themes.dark?.tokens ?? LEGACY_DARK
  const resolved = resolveTheme(template, mode)
  const tokens: Partial<TokenMap> = {}
  for (const key of Object.keys(darkTokens) as (keyof TokenMap)[]) {
    tokens[key] = resolved.tokens[key]
  }
  return { tokens, vars: resolved.vars }
}

export function resolveRules(template: Template): ComponentRules {
  return { ...DEFAULT_RULES, ...template.rules }
}

/** `data-*` attributes for a rule set, e.g. { 'data-status': 'bracket' }. */
export function ruleAttributes(rules: ComponentRules): Record<string, string> {
  const attrs: Record<string, string> = {}
  for (const key of Object.keys(RULE_ATTRS) as (keyof ComponentRules)[]) {
    attrs[RULE_ATTRS[key]] = rules[key]
  }
  return attrs
}

/** A `:root` block for server rendering, so the first paint already wears the default template. */
export function cssBlock(selector: string, ...maps: Array<Record<string, string | undefined>>): string {
  const lines = maps.flatMap(m => Object.entries(m).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}:${v}`))
  return `${selector}{${lines.join(';')}}`
}
