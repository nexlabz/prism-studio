'use client'

import { useCallback } from 'react'
import { useTokenStore } from '@/stores/tokens'

// ── Input style options ───────────────────────────────────────────────────────

const INPUT_STYLES = [
  { label: 'Default',      bg: 'transparent',          bw: 'var(--bw)', borderColor: 'var(--border-sub)' },
  { label: 'Filled',       bg: 'var(--muted-bg)',       bw: 'var(--bw)', borderColor: 'transparent' },
  { label: 'Underline',    bg: 'transparent',          bw: '0',         borderColor: 'transparent' },
  { label: 'Ghost',        bg: 'rgba(255,255,255,.04)', bw: '1px',       borderColor: 'rgba(255,255,255,.1)' },
] as const

// ── Helpers ───────────────────────────────────────────────────────────────────

function applyInputStyleGlobal(bg: string, bw: string, borderColor: string) {
  const inputs = document.querySelectorAll<HTMLElement>('.input')
  inputs.forEach(el => {
    el.style.setProperty('background', bg, 'important')
    el.style.setProperty('border-width', bw, 'important')
    el.style.setProperty('border-color', borderColor, 'important')
  })
}

function parseBlur(val: string): number {
  return parseFloat(val) || 0
}

function parseGradAngle(val: string): number {
  return parseInt(val, 10) || 135
}

// ── Component ──────────────────────────────────────────────────────────────────

export function FXPanel() {
  const { tokens, setToken } = useTokenStore()

  const blurVal = parseBlur(tokens['--blur'])
  const gradAngle = parseGradAngle(tokens['--grad-angle'])

  const handleBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setToken('--blur', `${e.target.value}px`)
  }, [setToken])

  const handleGradAngle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setToken('--grad-angle', `${e.target.value}deg`)
  }, [setToken])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Shadow colour */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Shadow</div>
        <div style={{ marginBottom: '.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <label
              htmlFor="sh-col-picker"
              style={{ position: 'relative', width: '1.8rem', height: '1.8rem', borderRadius: 'var(--r-sm)', border: 'var(--bw) solid var(--border-sub)', overflow: 'hidden', flexShrink: 0, cursor: 'pointer' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: tokens['--sh-col'] }} />
              <input
                id="sh-col-picker"
                type="color"
                value={tokens['--sh-col'].startsWith('rgba') ? '#000000' : tokens['--sh-col']}
                onChange={e => setToken('--sh-col', e.target.value)}
                style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
              />
            </label>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '.68rem' }}>Shadow colour (--sh-col)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', opacity: 0.5 }}>{tokens['--sh-col']}</div>
            </div>
          </div>
        </div>

        {/* Shadow preview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.65rem' }}>
          {[
            { label: 'SM', shadow: tokens['--sh-sm'] },
            { label: 'MD', shadow: tokens['--sh-md'] },
            { label: 'LG', shadow: tokens['--sh-lg'] },
          ].map(({ label, shadow }) => (
            <div
              key={label}
              style={{ background: 'var(--surface)', borderRadius: 'var(--r-md)', padding: '.75rem', textAlign: 'center', boxShadow: shadow }}
            >
              <div style={{ fontSize: '.62rem', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Blur (glassmorphism) */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Blur / Glassmorphism</div>
        <div style={{ marginBottom: '.3rem', display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="blur-slider" style={{ fontWeight: 700, fontSize: '.68rem' }}>Backdrop blur (--blur)</label>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', opacity: 0.5 }}>{tokens['--blur']}</span>
        </div>
        <input
          id="blur-slider"
          type="range"
          min={0}
          max={32}
          step={1}
          value={blurVal}
          onChange={handleBlur}
          style={{ width: '100%', accentColor: 'var(--primary)', marginBottom: '.85rem' }}
        />
        {/* Glass preview */}
        <div style={{ position: 'relative', borderRadius: 'var(--r-md)', overflow: 'hidden', height: '5rem', background: 'linear-gradient(135deg, var(--primary), var(--accent2))' }}>
          <div style={{ position: 'absolute', inset: '1rem', background: 'rgba(255,255,255,.15)', backdropFilter: `blur(${blurVal}px)`, WebkitBackdropFilter: `blur(${blurVal}px)`, border: '1px solid rgba(255,255,255,.25)', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '.7rem', fontWeight: 700, color: '#fff' }}>Glass preview · {blurVal}px</span>
          </div>
        </div>
      </div>

      {/* Gradient */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Gradient</div>
        <div style={{ marginBottom: '.3rem', display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="grad-slider" style={{ fontWeight: 700, fontSize: '.68rem' }}>Angle (--grad-angle)</label>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', opacity: 0.5 }}>{tokens['--grad-angle']}</span>
        </div>
        <input
          id="grad-slider"
          type="range"
          min={0}
          max={360}
          step={1}
          value={gradAngle}
          onChange={handleGradAngle}
          style={{ width: '100%', accentColor: 'var(--primary)', marginBottom: '.85rem' }}
        />
        {/* Gradient preview */}
        <div style={{ height: '3rem', borderRadius: 'var(--r-md)', background: `linear-gradient(${gradAngle}deg, var(--primary), var(--accent2))` }} />
      </div>

      {/* Input style */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Input Style</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '.5rem' }}>
          {INPUT_STYLES.map(({ label, bg, bw, borderColor }) => (
            <button
              key={label}
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => applyInputStyleGlobal(bg, bw, borderColor)}
              style={{ textAlign: 'left' }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '.65rem', fontSize: '.6rem', opacity: 0.4, fontFamily: 'var(--font-serif)', lineHeight: 1.5 }}>
          Applies to all .input elements on the canvas via direct DOM styling. React port coming in M2.
        </div>
      </div>

      {/* Coming soon notice */}
      <div style={{ background: 'var(--muted-bg)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-md)', padding: '1rem' }}>
        <div style={{ fontWeight: 800, fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.4rem' }}>Coming in M2</div>
        <ul style={{ fontFamily: 'var(--font-serif)', fontSize: '.7rem', opacity: 0.6, lineHeight: 1.6, paddingLeft: '1.2rem', margin: 0 }}>
          <li>Per-component shadow editor</li>
          <li>Image upload → palette extraction</li>
          <li>CSS filter + dark-mode SVG arrows</li>
          <li>Toast dismiss animation</li>
        </ul>
      </div>
    </div>
  )
}
