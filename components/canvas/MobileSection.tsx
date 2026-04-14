// Server Component — phone frame mockup is entirely static.

export function MobileSection() {
  return (
    <section id="mobile">
      <div className="sec-header">
        <div className="sec-lbl">11 — Mobile</div>
        <h2 className="sec-title">MOBILE</h2>
        <p className="sec-desc">
          Same design tokens power every mobile component. All colors, radii, and shadows flow through automatically.
        </p>
      </div>

      <div className="row" style={{ gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Phone frame */}
        <div className="phone-frame">
          <div className="phone-screen">
            <div className="msb">
              <span className="msb-t">9:41</span>
              <span className="msb-t">●●●● 🔋</span>
            </div>
            <div className="mab">
              <button type="button" className="mab-ico">←</button>
              <div className="mab-title">Dashboard</div>
              <button type="button" className="mab-ico">🔔</button>
              <button type="button" className="mab-ico">👤</button>
            </div>
            <div className="m-content">
              <div className="m-card">
                <div className="m-ico" style={{ background: 'var(--c1)' }}>📈</div>
                <div className="m-text">
                  <div className="m-title">Revenue</div>
                  <div className="m-sub">$48.2K this month</div>
                </div>
                <span className="badge badge-success" style={{ fontSize: '.42rem' }}>↑12%</span>
              </div>
              <div className="m-card">
                <div className="m-ico" style={{ background: 'var(--c4)' }}>👥</div>
                <div className="m-text">
                  <div className="m-title">Users</div>
                  <div className="m-sub">3,842 active</div>
                </div>
                <span className="badge badge-primary" style={{ fontSize: '.42rem' }}>↑8%</span>
              </div>
              <div className="m-card">
                <div className="m-ico" style={{ background: 'var(--c3)' }}>🎨</div>
                <div className="m-text">
                  <div className="m-title">Tokens</div>
                  <div className="m-sub">124 exported</div>
                </div>
                <span className="badge badge-outline" style={{ fontSize: '.42rem' }}>NEW</span>
              </div>
              <div className="m-card" style={{ background: 'var(--c2)', borderColor: 'transparent' }}>
                <div className="m-ico" style={{ background: 'rgba(0,0,0,.12)' }}>⚡</div>
                <div className="m-text">
                  <div className="m-title">Uptime</div>
                  <div className="m-sub">99.9% SLA</div>
                </div>
              </div>
            </div>
            <div className="mbn">
              <div className="mbn-i active"><div className="mbn-ico">🏠</div><div className="mbn-lbl">Home</div></div>
              <div className="mbn-i"><div className="mbn-ico">🔍</div><div className="mbn-lbl">Search</div></div>
              <div className="mbn-i"><div className="mbn-ico">⊕</div><div className="mbn-lbl">Create</div></div>
              <div className="mbn-i"><div className="mbn-ico">📊</div><div className="mbn-lbl">Stats</div></div>
              <div className="mbn-i"><div className="mbn-ico">👤</div><div className="mbn-lbl">You</div></div>
            </div>
          </div>
        </div>

        {/* Side content */}
        <div style={{ flex: 1, minWidth: '260px' }}>
          <div className="glbl">Login Sheet</div>
          <div style={{ background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-xl)', padding: '1.4rem', marginBottom: '1rem' }}>
            <div style={{ fontWeight: 900, fontSize: '.88rem', textTransform: 'uppercase', marginBottom: '1.1rem', letterSpacing: '.04em' }}>Sign In</div>
            <div className="ig">
              <label htmlFor="mobile-email">Email</label>
              <input id="mobile-email" className="input" type="email" placeholder="you@example.com" />
            </div>
            <div className="ig">
              <label htmlFor="mobile-password">Password</label>
              <input id="mobile-password" className="input" type="password" placeholder="••••••••" />
            </div>
            <button type="button" className="btn btn-filled" style={{ width: '100%', justifyContent: 'center', marginTop: '.25rem' }}>Continue →</button>
          </div>

          <div className="glbl">App Bar Variants</div>
          <div style={{ background: 'var(--fg)', borderRadius: 'var(--r-lg)', padding: '.7rem .95rem', display: 'flex', alignItems: 'center', gap: '.55rem', marginBottom: '.45rem' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: '.82rem', letterSpacing: '.06em', color: 'var(--bg)', flex: 1, textTransform: 'uppercase' }}>PRISM</span>
            <div className="mab-ico" style={{ background: 'rgba(255,255,255,.1)', color: 'var(--bg)' }}>🔍</div>
            <div className="mab-ico" style={{ background: 'rgba(255,255,255,.1)', color: 'var(--bg)' }}>⚙</div>
          </div>
          <div style={{ background: 'var(--primary)', borderRadius: 'var(--r-lg)', padding: '.7rem .95rem', display: 'flex', alignItems: 'center', gap: '.55rem' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontStyle: 'italic', fontSize: '.92rem', color: 'var(--fg)', flex: 1 }}>Prism Studio</span>
            <div className="mab-ico" style={{ background: 'rgba(0,0,0,.12)' }}>←</div>
            <div className="mab-ico" style={{ background: 'rgba(0,0,0,.12)' }}>⋯</div>
          </div>
        </div>
      </div>
    </section>
  )
}
