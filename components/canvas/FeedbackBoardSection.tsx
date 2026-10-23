'use client'

import { useState } from 'react'
import { SectionLabel } from '@/components/canvas/SectionLabel'

// ── Types ──────────────────────────────────────────────────────────────────────

type FeedbackType = 'bug' | 'feature' | 'other'
type FilterType   = 'all' | 'bug' | 'feature'

interface FeedbackItem {
  id: number
  type: FeedbackType
  section: string
  title: string
  body: string
  votes: number
  replies: number
  author: string
  age: string
  tag?: string
}

// ── Seed data ─────────────────────────────────────────────────────────────────

const SEED_ITEMS: FeedbackItem[] = [
  {
    id: 1, type: 'bug', section: 'Drawer / Settings',
    title: 'Cursor options conflict with overlay modals',
    body: 'When a custom cursor is active and you open the export modal, the cursor dot renders above the modal backdrop but the ring lags behind. Needs React portal fix.',
    votes: 14, replies: 2, author: 'prism_team', age: '2d ago', tag: 'TODO: React',
  },
  {
    id: 2, type: 'feature', section: 'Drawer / Settings',
    title: 'Save custom presets locally',
    body: 'After spending time configuring a theme, users should be able to name and save it as a preset that persists via localStorage or a backend. The AI version would let you describe a vibe and generate it.',
    votes: 28, replies: 5, author: 'jlee_design', age: '5d ago',
  },
  {
    id: 3, type: 'bug', section: 'Interactions',
    title: 'Transition speed radios don\'t replay animations',
    body: 'Switching speed updates the CSS var correctly but any card already mid-transition doesn\'t reflect the new speed. React remount via key prop will solve this.',
    votes: 9, replies: 1, author: 'mrusso_dev', age: '1d ago', tag: 'TODO: React',
  },
]

const BADGE_CLASS: Record<FeedbackType, string> = {
  bug:     'badge badge-error',
  feature: 'badge badge-primary',
  other:   'badge badge-outline',
}

const BADGE_LABEL: Record<FeedbackType, string> = {
  bug: 'Bug', feature: 'Feature', other: 'General',
}

// ── Component ──────────────────────────────────────────────────────────────────

