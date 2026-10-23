import type { Template } from './types'

// ── Suture — "ledger / terminal" ──────────────────────────────────────────────
// Source: AviOfLagos/suture, packages/ui/src/{tokens,theme,fonts}.css at a019d3a
// (branch wave0/design-system), themselves read from leadengine.nexprove.com.
// Every colour there is a light-dark() pair; the pairs are split into the two
// themes below. Suture's own variable names are kept in `vars` so exported CSS
// matches the package, and mapped onto PRISM tokens in `tokens`.
//
// Mapping notes (PRISM token ← Suture token):
//   --bg ← --ground       --surface ← --panel     --muted-bg ← --ground-2
//   --fg ← --ink          --muted ← --dim          --border ← --frame
//   --border-sub ← --line --input-border-col ← --edge
//   --primary ← --hi-fill (vanilla CTA band)       --on-primary ← --on-hi-fill
//   --secondary ← --hi (ink in light, vanilla in dark: focus, active marker)
//   --accent ← --chart-dot  --accent2 ← --info
//   --success ← --fixed   --error ← --fail        --info ← --info
//   --warning ← --hi      (Suture has no warning hue; `running` uses --hi)
//   --sh-md ← --depth-ledger  --sh-lg ← --depth-hard  --sh-xl ← --depth-pop
//   --c1…c8 ← the reference primitives (--su-vanilla … --su-rust)

const EASE = 'cubic-bezier(.22,1,.36,1)'

const SANS = "'Urbanist Variable','Urbanist',ui-sans-serif,system-ui,sans-serif"
const MONO = "'JetBrains Mono Variable','JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace"
const DOT = "'Doto Variable','Doto','JetBrains Mono Variable',ui-monospace,monospace"
const PIXEL = "'Silkscreen','JetBrains Mono Variable',ui-monospace,monospace"

