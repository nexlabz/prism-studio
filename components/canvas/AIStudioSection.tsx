'use client'

import { useRef, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

interface Message {
  id: number
  role: 'ai' | 'user'
  text: string
}

// ── Stub responses ─────────────────────────────────────────────────────────────

const STUB_RESPONSES = [
  'I\'d apply the **Dark Luxury** preset as a base, then adjust the gold tone to a warmer #C9922A. Want me to apply that?',
  'Great idea! For that vibe I\'d suggest Cormorant Garamond for the serif and a muted earth palette. Shall I apply a preview?',
  'I can generate a full palette from that description. Setting primary to a deep indigo with complementary accent tones now.',
  'Loading that Google Font now — it\'ll be applied to --font-sans. You can fine-tune weight from the Type drawer tab.',
  'Saving that configuration as a new preset. You\'ll find it at the top of the Presets tab once I\'m done.',
]

const SEED_MESSAGES: Message[] = [
  {
    id: 1, role: 'ai',
    text: 'Hi! I\'m your PRISM design assistant. I can help you generate color palettes, load custom fonts, apply design styles from text, and save custom presets. What are we building today?',
  },
  {
    id: 2, role: 'user',
    text: 'I want a luxury dark theme with gold accents, like a high-end watch brand.',
  },
  {
    id: 3, role: 'ai',
    text: 'I\'d apply the Dark Luxury preset as a base, then adjust the gold tone to a warmer #C9922A and pair it with Cormorant Garamond for the serif. Want me to apply that?',
  },
]

const QUICK_PROMPTS = [
  '🎨 Generate palette from image',
  '🔤 Load Google Font',
  '💾 Save as preset',
  '✦ Surprise me',
]

const AI_CAPABILITIES = [
  { ico: '🎨', title: 'Color extraction',  desc: 'Upload an image — AI pulls the dominant palette and applies it' },
  { ico: '🔤', title: 'Font loading',       desc: 'Paste any Google Fonts URL or describe a typeface style' },
  { ico: '✨', title: 'Style generation',   desc: 'Describe a vibe in plain English → full theme applied instantly' },
  { ico: '💾', title: 'Save presets',       desc: 'Name and save any configuration, sync across sessions (Pro)' },
  { ico: '📸', title: 'Brand match',        desc: 'Upload a logo or screenshot — AI reverse-engineers the style' },
]

// ── Component ──────────────────────────────────────────────────────────────────

export function AIStudioSection() {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES)
  const [nextId, setNextId]     = useState(SEED_MESSAGES.length + 1)
  const [input, setInput]       = useState('')
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notified, setNotified]       = useState(false)
  const threadRef = useRef<HTMLDivElement>(null)

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: nextId, role: 'user', text }
    const stubText = STUB_RESPONSES[nextId % STUB_RESPONSES.length]
    const aiMsg: Message   = { id: nextId + 1, role: 'ai', text: stubText }
    setMessages(prev => [...prev, userMsg, aiMsg])
    setNextId(n => n + 2)
    setInput('')
    setTimeout(() => threadRef.current?.scrollTo({ top: 9999, behavior: 'smooth' }), 50)
  }

  const handleNotify = () => {
    if (!notifyEmail.trim()) return
    setNotified(true)
  }

  return (
    <section id="ai-studio">
      <div className="sec-header">
        <div className="sec-lbl">13 — AI Studio</div>
        <h2 className="sec-title">AI DESIGN<br />ASSISTANT</h2>
        <p className="sec-desc">
          Describe a vibe, paste a font URL, upload an image for color extraction — the AI handles the rest. <strong>Coming in Pro.</strong>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Chat window */}
        <div style={{ background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '480px' }}>
          {/* Chat header */}
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-sub)', display: 'flex', alignItems: 'center', gap: '.75rem', background: 'var(--muted-bg)' }}>
            <div style={{ width: '2.2rem', height: '2.2rem', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary),var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.9rem', flexShrink: 0 }}>✦</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '.82rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>PRISM AI</div>
              <div style={{ fontSize: '.62rem', opacity: 0.45, marginTop: '.05rem' }}>Design assistant · Pro feature</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <span className="badge" style={{ background: 'rgba(245,158,11,.15)', color: 'var(--warning)', border: '1px solid rgba(245,158,11,.3)' }}>Coming Soon</span>
            </div>
          </div>

          {/* Message thread */}
          <div ref={threadRef} style={{ flex: 1, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.85rem', overflowY: 'auto' }}>
            {messages.map(msg => (
              msg.role === 'ai' ? (
                <div key={msg.id} style={{ display: 'flex', gap: '.65rem', alignItems: 'flex-start', maxWidth: '85%' }}>
                  <div style={{ width: '1.8rem', height: '1.8rem', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary),var(--accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', flexShrink: 0 }}>✦</div>
                  <div style={{ background: 'var(--fg)', color: 'var(--bg)', borderRadius: '0 var(--r-lg) var(--r-lg) var(--r-lg)', padding: '.75rem 1rem', fontFamily: 'var(--font-serif)', fontSize: '.82rem', lineHeight: 1.55 }}>
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={msg.id} style={{ display: 'flex', gap: '.65rem', alignItems: 'flex-start', maxWidth: '85%', alignSelf: 'flex-end', flexDirection: 'row-reverse' }}>
                  <div className="ava ava-sm" style={{ background: 'var(--c3)', flexShrink: 0 }}>You</div>
                  <div style={{ background: 'var(--primary)', color: 'var(--fg)', borderRadius: 'var(--r-lg) 0 var(--r-lg) var(--r-lg)', padding: '.75rem 1rem', fontFamily: 'var(--font-serif)', fontSize: '.82rem', lineHeight: 1.55 }}>
                    {msg.text}
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Input area */}
          <div style={{ padding: '.9rem 1.1rem', borderTop: '1px solid var(--border-sub)', background: 'var(--muted-bg)' }}>
            <div style={{ display: 'flex', gap: '.65rem', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="ai-input" className="sr-only">Ask PRISM AI</label>
                <input
                  id="ai-input"
                  className="input"
                  type="text"
                  placeholder="Describe a style, paste a font URL, or ask anything…"
                  style={{ borderRadius: 'var(--r-full)' }}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') sendMessage(input) }}
                />
              </div>
              <button
                type="button"
                className="btn btn-icon btn-filled"
                style={{ flexShrink: 0 }}
                onClick={() => sendMessage(input)}
                aria-label="Send message"
              >
                →
              </button>
            </div>
            <div style={{ display: 'flex', gap: '.5rem', marginTop: '.65rem', flexWrap: 'wrap' }}>
              {QUICK_PROMPTS.map(p => (
                <button
                  key={p}
                  type="button"
                  style={{ fontSize: '.58rem', fontWeight: 700, padding: '.28rem .65rem', borderRadius: 'var(--r-full)', border: '1px solid var(--border-sub)', background: 'transparent', color: 'var(--fg)', cursor: 'pointer', opacity: 0.65 }}
                  onClick={() => sendMessage(p)}
                  onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                  onFocus={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                  onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.65' }}
                  onBlur={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.65' }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Side info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-xl)', padding: '1.25rem' }}>
            <div style={{ fontWeight: 900, fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.85rem' }}>What AI can do</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
              {AI_CAPABILITIES.map(({ ico, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '.05rem' }}>{ico}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: '.15rem' }}>{title}</div>
                    <div style={{ fontSize: '.72rem', opacity: 0.6, fontFamily: 'var(--font-serif)', lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Early access */}
          <div style={{ background: 'linear-gradient(135deg,var(--primary),var(--accent2))', borderRadius: 'var(--r-xl)', padding: '1.25rem' }}>
            <div style={{ fontWeight: 900, fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.4rem' }}>Get early access</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '.8rem', opacity: 0.85, lineHeight: 1.5, marginBottom: '1rem' }}>
              AI features launch with PRISM Pro. Drop your email and we&apos;ll notify you when it&apos;s ready.
            </div>
            {notified ? (
              <div style={{ fontSize: '.7rem', opacity: 0.85, fontFamily: 'var(--font-serif)' }}>✓ You&apos;re on the list! We&apos;ll be in touch.</div>
            ) : (
              <div style={{ display: 'flex', gap: '.45rem' }}>
                <label htmlFor="ai-email" className="sr-only">Email address</label>
                <input
                  id="ai-email"
                  type="email"
                  placeholder="your@email.com"
                  value={notifyEmail}
                  onChange={e => setNotifyEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleNotify() }}
                  style={{ flex: 1, background: 'rgba(255,255,255,.2)', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 'var(--r-full)', padding: '.45rem .9rem', fontFamily: 'var(--font-sans)', fontSize: '.72rem', fontWeight: 600, color: '#fff', outline: 'none' }}
                />
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{ background: 'rgba(255,255,255,.95)', color: 'var(--fg)', border: 'none', fontSize: '.62rem', flexShrink: 0 }}
                  onClick={handleNotify}
                >
                  Notify me
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
