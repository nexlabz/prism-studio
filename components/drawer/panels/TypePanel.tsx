'use client'

import { useCallback } from 'react'
import type { TokenMap } from '@/lib/tokens/schema'
import { useTokenStore } from '@/stores/tokens'
import { useUIStore } from '@/stores/ui'

// ── Font catalogs ─────────────────────────────────────────────────────────────

const FONTS_SANS = [
  'Inter', 'DM Sans', 'Plus Jakarta Sans', 'Manrope', 'Outfit',
  'Sora', 'Space Grotesk', 'Nunito', 'Poppins', 'Raleway',
  'Geist', 'IBM Plex Sans', 'Figtree', 'Onest',
]

const FONTS_SERIF = [
  'Playfair Display', 'Cormorant Garamond', 'DM Serif Display',
  'Lora', 'Merriweather', 'Source Serif 4', 'Libre Baskerville',
  'PT Serif', 'Crimson Pro', 'EB Garamond',
]

const FONTS_MONO = [
  'Geist Mono', 'JetBrains Mono', 'Fira Code', 'IBM Plex Mono',
  'Space Mono', 'Roboto Mono', 'Source Code Pro',
]

// ── Type sliders ──────────────────────────────────────────────────────────────

interface TypeSlider {
  label: string
  key: keyof TokenMap
  min: number
  max: number
  step: number
  unit: string
}

const TYPE_SLIDERS: TypeSlider[] = [
  { label: 'Base size',         key: '--sz',   min: 12, max: 20, step: 0.5, unit: 'px' },
  { label: 'Heading weight',    key: '--wt-h', min: 400, max: 900, step: 100, unit: '' },
  { label: 'Body weight',       key: '--wt-b', min: 300, max: 600, step: 100, unit: '' },
  { label: 'Line height',       key: '--lh',   min: 1.2, max: 2.0, step: 0.05, unit: '' },
  { label: 'Letter spacing',    key: '--ls',   min: -0.05, max: 0.15, step: 0.005, unit: 'em' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadGoogleFont(family: string) {
  const id = `gf-${family.replace(/\s+/g, '-')}`
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@300;400;500;600;700;800;900&display=swap`
  document.head.appendChild(link)
}

function extractFontName(val: string): string {
  return val.split(',')[0].trim().replace(/^['"]|['"]$/g, '')
}

function parseNumericToken(val: string, unit: string): number {
  return parseFloat(val.replace(unit, '')) || 0
}

// ── Sub-component ─────────────────────────────────────────────────────────────

function SliderRow({ slider }: { slider: TypeSlider }) {
  const { tokens, setToken } = useTokenStore()
  const raw = tokens[slider.key]
  const numeric = parseNumericToken(raw, slider.unit)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = slider.unit ? `${e.target.value}${slider.unit}` : e.target.value
    setToken(slider.key, newVal)
  }, [slider.key, slider.unit, setToken])

  return (
    <div style={{ marginBottom: '.9rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.3rem' }}>
        <label htmlFor={`type-slider-${slider.key}`} style={{ fontWeight: 700, fontSize: '.68rem' }}>{slider.label}</label>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', opacity: 0.55 }}>{raw}</span>
      </div>
      <input
        id={`type-slider-${slider.key}`}
        type="range"
        min={slider.min}
        max={slider.max}
        step={slider.step}
        value={numeric}
        onChange={handleChange}
        style={{ width: '100%', accentColor: 'var(--primary)' }}
      />
    </div>
  )
}

function FontSelect({ label, tokenKey, fonts }: { label: string; tokenKey: keyof TokenMap; fonts: string[] }) {
  const { tokens, setToken } = useTokenStore()
  const { setActivePresetId } = useUIStore()
  const currentName = extractFontName(tokens[tokenKey])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const family = e.target.value
    loadGoogleFont(family)
    setToken(tokenKey, `'${family}', ${tokenKey === '--font-mono' ? 'monospace' : tokenKey === '--font-serif' ? 'serif' : 'sans-serif'}`)
    setActivePresetId(null)
  }, [tokenKey, setToken, setActivePresetId])

  return (
    <div style={{ marginBottom: '.9rem' }}>
      <label htmlFor={`font-${tokenKey}`} style={{ display: 'block', fontWeight: 700, fontSize: '.68rem', marginBottom: '.3rem' }}>{label}</label>
      <select
        id={`font-${tokenKey}`}
        className="select"
        value={currentName}
        onChange={handleChange}
        style={{ fontFamily: `'${currentName}', sans-serif` }}
      >
        {fonts.map(f => (
          <option key={f} value={f} style={{ fontFamily: `'${f}', sans-serif` }}>{f}</option>
        ))}
      </select>
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export function TypePanel() {
  const { tokens } = useTokenStore()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Font preview */}
      <div style={{ background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-md)', padding: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '.2rem' }}>Sans headline</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '.88rem', opacity: 0.7, lineHeight: 1.6 }}>Serif body copy flows naturally here, showing rhythm and readability at a glance.</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', opacity: 0.5, marginTop: '.5rem' }}>{`const token = 'value'`}</div>
      </div>

      {/* Font selects */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Typefaces</div>
        <FontSelect label="Sans-serif" tokenKey="--font-sans" fonts={FONTS_SANS} />
        <FontSelect label="Serif" tokenKey="--font-serif" fonts={FONTS_SERIF} />
        <FontSelect label="Monospace" tokenKey="--font-mono" fonts={FONTS_MONO} />
      </div>

      {/* Scale sliders */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Scale</div>
        {TYPE_SLIDERS.map(s => (
          <SliderRow key={s.key} slider={s} />
        ))}
      </div>

      {/* Type scale preview */}
      <div style={{ background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-md)', padding: '1rem' }}>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.75rem' }}>Scale Preview</div>
        {[
          { label: 'Display', size: '2.5em', weight: tokens['--wt-h'] },
          { label: 'H1', size: '2em', weight: tokens['--wt-h'] },
          { label: 'H2', size: '1.5em', weight: tokens['--wt-h'] },
          { label: 'Body', size: '1em', weight: tokens['--wt-b'] },
          { label: 'Small', size: '.875em', weight: tokens['--wt-b'] },
          { label: 'Micro', size: '.75em', weight: tokens['--wt-b'] },
        ].map(({ label, size, weight }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '.75rem', marginBottom: '.25rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', opacity: 0.4, width: '3rem', flexShrink: 0 }}>{label}</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: size, fontWeight: weight, lineHeight: tokens['--lh'], overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>The quick brown fox</span>
          </div>
        ))}
      </div>
    </div>
  )
}
