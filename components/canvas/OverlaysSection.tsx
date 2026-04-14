'use client'

import { useState } from 'react'

// ── Demo Modal ─────────────────────────────────────────────────────────────────
// Backdrop is a <button> so it is a proper interactive element (satisfies a11y).
// The modal content div stops propagation to prevent the backdrop handler firing.

function DemoModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      {/* Backdrop button */}
      <button
        type="button"
        aria-label="Close modal"
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.55)', border: 'none', cursor: 'default', width: '100%', height: '100%' }}
        onClick={onClose}
      />
      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Demo modal"
        style={{ position: 'relative', zIndex: 1, background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-2xl)', padding: '2rem', maxWidth: '480px', width: '100%', boxShadow: 'var(--sh-xl)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.1rem' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>Demo Modal</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '.78rem', opacity: 0.55, marginTop: '.2rem' }}>Controlled by border-radius token --r-2xl</div>
          </div>
          <button type="button" className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close modal" style={{ flexShrink: 0 }}>✕</button>
        </div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '.88rem', lineHeight: 1.6, opacity: 0.8, marginBottom: '1.25rem' }}>
          This modal&apos;s corner radius is controlled by the <code>--r-2xl</code> token. Adjust it from the Shape drawer tab to see every overlay in your system update at once.
        </p>
        <div className="ig" style={{ marginBottom: '1rem' }}>
          <label htmlFor="modal-input">Quick input</label>
          <input id="modal-input" className="input" type="text" placeholder="Type something…" />
        </div>
        <div style={{ display: 'flex', gap: '.65rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-filled" onClick={onClose}>Confirm →</button>
        </div>
      </div>
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export function OverlaysSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="overlays">
      <div className="sec-header">
        <div className="sec-lbl">09 — Overlays</div>
        <h2 className="sec-title">OVERLAYS</h2>
      </div>

      {modalOpen && <DemoModal onClose={() => setModalOpen(false)} />}

      <div className="g2" style={{ gap: '2rem' }}>
        {/* Left column */}
        <div>
          <div className="glbl">Modal</div>
          <button type="button" className="btn btn-filled" onClick={() => setModalOpen(true)}>Open Modal →</button>

          <div className="glbl" style={{ marginTop: '1.5rem' }}>Notification Center</div>
          <div style={{ background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
            <div style={{ padding: '.9rem 1.1rem', borderBottom: '1px solid var(--border-sub)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 900, fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>Notifications</span>
              <span className="badge badge-primary">4 new</span>
            </div>
            <div style={{ padding: '.8rem 1.1rem', borderBottom: '1px solid var(--border-sub)', display: 'flex', gap: '.65rem', alignItems: 'flex-start', background: 'var(--muted-bg)' }}>
              <div className="ava ava-sm" style={{ background: 'var(--success)', flexShrink: 0, marginTop: '.1rem' }}>✓</div>
              <div>
                <div style={{ fontSize: '.76rem', fontWeight: 800 }}>Tokens exported</div>
                <div style={{ fontSize: '.65rem', opacity: 0.45, marginTop: '.12rem', fontFamily: 'var(--font-serif)' }}>2 minutes ago</div>
              </div>
            </div>
            <div style={{ padding: '.8rem 1.1rem', borderBottom: '1px solid var(--border-sub)', display: 'flex', gap: '.65rem', alignItems: 'flex-start', background: 'var(--muted-bg)' }}>
              <div className="ava ava-sm" style={{ background: 'var(--c4)', flexShrink: 0, marginTop: '.1rem' }}>MR</div>
              <div>
                <div style={{ fontSize: '.76rem', fontWeight: 800 }}>Marco commented on Card</div>
                <div style={{ fontSize: '.65rem', opacity: 0.45, marginTop: '.12rem', fontFamily: 'var(--font-serif)' }}>14 minutes ago</div>
              </div>
            </div>
            <div style={{ padding: '.8rem 1.1rem', display: 'flex', gap: '.65rem', alignItems: 'flex-start' }}>
              <div className="ava ava-sm" style={{ background: 'var(--warning)', flexShrink: 0, marginTop: '.1rem' }}>!</div>
              <div>
                <div style={{ fontSize: '.76rem', fontWeight: 800 }}>Trial expires in 7 days</div>
                <div style={{ fontSize: '.65rem', opacity: 0.45, marginTop: '.12rem', fontFamily: 'var(--font-serif)' }}>1 hour ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="glbl">Quick Form Sheet</div>
          <div style={{ background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-xl)', padding: '1.5rem' }}>
            <div style={{ fontWeight: 900, fontSize: '.9rem', textTransform: 'uppercase', marginBottom: '1.2rem', letterSpacing: '.04em' }}>Login</div>
            <div className="ig">
              <label htmlFor="ov-email">Email</label>
              <input id="ov-email" className="input" type="email" placeholder="you@example.com" />
            </div>
            <div className="ig">
              <label htmlFor="ov-pass">Password</label>
              <input id="ov-pass" className="input" type="password" placeholder="••••••••" />
            </div>
            <button type="button" className="btn btn-filled" style={{ width: '100%', justifyContent: 'center', marginTop: '.3rem' }}>Sign in →</button>
            <div style={{ textAlign: 'center', marginTop: '.7rem', fontSize: '.7rem', opacity: 0.45, fontFamily: 'var(--font-serif)' }}>Forgot password?</div>
          </div>
        </div>
      </div>
    </section>
  )
}
