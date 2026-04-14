import { create } from 'zustand'

// ── Drawer tab identifiers ────────────────────────────────────────────────────
// Must match the tab labels rendered in Drawer.tsx.
export type DrawerTab = 'presets' | 'colors' | 'type' | 'shape' | 'fx' | 'ix'

// ── Store interface ────────────────────────────────────────────────────────────

interface UIStore {
  // Drawer open / close
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  toggleDrawer: () => void

  // Active drawer tab
  activeDrawerTab: DrawerTab
  setActiveDrawerTab: (tab: DrawerTab) => void

  // Edit mode (click-to-edit on canvas sections)
  editMode: boolean
  toggleEditMode: () => void

  // Which preset is currently applied (null = custom / no preset)
  activePresetId: string | null
  setActivePresetId: (id: string | null) => void

  // Export modal
  exportOpen: boolean
  setExportOpen: (open: boolean) => void
}

// ── Store ──────────────────────────────────────────────────────────────────────

export const useUIStore = create<UIStore>()((set) => ({
  drawerOpen: false,
  setDrawerOpen: (open) => set({ drawerOpen: open }),
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),

  activeDrawerTab: 'presets',
  setActiveDrawerTab: (tab) => set({ activeDrawerTab: tab }),

  editMode: false,
  toggleEditMode: () => set((s) => ({ editMode: !s.editMode })),

  activePresetId: 'purple', // matches the default token set
  setActivePresetId: (id) => set({ activePresetId: id }),

  exportOpen: false,
  setExportOpen: (open) => set({ exportOpen: open }),
}))
