'use client'

import { useEffect, useRef, useState } from 'react'

const wireLines: { tag: 'polyline' | 'line'; cls: string; delay: number; dashLen: number; attrs: Record<string, string> }[] = [
  { tag: 'polyline', cls: 'wire-line--gray', delay: 1, dashLen: 1440, attrs: { points: '40,20 360,20 380,40 380,360 360,380 40,380 20,360 20,40 40,20' } },
  { tag: 'line', cls: 'wire-line--gray', delay: 2, dashLen: 530, attrs: { x1: '20', y1: '40', x2: '380', y2: '360' } },
  { tag: 'line', cls: 'wire-line--gray', delay: 3, dashLen: 530, attrs: { x1: '380', y1: '40', x2: '20', y2: '360' } },
  { tag: 'polyline', cls: 'wire-line--accent', delay: 4, dashLen: 700, attrs: { points: '120,80 280,80 320,140 280,200 120,200 80,140 120,80' } },
  { tag: 'line', cls: 'wire-line--gray', delay: 5, dashLen: 360, attrs: { x1: '200', y1: '20', x2: '200', y2: '380' } },
  { tag: 'line', cls: 'wire-line--gray', delay: 6, dashLen: 360, attrs: { x1: '20', y1: '200', x2: '380', y2: '200' } },
  { tag: 'polyline', cls: 'wire-line--accent', delay: 7, dashLen: 440, attrs: { points: '100,280 200,220 300,280 200,360 100,280' } },
  { tag: 'line', cls: 'wire-line--gray', delay: 8, dashLen: 110, attrs: { x1: '120', y1: '80', x2: '40', y2: '20' } },
  { tag: 'line', cls: 'wire-line--gray', delay: 9, dashLen: 110, attrs: { x1: '280', y1: '80', x2: '360', y2: '20' } },
  { tag: 'line', cls: 'wire-line--accent', delay: 10, dashLen: 60, attrs: { x1: '320', y1: '140', x2: '380', y2: '140' } },
  { tag: 'line', cls: 'wire-line--accent', delay: 11, dashLen: 60, attrs: { x1: '80', y1: '140', x2: '20', y2: '140' } },
  { tag: 'line', cls: 'wire-line--gray', delay: 12, dashLen: 113, attrs: { x1: '300', y1: '280', x2: '380', y2: '360' } },
  { tag: 'line', cls: 'wire-line--gray', delay: 13, dashLen: 113, attrs: { x1: '100', y1: '280', x2: '20', y2: '360' } },
  { tag: 'line', cls: 'wire-line--accent', delay: 14, dashLen: 28, attrs: { x1: '190', y1: '190', x2: '210', y2: '210' } },
  { tag: 'line', cls: 'wire-line--accent', delay: 14, dashLen: 28, attrs: { x1: '210', y1: '190', x2: '190', y2: '210' } },
]

const wireNodes: { cls: string; delay: number; cx: number; cy: number; r: string }[] = [
  { cls: 'wire-node--accent', delay: 1, cx: 200, cy: 200, r: '4' },
  { cls: 'wire-node--gray', delay: 2, cx: 120, cy: 80, r: '3' },
  { cls: 'wire-node--gray', delay: 3, cx: 280, cy: 80, r: '3' },
  { cls: 'wire-node--accent', delay: 4, cx: 320, cy: 140, r: '3' },
  { cls: 'wire-node--accent', delay: 5, cx: 80, cy: 140, r: '3' },
  { cls: 'wire-node--gray', delay: 6, cx: 200, cy: 360, r: '3' },
  { cls: 'wire-node--accent', delay: 7, cx: 200, cy: 20, r: '3' },
]

