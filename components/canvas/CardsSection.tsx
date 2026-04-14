// Server Component — all cards are static display.

export function CardsSection() {
  return (
    <section id="cards">
      <div className="sec-header">
        <div className="sec-lbl">05 — Components</div>
        <h2 className="sec-title">CARDS &amp; LAYOUT</h2>
      </div>

      {/* KPI / Stat Cards */}
      <div className="glbl">KPI / Stat Cards</div>
      <div className="g4" style={{ marginBottom: '2rem' }}>
        <div className="stat-card" style={{ background: 'var(--c1)' }}>
          <div className="stat-ico">📈</div>
          <div className="stat-val">$48.2K</div>
          <div className="stat-lbl">Revenue</div>
          <div className="stat-d up">↑ 12.4% vs last month</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--c4)' }}>
          <div className="stat-ico">👥</div>
          <div className="stat-val">3,842</div>
          <div className="stat-lbl">Active Users</div>
          <div className="stat-d up">↑ 8.1% this week</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--c5)' }}>
          <div className="stat-ico">⚡</div>
          <div className="stat-val">99.9%</div>
          <div className="stat-lbl">Uptime</div>
          <div className="stat-d up">→ SLA maintained</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--c6)' }}>
          <div className="stat-ico">🎯</div>
          <div className="stat-val">94.2</div>
          <div className="stat-lbl">NPS Score</div>
          <div className="stat-d dn">↓ 2.1 vs last qtr</div>
        </div>
      </div>

      {/* Article Cards */}
      <div className="glbl">Article Cards</div>
      <div className="g3" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ background: 'var(--c2)' }}>
          <div className="card-img-wrap">
            <div className="card-img-ph" style={{ background: 'linear-gradient(var(--grad-angle),var(--c3),var(--c2))' }}>🎨</div>
          </div>
          <div className="card-p">
            <div className="card-tag">Design</div>
            <div className="card-title">Modern Design Systems</div>
            <div className="card-body">Discover the principles behind building scalable design systems that grow with your team.</div>
          </div>
          <div className="card-ft">
            <span style={{ fontSize: '.65rem', opacity: 0.55, textTransform: 'uppercase', fontWeight: 700 }}>Mar 15, 2025</span>
            <button type="button" className="btn btn-outline btn-sm">Read →</button>
          </div>
        </div>
        <div className="card" style={{ background: 'var(--c7)' }}>
          <div className="card-img-wrap">
            <div className="card-img-ph" style={{ background: 'linear-gradient(var(--grad-angle),var(--c5),var(--c7))' }}>🌿</div>
          </div>
          <div className="card-p">
            <div className="card-tag">Style</div>
            <div className="card-title">Capsule Wardrobe Guide</div>
            <div className="card-body">A curated approach to minimalist dressing that maximises versatility and expression.</div>
          </div>
          <div className="card-ft">
            <span style={{ fontSize: '.65rem', opacity: 0.55, textTransform: 'uppercase', fontWeight: 700 }}>Feb 28, 2025</span>
            <button type="button" className="btn btn-outline btn-sm">Read →</button>
          </div>
        </div>
        <div className="card" style={{ background: 'var(--c4)' }}>
          <div className="card-img-wrap">
            <div className="card-img-ph" style={{ background: 'linear-gradient(var(--grad-angle),var(--c8),var(--c4))' }}>🌊</div>
          </div>
          <div className="card-p">
            <div className="card-tag">Tech</div>
            <div className="card-title">Generative Interfaces</div>
            <div className="card-body">How AI is reshaping the way we think about adaptive layouts and intelligent personalization.</div>
          </div>
          <div className="card-ft">
            <span style={{ fontSize: '.65rem', opacity: 0.55, textTransform: 'uppercase', fontWeight: 700 }}>Jan 10, 2025</span>
            <button type="button" className="btn btn-outline btn-sm">Read →</button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="glbl">Pricing</div>
      <div className="g3" style={{ marginBottom: '2rem' }}>
        <div className="price-card">
          <div className="price-plan">Starter</div>
          <div className="price-amt">$0</div>
          <div className="price-per">forever free</div>
          <ul className="price-list">
            <li>3 projects</li>
            <li>Basic components</li>
            <li>Community support</li>
          </ul>
          <button type="button" className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }}>Get started</button>
        </div>
        <div className="price-card feat">
          <div className="price-badge">Popular</div>
          <div className="price-plan">Pro</div>
          <div className="price-amt">$29</div>
          <div className="price-per">per month, billed annually</div>
          <ul className="price-list">
            <li>Unlimited projects</li>
            <li>All components</li>
            <li>Priority support</li>
            <li>Custom tokens</li>
          </ul>
          <button type="button" className="btn btn-filled" style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--primary)' }}>Start free trial →</button>
        </div>
        <div className="price-card">
          <div className="price-plan">Enterprise</div>
          <div className="price-amt">$99</div>
          <div className="price-per">custom billing</div>
          <ul className="price-list">
            <li>Everything in Pro</li>
            <li>SSO + SAML</li>
            <li>SLA guarantee</li>
            <li>Dedicated manager</li>
          </ul>
          <button type="button" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Contact sales</button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="glbl">Testimonials</div>
      <div className="g2">
        <div className="testi">
          <div className="testi-q">&ldquo;PRISM completely changed how our team ships UI. We went from inconsistent one-offs to a coherent, beautiful system in a single afternoon.&rdquo;</div>
          <div className="testi-author">
            <div className="ava ava-md" style={{ background: 'var(--c3)' }}>JL</div>
            <div>
              <div className="ava-name">Jamie Lee</div>
              <div className="ava-role">Head of Design, Acme Co.</div>
            </div>
          </div>
        </div>
        <div className="testi">
          <div className="testi-q">&ldquo;The real-time customization is next level. Our brand refresh took 2 hours instead of 2 weeks. Every token, every component — perfectly synced.&rdquo;</div>
          <div className="testi-author">
            <div className="ava ava-md" style={{ background: 'var(--c4)' }}>MR</div>
            <div>
              <div className="ava-name">Marco Russo</div>
              <div className="ava-role">CTO, Studio Nova</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
