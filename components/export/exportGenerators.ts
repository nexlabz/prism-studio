/**
 * exportGenerators.ts — Ported from generateExport() in the vanilla prototype.
 * Each function accepts a TokenMap and returns a plain string ready to copy/download.
 * Reads token values directly — never calls getComputedStyle().
 */

import type { TokenMap } from '@/lib/tokens/schema'
import { hexToHsl } from '@/lib/tokens/converters'
import type { CssVarMap, Template } from '@/lib/templates'

// ── Helpers ───────────────────────────────────────────────────────────────────

function fontName(token: string): string {
  return token.replace(/'/g, '"').split(',')[0].replace(/"/g, '').trim()
}

function datestamp(): string {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── Template context ──────────────────────────────────────────────────────────

/** What the CSS export needs beyond the light tokens. Built by ExportModal from the store. */
export interface ExportContext {
  template?: Template
  /** Dark values for the tokens the template's own dark theme changes. */
  dark?: Partial<TokenMap>
  /** Template-only variables, light theme. */
  vars?: CssVarMap
  /** Template-only variables the dark theme changes. */
  darkVars?: CssVarMap
}

/** Exported names for the tokens a dark block can override. */
const CSS_NAMES: Partial<Record<keyof TokenMap, string>> = {
  '--bg': '--color-bg', '--fg': '--color-fg',
  '--primary': '--color-primary', '--primary-hover': '--color-primary-hover', '--on-primary': '--color-on-primary',
  '--secondary': '--color-secondary', '--accent': '--color-accent', '--accent2': '--color-accent-alt',
  '--border': '--color-border', '--border-sub': '--color-border-subtle',
  '--surface': '--color-surface', '--muted': '--color-muted', '--muted-bg': '--color-muted-bg',
  '--success': '--color-success', '--warning': '--color-warning', '--error': '--color-error', '--info': '--color-info',
  '--sh-sm': '--shadow-sm', '--sh-md': '--shadow-md', '--sh-lg': '--shadow-lg', '--sh-xl': '--shadow-xl',
  '--sh-col': '--shadow-color',
}

function declarations(pairs: Array<[string, string | undefined]>, indent: string): string {
  return pairs.filter((p): p is [string, string] => p[1] !== undefined).map(([k, val]) => `${indent}${k}: ${val};`).join('\n')
}

function fontImports(v: TokenMap, template?: Template): string {
  const bundled = template?.fonts?.filter(f => f.source === 'fontsource' && f.importPath)
  if (bundled && bundled.length > 0) {
    const pkgs = bundled.map(f => f.importPath?.split('/').slice(0, 2).join('/')).join(' ')
    return `/* Fonts (self-hosted): npm i ${pkgs} */\n${bundled.map(f => `@import '${f.importPath}'; /* ${f.role}: ${f.use} */`).join('\n')}\n`
  }
  const sans = fontName(v['--font-sans'])
  const serif = fontName(v['--font-serif'])
  return `/* @import url('https://fonts.googleapis.com/css2?family=${sans.replace(/ /g, '+')}:wght@400;600;700;800&family=${serif.replace(/ /g, '+')}:wght@400;700&display=swap'); */\n`
}

function systemVarsBlock(ctx: ExportContext): string {
  if (!ctx.vars || Object.keys(ctx.vars).length === 0) return ''
  return `
/* ── System variables (${ctx.template?.name ?? 'template'}) ── */
:root {
${declarations(Object.entries(ctx.vars), '  ')}
}
`
}

function darkBlock(ctx: ExportContext): string {
  if (!ctx.dark) {
    return `
/* ── Dark mode stub ── */
/*
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0f0c17;
    --color-fg: #ede5f8;
    --color-surface: rgba(255, 255, 255, 0.05);
  }
}
*/`
  }
  const pairs: Array<[string, string | undefined]> = [
    ...(Object.entries(ctx.dark) as Array<[keyof TokenMap, string]>)
      .filter(([k]) => CSS_NAMES[k])
      .map(([k, val]): [string, string] => [CSS_NAMES[k] as string, val]),
    ...Object.entries(ctx.darkVars ?? {}),
  ]
  return `
/* ── Dark theme (${ctx.template?.name ?? 'template'}) ──
   Follows the OS unless data-theme="light|dark" is set on <html> or any subtree. */
[data-theme='dark'] {
  color-scheme: dark;
${declarations(pairs, '  ')}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    color-scheme: dark;
${declarations(pairs, '    ')}
  }
}`
}

// ── CSS Custom Properties ─────────────────────────────────────────────────────

export function generateCSS(v: TokenMap, ctx: ExportContext = {}): string {
  return `/**
 * PRISM Design Tokens — CSS Custom Properties
 * Generated ${datestamp()}${ctx.template ? `\n * Template: ${ctx.template.name}${ctx.template.source ? ` (${ctx.template.source.label})` : ''}` : ''}
 */

${fontImports(v, ctx.template)}
:root {
  /* ── Colors ── */
  --color-bg:            ${v['--bg']};
  --color-fg:            ${v['--fg']};
  --color-primary:       ${v['--primary']};
  --color-primary-hover: ${v['--primary-hover']};
  --color-on-primary:    ${v['--on-primary']};
  --color-secondary:     ${v['--secondary']};
  --color-accent:        ${v['--accent']};
  --color-accent-alt:    ${v['--accent2']};
  --color-border:        ${v['--border']};
  --color-border-subtle: ${v['--border-sub']};
  --color-surface:       ${v['--surface']};
  --color-muted:         ${v['--muted']};
  --color-muted-bg:      ${v['--muted-bg']};

  /* ── Card Palette ── */
  --card-1: ${v['--c1']}; --card-2: ${v['--c2']};
  --card-3: ${v['--c3']}; --card-4: ${v['--c4']};
  --card-5: ${v['--c5']}; --card-6: ${v['--c6']};
  --card-7: ${v['--c7']}; --card-8: ${v['--c8']};

  /* ── Status ── */
  --color-success: ${v['--success']};
  --color-warning: ${v['--warning']};
  --color-error:   ${v['--error']};
  --color-info:    ${v['--info']};

  /* ── Typography ── */
  --font-sans:        ${v['--font-sans']};
  --font-serif:       ${v['--font-serif']};
  --font-mono:        ${v['--font-mono']};
  --font-display:     ${v['--font-display']};
  --font-micro:       ${v['--font-micro']};
  --font-size-base:   ${v['--sz']};
  --font-weight-head: ${v['--wt-h']};
  --font-weight-body: ${v['--wt-b']};
  --line-height:      ${v['--lh']};
  --letter-spacing:   ${v['--ls']};

  /* ── Spacing ── */
  --space-x: ${v['--px']};
  --space-y: ${v['--py']};
  --gap:     ${v['--gap']};

  /* ── Border Radius ── */
  --radius-xs:   ${v['--r-xs']};
  --radius-sm:   ${v['--r-sm']};
  --radius-md:   ${v['--r-md']};
  --radius-lg:   ${v['--r-lg']};
  --radius-xl:   ${v['--r-xl']};
  --radius-2xl:  ${v['--r-2xl']};
  --radius-full: 9999px;
  --radius-btn:  ${v['--btn-radius']};

  /* ── Border ── */
  --border-width: ${v['--bw']};

  /* ── Shadows ── */
  --shadow-sm:    ${v['--sh-sm']};
  --shadow-md:    ${v['--sh-md']};
  --shadow-lg:    ${v['--sh-lg']};
  --shadow-xl:    ${v['--sh-xl']};
  --shadow-color: ${v['--sh-col']};

  /* ── Effects ── */
  --gradient-angle: ${v['--grad-angle']};

  /* ── Transitions ── */
  --tx-fast:   ${v['--tx-f']};
  --tx-medium: ${v['--tx-m']};
  --tx-spring: ${v['--tx-s']};
}
${systemVarsBlock(ctx)}${darkBlock(ctx)}`
}

// ── Tailwind Config ───────────────────────────────────────────────────────────

export function generateTailwind(v: TokenMap): string {
  const sans = fontName(v['--font-sans'])
  const serif = fontName(v['--font-serif'])
  return `/**
 * PRISM — Tailwind CSS Config
 * Generated ${datestamp()}
 */

/* ── Tailwind v3 — tailwind.config.js ── */
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: '${v['--bg']}', fg: '${v['--fg']}', surface: '${v['--surface']}',
        primary: { DEFAULT: '${v['--primary']}', hover: '${v['--primary-hover']}', foreground: '${v['--on-primary']}' },
        secondary: '${v['--secondary']}',
        accent: { DEFAULT: '${v['--accent']}', alt: '${v['--accent2']}' },
        border: '${v['--border']}',
        card: {
          1: '${v['--c1']}', 2: '${v['--c2']}', 3: '${v['--c3']}', 4: '${v['--c4']}',
          5: '${v['--c5']}', 6: '${v['--c6']}', 7: '${v['--c7']}', 8: '${v['--c8']}',
        },
        success: '${v['--success']}', warning: '${v['--warning']}',
        error: '${v['--error']}', info: '${v['--info']}',
      },
      fontFamily: {
        sans: ['${sans}', 'system-ui', 'sans-serif'],
        serif: ['${serif}', 'Georgia', 'serif'],
        mono: ['${fontName(v['--font-mono'])}', 'Courier New', 'monospace'],
        display: ['${fontName(v['--font-display'])}', 'monospace'],
        micro: ['${fontName(v['--font-micro'])}', 'monospace'],
      },
      fontSize: { base: ['${v['--sz']}', { lineHeight: '${v['--lh']}' }] },
      borderRadius: {
        xs: '${v['--r-xs']}', sm: '${v['--r-sm']}', md: '${v['--r-md']}',
        lg: '${v['--r-lg']}', xl: '${v['--r-xl']}', '2xl': '${v['--r-2xl']}',
        btn: '${v['--btn-radius']}',
      },
      borderWidth: { DEFAULT: '${v['--bw']}', brand: '${v['--bw']}' },
      boxShadow: {
        sm: '${v['--sh-sm']}', md: '${v['--sh-md']}',
        lg: '${v['--sh-lg']}', xl: '${v['--sh-xl']}',
      },
      spacing: { section: '${v['--py']}', gap: '${v['--gap']}' },
    },
  },
};

/* ── Tailwind v4 — paste into main .css ── */
/*
@theme {
  --color-bg: ${v['--bg']}; --color-fg: ${v['--fg']};
  --color-primary: ${v['--primary']}; --color-secondary: ${v['--secondary']};
  --color-accent: ${v['--accent']}; --color-success: ${v['--success']};
  --color-error: ${v['--error']}; --radius-btn: ${v['--btn-radius']};
  --radius-xl: ${v['--r-xl']}; --font-sans: ${v['--font-sans']};
  --font-serif: ${v['--font-serif']};
}
*/`
}

// ── SCSS Variables ────────────────────────────────────────────────────────────

export function generateSCSS(v: TokenMap): string {
  return `// PRISM Design Tokens — SCSS Variables
// Generated ${datestamp()}
// Usage: @use 'tokens' as t;  →  color: t.$color-primary;

// Colors
$color-bg:            ${v['--bg']};
$color-fg:            ${v['--fg']};
$color-primary:       ${v['--primary']};
$color-primary-hover: ${v['--primary-hover']};
$color-secondary:     ${v['--secondary']};
$color-accent:        ${v['--accent']};
$color-border:        ${v['--border']};
$color-surface:       ${v['--surface']};
$color-success:       ${v['--success']};
$color-warning:       ${v['--warning']};
$color-error:         ${v['--error']};
$color-info:          ${v['--info']};

$card-palette: (
  1: ${v['--c1']}, 2: ${v['--c2']}, 3: ${v['--c3']}, 4: ${v['--c4']},
  5: ${v['--c5']}, 6: ${v['--c6']}, 7: ${v['--c7']}, 8: ${v['--c8']},
);

// Typography
$font-sans:         ${v['--font-sans']};
$font-serif:        ${v['--font-serif']};
$font-size-base:    ${v['--sz']};
$font-weight-head:  ${v['--wt-h']};
$font-weight-body:  ${v['--wt-b']};
$line-height:       ${v['--lh']};
$letter-spacing:    ${v['--ls']};

// Border Radius
$radius-xs:   ${v['--r-xs']};  $radius-sm:  ${v['--r-sm']};
$radius-md:   ${v['--r-md']};  $radius-lg:  ${v['--r-lg']};
$radius-xl:   ${v['--r-xl']};  $radius-2xl: ${v['--r-2xl']};
$radius-btn:  ${v['--btn-radius']};

// Spacing
$space-x: ${v['--px']}; $space-y: ${v['--py']}; $gap: ${v['--gap']}; $border-w: ${v['--bw']};

// Shadows
$shadow-sm: ${v['--sh-sm']};
$shadow-md: ${v['--sh-md']};
$shadow-lg: ${v['--sh-lg']};
$shadow-xl: ${v['--sh-xl']};`
}

// ── DTCG JSON ─────────────────────────────────────────────────────────────────

export function generateJSON(v: TokenMap): string {
  const dtcg = {
    $schema: 'https://tr.designtokens.org/format/',
    $metadata: { tokenSetOrder: ['color', 'typography', 'borderRadius', 'spacing', 'shadow', 'transition'] },
    color: {
      bg:           { $value: v['--bg'],           $type: 'color' },
      fg:           { $value: v['--fg'],           $type: 'color' },
      primary:      { $value: v['--primary'],      $type: 'color' },
      primaryHover: { $value: v['--primary-hover'],$type: 'color' },
      onPrimary:    { $value: v['--on-primary'],   $type: 'color' },
      secondary:    { $value: v['--secondary'],    $type: 'color' },
      accent:       { $value: v['--accent'],       $type: 'color' },
      accentAlt:    { $value: v['--accent2'],      $type: 'color' },
      border:       { $value: v['--border'],       $type: 'color' },
      surface:      { $value: v['--surface'],      $type: 'color' },
      card: {
        '1': { $value: v['--c1'], $type: 'color' }, '2': { $value: v['--c2'], $type: 'color' },
        '3': { $value: v['--c3'], $type: 'color' }, '4': { $value: v['--c4'], $type: 'color' },
        '5': { $value: v['--c5'], $type: 'color' }, '6': { $value: v['--c6'], $type: 'color' },
        '7': { $value: v['--c7'], $type: 'color' }, '8': { $value: v['--c8'], $type: 'color' },
      },
      status: {
        success: { $value: v['--success'], $type: 'color' },
        warning: { $value: v['--warning'], $type: 'color' },
        error:   { $value: v['--error'],   $type: 'color' },
        info:    { $value: v['--info'],    $type: 'color' },
      },
    },
    typography: {
      fontSans:     { $value: fontName(v['--font-sans']),             $type: 'fontFamily' },
      fontSerif:    { $value: fontName(v['--font-serif']),            $type: 'fontFamily' },
      fontMono:     { $value: fontName(v['--font-mono']),             $type: 'fontFamily' },
      fontDisplay:  { $value: fontName(v['--font-display']),          $type: 'fontFamily' },
      fontMicro:    { $value: fontName(v['--font-micro']),            $type: 'fontFamily' },
      sizeBase:     { $value: v['--sz'],                              $type: 'dimension' },
      weightHead:   { $value: parseInt(v['--wt-h'] || '800', 10),    $type: 'fontWeight' },
      weightBody:   { $value: parseInt(v['--wt-b'] || '400', 10),    $type: 'fontWeight' },
      lineHeight:   { $value: parseFloat(v['--lh'] || '1.65'),       $type: 'number' },
      letterSpacing:{ $value: v['--ls'],                              $type: 'dimension' },
    },
    borderRadius: {
      xs:  { $value: v['--r-xs'],       $type: 'dimension' },
      sm:  { $value: v['--r-sm'],       $type: 'dimension' },
      md:  { $value: v['--r-md'],       $type: 'dimension' },
      lg:  { $value: v['--r-lg'],       $type: 'dimension' },
      xl:  { $value: v['--r-xl'],       $type: 'dimension' },
      '2xl':{ $value: v['--r-2xl'],     $type: 'dimension' },
      btn: { $value: v['--btn-radius'], $type: 'dimension' },
    },
    spacing: {
      sectionX:    { $value: v['--px'],  $type: 'dimension' },
      sectionY:    { $value: v['--py'],  $type: 'dimension' },
      gap:         { $value: v['--gap'], $type: 'dimension' },
      borderWidth: { $value: v['--bw'],  $type: 'dimension' },
    },
    shadow: {
      sm:    { $value: v['--sh-sm'],  $type: 'shadow' },
      md:    { $value: v['--sh-md'],  $type: 'shadow' },
      lg:    { $value: v['--sh-lg'],  $type: 'shadow' },
      xl:    { $value: v['--sh-xl'],  $type: 'shadow' },
      color: { $value: v['--sh-col'], $type: 'color' },
    },
    transition: {
      fast:   { $value: v['--tx-f'], $type: 'duration' },
      medium: { $value: v['--tx-m'], $type: 'duration' },
      spring: { $value: v['--tx-s'], $type: 'duration' },
    },
  }
  return JSON.stringify(dtcg, null, 2)
}

// ── shadCN globals.css ────────────────────────────────────────────────────────

export function generateShadcn(v: TokenMap): string {
  const h = (val: string) => hexToHsl(val)
  return `/* PRISM → shadCN globals.css
 * Generated ${datestamp()}
 * Paste into app/globals.css inside @layer base
 */

@layer base {
  :root {
    --background:          ${h(v['--bg'])};
    --foreground:          ${h(v['--fg'])};
    --card:                ${h(v['--surface'])};
    --card-foreground:     ${h(v['--fg'])};
    --popover:             ${h(v['--surface'])};
    --popover-foreground:  ${h(v['--fg'])};
    --primary:             ${h(v['--primary'])};
    --primary-foreground:  ${h(v['--bg'])};
    --secondary:           ${h(v['--secondary'])};
    --secondary-foreground:${h(v['--fg'])};
    --muted:               ${h(v['--muted-bg'])};
    --muted-foreground:    ${h(v['--muted'])};
    --accent:              ${h(v['--accent2'])};
    --accent-foreground:   ${h(v['--fg'])};
    --destructive:         ${h(v['--error'])};
    --destructive-foreground: 0 0% 100%;
    --border:              ${h(v['--border-sub'])};
    --input:               ${h(v['--border-sub'])};
    --ring:                ${h(v['--primary'])};
    --radius:              ${v['--r-md']};
  }

  .dark {
    --background:          ${h(v['--fg'])};
    --foreground:          ${h(v['--bg'])};
    --card:                ${h(v['--accent'])};
    --card-foreground:     ${h(v['--bg'])};
    --popover:             ${h(v['--accent'])};
    --popover-foreground:  ${h(v['--bg'])};
    --primary:             ${h(v['--primary'])};
    --primary-foreground:  ${h(v['--fg'])};
    --muted:               ${h(v['--accent'])};
    --muted-foreground:    ${h(v['--secondary'])};
    --accent:              ${h(v['--accent2'])};
    --accent-foreground:   ${h(v['--fg'])};
    --destructive:         ${h(v['--error'])};
    --border:              ${h(v['--border'])};
    --input:               ${h(v['--border'])};
    --ring:                ${h(v['--primary'])};
  }
}`
}