export const SUTURE_TEMPLATE: Template = {
  id: 'suture',
  name: 'Suture',
  emoji: '▚',
  desc: 'Ledger / terminal. Square, mono, one accent.',
  tags: ['ledger', 'terminal', '2 themes', 'AA'],
  colors: ['#f6f5fa', '#212121', '#eff0a3', '#5f6f88', '#cfdeca', '#d8dfe9', '#a33a26', '#3f6b37'],
  darkColors: ['#171717', '#f6f5fa', '#eff0a3', '#a9bbd6', '#cfdeca', '#d8dfe9', '#e0806e', '#212121'],
  ownDark: true,
  source: {
    label: 'AviOfLagos/suture · packages/ui',
    href: 'https://github.com/AviOfLagos/suture/tree/main/packages/ui/src',
    ref: 'a019d3a',
  },
  fonts: [
    { role: 'sans', family: 'Urbanist Variable', source: 'fontsource', importPath: '@fontsource-variable/urbanist/wght.css', use: 'Display and body' },
    { role: 'mono', family: 'JetBrains Mono Variable', source: 'fontsource', importPath: '@fontsource-variable/jetbrains-mono/wght.css', use: 'Data, logs, labels, [buttons]' },
    { role: 'display', family: 'Doto Variable', source: 'fontsource', importPath: '@fontsource-variable/doto/full.css', use: 'The one bold word and big numerals' },
    { role: 'micro', family: 'Silkscreen', source: 'fontsource', importPath: '@fontsource/silkscreen/latin-400.css', use: 'Pixel micro labels: ticker, status chips' },
  ],
  rules: {
    primaryRole: 'fill',
    buttonLabel: 'bracket',
    buttonHover: 'stripe',
    headingCase: 'sentence',
    sectionNumber: 'paren',
    labelFont: 'mono',
    status: 'bracket',
    surface: 'frame',
    code: 'terminal',
    corners: 'square',
    backdrop: 'grid',
  },
  palette: {
    '--c1': 'Vanilla', '--c2': 'Honeydew', '--c3': 'Alice', '--c4': 'Steel',
    '--c5': 'Coral', '--c6': 'Moss', '--c7': 'Slate', '--c8': 'Rust',
  },
  themes: {
    light: {
      tokens: {
        // ── colour ──
        '--bg': '#f6f5fa',
        '--fg': '#212121',
        '--primary': '#eff0a3',
        '--primary-hover': '#212121',
        '--on-primary': '#212121',
        '--secondary': '#212121',
        '--accent': '#5f6f88',
        '--accent2': '#46566e',
        '--surface': '#ffffff',
        '--border': 'rgba(33,33,33,.62)',
        '--border-sub': 'rgba(33,33,33,.13)',
        '--muted': '#5f6169',
        '--muted-bg': '#eeedf3',
        '--c1': '#eff0a3', '--c2': '#cfdeca', '--c3': '#d8dfe9', '--c4': '#a9bbd6',
        '--c5': '#e0806e', '--c6': '#3f6b37', '--c7': '#46566e', '--c8': '#a33a26',
        '--success': '#3f6b37',
        '--warning': '#212121',
        '--error': '#a33a26',
        '--info': '#46566e',

        // ── type ──
        '--font-sans': SANS,
        '--font-serif': SANS, // no serif in the system: body copy is Urbanist too
        '--font-mono': MONO,
        '--font-display': DOT,
        '--font-micro': PIXEL,
        '--sz': '16px',
        '--wt-h': '300', // headings are light, sentence case
        '--wt-b': '500',
        '--lh': '1.6',
        '--ls': '-.04em',

        // ── shape: everything is square; graph nodes are the only pills ──
        '--r-xs': '0', '--r-sm': '0', '--r-md': '0', '--r-lg': '0', '--r-xl': '0', '--r-2xl': '0',
        '--r-full': '9999px',
        '--btn-radius': '0',
        '--input-radius': '0',

        // ── stroke / space ──
        '--bw': '1px',
        '--px': '2rem', // --gut at ≥760px
        '--py': '4rem',
        '--gap': '1rem',

        // ── depth: hard, single light source top-left ──
        '--sh-sm': 'none',
        '--sh-md': '16px 16px 0 rgba(33,33,33,.09)',
        '--sh-lg': '14px 14px 0 rgba(0,0,0,.22)',
        '--sh-xl': '0 14px 34px rgba(0,0,0,.3)',
        '--sh-col': 'rgba(33,33,33,.25)',

        // ── effects ──
        '--blur': '0px',
        '--glass-bg': 'rgba(255,255,255,.66)',
        '--grad-angle': '90deg',

        // ── motion: no bouncy easing ──
        '--tx-f': `150ms ${EASE}`,
        '--tx-m': `300ms ${EASE}`,
        '--tx-s': `450ms ${EASE}`,

        // ── inputs ──
        '--input-bw': '1px',
        '--input-bg': '#ffffff',
        '--input-border-col': 'rgba(33,33,33,.52)',
        '--input-focus-shadow': '0 0 0 3px rgba(33,33,33,.25)',
      },
      vars: {
        '--soft': '#4d4f57',
        '--panel-2': '#fafafc',
        '--overlay': 'rgba(33,33,33,.38)',
        '--gridline': 'rgba(33,33,33,.055)',
        '--griddot': 'rgba(33,33,33,.22)',
        '--seg-off': 'rgba(33,33,33,.1)',
        '--scan': 'rgba(33,33,33,.05)',
        '--on-fail': '#ffffff',
        '--on-fixed': '#ffffff',
        '--on-info': '#ffffff',

        // terminal surface: dark in both themes
        '--term-bg': '#191919',
        '--term-bar': '#1e1e1e',
        '--term-line': '#3a3a3a',
        '--term-rule': '#333333',
        '--term-ink': '#d9dae0',
        '--term-strong': '#f6f5fa',
        '--term-soft': '#9a9ca4',
        '--term-dim': '#8a8c94',
        '--term-hi': '#eff0a3',
        '--term-fail': '#e0806e',
        '--term-fixed': '#cfdeca',
        '--term-info': '#d8dfe9',

        // type scale the canvas labels use
        '--fs-micro': '.62rem',
        '--fs-label': '.72rem',
        '--fs-meta': '.8rem',
        '--ls-label': '.06em',
        '--ls-tight': '-.01em',

        // shape / space
        '--stroke-strong': '1.5px',
        '--bk-rest': '16px',
        '--bk-hover': '24px',
        '--ctl': '40px',
        '--ctl-sm': '32px',
        '--ctl-xs': '24px',
        '--grid-size': '48px',
        '--dot-gap': '16px',

        // motion
        '--ease': EASE,
        '--ease-meter': 'cubic-bezier(.2,.7,.2,1)',
        '--dur-fast': '150ms',
        '--dur-base': '200ms',
        '--dur-medium': '300ms',
        '--dur-slow': '450ms',
        '--dur-crawl': '700ms',
        '--steps-fill': 'steps(14)',
        '--blink-duration': '1s',
        '--marquee-duration': '60s',
      },
    },
    dark: {
      tokens: {
        '--bg': '#171717',
        '--fg': '#f6f5fa',
        '--secondary': '#eff0a3',
        '--accent': '#a9bbd6',
        '--accent2': '#d8dfe9',
        '--surface': '#212121',
        '--border': 'rgba(246,245,250,.55)',
        '--border-sub': 'rgba(246,245,250,.12)',
        '--muted': '#91939b',
        '--muted-bg': '#1d1d1d',
        '--success': '#cfdeca',
        '--warning': '#eff0a3',
        '--error': '#e0806e',
        '--info': '#d8dfe9',
        '--sh-md': '16px 16px 0 rgba(246,245,250,.09)',
        '--sh-col': 'rgba(239,240,163,.25)',
        '--glass-bg': 'rgba(33,33,33,.62)',
        '--input-bg': '#212121',
        '--input-border-col': 'rgba(246,245,250,.42)',
        '--input-focus-shadow': '0 0 0 3px rgba(239,240,163,.25)',
      },
      vars: {
        '--soft': '#b0b2ba',
        '--panel-2': '#2a2a2a',
        '--overlay': 'rgba(0,0,0,.6)',
        '--gridline': 'rgba(246,245,250,.045)',
        '--griddot': 'rgba(246,245,250,.16)',
        '--seg-off': 'rgba(246,245,250,.1)',
        '--scan': 'rgba(246,245,250,.05)',
        '--on-fail': '#212121',
        '--on-fixed': '#212121',
        '--on-info': '#212121',
      },
    },
  },
}
