# PRISM Design System Studio — Claude Code Project Memory

> This file is read automatically by Claude Code at the start of every session.
> Keep it updated as the project evolves. It is the single source of truth for
> Claude's understanding of this codebase.

---

## What This Project Is

PRISM is a fully live, browser-based design system studio. Users configure a
complete design token system (colors, typography, shape, spacing, shadows,
effects) via an interactive drawer, and export the result as CSS, Tailwind,
SCSS, or W3C DTCG JSON — ready to drop into any codebase.

The current state is a working vanilla HTML/JS prototype (~2800 lines, single
file). We are rebuilding it in **Next.js 14 (App Router) + TypeScript +
Tailwind CSS v3 + Zustand**, milestone by milestone.

**Do not break the vanilla prototype.** It is in `/legacy/prism-design-system.html`.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14, App Router | SSR for speed, API routes for AI |
| Language | TypeScript (strict) | Required. No `any`. |
| Styling | Tailwind CSS v3 | Token values map to Tailwind theme |
| State | Zustand + persist middleware | Token store + localStorage |
| Fonts | next/font (Google Fonts) | No layout shift |
| Animation | Framer Motion | Replaces CSS-only transitions |
| DB (Phase 2+) | Supabase | Feedback board, saved presets |
| AI (Phase 3) | Anthropic SDK (streaming) | Token generation from prompts |

---

## File Structure

```
prism/
  app/
    page.tsx                  ← Root canvas page (Server Component shell)
    layout.tsx                ← Toolbar + Subnav + ThemeFAB + Drawer portal
    globals.css               ← CSS custom properties injected by token store
    api/
      ai/route.ts             ← POST: Anthropic streaming token generation
      feedback/route.ts       ← GET/POST: feedback board items
      tokens/export/route.ts  ← GET: export tokens in requested format
  components/
    canvas/                   ← Each section as its own component
      ColorsSection.tsx
      TypographySection.tsx
      ButtonsSection.tsx
      FormsSection.tsx
      CardsSection.tsx
      NavigationSection.tsx
      FeedbackSection.tsx
      DataSection.tsx
      OverlaysSection.tsx
      InteractionsSection.tsx
      MobileSection.tsx
      FeedbackBoardSection.tsx
      AIStudioSection.tsx
    drawer/
      Drawer.tsx              ← Portal, 6 tabs
      panels/
        PresetsPanel.tsx
        ColorsPanel.tsx
        TypePanel.tsx
        ShapePanel.tsx
        FXPanel.tsx
        InteractionsPanel.tsx
    ui/                       ← Shared primitives (will become shadCN in Phase 3)
      Button.tsx
      Input.tsx
      Card.tsx
      Badge.tsx
      Swatch.tsx
    toolbar/
      Toolbar.tsx
      SubNav.tsx
    theme/
      ThemeFAB.tsx            ← Light/dark toggle
      CursorFollower.tsx      ← Portal — outside modal DOM
    ai/
      AIChatPanel.tsx
      AIMessageBubble.tsx
    feedback/
      FeedbackBoard.tsx
      FeedbackForm.tsx
      VoteButton.tsx
    export/
      ExportModal.tsx
      exportGenerators.ts     ← CSS / Tailwind / SCSS / JSON / shadCN output
  stores/
    tokens.ts                 ← Zustand store + localStorage persist
    presets.ts                ← The 10 legacy presets (wrapped as templates by lib/templates/legacy.ts)
    ui.ts                     ← Drawer open/close, active tab, edit mode
  lib/
    tokens/
      defaults.ts             ← DEFAULT_TOKENS object (source of truth)
      schema.ts               ← Zod schema for token validation
      converters.ts           ← hexToHsl, pxToRem, toHex helpers
      importer.ts             ← Parse CSS :root or DTCG JSON → token map
    fonts.ts                  ← Google Fonts catalog + dynamic loader
    scrollHighlight.ts        ← Token → section scroll + pulse highlight
    shadcn-map.ts             ← PRISM token → shadCN CSS var mapping
```

---

## Token Store (Zustand) — Core Architecture

```typescript
// stores/tokens.ts — THIS IS THE SINGLE SOURCE OF TRUTH
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_TOKENS } from '@/lib/tokens/defaults'
import type { TokenMap } from '@/lib/tokens/schema'

interface TokenStore {
  tokens: TokenMap
  setToken: (key: keyof TokenMap, value: string) => void
  applyPreset: (vars: Partial<TokenMap>) => void
  resetAll: () => void
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      tokens: DEFAULT_TOKENS,
      setToken: (key, value) =>
        set((s) => ({ tokens: { ...s.tokens, [key]: value } })),
      applyPreset: (vars) =>
        set({ tokens: { ...DEFAULT_TOKENS, ...vars } }),
      resetAll: () => set({ tokens: DEFAULT_TOKENS }),
    }),
    {
      name: 'prism-tokens-v2',   // localStorage key — NEVER change this key
      version: 2,
      migrate: (persisted, version) => {
        // Always migrate old versions to current DEFAULT_TOKENS shape
        // Add new keys with their default values
        return { tokens: { ...DEFAULT_TOKENS, ...(persisted as any).tokens } }
      },
    }
  )
)
```

