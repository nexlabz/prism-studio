'use client'

import { useEffect } from 'react'
import { useTokenStore } from '@/stores/tokens'

/**
 * TokenInjector — renders nothing, lives inside RootLayout.
 *
 * On mount it applies every token in the store to :root as an inline CSS
 * custom property (inline style wins over the stylesheet :root block, so
 * the store is always authoritative). It then subscribes so any setToken /
 * applyPreset / applyShapeLanguage call is reflected in the DOM immediately.
 *
 * Pattern from CLAUDE.md "Token Store — Core Architecture".
 */
export function TokenInjector() {
  useEffect(() => {
    // Apply the initial snapshot so SSR-rendered markup gets tokens on the
    // first paint, before any user interaction.
    Object.entries(useTokenStore.getState().tokens).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v)
    })

    // Subscribe to future store changes and mirror them to the DOM.
    const unsub = useTokenStore.subscribe((state) => {
      Object.entries(state.tokens).forEach(([k, v]) => {
        document.documentElement.style.setProperty(k, v)
      })
    })

    return unsub
  }, [])

  return null
}
