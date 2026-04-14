'use client'

import { useCallback } from 'react'
import { useTokenStore } from '@/stores/tokens'

// ── Constants ─────────────────────────────────────────────────────────────────

const CARD_SEL = '.hover-demo-card'

const HOVER_MODES = [
  { id: 'scale',   label: '⤢ Scale Up' },
  { id: 'lift',    label: '↑ Lift' },
  { id: 'glow',    label: '✦ Glow' },
  { id: 'tilt',    label: '◇ Tilt' },
  { id: 'bounce',  label: '↕ Bounce' },
  { id: 'wiggle',  label: '〰 Wiggle' },
] as const

const CURSOR_OPTIONS = [
  { label: 'Default',    value: 'default' },
  { label: '● Dot',      value: 'none' },
  { label: '✛ Cross',    value: 'crosshair' },
  { label: '▪ Pixel',    value: 'cell' },
] as const

const SPEED_OPTIONS = [
  { label: 'Instant',     f: '0ms',    m: '0ms',    s: '0ms' },
  { label: 'Fast',        f: '150ms',  m: '200ms',  s: '350ms' },
  { label: 'Default',     f: '300ms',  m: '400ms',  s: '600ms' },
  { label: 'Slow',        f: '600ms',  m: '800ms',  s: '1200ms' },
  { label: 'Molasses',    f: '1000ms', m: '1400ms', s: '2000ms' },
] as const

// ── Helpers ───────────────────────────────────────────────────────────────────

const HOVER_CLASSES = HOVER_MODES.map(m => `hover-${m.id}`)

function applyGlobalHover(mode: string) {
  const cards = document.querySelectorAll<HTMLElement>(CARD_SEL)
  cards.forEach(el => {
    HOVER_CLASSES.forEach(cls => { el.classList.remove(cls) })
    el.classList.add(`hover-${mode}`)
  })
}

// ── Component ──────────────────────────────────────────────────────────────────

export function InteractionsPanel() {
  const { tokens, setToken } = useTokenStore()

  const currentSpeed = tokens['--tx-f']

  const handleSpeed = useCallback((f: string, m: string, s: string) => {
    setToken('--tx-f', f)
    setToken('--tx-m', m)
    setToken('--tx-s', s)
  }, [setToken])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hover mode */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Hover Effect</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '.5rem' }}>
          {HOVER_MODES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => applyGlobalHover(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '.5rem', fontSize: '.6rem', opacity: 0.4, fontFamily: 'var(--font-serif)', lineHeight: 1.5 }}>
          Applies hover class to .hover-demo-card elements. Scroll to Interactions section to see the effect.
        </div>
      </div>

      {/* Transition speed */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Transition Speed</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
          {SPEED_OPTIONS.map(({ label, f, m, s }) => {
            const isActive = currentSpeed === f
            return (
              <button
                key={label}
                type="button"
                className={`btn btn-sm ${isActive ? 'btn-filled' : 'btn-outline'}`}
                onClick={() => handleSpeed(f, m, s)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
              >
                <span>{label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', opacity: isActive ? 0.8 : 0.45 }}>{f}</span>
              </button>
            )
          })}
        </div>
        <div style={{ marginTop: '.5rem', fontSize: '.6rem', opacity: 0.4, fontFamily: 'var(--font-serif)', lineHeight: 1.5 }}>
          Sets --tx-f (fast), --tx-m (medium), --tx-s (slow). Used by all interactive elements.
        </div>
      </div>

      {/* Cursor */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.5rem' }}>Cursor Style</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '.5rem', marginBottom: '.5rem' }}>
          {CURSOR_OPTIONS.map(({ label, value }) => (
            <button
              key={label}
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => { document.body.style.cursor = value }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ background: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.3)', borderRadius: 'var(--r-sm)', padding: '.6rem .8rem', fontSize: '.62rem', lineHeight: 1.5, color: 'var(--warning)' }}>
          <strong>TODO (B-05):</strong> Dot-follower cursor conflicts with modal overlays. Fix via CursorFollower portal in M1 polish.
        </div>
      </div>

      {/* Ripple */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.5rem' }}>Click Effects</div>
        <div style={{ background: 'var(--muted-bg)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-md)', padding: '.75rem', fontSize: '.68rem', fontFamily: 'var(--font-serif)', opacity: 0.7, lineHeight: 1.5 }}>
          Ripple click effect is live on the Interactions canvas section. Scroll down to try it.
        </div>
      </div>
    </div>
  )
}
