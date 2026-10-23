'use client'

import { useState } from 'react'
import { TEMPLATES, type Template } from '@/lib/templates'
import { useTokenStore } from '@/stores/tokens'
import { TemplateCard } from './TemplateCard'

// ── Component ──────────────────────────────────────────────────────────────────
// Lists every template: the user's saved ones, then the built-ins in registry
// order. The first built-in (Suture) is the default and gets the full card.

const GROUP_LABEL: React.CSSProperties = {
  fontWeight: 700, fontSize: '.62rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45, marginBottom: '.6rem',
}

export function PresetsPanel() {
  const { applyTemplate, saveCustomTemplate, deleteCustomTemplate, customTemplates, templateId, edited } = useTokenStore()
  const [saveName, setSaveName] = useState('')
  const [saveEmoji, setSaveEmoji] = useState('🎨')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!saveName.trim()) return
    saveCustomTemplate(saveName.trim(), saveEmoji)
    setSaveName('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const card = (template: Template, featured = false) => (
    <TemplateCard
      key={template.id}
      template={template}
      featured={featured}
      isActive={templateId === template.id}
      edited={edited}
      onApply={() => applyTemplate(template)}
    />
  )

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
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={handleSave}
        >
          {saved ? '✓ Saved!' : 'Save preset →'}
        </button>
      </div>

      {/* Custom templates */}
      {customTemplates.length > 0 && (
        <div>
          <div style={GROUP_LABEL}>Your Presets</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.65rem' }}>
            {customTemplates.map(template => (
              <div key={template.id} style={{ position: 'relative' }}>
                {card(template)}
                <button
                  type="button"
                  onClick={() => deleteCustomTemplate(template.id)}
                  style={{ position: 'absolute', top: '.4rem', right: '.4rem', background: 'var(--error)', color: '#fff', border: 'none', borderRadius: '50%', width: '1.2rem', height: '1.2rem', fontSize: '.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                  aria-label={`Delete ${template.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Built-in templates */}
      <div>
        <div style={GROUP_LABEL}>Built-in Templates</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.65rem' }}>
          {TEMPLATES.map((template, i) => card(template, i === 0))}
        </div>
      </div>
    </div>
  )
}
