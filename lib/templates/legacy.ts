import type { TokenMap } from '@/lib/tokens/schema'
import { DEFAULT_TOKENS } from '@/lib/tokens/defaults'
import { PRESETS, type Preset } from '@/stores/presets'
import type { Template } from './types'

// ── Legacy presets as templates ───────────────────────────────────────────────
// The 10 built-in presets predate templates: one theme of partial overrides,
// and a single generic dark patch shared by all of them. `fromPreset()` wraps
// each one so it renders exactly as before.

/**
 * The generic PRISM dark patch (DARK object in legacy/prism-design-system.html,
 * line 2751). It overrides surfaces and shadows and keeps brand colours.
 * --on-primary follows --fg, because filled buttons used --fg for their text.
 */
export const LEGACY_DARK: Partial<TokenMap> = {
  '--bg':              '#0f0c17',
  '--fg':              '#ede5f8',
  '--on-primary':      '#ede5f8',
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

export function fromPreset(preset: Preset): Template {
  return {
    id: preset.id,
    name: preset.name,
    emoji: preset.emoji,
    desc: preset.desc,
    colors: preset.colors,
    isCustom: preset.isCustom,
    themes: {
      light: {
        tokens: {
          '--on-primary': preset.vars['--fg'] ?? DEFAULT_TOKENS['--fg'],
          ...preset.vars,
        },
      },
      dark: { tokens: LEGACY_DARK },
    },
  }
}

export const LEGACY_TEMPLATES: readonly Template[] = PRESETS.map(fromPreset)
