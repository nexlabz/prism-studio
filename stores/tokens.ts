import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_TOKENS } from '@/lib/tokens/defaults'
import type { TokenMap } from '@/lib/tokens/schema'

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

// ── Store interface ────────────────────────────────────────────────────────────

interface TokenStore {
  tokens: TokenMap
  setToken: (key: keyof TokenMap, value: string) => void
  applyPreset: (vars: Partial<TokenMap>) => void
  applyShapeLanguage: (mode: ShapeMode) => void
  resetAll: () => void
}

// ── Store ──────────────────────────────────────────────────────────────────────

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      tokens: DEFAULT_TOKENS,

      setToken: (key, value) =>
        set((s) => ({ tokens: { ...s.tokens, [key]: value } })),

      applyPreset: (vars) =>
        set({ tokens: { ...DEFAULT_TOKENS, ...vars } }),

      applyShapeLanguage: (mode) =>
        set((s) => ({ tokens: { ...s.tokens, ...SHAPE_TOKENS[mode] } })),

      resetAll: () => set({ tokens: DEFAULT_TOKENS }),
    }),
    {
      name: 'prism-tokens-v2', // localStorage key — NEVER change this string
      version: 2,
      migrate: (persisted, _version) => {
        // Always merge stored tokens onto current DEFAULT_TOKENS so that:
        //   • new keys added in later versions get their defaults
        //   • removed keys are silently dropped (spread order)
        const stored = (persisted as { tokens?: Partial<TokenMap> }).tokens ?? {}
        return { tokens: { ...DEFAULT_TOKENS, ...stored } }
      },
    }
  )
)