**CRITICAL:** Components read from `useTokenStore`, never from CSS vars directly.
A `useEffect` at the root layout injects CSS custom properties onto `:root`
whenever the store updates. This keeps the existing CSS architecture intact.

```typescript
// app/layout.tsx — token injection
'use client'
useEffect(() => {
  const unsub = useTokenStore.subscribe((state) => {
    Object.entries(state.tokens).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v)
    })
  })
  // Apply initial tokens on mount
  Object.entries(useTokenStore.getState().tokens).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v)
  })
  return unsub
}, [])
```

---

## Templates

A template is a complete design system you start from: `lib/templates/`.

| File | What |
|---|---|
| `types.ts` | `Template`: light + dark `TemplateTheme` (PRISM `tokens` + extra CSS `vars`), `fonts`, component `rules`, palette names, source |
| `suture.ts` | **Suture** (ledger / terminal), the default and first in the picker. Values from `AviOfLagos/suture` `packages/ui/src/tokens.css` |
| `legacy.ts` | `fromPreset()` wraps the 10 presets; `LEGACY_DARK` is the old generic dark patch, so they render exactly as before |
| `index.ts` | `TEMPLATES` (picker order), `resolveTheme()`, `themePatch()`, `ruleAttributes()` |

- The store (`stores/tokens.ts`, persist v3) holds `tokens`, `vars`, `rules`, `templateId`, `mode`,
  `edited` and `customTemplates`. Use `applyTemplate()`, `setMode()`, `resetAll()`; `applyPreset()` is gone.
- `TokenInjector` writes tokens + vars inline on `<html>`, rules as `data-*` attributes and the theme as
  `data-theme`. `app/rules.css` restyles the canvas for each non-default rule (bracket buttons, mono
  labels, `( 01 )` numbers, frames, terminal code, square corners, grid backdrop).
- Thin accents use `--ink-accent` and text on primary fills `--on-accent` / `--on-primary`, never
  `var(--primary)` / `#fff` directly — a template whose primary is a pale fill (`primaryRole: 'fill'`) remaps them.
- Template fonts are self-hosted with fontsource and imported in `app/layout.tsx`.
- To add a template: write `lib/templates/<id>.ts`, add it to `TEMPLATES`. New rules go in
  `ComponentRules` + `DEFAULT_RULES` + `RULE_ATTRS` + `app/rules.css`, with the default reproducing today's look.

---

## Shape Language System

Three modes apply a coordinated set of radius tokens across ALL surfaces:

| Mode | --btn-radius | --r-xs → --r-2xl | Effect |
|---|---|---|---|
| `pill` | 9999px | .25 / .5 / .75 / 1.25 / 1.75 / 2.5rem | Everything rounded |
| `rounded` | .75rem | .25 / .45 / .65 / 1.0 / 1.4 / 2.0rem | Medium soft |
| `square` | 0 | 0 / 0 / 0 / 0 / 0 / 0 | Everything sharp |

`applyShapeLanguage(mode)` in the store sets all 8 radius tokens at once.
Individual slider overrides are allowed after setting a mode.

---

## Auto-Scroll + Section Highlight

Every `setToken()` call checks `TOKEN_SECTION_MAP` and calls
`scrollToSectionHighlight(sectionId, forceScroll)`:

- **forceScroll: false** — only scrolls if section is off-screen (used while dragging)
- **forceScroll: true** — always scrolls (used on preset apply or shape mode change)

The highlight is a Framer Motion animated outline (not CSS outline — handles
nested `overflow:hidden` containers). Duration: 900ms.

```typescript
// lib/scrollHighlight.ts
export const TOKEN_SECTION_MAP: Record<string, string> = {
  '--bg': 'colors', '--fg': 'colors', '--primary': 'colors',
  '--font-sans': 'typography', '--font-serif': 'typography',
  '--btn-radius': 'buttons', '--r-xs': 'buttons', '--r-sm': 'buttons',
  '--r-md': 'forms', '--r-lg': 'cards', '--r-xl': 'cards',
  '--sh-sm': 'cards', '--sh-md': 'cards', '--sh-col': 'cards',
  '--success': 'feedback-section', '--error': 'feedback-section',
  '--grad-angle': 'buttons',
}
```

