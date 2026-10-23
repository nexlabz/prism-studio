'use client'

import { useEffect } from 'react'
import { ruleAttributes } from '@/lib/templates'
import { useTokenStore } from '@/stores/tokens'

type Snapshot = ReturnType<typeof useTokenStore.getState>

/**
 * TokenInjector — renders nothing, lives inside RootLayout.
 *
 * On mount it applies every token in the store to :root as an inline CSS
 * custom property (inline style wins over the stylesheet :root block, so
 * the store is always authoritative). It then subscribes so any setToken /
 * applyTemplate / setMode / applyShapeLanguage call is reflected in the DOM
 * immediately.
 *
 * Besides tokens it writes the template's extra vars (removing ones the
 * previous template set), the component rules as data-* attributes, and the
 * theme as data-theme + color-scheme.
 *
 * Pattern from CLAUDE.md "Token Store — Core Architecture".
 */
export function TokenInjector() {
  useEffect(() => {
    const root = document.documentElement
    let appliedVars: string[] = []

    const apply = (state: Snapshot) => {
      Object.entries(state.tokens).forEach(([k, v]) => {
        root.style.setProperty(k, v)
      })

      const nextVars = Object.entries(state.vars).filter((e): e is [string, string] => e[1] !== undefined)
      const nextNames = new Set(nextVars.map(([k]) => k))
      appliedVars.filter(k => !nextNames.has(k)).forEach(k => root.style.removeProperty(k))
      nextVars.forEach(([k, v]) => root.style.setProperty(k, v))
      appliedVars = [...nextNames]

      Object.entries(ruleAttributes(state.rules)).forEach(([attr, value]) => {
        root.setAttribute(attr, value)
      })
      root.setAttribute('data-template', state.templateId ?? 'custom')
      root.setAttribute('data-theme', state.mode)
      root.style.colorScheme = state.mode
    }

    // Apply the initial snapshot so SSR-rendered markup gets tokens on the
    // first paint, before any user interaction.
    apply(useTokenStore.getState())

    // The layout's first-paint sheet has done its job; turn it off so vars a
    // later template does not set fall back to nothing, not to the default's.
    const firstPaint = document.getElementById('prism-first-paint')
    if (firstPaint instanceof HTMLStyleElement && firstPaint.sheet) firstPaint.sheet.disabled = true

    // Subscribe to future store changes and mirror them to the DOM.
    return useTokenStore.subscribe(apply)
  }, [])

  return null
}
