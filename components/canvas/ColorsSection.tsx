// Server Component — interactivity is delegated entirely to <Swatch> (client).

import { Swatch } from '@/components/ui/Swatch'

// ── Data ──────────────────────────────────────────────────────────────────────

const BRAND_SWATCHES = [
  { varName: '--bg',           label: 'Background'    },
  { varName: '--fg',           label: 'Foreground'    },
  { varName: '--primary',      label: 'Primary'       },
  { varName: '--primary-hover',label: 'Primary Hover' },
  { varName: '--secondary',    label: 'Secondary'     },
  { varName: '--accent',       label: 'Accent'        },
  { varName: '--accent2',      label: 'Accent Alt'    },
  { varName: '--border',       label: 'Border'        },
] as const

const PALETTE_SWATCHES = [
  { varName: '--c1', label: 'Yellow'   },
  { varName: '--c2', label: 'Purple'   },
  { varName: '--c3', label: 'Magenta'  },
  { varName: '--c4', label: 'Blue'     },
  { varName: '--c5', label: 'Coral'    },
  { varName: '--c6', label: 'Mint'     },
  { varName: '--c7', label: 'Orange'   },
  { varName: '--c8', label: 'Lavender' },
] as const

const STATUS_SWATCHES = [
  { varName: '--success', label: 'Success' },
  { varName: '--warning', label: 'Warning' },
  { varName: '--error',   label: 'Error'   },
  { varName: '--info',    label: 'Info'    },
] as const

// ── Component ─────────────────────────────────────────────────────────────────

export function ColorsSection() {
  return (
    <section id="colors">
      <div className="sec-header">
        <div className="sec-lbl">01 — Foundation</div>
        <h2 className="sec-title">COLORS</h2>
        <p className="sec-desc">
          Click any swatch to edit it inline. Changes cascade through the entire
          system instantly. Sync with the Colors tab in the drawer.
        </p>
      </div>

      {/* Brand Palette — 4-column grid */}
      <div className="glbl">Brand Palette</div>
      <div className="swatch-g4">
        {BRAND_SWATCHES.map(({ varName, label }) => (
          <Swatch key={varName} varName={varName} label={label} size="md" />
        ))}
      </div>

      {/* Vibrant Card Palette — 8-column grid */}
      <div className="glbl">Vibrant Card Palette</div>
      <div className="swatch-g8">
        {PALETTE_SWATCHES.map(({ varName, label }) => (
          <Swatch key={varName} varName={varName} label={label} size="sm" />
        ))}
      </div>

      {/* Status Colors — 4-column grid */}
      <div className="glbl">Status Colors</div>
      <div className="swatch-g4">
        {STATUS_SWATCHES.map(({ varName, label }) => (
          <Swatch key={varName} varName={varName} label={label} size="md" />
        ))}
      </div>
    </section>
  )
}
