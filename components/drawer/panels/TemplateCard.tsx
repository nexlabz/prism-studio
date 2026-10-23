'use client'

import type { Template } from '@/lib/templates'

// ── Thumbnail ──────────────────────────────────────────────────────────────────

const THUMB_SLOTS = ['bg', 'fg', 'pri', 'acc', 'c1', 'c2', 'c3', 'c4'] as const

function Thumb({ colors, label }: { colors: readonly string[]; label?: string }) {
  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', borderRadius: '4px', overflow: 'hidden', width: '100%', aspectRatio: '2/1' }}>
        {THUMB_SLOTS.map((slot, i) => (
          <div key={slot} style={{ background: colors[i] ?? 'transparent' }} />
        ))}
      </div>
      {label && (
        <span style={{ position: 'absolute', left: '.3rem', top: '.25rem', fontFamily: 'var(--font-mono)', fontSize: '.5rem', textTransform: 'uppercase', letterSpacing: '.06em', color: colors[1], opacity: 0.8 }}>
          {label}
        </span>
      )}
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.55rem', textTransform: 'uppercase', letterSpacing: '.06em', padding: '.1rem .35rem', border: '1px solid var(--border-sub)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
      {children}
    </span>
  )
}

// ── Card ───────────────────────────────────────────────────────────────────────

interface TemplateCardProps {
  template: Template
  isActive: boolean
  edited: boolean
  /** Full-width card with fonts and source, for the first template in the list. */
  featured?: boolean
  onApply: () => void
}

export function TemplateCard({ template, isActive, edited, featured = false, onApply }: TemplateCardProps) {
  const { name, emoji, desc, colors, darkColors, fonts, tags, source } = template

  return (
    <button
      type="button"
      onClick={onApply}
      aria-pressed={isActive}
      aria-label={`${name} template: ${desc}`}
      style={{
        all: 'unset',
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        gridColumn: featured ? '1 / -1' : undefined,
        padding: '.75rem',
        background: 'var(--surface)',
        border: isActive ? '2px solid var(--ink-accent)' : 'var(--bw) solid var(--border-sub)',
        borderRadius: isActive ? '0' : 'var(--r-md)',
        outline: isActive ? '2px solid var(--ink-accent)' : 'none',
        outlineOffset: isActive ? '2px' : '0',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all var(--tx-f)',
      }}
    >
      <div style={{ display: 'flex', gap: '.4rem', marginBottom: '.6rem' }}>
        <Thumb colors={colors} label={darkColors ? 'light' : undefined} />
        {darkColors && <Thumb colors={darkColors} label="dark" />}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '.2rem' }}>
        <span style={{ fontSize: '.9rem' }} aria-hidden="true">{emoji}</span>
        <span style={{ fontWeight: 800, fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>{name}</span>
        {isActive && edited && <Tag>edited</Tag>}
      </div>
      <div style={{ fontSize: '.65rem', opacity: 0.6, fontFamily: 'var(--font-serif)', lineHeight: 1.4 }}>{desc}</div>

      {featured && (
        <>
          {tags && tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', marginTop: '.55rem' }}>
              {tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          )}
          {fonts && fonts.length > 0 && (
            <ul style={{ listStyle: 'none', marginTop: '.6rem', display: 'grid', gap: '.2rem' }}>
              {fonts.map(f => (
                <li key={f.role} style={{ display: 'flex', gap: '.5rem', fontSize: '.62rem', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', opacity: 0.5, width: '3.6rem', flexShrink: 0 }}>{f.role}</span>
                  <span style={{ fontFamily: `'${f.family}'`, fontWeight: 600 }}>{f.family.replace(/ Variable$/, '')}</span>
                  <span style={{ opacity: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.use}</span>
                </li>
              ))}
            </ul>
          )}
          {source && (
            <div style={{ marginTop: '.55rem', fontFamily: 'var(--font-mono)', fontSize: '.55rem', opacity: 0.5 }}>
              from {source.label}{source.ref ? ` @ ${source.ref}` : ''}
            </div>
          )}
        </>
      )}
    </button>
  )
}
