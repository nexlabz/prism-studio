'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useMounted } from '@/lib/useMounted'

// ── Component ──────────────────────────────────────────────────────────────────
// Fixes B-05: renders outside modal DOM so cursor dot/ring always appear on top.
// Portal target: document.body — same level as the Drawer portal.

export function CursorFollower() {
  const mounted = useMounted()
  const [visible, setVisible] = useState(false)
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Track ring position separately (lagged) via requestAnimationFrame
  const mouse   = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const frameId = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true)
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    // Lerp ring position
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      frameId.current = requestAnimationFrame(tick)
    }
    frameId.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(frameId.current)
    }
  }, [visible])

  if (!mounted) return null

  const opacity = visible ? 1 : 0

  return createPortal(
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          marginLeft: '-3px',
          marginTop: '-3px',
          borderRadius: '50%',
          background: 'var(--ink-accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity,
          transition: 'opacity .2s',
          willChange: 'transform',
        }}
      />
      {/* Ring — lags behind via lerp */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          marginLeft: '-14px',
          marginTop: '-14px',
          borderRadius: '50%',
          border: '1.5px solid var(--ink-accent)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: opacity * 0.55,
          transition: 'opacity .2s',
          willChange: 'transform',
        }}
      />
    </>,
    document.body,
  )
}
