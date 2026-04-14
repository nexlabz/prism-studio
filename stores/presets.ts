import type { TokenMap } from '@/lib/tokens/schema'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface Preset {
  id: string
  name: string
  emoji: string
  desc: string
  /** 8 color strings for the thumbnail grid (bg, fg, primary, accent, c1–c4) */
  colors: readonly string[]
  /** Partial token overrides — merged on top of DEFAULT_TOKENS by applyPreset() */
  vars: Partial<TokenMap>
  /** Runtime flag for user-saved presets — not on built-ins */
  isCustom?: boolean
}

// ── 10 built-in presets ────────────────────────────────────────────────────────
// Source: PRESETS array in legacy/prism-design-system.html (lines 1492–1524).
// Keep in sync with the vanilla prototype; any new preset added there must be
// added here and vice-versa.

export const PRESETS: Preset[] = [
  {
    id: 'purple', name: 'Purple Editorial', emoji: '💜', desc: 'Rich editorial purple',
    colors: ['#ede5f8','#1a0835','#b08aec','#a87dd4','#7b4fcc','#4b2280','#d859f5','#1a0835'],
    vars: {
      '--bg': '#ede5f8', '--fg': '#1a0835', '--primary': '#b08aec',
      '--primary-hover': '#8c4de8', '--secondary': '#7b4fcc', '--accent': '#4b2280',
      '--accent2': '#d859f5', '--border': '#1a0835',
      '--sh-col': 'rgba(176,138,236,.3)', '--bw': '2px', '--btn-radius': '9999px',
      '--r-lg': '1.25rem', '--r-xl': '1.75rem', '--r-2xl': '2.5rem',
      '--sh-sm': '0 1px 4px rgba(0,0,0,.08)', '--sh-md': '0 4px 16px rgba(0,0,0,.12)',
      '--sh-lg': '0 12px 40px rgba(0,0,0,.16)', '--blur': '0px',
    },
  },
  {
    id: 'glass', name: 'Glassmorphism', emoji: '🔮', desc: 'Frosted glass & depth',
    colors: ['#0d0d1a','#ffffff','#a78bfa','#7c3aed','#6d28d9','#1e1b4b','#ec4899','rgba(255,255,255,.2)'],
    vars: {
      '--bg': '#0d0d1a', '--fg': '#ffffff', '--primary': '#a78bfa',
      '--primary-hover': '#7c3aed', '--secondary': '#6d28d9', '--accent': '#1e1b4b',
      '--accent2': '#ec4899', '--border': 'rgba(255,255,255,.2)',
      '--border-sub': 'rgba(255,255,255,.1)', '--surface': 'rgba(255,255,255,.06)',
      '--muted-bg': 'rgba(255,255,255,.05)', '--sh-col': 'rgba(167,139,250,.4)',
      '--sh-md': '0 8px 32px rgba(167,139,250,.25)', '--sh-lg': '0 20px 60px rgba(167,139,250,.3)',
      '--bw': '1px', '--blur': '16px', '--btn-radius': '9999px',
      '--r-lg': '1.25rem', '--r-xl': '1.75rem', '--r-2xl': '2.5rem',
    },
  },
  {
    id: 'brutalism', name: 'Neo-Brutalism', emoji: '🔲', desc: 'Raw. Bold. Loud.',
    colors: ['#f5f0e8','#000000','#ff6b35','#e8ff00','#000000','#000000','#ff006e','#000000'],
    vars: {
      '--bg': '#f5f0e8', '--fg': '#000000', '--primary': '#ff6b35',
      '--primary-hover': '#e8ff00', '--secondary': '#000000', '--accent': '#000000',
      '--accent2': '#ff006e', '--border': '#000000',
      '--border-sub': 'rgba(0,0,0,.2)', '--surface': 'rgba(255,255,255,.65)',
      '--muted-bg': 'rgba(0,0,0,.04)', '--sh-col': 'rgba(0,0,0,.5)',
      '--r-xs': '0', '--r-sm': '0', '--r-md': '0', '--r-lg': '0', '--r-xl': '0', '--r-2xl': '0',
      '--bw': '3px',
      '--sh-sm': '4px 4px 0 #000', '--sh-md': '6px 6px 0 #000',
      '--sh-lg': '8px 8px 0 #000', '--sh-xl': '10px 10px 0 #000',
      '--btn-radius': '0', '--blur': '0px',
    },
  },
  {
    id: 'neumorphism', name: 'Neumorphism', emoji: '⬜', desc: 'Soft extruded clay',
    colors: ['#e0e5ec','#3d4756','#7289da','#5a6fd6','#a0aec0','#7289da','#ff7eb3','#c4cfe4'],
    vars: {
      '--bg': '#e0e5ec', '--fg': '#3d4756', '--primary': '#7289da',
      '--primary-hover': '#5a6fd6', '--secondary': '#a0aec0', '--accent': '#7289da',
      '--accent2': '#ff7eb3', '--border': 'transparent', '--border-sub': 'transparent',
      '--surface': '#e0e5ec', '--muted-bg': '#d1d9e6', '--sh-col': 'rgba(114,137,218,.2)',
      '--r-md': '1rem', '--r-lg': '1.5rem', '--r-xl': '2rem', '--r-2xl': '2.75rem',
      '--bw': '0px',
      '--sh-sm': '4px 4px 10px #b8bec7,-4px -4px 10px #ffffff',
      '--sh-md': '6px 6px 15px #b8bec7,-6px -6px 15px #ffffff',
      '--sh-lg': '9px 9px 22px #b8bec7,-9px -9px 22px #ffffff',
      '--btn-radius': '9999px', '--blur': '0px',
    },
  },
  {
    id: 'swiss', name: 'Swiss Minimal', emoji: '🇨🇭', desc: 'Helvetica brutalist grid',
    colors: ['#ffffff','#000000','#ff0000','#cc0000','#555','#000','#ff6666','#000'],
    vars: {
      '--bg': '#ffffff', '--fg': '#000000', '--primary': '#ff0000',
      '--primary-hover': '#cc0000', '--secondary': '#555', '--accent': '#000000',
      '--accent2': '#ff6666', '--border': '#000000',
      '--border-sub': 'rgba(0,0,0,.12)', '--surface': 'rgba(0,0,0,.025)',
      '--muted-bg': 'rgba(0,0,0,.04)', '--sh-col': 'rgba(255,0,0,.2)',
      '--r-xs': '0', '--r-sm': '0', '--r-md': '0', '--r-lg': '0', '--r-xl': '0', '--r-2xl': '0',
      '--bw': '1.5px', '--sh-sm': 'none', '--sh-md': 'none', '--sh-lg': '0 1px 0 #000',
      '--btn-radius': '0', '--blur': '0px',
    },
  },
  {
    id: 'luxury', name: 'Dark Luxury', emoji: '✨', desc: 'Gold on obsidian',
    colors: ['#0a0a0a','#f5e6c8','#d4a853','#e8c068','#9a7b3a','#1a1309','#c9a96e','rgba(212,168,83,.35)'],
    vars: {
      '--bg': '#0a0a0a', '--fg': '#f5e6c8', '--primary': '#d4a853',
      '--primary-hover': '#e8c068', '--secondary': '#9a7b3a', '--accent': '#1a1309',
      '--accent2': '#c9a96e', '--border': 'rgba(212,168,83,.35)',
      '--border-sub': 'rgba(212,168,83,.12)', '--surface': 'rgba(212,168,83,.05)',
      '--muted-bg': 'rgba(212,168,83,.04)', '--sh-col': 'rgba(212,168,83,.25)',
      '--r-lg': '1rem', '--r-xl': '1.5rem', '--r-2xl': '2rem', '--bw': '1px',
      '--sh-sm': '0 2px 8px rgba(212,168,83,.12)', '--sh-md': '0 8px 32px rgba(212,168,83,.15)',
      '--sh-lg': '0 20px 60px rgba(212,168,83,.18)', '--btn-radius': '9999px', '--blur': '0px',
    },
  },
  {
    id: 'y2k', name: 'Y2K Chrome', emoji: '💿', desc: 'Iridescent nostalgia',
    colors: ['#f0f0ff','#1a0050','#ff69b4','#cc00ff','#00d4ff','#6600cc','#ff1493','#1a0050'],
    vars: {
      '--bg': '#f0f0ff', '--fg': '#1a0050', '--primary': '#ff69b4',
      '--primary-hover': '#cc00ff', '--secondary': '#00d4ff', '--accent': '#6600cc',
      '--accent2': '#ff1493', '--border': '#1a0050',
      '--border-sub': 'rgba(26,0,80,.15)', '--surface': 'rgba(255,255,255,.6)',
      '--sh-col': 'rgba(255,105,180,.4)',
      '--r-md': '1.5rem', '--r-lg': '2rem', '--r-xl': '2.5rem', '--r-2xl': '3rem',
      '--bw': '2px',
      '--sh-sm': '0 0 10px rgba(255,105,180,.4)', '--sh-md': '0 0 25px rgba(0,212,255,.35)',
      '--sh-lg': '0 0 50px rgba(204,0,255,.3)', '--btn-radius': '9999px', '--blur': '0px',
    },
  },
  {
    id: 'aurora', name: 'Aurora Dark', emoji: '🌌', desc: 'Deep space glow',
    colors: ['#050510','#e8e0ff','#7b2fff','#9d4fff','#4a1fa8','#0a0a30','#ff3bac','rgba(123,47,255,.4)'],
    vars: {
      '--bg': '#050510', '--fg': '#e8e0ff', '--primary': '#7b2fff',
      '--primary-hover': '#9d4fff', '--secondary': '#4a1fa8', '--accent': '#0a0a30',
      '--accent2': '#ff3bac', '--border': 'rgba(123,47,255,.4)',
      '--border-sub': 'rgba(123,47,255,.18)', '--surface': 'rgba(123,47,255,.06)',
      '--muted-bg': 'rgba(123,47,255,.05)', '--sh-col': 'rgba(123,47,255,.4)',
      '--r-lg': '1.5rem', '--r-xl': '2rem', '--r-2xl': '2.75rem', '--bw': '1px',
      '--sh-sm': '0 2px 15px rgba(123,47,255,.3)', '--sh-md': '0 8px 40px rgba(123,47,255,.35)',
      '--sh-lg': '0 20px 80px rgba(123,47,255,.4)', '--btn-radius': '9999px', '--blur': '0px',
    },
  },
  {
    id: 'clay', name: 'Claymorphism', emoji: '🧸', desc: '3D pastel bubbles',
    colors: ['#ffeef8','#2d1b4e','#ff8fab','#ff4d7a','#c77dff','#a8d8ff','#ffd6ff','rgba(255,143,171,.15)'],
    vars: {
      '--bg': '#ffeef8', '--fg': '#2d1b4e', '--primary': '#ff8fab',
      '--primary-hover': '#ff4d7a', '--secondary': '#c77dff', '--accent': '#a8d8ff',
      '--accent2': '#ffd6ff', '--border': 'rgba(45,27,78,.15)',
      '--border-sub': 'rgba(45,27,78,.08)', '--surface': 'rgba(255,255,255,.6)',
      '--sh-col': 'rgba(255,143,171,.35)',
      '--r-md': '1.5rem', '--r-lg': '2rem', '--r-xl': '2.5rem', '--r-2xl': '3rem',
      '--bw': '0px',
      '--sh-sm': '0 8px 20px rgba(255,143,171,.3),inset 0 -4px 8px rgba(0,0,0,.06)',
      '--sh-md': '0 16px 40px rgba(255,143,171,.35),inset 0 -6px 12px rgba(0,0,0,.05)',
      '--sh-lg': '0 24px 60px rgba(255,143,171,.4),inset 0 -8px 16px rgba(0,0,0,.04)',
      '--btn-radius': '9999px', '--blur': '0px',
    },
  },
  {
    id: 'editorial', name: 'Warm Editorial', emoji: '📰', desc: 'Print magazine warmth',
    colors: ['hsl(32,71%,91%)','#1a1209','#c4902a','#e85d04','#7a5c3a','#9b2335','#e07a5f','#1a1209'],
    vars: {
      '--bg': 'hsl(32,71%,91%)', '--fg': '#1a1209', '--primary': '#c4902a',
      '--primary-hover': '#e85d04', '--secondary': '#7a5c3a', '--accent': '#9b2335',
      '--accent2': '#e07a5f', '--border': '#1a1209',
      '--border-sub': 'rgba(26,18,9,.15)', '--surface': 'rgba(255,255,255,.45)',
      '--sh-col': 'rgba(196,144,42,.2)',
      '--r-xs': '.15rem', '--r-sm': '.3rem', '--r-md': '.5rem',
      '--r-lg': '.75rem', '--r-xl': '1rem', '--r-2xl': '1.5rem',
      '--bw': '2px',
      '--sh-sm': '2px 2px 0 rgba(0,0,0,.12)', '--sh-md': '4px 4px 0 rgba(0,0,0,.1)',
      '--sh-lg': '6px 6px 0 rgba(0,0,0,.08)', '--btn-radius': '0', '--blur': '0px',
    },
  },
]
