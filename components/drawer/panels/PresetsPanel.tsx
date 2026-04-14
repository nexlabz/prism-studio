'use client'

import { useState } from 'react'
import { PRESETS, type Preset } from '@/stores/presets'
import { useTokenStore } from '@/stores/tokens'
import { useUIStore } from '@/stores/ui'

// ── Sub-components ─────────────────────────────────────────────────────────────

const THUMB_SLOTS = ['bg', 'fg', 'pri', 'acc', 'c1', 'c2', 'c3', 'c4'] as const

function PresetThumb({ colors }: { colors: readonly string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', borderRadius: '4px', overflow: 'hidden', width: '100%', aspectRatio: '2/1', marginBottom: '.6rem' }}>
      {THUMB_SLOTS.map((slot, i) => (
        <div key={slot} style={{ background: colors[i] ?? 'transparent' }} />
      ))}
    </div>
  )
}

function PresetCard({ preset, isActive, onApply }: { preset: Preset; isActive: boolean; onApply: () => void }) {
  return (
    <button
      type="button"
      onClick={onApply}
      style={{
        all: 'unset',
        display: 'block',
        width: '100%',
        padding: '.75rem',
        background: 'var(--surface)',
        border: isActive ? '2px solid var(--primary)' : 'var(--bw) solid var(--border-sub)',
        borderRadius: isActive ? '0' : 'var(--r-md)',
        outline: isActive ? '2px solid var(--primary)' : 'none',
        outlineOffset: isActive ? '2px' : '0',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all var(--tx-f)',
      }}
    >
      <PresetThumb colors={preset.colors} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '.2rem' }}>
        <span style={{ fontSize: '.9rem' }}>{preset.emoji}</span>
        <span style={{ fontWeight: 800, fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{preset.name}</span>
      </div>
      <div style={{ fontSize: '.65rem', opacity: 0.55, fontFamily: 'var(--font-serif)', lineHeight: 1.4 }}>{preset.desc}</div>
    </button>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export function PresetsPanel() {
  const { applyPreset, tokens } = useTokenStore()
  const { activePresetId, setActivePresetId } = useUIStore()
  const [customPresets, setCustomPresets] = useState<Preset[]>([])
  const [saveName, setSaveName] = useState('')
  const [saveEmoji, setSaveEmoji] = useState('🎨')
  const [saved, setSaved] = useState(false)

  const handleApply = (preset: Preset) => {
    applyPreset(preset.vars)
    setActivePresetId(preset.id)
  }

  const handleSave = () => {
    if (!saveName.trim()) return
    const id = `custom-${Date.now()}`
    const newPreset: Preset = {
      id,
      name: saveName.trim(),
      emoji: saveEmoji,
      desc: 'Custom saved preset',
      colors: [
        tokens['--bg'], tokens['--fg'], tokens['--primary'], tokens['--accent2'],
        tokens['--c1'], tokens['--c2'], tokens['--c3'], tokens['--c4'],
      ],
      vars: { ...tokens },
      isCustom: true,
    }
    setCustomPresets(prev => [newPreset, ...prev])
    setSaveName('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleDelete = (id: string) => {
    setCustomPresets(prev => prev.filter(p => p.id !== id))
    if (activePresetId === id) setActivePresetId(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Save current */}
      <div style={{ background: 'var(--muted-bg)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-md)', padding: '1rem' }}>
        <div style={{ fontWeight: 800, fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '.75rem' }}>Save current theme</div>
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.5rem' }}>
          <label htmlFor="preset-emoji" className="sr-only">Emoji</label>
          <input
            id="preset-emoji"
            className="input"
            type="text"
            value={saveEmoji}
            onChange={e => setSaveEmoji(e.target.value)}
            style={{ width: '3rem', textAlign: 'center', flexShrink: 0 }}
          />
          <label htmlFor="preset-name" className="sr-only">Preset name</label>
          <input
            id="preset-name"
            className="input"
            type="text"
            placeholder="My custom theme…"
            value={saveName}
            onChange={e => setSaveName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
            style={{ flex: 1 }}
          />
        </div>
        <button
          type="button"
          className="btn btn-filled btn-sm"
          style={{ width: '100%' }}
          onClick={handleSave}
        >
          {saved ? '✓ Saved!' : 'Save preset →'}
        </button>
      </div>

      {/* Custom presets */}
      {customPresets.length > 0 && (
        <div>
          <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.6rem' }}>Your Presets</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.65rem' }}>
            {customPresets.map(preset => (
              <div key={preset.id} style={{ position: 'relative' }}>
                <PresetCard preset={preset} isActive={activePresetId === preset.id} onApply={() => handleApply(preset)} />
                <button
                  type="button"
                  onClick={() => handleDelete(preset.id)}
                  style={{ position: 'absolute', top: '.4rem', right: '.4rem', background: 'var(--error)', color: '#fff', border: 'none', borderRadius: '50%', width: '1.2rem', height: '1.2rem', fontSize: '.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                  aria-label={`Delete ${preset.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Built-in presets */}
      <div>
        <div style={{ fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.6rem' }}>Built-in Presets</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.65rem' }}>
          {PRESETS.map(preset => (
            <PresetCard
              key={preset.id}
              preset={preset}
              isActive={activePresetId === preset.id}
              onApply={() => handleApply(preset)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
