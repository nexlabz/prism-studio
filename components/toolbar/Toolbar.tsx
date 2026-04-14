'use client'

import { useUIStore, type DrawerTab } from '@/stores/ui'

// ── Tab buttons ───────────────────────────────────────────────────────────────

const ICON_TABS: { tab: DrawerTab; label: string; icon: string }[] = [
  { tab: 'colors', label: 'Colors',       icon: '🖌' },
  { tab: 'type',   label: 'Typography',   icon: 'Aa' },
  { tab: 'shape',  label: 'Shape',        icon: '📐' },
  { tab: 'fx',     label: 'Effects',      icon: '✨' },
  { tab: 'ix',     label: 'Interactions', icon: '⚡' },
]

// ── Component ──────────────────────────────────────────────────────────────────

export function Toolbar() {
  const { setDrawerOpen, setActiveDrawerTab, toggleEditMode, editMode, setExportOpen } = useUIStore()

  const openTab = (tab: DrawerTab) => {
    setActiveDrawerTab(tab)
    setDrawerOpen(true)
  }

  return (
    <header id="toolbar">
      {/* Logo */}
      <div className="tb-logo">
        PRISM<span>Design System Studio</span>
      </div>

      <div className="tb-sep" />

      {/* Presets — primary CTA */}
      <button type="button" className="tb-btn" onClick={() => openTab('presets')}>
        🎨 Presets
      </button>

      <div className="tb-spacer" />

      {/* Edit mode toggle */}
      <button
        type="button"
        className={`tb-btn${editMode ? ' active' : ''}`}
        onClick={toggleEditMode}
      >
        ✏ {editMode ? 'Editing' : 'Edit Mode'}
      </button>

      <div className="tb-sep" />

      {/* Quick-access icon buttons */}
      {ICON_TABS.map(({ tab, label, icon }) => (
        <button
          key={tab}
          type="button"
          className="tb-icon"
          title={label}
          onClick={() => openTab(tab)}
        >
          {icon}
        </button>
      ))}

      <div className="tb-sep" />

      {/* Export */}
      <button type="button" className="tb-export" onClick={() => setExportOpen(true)}>
        Export ↗
      </button>
    </header>
  )
}
