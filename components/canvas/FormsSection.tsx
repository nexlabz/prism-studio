'use client'

import { useCallback, useState } from 'react'

// ── Validation ─────────────────────────────────────────────────────────────────

const VALIDATORS: Record<string, (v: string) => boolean> = {
  email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  password: v => v.length >= 8 && /\d/.test(v),
  phone:    v => /^\+?[\d\s\-()]{7,}$/.test(v),
  url:      v => /^https:\/\/.+/.test(v),
}

type FieldState = 'idle' | 'valid' | 'invalid'

// ── Component ──────────────────────────────────────────────────────────────────

export function FormsSection() {
  // Validation states
  const [emailState, setEmailState]  = useState<FieldState>('idle')
  const [passState, setPassState]    = useState<FieldState>('idle')
  const [phoneState, setPhoneState]  = useState<FieldState>('idle')
  const [urlState, setUrlState]      = useState<FieldState>('idle')

  // Password toggle
  const [showPass, setShowPass] = useState(false)

  // Toggles (visual-only — B-10 known gap, no real input)
  const [tgl1, setTgl1] = useState(true)
  const [tgl2, setTgl2] = useState(false)
  const [tgl3, setTgl3] = useState(true)

  // Checkboxes (visual-only)
  const [chk1, setChk1] = useState(true)
  const [chk2, setChk2] = useState(false)

  // Radios (visual-only)
  const [rad, setRad] = useState<1 | 2>(1)

  // Range sliders
  const [opacity, setOpacity] = useState(72)
  const [scale, setScale]     = useState(60)

  const validate = useCallback((type: string, value: string): FieldState => {
    if (!value) return 'idle'
    return VALIDATORS[type]?.(value) ? 'valid' : 'invalid'
  }, [])

  const fieldClass = (state: FieldState) =>
    `ig${state === 'valid' ? ' valid' : state === 'invalid' ? ' error' : ''}`

  const scaleDisplay = (v: number) => `${(0.5 + (v / 100) * 1.5).toFixed(1)}×`

  return (
    <section id="forms">
      <div className="sec-header">
        <div className="sec-lbl">04 — Inputs</div>
        <h2 className="sec-title">FORM CONTROLS</h2>
        <p className="sec-desc">Real validation on blur. 6 input style variants. All controls interactive.</p>
      </div>

      <div className="g2" style={{ gap: '2.5rem' }}>
        {/* Left column — validated inputs */}
        <div>
          <div className="glbl">Validated Inputs</div>

          <div className={fieldClass(emailState)}>
            <label htmlFor="fi-email">Email</label>
            <div className="input-wrap">
              <span className="input-ico">✉</span>
              <input
                id="fi-email"
                className="input"
                type="text"
                placeholder="you@example.com"
                onBlur={e => setEmailState(validate('email', e.target.value))}
              />
            </div>
            <div className="hint">Enter a valid email address</div>
          </div>

          <div className={fieldClass(passState)}>
            <label htmlFor="fi-pass">Password</label>
            <div className="input-wrap">
              <span className="input-ico">🔒</span>
              <input
                id="fi-pass"
                className="input has-r"
                type={showPass ? 'text' : 'password'}
                placeholder="Min 8 chars, 1 number"
                onBlur={e => setPassState(validate('password', e.target.value))}
              />
              <button
                type="button"
                className="input-ico input-ico-r"
                style={{ cursor: 'pointer', pointerEvents: 'all', background: 'none', border: 'none' }}
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                👁
              </button>
            </div>
            <div className="hint">Min 8 characters, at least one number</div>
          </div>

          <div className={fieldClass(phoneState)}>
            <label htmlFor="fi-phone">Phone</label>
            <input
              id="fi-phone"
              className="input"
              type="text"
              placeholder="+1 555 000 0000"
              onBlur={e => setPhoneState(validate('phone', e.target.value))}
            />
            <div className="hint">Include country code</div>
          </div>

          <div className={fieldClass(urlState)}>
            <label htmlFor="fi-url">Website URL</label>
            <input
              id="fi-url"
              className="input"
              type="text"
              placeholder="https://yourdomain.com"
              onBlur={e => setUrlState(validate('url', e.target.value))}
            />
            <div className="hint">Must start with https://</div>
          </div>

          <div className="ig">
            <label htmlFor="fi-select">Select Option</label>
            <select id="fi-select" className="select">
              <option value="">Choose…</option>
              <option>Design System</option>
              <option>Component Library</option>
              <option>Style Guide</option>
              <option>Brand Kit</option>
            </select>
          </div>

          <div className="ig">
            <label htmlFor="fi-message">Message</label>
            <textarea id="fi-message" className="input" placeholder="Write something…" defaultValue="This design system is fully customizable in real time." />
          </div>
        </div>

        {/* Right column — variants, toggles, sliders */}
        <div>
          <div className="glbl">Input Style Variants</div>
          <div className="ig"><label htmlFor="fi-v1">Bordered (default)</label><input id="fi-v1" className="input" type="text" placeholder="Standard bordered input" /></div>
          <div className="ig"><label htmlFor="fi-v2">Underline only</label><input id="fi-v2" className="input input-underline" type="text" placeholder="Clean underline style" /></div>
          <div className="ig"><label htmlFor="fi-v3">Filled / no border</label><input id="fi-v3" className="input input-filled" type="text" placeholder="Filled background" /></div>
          <div className="ig"><label htmlFor="fi-v4">Ghost</label><input id="fi-v4" className="input input-ghost" type="text" placeholder="Ghost — no border" /></div>
          <div className="ig"><label htmlFor="fi-v5">Glow on focus</label><input id="fi-v5" className="input input-glow" type="text" placeholder="Glow effect on focus" /></div>
          <div className="ig"><label htmlFor="fi-v6">Thick border</label><input id="fi-v6" className="input input-thick" type="text" placeholder="Heavy border weight" /></div>

          {/* Toggles — hidden checkbox drives state; custom visual reflects it (B-10) */}
          <div className="glbl">Toggles, Checks &amp; Radios</div>

          <label className="toggle-r" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={tgl1} onChange={() => setTgl1(v => !v)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
            <div className={`toggle-t${tgl1 ? ' on' : ''}`}><div className="toggle-k" /></div>
            <span>Dark mode enabled</span>
          </label>
          <label className="toggle-r" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={tgl2} onChange={() => setTgl2(v => !v)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
            <div className={`toggle-t${tgl2 ? ' on' : ''}`}><div className="toggle-k" /></div>
            <span>Notifications off</span>
          </label>
          <label className="toggle-r" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={tgl3} onChange={() => setTgl3(v => !v)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
            <div className={`toggle-t${tgl3 ? ' on' : ''}`}><div className="toggle-k" /></div>
            <span>Auto-save on</span>
          </label>

          <div style={{ marginTop: '.5rem' }} />

          {/* Checkboxes — same hidden-input pattern */}
          <label className="chk-r" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={chk1} onChange={() => setChk1(v => !v)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
            <div className={`chk-box${chk1 ? ' on' : ''}`}>{chk1 ? '✓' : ''}</div>
            <span>Accept terms of service</span>
          </label>
          <label className="chk-r" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={chk2} onChange={() => setChk2(v => !v)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
            <div className={`chk-box${chk2 ? ' on' : ''}`}>{chk2 ? '✓' : ''}</div>
            <span>Subscribe to newsletter</span>
          </label>

          <div style={{ marginTop: '.3rem' }} />

          {/* Radios — hidden radio inputs share a name group */}
          <label className="chk-r" style={{ cursor: 'pointer' }}>
            <input type="radio" name="billing" checked={rad === 1} onChange={() => setRad(1)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
            <div className={`rad-box${rad === 1 ? ' on' : ''}`} />
            <span>Monthly billing</span>
          </label>
          <label className="chk-r" style={{ cursor: 'pointer' }}>
            <input type="radio" name="billing" checked={rad === 2} onChange={() => setRad(2)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
            <div className={`rad-box${rad === 2 ? ' on' : ''}`} />
            <span>Annual billing — save 30%</span>
          </label>

          {/* Range Sliders */}
          <div className="glbl">Range Sliders</div>
          <div style={{ marginBottom: '1rem' }}>
            <div className="flex-b" style={{ marginBottom: '.35rem' }}>
              <label htmlFor="opacity-range" style={{ fontSize: '.72rem', fontWeight: 700 }}>Opacity</label>
              <span style={{ fontSize: '.72rem', opacity: 0.45 }}>{opacity}%</span>
            </div>
            <input
              id="opacity-range"
              type="range"
              className="range-in"
              value={opacity}
              min={0}
              max={100}
              onChange={e => setOpacity(Number(e.target.value))}
            />
          </div>
          <div>
            <div className="flex-b" style={{ marginBottom: '.35rem' }}>
              <label htmlFor="scale-range" style={{ fontSize: '.72rem', fontWeight: 700 }}>Scale</label>
              <span style={{ fontSize: '.72rem', opacity: 0.45 }}>{scaleDisplay(scale)}</span>
            </div>
            <input
              id="scale-range"
              type="range"
              className="range-in"
              value={scale}
              min={0}
              max={100}
              onChange={e => setScale(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
