'use client'

import { useCallback, useState } from 'react'

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

// ── Speed options ─────────────────────────────────────────────────────────────

const SPEEDS = [
  { label: 'Instant',       value: '0ms'   },
  { label: 'Fast (150ms)',  value: '150ms' },
  { label: 'Default (300ms)', value: '300ms' },
  { label: 'Slow (600ms)', value: '600ms' },
  { label: 'Molasses (1s)', value: '1000ms' },
] as const

type SpeedValue = typeof SPEEDS[number]['value']

// ── Component ──────────────────────────────────────────────────────────────────

export function InteractionsSection() {
  const [activeSpeed, setActiveSpeed] = useState<SpeedValue>('150ms')

  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRipple(e)
  }, [])

  const handleSpeed = useCallback((value: SpeedValue) => {
    setActiveSpeed(value)
    document.documentElement.style.setProperty('--tx-f', value)
  }, [])

  return (
    <section id="interactions">
      <div className="sec-header">
        <div className="sec-lbl">10 — Motion</div>
        <h2 className="sec-title">INTERACTIONS</h2>
        <p className="sec-desc">
          Configure hover effects, card animations, cursor styles, and click effects. All applied globally via the Interactions drawer tab.
        </p>
      </div>

      {/* Hover Effects */}
      <div className="glbl">Hover Effects — hover each card</div>
      <div className="g3" style={{ marginBottom: '2rem' }}>
        <div className="hover-demo-card hover-scale"><div style={{ fontSize: '2rem' }}>⤢</div><div className="ix-label">Scale Up</div></div>
        <div className="hover-demo-card hover-lift"><div style={{ fontSize: '2rem' }}>↑</div><div className="ix-label">Lift &amp; Shadow</div></div>
        <div className="hover-demo-card hover-glow"><div style={{ fontSize: '2rem' }}>✦</div><div className="ix-label">Glow Border</div></div>
        <div className="hover-demo-card hover-tilt"><div style={{ fontSize: '2rem' }}>◇</div><div className="ix-label">3D Tilt</div></div>
        <div className="hover-demo-card hover-bounce"><div style={{ fontSize: '2rem' }}>↕</div><div className="ix-label">Bounce</div></div>
        <div className="hover-demo-card hover-wiggle"><div style={{ fontSize: '2rem' }}>〰</div><div className="ix-label">Wiggle</div></div>
      </div>

      {/* Card Edge Animations */}
      <div className="glbl">Card Edge Animations — always on</div>
      <div className="g3" style={{ marginBottom: '2rem' }}>
        <div className="hover-demo-card card-border-spin" style={{ minHeight: '8rem' }}><div style={{ fontSize: '2rem' }}>🌀</div><div className="ix-label">Spinning Gradient Border</div></div>
        <div className="hover-demo-card card-shimmer" style={{ minHeight: '8rem' }}><div style={{ fontSize: '2rem' }}>✨</div><div className="ix-label">Shimmer Sweep</div></div>
        <div className="hover-demo-card card-pulse" style={{ minHeight: '8rem' }}><div style={{ fontSize: '2rem' }}>💓</div><div className="ix-label">Pulse Glow</div></div>
      </div>

      {/* Cursor Styles — visual demo only; real cursor follower is in layout portal */}
      <div className="glbl">Cursor Styles — click to apply</div>
      <div className="row" style={{ gap: '.75rem', marginBottom: '2rem' }}>
        {[
          { label: 'Default',        cursor: 'default'   },
          { label: '● Dot Follower', cursor: 'none'      },
          { label: '✛ Crosshair',    cursor: 'crosshair' },
          { label: '▪ Pixel',        cursor: 'cell'      },
          { label: '○ Hidden',       cursor: 'none'      },
        ].map(({ label, cursor }) => (
          <button
            key={label}
            type="button"
            className="btn btn-outline"
            onClick={() => { document.body.style.cursor = cursor }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Ripple */}
      <div className="glbl">Ripple Click — click the button</div>
      <button
        type="button"
        className="btn btn-filled ripple-btn"
        style={{ position: 'relative', overflow: 'hidden', marginBottom: '2rem' }}
        onClick={handleRipple}
      >
        Click anywhere on me →
      </button>

      {/* Transition Speed */}
      <div className="glbl">Transition Speed</div>
      <div className="row" style={{ gap: '.75rem' }}>
        {SPEEDS.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            className={`btn ${activeSpeed === value ? 'btn-filled' : 'btn-outline'} tx-speed`}
            onClick={() => handleSpeed(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  )
}
