// Server Component — pure display, no interactivity needed.

import { SectionLabel } from '@/components/canvas/SectionLabel'

export function TypographySection() {
  return (
    <section id="typography">
      <div className="sec-header">
        <SectionLabel index="02" kicker="Type" />
        <h2 className="sec-title">Typography</h2>
        <p className="sec-desc">
          Switch fonts from the Type tab. Dual-font system: display sans + editorial serif.
        </p>
      </div>

      {/* Font specimen cards */}
      <div className="g2" style={{ gap: '1rem', marginBottom: '2rem' }}>
        <div className="spec-card" style={{ background: 'var(--c2)', borderRadius: 'var(--r-xl)', border: 'var(--bw) solid var(--border)', padding: '1.65rem' }}>
          <div style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.6, marginBottom: '.7rem' }}>SANS — DISPLAY</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-sans)' }}>ABCDEFGHIJKLM</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.1, fontFamily: 'var(--font-sans)', marginBottom: '.65rem' }}>nopqrstuvwxyz</div>
          <div style={{ fontSize: '.72rem', opacity: 0.6 }}>Headings · Buttons · Labels · UI</div>
        </div>
        <div className="spec-card" style={{ background: 'var(--c6)', borderRadius: 'var(--r-xl)', border: 'var(--bw) solid var(--border)', padding: '1.65rem' }}>
          <div style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.6, marginBottom: '.7rem' }}>SERIF — EDITORIAL</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-serif)' }}>ABCDEFGHIJKLM</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.1, fontFamily: 'var(--font-serif)', marginBottom: '.65rem' }}>nopqrstuvwxyz</div>
          <div style={{ fontSize: '.72rem', opacity: 0.6 }}>Body · Excerpts · Quotes</div>
        </div>
      </div>

      {/* Type scale */}
      <div style={{ borderBottom: '1px solid var(--border-sub)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.4, marginBottom: '.3rem' }}>.display — Hero</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--wt-h)', fontSize: 'clamp(3rem,9vw,7.5rem)', textTransform: 'uppercase', letterSpacing: 'var(--ls)', lineHeight: 0.82 }}>DESIGN</div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-sub)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.4, marginBottom: '.3rem' }}>.heading-xl — Section</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--wt-h)', fontSize: 'clamp(1.9rem,4vw,3.2rem)', textTransform: 'uppercase', letterSpacing: 'var(--ls)' }}>DESIGN SYSTEM STUDIO</div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-sub)', paddingBottom: '1.1rem', marginBottom: '1.1rem' }}>
        <div style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.4, marginBottom: '.3rem' }}>.heading-lg — Card title</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--wt-h)', fontSize: '1.6rem', textTransform: 'uppercase', letterSpacing: 'var(--ls)' }}>Building a Modern Design System</div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-sub)', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.4, marginBottom: '.3rem' }}>.body-xl — Pull quote</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem,2.5vw,1.75rem)', lineHeight: 1.3, maxWidth: '640px' }}>
          A great design system unifies teams, speeds up development, and creates <em>delightful</em> user experiences at scale.
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border-sub)', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.4, marginBottom: '.3rem' }}>.body — Standard</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '.95rem', lineHeight: 'var(--lh)', maxWidth: '580px', opacity: 0.82 }}>
          Good typography is invisible. It guides the reader through the content without drawing attention to itself, creating a seamless reading experience that feels natural and effortless throughout.
        </div>
      </div>

      <div>
        <div style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', opacity: 0.4, marginBottom: '.3rem' }}>.mono — Code</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.85rem', background: 'var(--muted-bg)', padding: '.5rem 1rem', borderRadius: 'var(--r-md)', display: 'inline-block' }}>
          {'const primary = \'var(--primary)\' // #b08aec'}
        </div>
      </div>
    </section>
  )
}
