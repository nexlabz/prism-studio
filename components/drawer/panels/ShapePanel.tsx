'use client'

import { useTokenStore, type ShapeMode } from '@/stores/tokens'
import type { TokenMap } from '@/lib/tokens/schema'

// ── Shape options ─────────────────────────────────────────────────────────────

interface ShapeOption {
  mode: ShapeMode
  label: string
  desc: string
  btnRadius: string
  cardRadius: string
}

const SHAPE_OPTIONS: ShapeOption[] = [
  {
    mode: 'pill',
    label: 'Pill',
    desc: 'Fully rounded',
    btnRadius: '9999px',
    cardRadius: '1.5rem',
  },
  {
    mode: 'rounded',
    label: 'Rounded',
    desc: 'Medium soft',
    btnRadius: '.75rem',
    cardRadius: '1rem',
  },
  {
    mode: 'square',
    label: 'Square',
    desc: 'Sharp corners',
    btnRadius: '0',
    cardRadius: '0',
  },
]

// ── Radius sliders ────────────────────────────────────────────────────────────

const RADIUS_SLIDERS: { label: string; key: keyof TokenMap }[] = [
  { label: 'XS (--r-xs)',   key: '--r-xs' },
  { label: 'SM (--r-sm)',   key: '--r-sm' },
  { label: 'MD (--r-md)',   key: '--r-md' },
  { label: 'LG (--r-lg)',   key: '--r-lg' },
  { label: 'XL (--r-xl)',   key: '--r-xl' },
  { label: '2XL (--r-2xl)', key: '--r-2xl' },
]

const SPACING_SLIDERS: { label: string; key: keyof TokenMap; min: number; max: number; step: number; unit: string }[] = [
  { label: 'Padding X (--px)',  key: '--px',  min: 0.25, max: 2,   step: 0.05, unit: 'rem' },
  { label: 'Padding Y (--py)',  key: '--py',  min: 0.25, max: 2,   step: 0.05, unit: 'rem' },
  { label: 'Gap (--gap)',       key: '--gap', min: 0.25, max: 3,   step: 0.05, unit: 'rem' },
  { label: 'Border (--bw)',     key: '--bw',  min: 0,    max: 4,   step: 0.5,  unit: 'px' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function detectMode(btnRadius: string): ShapeMode | null {
  if (btnRadius === '9999px') return 'pill'
  if (btnRadius === '0') return 'square'
  if (parseFloat(btnRadius) > 0) return 'rounded'
  return null
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ShapePanel() {
  const { tokens, setToken, applyShapeLanguage } = useTokenStore()
  const currentMode = detectMode(tokens['--btn-radius'])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Shape language selector */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Shape Language</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.65rem' }}>
          {SHAPE_OPTIONS.map(({ mode, label, desc, btnRadius, cardRadius }) => {
            const isActive = currentMode === mode
            return (
              <button
                key={mode}
                type="button"
                onClick={() => applyShapeLanguage(mode)}
                style={{
                  all: 'unset',
                  display: 'block',
                  padding: '.75rem .5rem',
                  background: isActive ? 'var(--primary)' : 'var(--surface)',
                  border: `var(--bw) solid ${isActive ? 'var(--primary)' : 'var(--border-sub)'}`,
                  borderRadius: 'var(--r-md)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all var(--tx-f)',
                  color: isActive ? 'var(--bg)' : 'var(--fg)',
                }}
              >
                {/* Visual preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem', alignItems: 'center', marginBottom: '.5rem' }}>
                  <div style={{ width: '2.5rem', height: '1.1rem', background: isActive ? 'rgba(255,255,255,.3)' : 'var(--border-sub)', borderRadius: btnRadius }} />
                  <div style={{ width: '3rem', height: '1.8rem', background: isActive ? 'rgba(255,255,255,.15)' : 'var(--muted-bg)', border: `1px solid ${isActive ? 'rgba(255,255,255,.3)' : 'var(--border-sub)'}`, borderRadius: cardRadius }} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</div>
                <div style={{ fontSize: '.58rem', opacity: isActive ? 0.75 : 0.5, marginTop: '.1rem' }}>{desc}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Radius fine-tuning */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Radius Fine-tune</div>
        {RADIUS_SLIDERS.map(({ label, key }) => {
          const raw = tokens[key]
          const numVal = raw === '0' ? 0 : parseFloat(raw) || 0

          return (
            <div key={key} style={{ marginBottom: '.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.25rem' }}>
                <label htmlFor={`shape-${key}`} style={{ fontWeight: 700, fontSize: '.65rem' }}>{label}</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', opacity: 0.5 }}>{raw}</span>
              </div>
              <input
                id={`shape-${key}`}
                type="range"
                min={0}
                max={3}
                step={0.05}
                value={numVal}
                onChange={e => {
                  const v = parseFloat(e.target.value)
                  setToken(key, v === 0 ? '0' : `${v}rem`)
                }}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>
          )
        })}

        {/* Button radius */}
        <div style={{ marginBottom: '.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.25rem' }}>
            <label htmlFor="shape-btn-radius" style={{ fontWeight: 700, fontSize: '.65rem' }}>Button (--btn-radius)</label>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', opacity: 0.5 }}>{tokens['--btn-radius']}</span>
          </div>
          <input
            id="shape-btn-radius"
            type="range"
            min={0}
            max={9999}
            step={1}
            value={tokens['--btn-radius'] === '9999px' ? 9999 : parseFloat(tokens['--btn-radius']) || 0}
            onChange={e => {
              const v = parseInt(e.target.value, 10)
              setToken('--btn-radius', v >= 9999 ? '9999px' : v === 0 ? '0' : `${v}px`)
            }}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
        </div>
      </div>

      {/* Spacing */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Spacing &amp; Stroke</div>
        {SPACING_SLIDERS.map(({ label, key, min, max, step, unit }) => {
          const raw = tokens[key]
          const numVal = parseFloat(raw) || 0

          return (
            <div key={key} style={{ marginBottom: '.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.25rem' }}>
                <label htmlFor={`spacing-${key}`} style={{ fontWeight: 700, fontSize: '.65rem' }}>{label}</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', opacity: 0.5 }}>{raw}</span>
              </div>
              <input
                id={`spacing-${key}`}
                type="range"
                min={min}
                max={max}
                step={step}
                value={numVal}
                onChange={e => setToken(key, `${e.target.value}${unit}`)}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
