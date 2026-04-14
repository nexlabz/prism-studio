'use client'

import { useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

type TabId = 'nt1' | 'nt2' | 'nt3' | 'nt4'

const TAB_CONTENT: Record<TabId, string> = {
  nt1: 'A design system is a collection of reusable components and guidelines that helps teams build better products faster. It is the single source of truth for design and code.',
  nt2: 'Components include buttons, inputs, cards, modals, tables — all built on the same token foundation.',
  nt3: 'Design tokens are the core values: colors, spacing, typography, radius, shadows. They live in CSS variables and flow into every component.',
  nt4: 'v2.0 — PRISM engine, inline editing. v1.2 — Dark mode. v1.0 — Initial release.',
}

const SIDEBAR_ITEMS = [
  { ico: '🏠', label: 'Dashboard' },
  { ico: '🎨', label: 'Design' },
  { ico: '📦', label: 'Components' },
  { ico: '📐', label: 'Tokens' },
  { ico: '📊', label: 'Analytics' },
  { ico: '⚙', label: 'Settings' },
] as const

// ── Component ──────────────────────────────────────────────────────────────────

export function NavigationSection() {
  const [activeTab, setActiveTab] = useState<TabId>('nt1')
  const [activeSidebar, setActiveSidebar] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activePage, setActivePage] = useState(1)

  return (
    <section id="navigation">
      <div className="sec-header">
        <div className="sec-lbl">06 — Wayfinding</div>
        <h2 className="sec-title">NAVIGATION</h2>
      </div>

      {/* Tabs */}
      <div className="glbl">Tabs</div>
      <div style={{ marginBottom: '2rem' }}>
        <div className="nav-tabs-demo">
          {(['nt1', 'nt2', 'nt3', 'nt4'] as TabId[]).map((id, i) => (
            <button
              key={id}
              type="button"
              className={`ntab${activeTab === id ? ' active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {['Overview', 'Components', 'Tokens', 'Changelog'][i]}
            </button>
          ))}
        </div>
        <div className="tab-body">{TAB_CONTENT[activeTab]}</div>
      </div>

      {/* Breadcrumbs & Pagination */}
      <div className="glbl">Breadcrumbs &amp; Pagination</div>
      <div className="row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1.1rem', marginBottom: '2rem' }}>
        <div className="bcrumb">
          <span className="bc-i">Home</span>
          <span className="bc-s">›</span>
          <span className="bc-i">Design System</span>
          <span className="bc-s">›</span>
          <span className="bc-i">Components</span>
          <span className="bc-s">›</span>
          <span className="bc-i active">Navigation</span>
        </div>
        <div className="pagi">
          <button type="button" className="pg-btn" disabled={activePage === 1} onClick={() => setActivePage(p => Math.max(1, p - 1))}>‹</button>
          {[1, 2, 3].map(n => (
            <button key={n} type="button" className={`pg-btn${activePage === n ? ' active' : ''}`} onClick={() => setActivePage(n)}>{n}</button>
          ))}
          <span style={{ opacity: 0.38, fontSize: '.8rem', padding: '0 .2rem' }}>…</span>
          <button type="button" className={`pg-btn${activePage === 12 ? ' active' : ''}`} onClick={() => setActivePage(12)}>12</button>
          <button type="button" className="pg-btn" onClick={() => setActivePage(p => Math.min(12, p + 1))}>›</button>
        </div>
      </div>

      {/* Sidebar & Dropdown */}
      <div className="glbl">Sidebar &amp; Dropdown</div>
      <div className="row" style={{ alignItems: 'flex-start', gap: '2rem' }}>
        <div className="side-nav">
          {SIDEBAR_ITEMS.map(({ ico, label }, i) => (
            <button
              key={label}
              type="button"
              className={`s-nav-i${activeSidebar === i ? ' active' : ''}`}
              onClick={() => setActiveSidebar(i)}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              <span className="s-nav-ico">{ico}</span>
              {label}
            </button>
          ))}
        </div>

        <div>
          <div className="glbl">Dropdown Menu</div>
          <div className="dd-wrap">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setDropdownOpen(o => !o)}
            >
              Account ▾
            </button>
            {dropdownOpen && (
              <div className="dd-menu" style={{ display: 'block' }}>
                <div className="dd-i">👤 Profile</div>
                <div className="dd-i">⚙ Settings</div>
                <div className="dd-i">🎨 Theme</div>
                <div className="dd-sep" />
                <div className="dd-i danger">🚪 Sign out</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
