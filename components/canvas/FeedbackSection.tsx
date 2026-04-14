// Server Component — alerts, badges, progress bars, spinners, skeletons are all static CSS.
// Note: the section id is "feedback" (status feedback), distinct from "feedback-board" (community board).

export function FeedbackSection() {
  return (
    <section id="feedback-section">
      <div className="sec-header">
        <div className="sec-lbl">07 — Status</div>
        <h2 className="sec-title">FEEDBACK</h2>
      </div>

      <div className="g2" style={{ gap: '2rem' }}>
        {/* Left column */}
        <div>
          <div className="glbl">Alerts</div>
          <div className="alert alert-info">
            <span className="alert-ico">ℹ</span>
            <div>
              <div className="alert-title">Heads up</div>
              <div className="alert-body">Your trial ends in 7 days. Upgrade to keep all features.</div>
            </div>
          </div>
          <div className="alert alert-success">
            <span className="alert-ico">✓</span>
            <div>
              <div className="alert-title">Success</div>
              <div className="alert-body">Design tokens exported successfully.</div>
            </div>
          </div>
          <div className="alert alert-warning">
            <span className="alert-ico">⚠</span>
            <div>
              <div className="alert-title">Warning</div>
              <div className="alert-body">Approaching your monthly token limit.</div>
            </div>
          </div>
          <div className="alert alert-error">
            <span className="alert-ico">✕</span>
            <div>
              <div className="alert-title">Error</div>
              <div className="alert-body">Failed to save changes. Check your connection.</div>
            </div>
          </div>

          <div className="glbl">Toast</div>
          {/* B-08: dismiss functionality not yet implemented (Phase 1 known gap) */}
          <div className="toast">
            <span className="toast-ico">✅</span>
            <span className="toast-msg">Changes saved successfully</span>
            <button type="button" className="toast-x">✕</button>
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="glbl">Badges</div>
          <div className="row" style={{ flexWrap: 'wrap', gap: '.45rem', marginBottom: '1.5rem' }}>
            <span className="badge badge-primary">New</span>
            <span className="badge badge-success">Active</span>
            <span className="badge badge-error">Offline</span>
            <span className="badge badge-warning">Pending</span>
            <span className="badge badge-outline">Draft</span>
            <span className="badge badge-primary">Beta</span>
          </div>

          <div className="glbl">Progress Bars</div>
          <div className="prog-wrap">
            <div className="prog-lr">
              <span className="prog-lbl">Storage</span>
              <span className="prog-pct">72%</span>
            </div>
            <div className="prog-track"><div className="prog-bar" style={{ width: '72%' }} /></div>
          </div>
          <div className="prog-wrap sm">
            <div className="prog-lr">
              <span className="prog-lbl">Tasks</span>
              <span className="prog-pct">45/60</span>
            </div>
            <div className="prog-track"><div className="prog-bar" style={{ width: '75%', background: 'var(--success)' }} /></div>
          </div>
          <div className="prog-wrap lg">
            <div className="prog-lr">
              <span className="prog-lbl">Upload</span>
              <span className="prog-pct">23%</span>
            </div>
            <div className="prog-track"><div className="prog-bar" style={{ width: '23%', background: 'var(--warning)' }} /></div>
          </div>

          <div className="glbl">Loaders</div>
          <div className="row" style={{ alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="spin sm" />
            <div className="spin" />
            <div className="spin lg" />
          </div>

          <div className="glbl">Skeleton</div>
          <div style={{ display: 'flex', gap: '.7rem', alignItems: 'center', marginBottom: '.8rem' }}>
            <div className="skel" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div className="skel skel-line" style={{ width: '58%' }} />
              <div className="skel skel-line" style={{ width: '88%' }} />
              <div className="skel skel-line" style={{ width: '42%' }} />
            </div>
          </div>
          <div className="skel" style={{ height: '7rem', borderRadius: 'var(--r-lg)' }} />
        </div>
      </div>
    </section>
  )
}
