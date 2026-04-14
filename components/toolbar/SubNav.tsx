'use client'

import { useEffect, useRef, useState } from 'react'

// ── Section manifest ──────────────────────────────────────────────────────────
// IDs must match the `id` prop on each canvas section component.

const SECTIONS = [
  { id: 'colors',           label: 'Colors' },
  { id: 'typography',       label: 'Typography' },
  { id: 'buttons',          label: 'Buttons' },
  { id: 'forms',            label: 'Forms' },
  { id: 'cards',            label: 'Cards' },
  { id: 'navigation',       label: 'Navigation' },
  { id: 'feedback-section', label: 'Feedback' },
  { id: 'data',             label: 'Data' },
  { id: 'overlays',         label: 'Overlays' },
  { id: 'interactions',     label: 'Interactions' },
  { id: 'mobile',           label: 'Mobile' },
  { id: 'feedback-board',   label: 'Community' },
  { id: 'ai-studio',        label: 'AI Studio' },
] as const

// ── Component ──────────────────────────────────────────────────────────────────

export function SubNav() {
  const [active, setActive] = useState<string>('colors')
  const obsRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // rootMargin offset = toolbar (56px) from top, trigger section at 45% of viewport
    obsRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-56px 0px -55% 0px', threshold: 0 },
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obsRef.current?.observe(el)
    })

    return () => obsRef.current?.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    // Offset accounts for sticky toolbar (56px) + subnav (48px) + breathing room (12px)
    const top = el.getBoundingClientRect().top + window.scrollY - (56 + 48 + 12)
    window.scrollTo({ top, behavior: 'smooth' })
    setActive(id)
  }

  return (
    <nav id="subnav">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`snav-pill${active === id ? ' active' : ''}`}
          data-section={id}
          onClick={() => scrollTo(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
