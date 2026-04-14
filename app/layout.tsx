import type { Metadata } from 'next'
import { Lora, Syne } from 'next/font/google'

import { ExportModal }    from '@/components/export/ExportModal'
import { Drawer }         from '@/components/drawer/Drawer'
import { Toolbar }        from '@/components/toolbar/Toolbar'
import { SubNav }         from '@/components/toolbar/SubNav'
import { CursorFollower } from '@/components/theme/CursorFollower'
import { ThemeFAB }       from '@/components/theme/ThemeFAB'
import { TokenInjector }  from '@/components/theme/TokenInjector'
import './globals.css'

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
    >
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