export function FeedbackBoardSection() {
  const [items, setItems]       = useState<FeedbackItem[]>(SEED_ITEMS)
  const [nextId, setNextId]     = useState(SEED_ITEMS.length + 1)
  const [filter, setFilter]     = useState<FilterType>('all')
  const [fbType, setFbType]     = useState<FeedbackType>('bug')
  const [fbTitle, setFbTitle]   = useState('')
  const [fbDesc, setFbDesc]     = useState('')
  const [fbSection, setFbSection] = useState('')
  const [voted, setVoted]       = useState<Set<number>>(new Set())

  const handleVote = (id: number) => {
    if (voted.has(id)) return
    setVoted(prev => new Set(prev).add(id))
    setItems(prev => prev.map(it => it.id === id ? { ...it, votes: it.votes + 1 } : it))
  }

  const handleSubmit = () => {
    if (!fbTitle.trim()) return
    const newItem: FeedbackItem = {
      id: nextId,
      type: fbType,
      section: fbSection || 'General',
      title: fbTitle,
      body: fbDesc || '(no description)',
      votes: 0,
      replies: 0,
      author: 'you',
      age: 'just now',
    }
    setItems(prev => [newItem, ...prev])
    setNextId(n => n + 1)
    setFbTitle('')
    setFbDesc('')
    setFbSection('')
    setFbType('bug')
  }

  const visible = filter === 'all' ? items : items.filter(it => it.type === filter)

  return (
    <section id="feedback-board">
      <div className="sec-header">
        <SectionLabel index="12" kicker="Community" />
        <h2 className="sec-title">Feedback</h2>
        <p className="sec-desc">
          Found a bug? Have a feature idea? Vote on what others are saying, leave a comment, or flag something that&apos;s broken.
        </p>
      </div>

      {/* Submit form */}
      <div style={{ background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-xl)', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          {(['bug', 'feature', 'other'] as FeedbackType[]).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setFbType(t)}
              style={{
                flex: 1, padding: '.5rem', borderRadius: 'var(--r-md)',
                border: `var(--bw) solid ${fbType === t ? 'var(--error)' : 'var(--border-sub)'}`,
                fontSize: '.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em',
                cursor: 'pointer', transition: 'all var(--tx-f)',
                background: fbType === t ? (t === 'bug' ? 'var(--error)' : t === 'feature' ? 'var(--primary)' : 'var(--fg)') : 'transparent',
                color: fbType === t ? '#fff' : 'var(--fg)',
              }}
            >
              {t === 'bug' ? '🐛 Bug Report' : t === 'feature' ? '✨ Feature Request' : '💬 General'}
            </button>
          ))}
        </div>
        <div className="ig" style={{ marginBottom: '.75rem' }}>
          <label htmlFor="fb-title">Title</label>
          <input id="fb-title" className="input" type="text" placeholder="Short summary of your feedback…" value={fbTitle} onChange={e => setFbTitle(e.target.value)} />
        </div>
        <div className="ig" style={{ marginBottom: '.75rem' }}>
          <label htmlFor="fb-desc">Description</label>
          <textarea id="fb-desc" className="input" placeholder="More detail — what happened, what did you expect?" style={{ minHeight: '80px' }} value={fbDesc} onChange={e => setFbDesc(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
          <select className="select" id="fb-section" style={{ flex: 1 }} value={fbSection} onChange={e => setFbSection(e.target.value)}>
            <option value="">All sections</option>
            {['Colors','Typography','Buttons','Forms','Cards','Navigation','Feedback','Data','Overlays','Interactions','Mobile','Drawer / Settings','Export'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button type="button" className="btn btn-filled" onClick={handleSubmit}>Submit →</button>
        </div>
      </div>

      {/* Feed header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.45 }}>Community Feed</div>
        <div style={{ display: 'flex', gap: '.4rem' }}>
          {(['all', 'bug', 'feature'] as FilterType[]).map(f => (
            <button
              key={f}
              type="button"
              className={`btn btn-outline btn-sm${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
              style={filter === f ? { background: 'var(--primary)', color: 'var(--bg)', borderColor: 'var(--primary)' } : {}}
            >
              {f === 'all' ? 'All' : f === 'bug' ? 'Bugs' : 'Features'}
            </button>
          ))}
        </div>
      </div>

      {/* Feed items */}
      <div>
        {visible.map(item => (
          <div
            key={item.id}
            style={{ background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-lg)', padding: '1.1rem 1.25rem', marginBottom: '.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
          >
            {/* Vote button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.3rem', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => handleVote(item.id)}
                style={{
                  fontSize: '.62rem', fontWeight: 800,
                  background: voted.has(item.id) ? 'var(--primary)' : 'var(--muted-bg)',
                  color: voted.has(item.id) ? 'var(--bg)' : 'var(--fg)',
                  border: `var(--bw) solid var(--border-sub)`,
                  borderRadius: 'var(--r-md)', padding: '.35rem .6rem',
                  cursor: voted.has(item.id) ? 'default' : 'pointer',
                  lineHeight: 1.3,
                }}
              >
                ▲<br /><span>{item.votes}</span>
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.3rem', flexWrap: 'wrap' }}>
                <span className={BADGE_CLASS[item.type]}>{BADGE_LABEL[item.type]}</span>
                <span style={{ fontSize: '.62rem', opacity: 0.4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>{item.section}</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '.88rem', marginBottom: '.28rem' }}>{item.title}</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '.8rem', opacity: 0.7, lineHeight: 1.55 }}>{item.body}</div>
              <div style={{ marginTop: '.65rem', display: 'flex', gap: '.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-ghost btn-sm">💬 {item.replies} {item.replies === 1 ? 'reply' : 'replies'}</button>
                <span style={{ fontSize: '.62rem', opacity: 0.38 }}>Posted by @{item.author} · {item.age}</span>
                {item.tag && (
                  <span className="badge" style={{ background: 'rgba(239,68,68,.12)', color: 'var(--error)', border: '1px solid rgba(239,68,68,.2)', fontSize: '.52rem' }}>
                    {item.tag}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
