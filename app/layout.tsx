import type { Metadata } from 'next'
import { Lora, Syne } from 'next/font/google'

import { ExportModal }    from '@/components/export/ExportModal'
import { Drawer }         from '@/components/drawer/Drawer'
import { Toolbar }        from '@/components/toolbar/Toolbar'
import { SubNav }         from '@/components/toolbar/SubNav'
import { CursorFollower } from '@/components/theme/CursorFollower'
import { ThemeFAB }       from '@/components/theme/ThemeFAB'
import { TokenInjector }  from '@/components/theme/TokenInjector'
import { DEFAULT_TEMPLATE, cssBlock, resolveRules, resolveTheme, ruleAttributes } from '@/lib/templates'

// Template fonts, self-hosted via fontsource (see TemplateFont.importPath).
// @font-face only downloads a file when a token actually uses the family.
import '@fontsource-variable/urbanist/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import '@fontsource-variable/doto/full.css'
import '@fontsource/silkscreen/latin-400.css'

import './globals.css'
import './rules.css'

// ── Google Fonts via next/font (zero layout shift, self-hosted) ───────────────

// Sans — Syne, matching weights from the vanilla prototype
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

// Serif — Lora with italic support, matching the vanilla prototype
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

// ── First paint ───────────────────────────────────────────────────────────────
// The static HTML wears the default template (light) before TokenInjector
// hydrates the store, so a new visitor never sees a flash of another theme.
// `html:root` outranks the :root fallback block in globals.css.

const firstPaint = resolveTheme(DEFAULT_TEMPLATE, 'light')
const FIRST_PAINT_CSS = cssBlock('html:root', firstPaint.tokens, firstPaint.vars)
const FIRST_PAINT_ATTRS = {
  ...ruleAttributes(resolveRules(DEFAULT_TEMPLATE)),
  'data-template': DEFAULT_TEMPLATE.id,
  'data-theme': 'light',
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'PRISM — Design System Studio',
  description: 'Configure, preview, and export a complete design token system.',
}

// ── Root layout (Server Component) ────────────────────────────────────────────
// TokenInjector is a 'use client' child that subscribes to the Zustand token
// store and writes every token as a CSS custom property onto <html>. This
// keeps the CSS architecture (var(--primary) etc.) intact while making React
// state the single source of truth.

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${lora.variable}`}
      style={{ colorScheme: 'light' }}
      {...FIRST_PAINT_ATTRS}
    >
      <head>
        <style id="prism-first-paint" dangerouslySetInnerHTML={{ __html: FIRST_PAINT_CSS }} />
      </head>
      <body>
        {/* Token injection — writes CSS vars onto :root whenever store updates */}
        <TokenInjector />
        {/* Chrome */}
        <Toolbar />
        <SubNav />
        {/* Canvas */}
        {children}
        {/* Portals — render outside normal DOM tree */}
        <ThemeFAB />
        <Drawer />
        <CursorFollower />
        <ExportModal />
      </body>
    </html>
  )
}
