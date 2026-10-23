'use client'

import { useCallback } from 'react'
import { SectionLabel } from '@/components/canvas/SectionLabel'

// ── Ripple helper ──────────────────────────────────────────────────────────────

function triggerRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const circle = document.createElement('span')
  circle.style.cssText = [
    'position:absolute',
    `width:${size}px`,
    `height:${size}px`,
    `top:${e.clientY - rect.top - size / 2}px`,
    `left:${e.clientX - rect.left - size / 2}px`,
    'transform:scale(0)',
    'animation:ripple .6s linear',
    'border-radius:50%',
    'background:rgba(255,255,255,.4)',
    'pointer-events:none',
  ].join(';')
  btn.appendChild(circle)
  setTimeout(() => circle.remove(), 700)
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ButtonsSection() {
  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRipple(e)
  }, [])

  return (
    <section id="buttons">
      <div className="sec-header">
        <SectionLabel index="03" kicker="Actions" />
        <h2 className="sec-title">Buttons</h2>
        <p className="sec-desc">
          Change global button shape from the Shape tab. 9 style variants, 3 sizes, groups, and states.
        </p>
      </div>

      {/* Style Variants */}
      <div className="glbl">Style Variants</div>
      <div className="row" style={{ marginBottom: '1.5rem' }}>
        <button type="button" className="btn btn-filled">Filled →</button>
        <button type="button" className="btn btn-outline">Outline →</button>
        <button type="button" className="btn btn-ghost">Ghost →</button>
        <button type="button" className="btn btn-danger">Danger</button>
        <button type="button" className="btn btn-success">Success</button>
        <button type="button" className="btn btn-gradient">Gradient →</button>
        <button type="button" className="btn btn-glow">Glow ✦</button>
        <button type="button" className="btn btn-3d">3D Push</button>
        <button type="button" className="btn btn-underline">Underline →</button>
      </div>

      {/* Sizes & Groups */}
      <div className="glbl">Sizes &amp; Groups</div>
      <div className="row" style={{ alignItems: 'center', marginBottom: '1.5rem' }}>
        <button type="button" className="btn btn-filled btn-sm">Small →</button>
        <button type="button" className="btn btn-filled">Default →</button>
        <button type="button" className="btn btn-filled btn-lg">Large →</button>
        <button type="button" className="btn btn-outline btn-icon">⊕</button>
        <div className="btn-group">
          <button type="button" className="btn btn-outline">Left</button>
          <button type="button" className="btn btn-filled">Mid</button>
          <button type="button" className="btn btn-outline">Right</button>
        </div>
      </div>

      {/* States */}
      <div className="glbl">States</div>
      <div className="row">
        <button type="button" className="btn btn-filled btn-loading">Processing…</button>
        <button
          type="button"
          className="btn btn-outline ripple-btn"
          style={{ position: 'relative', overflow: 'hidden' }}
          onClick={handleRipple}
        >
          Click for ripple
        </button>
        <button type="button" className="btn btn-outline" disabled style={{ opacity: 0.32, cursor: 'not-allowed' }}>Disabled</button>
      </div>
    </section>
  )
}
