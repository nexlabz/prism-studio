// Server Component — avatars, data table, and tooltips are CSS-driven.

import { SectionLabel } from '@/components/canvas/SectionLabel'

export function DataSection() {
  return (
    <section id="data">
      <div className="sec-header">
        <SectionLabel index="08" kicker="Data" />
        <h2 className="sec-title">Data display</h2>
      </div>

      {/* Avatars & Stacks */}
      <div className="glbl">Avatars &amp; Stacks</div>
      <div className="row" style={{ alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
        <div className="ava ava-sm" style={{ background: 'var(--c3)' }}>JL</div>
        <div className="ava ava-md" style={{ background: 'var(--c4)' }}>MR</div>
        <div className="ava ava-lg" style={{ background: 'var(--c2)' }}>AK</div>
        <div className="ava-stack">
          <div className="ava ava-md" style={{ background: 'var(--c1)' }}>A</div>
          <div className="ava ava-md" style={{ background: 'var(--c4)' }}>B</div>
          <div className="ava ava-md" style={{ background: 'var(--c3)' }}>C</div>
          <div className="ava ava-md" style={{ background: 'var(--c6)' }}>D</div>
          <div className="ava ava-md" style={{ background: 'var(--muted-bg)', color: 'var(--fg)', fontSize: '.58rem' }}>+12</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="glbl">Data Table</div>
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Role</th>
              <th>Projects</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div className="td-ava"><div className="ava ava-sm" style={{ background: 'var(--c3)' }}>JL</div>Jamie Lee</div></td>
              <td><span className="badge badge-success">Active</span></td>
              <td>Head of Design</td>
              <td>12</td>
              <td>Jan 2024</td>
              <td><button type="button" className="btn btn-ghost btn-sm">Edit</button></td>
            </tr>
            <tr>
              <td><div className="td-ava"><div className="ava ava-sm" style={{ background: 'var(--c4)' }}>MR</div>Marco R.</div></td>
              <td><span className="badge badge-warning">Pending</span></td>
              <td>CTO</td>
              <td>8</td>
              <td>Mar 2024</td>
              <td><button type="button" className="btn btn-ghost btn-sm">Edit</button></td>
            </tr>
            <tr>
              <td><div className="td-ava"><div className="ava ava-sm" style={{ background: 'var(--c6)' }}>AK</div>Aiko Kim</div></td>
              <td><span className="badge badge-success">Active</span></td>
              <td>Developer</td>
              <td>24</td>
              <td>Nov 2023</td>
              <td><button type="button" className="btn btn-ghost btn-sm">Edit</button></td>
            </tr>
            <tr>
              <td><div className="td-ava"><div className="ava ava-sm" style={{ background: 'var(--c7)' }}>TP</div>Tom Park</div></td>
              <td><span className="badge badge-error">Offline</span></td>
              <td>Designer</td>
              <td>6</td>
              <td>Jun 2024</td>
              <td><button type="button" className="btn btn-ghost btn-sm">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tooltips */}
      <div className="glbl" style={{ marginTop: '1.5rem' }}>Tooltips</div>
      <div className="row" style={{ gap: '1rem' }}>
        <div className="tip-wrap">
          <button type="button" className="btn btn-outline">Hover me</button>
          <div className="tip">This is a tooltip!</div>
        </div>
        <div className="tip-wrap">
          <button type="button" className="btn btn-filled">Save</button>
          <div className="tip">⌘ + S</div>
        </div>
        <div className="tip-wrap">
          <button type="button" className="btn btn-ghost">Delete</button>
          <div className="tip" style={{ background: 'var(--error)' }}>Cannot be undone</div>
        </div>
      </div>
    </section>
  )
}
