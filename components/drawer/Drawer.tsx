'use client'

import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore, type DrawerTab } from '@/stores/ui'
import { useTokenStore } from '@/stores/tokens'
import { useMounted } from '@/lib/useMounted'
import { PresetsPanel }      from './panels/PresetsPanel'
import { ColorsPanel }       from './panels/ColorsPanel'
import { TypePanel }         from './panels/TypePanel'
import { ShapePanel }        from './panels/ShapePanel'
import { FXPanel }           from './panels/FXPanel'
import { InteractionsPanel } from './panels/InteractionsPanel'

// ── Tab config ────────────────────────────────────────────────────────────────

const TABS: { id: DrawerTab; label: string; icon: string }[] = [
  { id: 'presets', label: 'Presets', icon: '✦' },
  { id: 'colors',  label: 'Colors',  icon: '🎨' },
  { id: 'type',    label: 'Type',    icon: 'Aa' },
  { id: 'shape',   label: 'Shape',   icon: '◻' },
  { id: 'fx',      label: 'FX',      icon: '✨' },
  { id: 'ix',      label: 'Motion',  icon: '⚡' },
]

function renderPanel(tab: DrawerTab) {
  switch (tab) {
    case 'presets': return <PresetsPanel />
    case 'colors':  return <ColorsPanel />
    case 'type':    return <TypePanel />
    case 'shape':   return <ShapePanel />
    case 'fx':      return <FXPanel />
    case 'ix':      return <InteractionsPanel />
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Drawer() {
  const { drawerOpen, setDrawerOpen, activeDrawerTab, setActiveDrawerTab } = useUIStore()
  const { resetAll } = useTokenStore()
  const mounted = useMounted()

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setDrawerOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,.45)',
              zIndex: 9998,
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
            }}
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '380px',
              maxWidth: '100vw',
              background: 'var(--bg)',
              border: 'none',
              borderLeft: 'var(--bw) solid var(--border-sub)',
              boxShadow: 'var(--sh-lg)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Drawer header */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-sub)', display: 'flex', alignItems: 'center', gap: '.75rem', flexShrink: 0, background: 'var(--muted-bg)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 900, fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>PRISM Studio</div>
                <div style={{ fontSize: '.6rem', opacity: 0.45, marginTop: '.05rem' }}>Design token editor</div>
              </div>
              <button
                type="button"
                onClick={resetAll}
                style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', opacity: 0.45, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg)', padding: '.25rem .5rem' }}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: 'var(--bw) solid var(--border-sub)', borderRadius: 'var(--r-sm)', cursor: 'pointer', fontSize: '1rem', color: 'var(--fg)', flexShrink: 0 }}
                aria-label="Close drawer"
              >
                ×
              </button>
            </div>

            {/* Tab bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-sub)', flexShrink: 0, overflowX: 'auto' }}>
              {TABS.map(({ id, label, icon }) => {
                const isActive = activeDrawerTab === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveDrawerTab(id)}
                    style={{
                      flex: 1,
                      minWidth: '3.5rem',
                      padding: '.65rem .25rem',
                      background: 'none',
                      border: 'none',
                      borderBottom: isActive ? '2px solid var(--ink-accent)' : '2px solid transparent',
                      cursor: 'pointer',
                      color: isActive ? 'var(--ink-accent)' : 'var(--fg)',
                      fontSize: '.58rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '.05em',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '.2rem',
                      transition: 'color var(--tx-f), border-color var(--tx-f)',
                      opacity: isActive ? 1 : 0.55,
                    }}
                  >
                    <span style={{ fontSize: '.85rem', lineHeight: 1 }}>{icon}</span>
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Panel content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
              {renderPanel(activeDrawerTab)}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