export default function Hero() {
  const titleRef = useRef<HTMLParagraphElement>(null)
  const wireframeRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseInSvg, setMouseInSvg] = useState({ x: -1, y: -1 })
  // Pupil offset from center (200,200), clamped
  const [pupil, setPupil] = useState({ x: 200, y: 200 })

  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const fullText = 'Director of Software Engineering'
    const cursor = el.querySelector('.hero__cursor')
    el.textContent = ''
    if (cursor) el.appendChild(cursor)

    let charIndex = 0
    let cancelled = false

    const timer = setTimeout(function typeChar() {
      if (cancelled) return
      if (charIndex < fullText.length) {
        const textNode = document.createTextNode(fullText.charAt(charIndex))
        if (cursor) {
          el.insertBefore(textNode, cursor)
        } else {
          el.appendChild(textNode)
        }
        charIndex++
        setTimeout(typeChar, 70)
      }
    }, 500)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const wf = wireframeRef.current
    if (!wf) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wf.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height

      const maxTilt = 45
      setRotateX(Math.max(-maxTilt, Math.min(maxTilt, -dy * 30)))
      setRotateY(Math.max(-maxTilt, Math.min(maxTilt, dx * 30)))

      // Map mouse to SVG coords
      const svgX = ((e.clientX - rect.left) / rect.width) * 400
      const svgY = ((e.clientY - rect.top) / rect.height) * 400
      setMouseInSvg({ x: svgX, y: svgY })

      // Pupil tracks cursor, clamped to eye radius
      const pdx = svgX - 200
      const pdy = svgY - 200
      const pDist = Math.sqrt(pdx * pdx + pdy * pdy)
      const maxPupilOffset = 25
      if (pDist > 0) {
        const clampedDist = Math.min(pDist, maxPupilOffset * 3)
        const ratio = Math.min(clampedDist / (maxPupilOffset * 3), 1)
        setPupil({
          x: 200 + (pdx / pDist) * maxPupilOffset * ratio,
          y: 200 + (pdy / pDist) * maxPupilOffset * ratio,
        })
      }
    }

    const handleMouseLeave = () => {
      setRotateX(0)
      setRotateY(0)
      setMouseInSvg({ x: -1, y: -1 })
      setPupil({ x: 200, y: 200 })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    wf.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      wf.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const nearRadius = 120
  const nodeProximity = wireNodes.map((n) => {
    if (mouseInSvg.x < 0) return 0
    const dx = n.cx - mouseInSvg.x
    const dy = n.cy - mouseInSvg.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    return dist < nearRadius ? 1 - dist / nearRadius : 0
  })

  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <h1 className="hero__name">
          <span className="hero__name-line hero__name--glitch" data-text="Rafael">
            Rafael
          </span>
          <span className="hero__name-line">Ramos</span>
        </h1>
        <p className="hero__title" ref={titleRef}>
          Director of Software Engineering
          <span className="hero__cursor" aria-hidden="true" />
        </p>
      </div>

      <div
        className="hero__wireframe"
        ref={wireframeRef}
        aria-hidden="true"
        onClick={() => {
          const rect = wireframeRef.current?.getBoundingClientRect()
          if (rect) {
            window.dispatchEvent(new CustomEvent('watcher-spawn', {
              detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
            }))
          }
        }}
        style={{
          transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="scanGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Structure lines */}
          {wireLines.map((l, i) => {
            const Tag = l.tag
            return (
              <Tag
                key={i}
                className={`wire-line ${l.cls} wire-draw wire-draw-d${l.delay}`}
                style={{ '--dash-len': l.dashLen, strokeDasharray: l.dashLen, strokeDashoffset: l.dashLen } as React.CSSProperties}
                {...l.attrs}
              />
            )
          })}

          {/* === CYBER EYE === */}
          {/* Outer eye ring */}
          <circle cx="200" cy="200" r="55" stroke="#333" strokeWidth="1" fill="none" className="watcher-ring" />
          <circle cx="200" cy="200" r="45" stroke="#ff2d2d" strokeWidth="0.5" fill="none" opacity="0.3" className="watcher-ring" />

          {/* Radar sweep */}
          <circle cx="200" cy="200" r="50" stroke="none" fill="none" className="watcher-sweep-container">
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="4s" repeatCount="indefinite" />
          </circle>
          <line x1="200" y1="200" x2="200" y2="150" stroke="#ff2d2d" strokeWidth="1" opacity="0.4" filter="url(#scanGlow)">
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="4s" repeatCount="indefinite" />
          </line>

          {/* Scanning arc */}
          <path d="M 200 155 A 45 45 0 0 1 237 175" stroke="#ff2d2d" strokeWidth="1.5" fill="none" opacity="0.2" filter="url(#scanGlow)">
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="4s" repeatCount="indefinite" />
          </path>

          {/* Inner iris ring */}
          <circle cx="200" cy="200" r="30" stroke="#ff2d2d" strokeWidth="1" fill="none" opacity="0.15" strokeDasharray="4 8" className="watcher-iris">
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="-360 200 200" dur="8s" repeatCount="indefinite" />
          </circle>

          {/* Pupil - tracks cursor */}
          <circle cx={pupil.x} cy={pupil.y} r="12" fill="#ff2d2d" opacity="0.15" filter="url(#glow)" />
          <circle cx={pupil.x} cy={pupil.y} r="6" fill="#ff2d2d" opacity="0.5" filter="url(#glow)" />
          <circle cx={pupil.x} cy={pupil.y} r="2" fill="#ff2d2d" opacity="0.9" />

          {/* Crosshair ticks */}
          <line x1="200" y1="140" x2="200" y2="148" stroke="#ff2d2d" strokeWidth="1" opacity="0.4" />
          <line x1="200" y1="252" x2="200" y2="260" stroke="#ff2d2d" strokeWidth="1" opacity="0.4" />
          <line x1="140" y1="200" x2="148" y2="200" stroke="#ff2d2d" strokeWidth="1" opacity="0.4" />
          <line x1="252" y1="200" x2="260" y2="200" stroke="#ff2d2d" strokeWidth="1" opacity="0.4" />

          {/* Corner brackets */}
          <polyline points="160,165 160,160 165,160" stroke="#555" strokeWidth="1" fill="none" />
          <polyline points="240,165 240,160 235,160" stroke="#555" strokeWidth="1" fill="none" />
          <polyline points="160,235 160,240 165,240" stroke="#555" strokeWidth="1" fill="none" />
          <polyline points="240,235 240,240 235,240" stroke="#555" strokeWidth="1" fill="none" />

          {/* HUD labels */}
          <text x="260" y="170" className="watcher-label" fill="#555" fontSize="7" fontFamily="monospace">TRACKING</text>
          <text x="260" y="180" className="watcher-label watcher-label--active" fill="#ff2d2d" fontSize="6" fontFamily="monospace" opacity="0.6">ACTIVE</text>
          <text x="130" y="258" className="watcher-label" fill="#555" fontSize="6" fontFamily="monospace">SYS.ONLINE</text>

          {/* Pulsing outer detection ring */}
          <circle cx="200" cy="200" r="65" stroke="#ff2d2d" strokeWidth="0.5" fill="none" opacity="0" className="watcher-pulse" />

          {/* Mouse connection lines to nearby nodes */}
          {mouseInSvg.x >= 0 && wireNodes.map((n, i) => {
            const prox = nodeProximity[i]
            if (prox <= 0) return null
            return (
              <line
                key={`mouse-${i}`}
                x1={mouseInSvg.x}
                y1={mouseInSvg.y}
                x2={n.cx}
                y2={n.cy}
                stroke="#ff2d2d"
                strokeWidth="0.5"
                opacity={prox * 0.5}
              />
            )
          })}

          {/* Nodes with glow */}
          {wireNodes.map((n, i) => {
            const prox = nodeProximity[i]
            const glowR = prox > 0 ? 3 + prox * 8 : 0
            return (
              <g key={i}>
                {glowR > 0 && (
                  <circle
                    cx={n.cx}
                    cy={n.cy}
                    r={glowR}
                    fill="none"
                    stroke="#ff2d2d"
                    strokeWidth="1"
                    opacity={prox * 0.4}
                    filter="url(#glow)"
                  />
                )}
                <circle
                  className={`wire-node ${n.cls} wire-node-d${n.delay}`}
                  cx={n.cx}
                  cy={n.cy}
                  r={prox > 0 ? String(Number(n.r) + prox * 2) : n.r}
                />
              </g>
            )
          })}
        </svg>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-line" />
        Scroll to explore
      </div>
    </section>
  )
}