---

## Export System

Four tabs in the export modal + shadCN (Phase 2):

| Tab | File | Key requirement |
|---|---|---|
| CSS Vars | prism-tokens.css | Semantic names (--color-primary not --primary), dark mode stub, timestamp |
| Tailwind | prism-tokens.js | Resolved values (not var() refs), both v3 + v4 configs |
| SCSS | prism-tokens.scss | $variables + Sass map for card palette |
| JSON (DTCG) | prism-tokens.json | W3C format, $schema, $type on every token |
| shadCN (Phase 2) | globals.css | HSL values (hex→HSL converter required), shadCN var names |

**IMPORTANT:** Export reads from `useTokenStore.getState().tokens` directly,
never from `getComputedStyle()`. This avoids browser-normalised colour formats.

---

## Known Bugs (Open)

| ID | Issue | Fix approach |
|---|---|---|
| B-05 | Cursor dot/ring conflicts with modal overlay | React portal outside modal DOM |
| B-06 | Transition speed doesn't replay animations | key prop remount on speed change |
| B-07 | Select arrow SVG doesn't adapt to dark mode | Use CSS filter or currentColor SVG |
| B-08 | Alert/toast have no dismiss functionality | Click handler → fadeOut → remove |
| B-10 | Toggles/checkboxes have no real `<input>` | Replace with shadCN Switch/Checkbox (Phase 3) |

---

## Milestones

### M1 — Foundation (current focus)
- [ ] Scaffold Next.js 14 project
- [ ] Port token schema to `lib/tokens/defaults.ts`
- [ ] Zustand store with persist + migration
- [ ] CSS var injection in layout.tsx
- [ ] Port ALL 13 canvas sections as React components
- [ ] Drawer as React portal with 6 working tabs
- [ ] Toolbar + SubNav with scroll tracking (IntersectionObserver)
- [ ] ThemeFAB (light/dark toggle)
- [ ] CursorFollower as portal (fixes B-05)
- [ ] Framer Motion transition speed (fixes B-06)
- [ ] All export formats working

### M2 — Persistence + Editor
- [ ] Per-component shadow editor
- [ ] Image upload → canvas colour extraction
- [ ] `?tokens=` preview URL parameter
- [ ] shadCN globals.css export
- [ ] Import from CSS :root or DTCG JSON
- [ ] Feedback board with Supabase backend
- [ ] Mobile-first responsive layout

### M3 — AI + shadCN
- [ ] POST /api/ai/generate → Anthropic streaming
- [ ] Token preview → confirm/discard flow
- [ ] Agent REST API endpoints
- [ ] Figma Variables sync
- [ ] Canvas rebuilt with shadCN components

---

## Coding Rules — Follow These Exactly

1. **TypeScript strict.** No `any`. No `// @ts-ignore`.
2. **Named exports only.** No default exports except for Next.js pages/layouts.
3. **Server Components by default.** Add `'use client'` only when the component
   uses state, effects, or browser APIs.
4. **Token store is the only state for design tokens.** Never use React `useState`
   for a token value inside a component.
5. **Never call `getComputedStyle()` to read token values.** Read from the store.
6. **Components under 200 lines.** Extract if longer.
7. **Framer Motion for all animations.** No raw CSS `transition:` on interactive
   elements — use `motion.div` with `animate` prop.
8. **next/font for Google Fonts.** No dynamic `<link>` injection.
   Exception: the font switcher in the Type panel may need dynamic loading —
   use `@next/font/google` with `variable` option and apply to `:root`.
9. **Never modify `lib/tokens/defaults.ts` without also updating the Zod schema
   in `lib/tokens/schema.ts` and the migration function in the store.**
10. **Every new component that displays a token must also update `TOKEN_SECTION_MAP`**
    so auto-scroll works for that token.

---

## Slash Commands (add to `.claude/commands/`)

Claude Code will have these custom commands available:

- `/port-section [name]` — Port a canvas section from the legacy HTML to React
- `/add-token [name] [defaultValue]` — Add a new token to defaults, schema, and store
- `/fix-bug [ID]` — Look up the bug registry and implement the fix
- `/export-format [css|tailwind|scss|json|shadcn]` — Work on a specific export generator

---

## Reference Files

Always read these before making changes:

- `legacy/prism-design-system.html` — The working vanilla prototype. Port from this.
- `PRISM-Component-Bible.docx` — Full spec for every component (intent, tokens, status)
- `PRISM-Addendum-v2.1.docx` — Export strategy, editable page architecture, auto-scroll spec
- `PRISM-Project-Spec.docx` — Full architecture decisions and milestone breakdown
