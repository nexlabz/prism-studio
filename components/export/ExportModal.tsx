'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTokenStore } from '@/stores/tokens'
import { useUIStore } from '@/stores/ui'
import { useMounted } from '@/lib/useMounted'
import { findTemplate, resolveTheme, themePatch } from '@/lib/templates'
import type { TokenMap } from '@/lib/tokens/schema'
import { generateCSS, generateJSON, generateSCSS, generateShadcn, generateTailwind, type ExportContext } from './exportGenerators'

// ── Types ──────────────────────────────────────────────────────────────────────

type ExportTab = 'css' | 'tailwind' | 'scss' | 'json' | 'shadcn'

const TABS: { id: ExportTab; label: string; ext: string }[] = [
  { id: 'css',      label: 'CSS Vars',  ext: 'css'  },
  { id: 'tailwind', label: 'Tailwind',  ext: 'js'   },
  { id: 'scss',     label: 'SCSS',      ext: 'scss' },
  { id: 'json',     label: 'JSON',      ext: 'json' },
  { id: 'shadcn',   label: 'shadCN',    ext: 'css'  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Light tokens plus, for a template with its own dark theme, the dark values.
 * Edits made in either theme carry into that theme's block.
 */
function getExportInput(): { tokens: TokenMap; ctx: ExportContext } {
  const s = useTokenStore.getState()
  const template = findTemplate(s.templateId, s.customTemplates)
  if (!template?.ownDark || !template.themes.dark) {
    return { tokens: s.tokens, ctx: { template, vars: s.vars } }
  }
  const light = s.mode === 'light' ? s.tokens : { ...s.tokens, ...themePatch(template, 'light').tokens }
  const darkFull = s.mode === 'dark' ? s.tokens : { ...s.tokens, ...themePatch(template, 'dark').tokens }
  const dark: Partial<TokenMap> = {}
  for (const key of Object.keys(template.themes.dark.tokens) as (keyof TokenMap)[]) dark[key] = darkFull[key]
  return {
    tokens: light,
    ctx: { template, dark, vars: resolveTheme(template, 'light').vars, darkVars: template.themes.dark.vars },
  }
}

function getCode(tab: ExportTab): string {
  const { tokens, ctx } = getExportInput()
  switch (tab) {
    case 'css':      return generateCSS(tokens, ctx)
    case 'tailwind': return generateTailwind(tokens)
    case 'scss':     return generateSCSS(tokens)
    case 'json':     return generateJSON(tokens)
    case 'shadcn':   return generateShadcn(tokens)
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ExportModal() {
  const { exportOpen, setExportOpen } = useUIStore()
  const [activeTab, setActiveTab] = useState<ExportTab>('css')
  const [copied, setCopied]       = useState(false)
  const mounted                   = useMounted()

  if (!mounted) return null

  const code = getCode(activeTab)
  const ext  = TABS.find(t => t.id === activeTab)?.ext ?? 'css'

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }).catch(() => { /* clipboard denied — silent */ })
  }

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([code], { type: 'text/plain' }))
    a.download = `prism-tokens.${ext}`
    a.click()
  }

  return createPortal(
    <AnimatePresence>
      {exportOpen && (
        <motion.div
          key="export-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          onClick={() => setExportOpen(false)}
        >
          <motion.div
            className="em-box"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="em-head">
              <div className="em-title">Export Tokens</div>
              <button type="button" className="em-close" onClick={() => setExportOpen(false)} aria-label="Close">✕</button>
            </div>

            {/* Tabs */}
            <div className="em-tabs">
              {TABS.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={`em-tab${activeTab === t.id ? ' active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Code */}
            <div className="em-body">
              <pre className="em-code">{code}</pre>
            </div>

            {/* Footer */}
            <div className="em-foot">
              <button
                type="button"
                className={`em-btn${copied ? ' copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                type="button"
                className="em-btn"
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.2)', color: 'inherit' }}
                onClick={handleDownload}
              >
                Download .{ext} ↓
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
