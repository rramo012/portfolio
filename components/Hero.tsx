'use client'

import { useEffect, useRef } from 'react'

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

const wireNodes: { cls: string; delay: number; cx: string; cy: string; r: string }[] = [
  { cls: 'wire-node--accent', delay: 1, cx: '200', cy: '200', r: '4' },
  { cls: 'wire-node--gray', delay: 2, cx: '120', cy: '80', r: '3' },
  { cls: 'wire-node--gray', delay: 3, cx: '280', cy: '80', r: '3' },
  { cls: 'wire-node--accent', delay: 4, cx: '320', cy: '140', r: '3' },
  { cls: 'wire-node--accent', delay: 5, cx: '80', cy: '140', r: '3' },
  { cls: 'wire-node--gray', delay: 6, cx: '200', cy: '360', r: '3' },
  { cls: 'wire-node--accent', delay: 7, cx: '200', cy: '20', r: '3' },
]

export default function Hero() {
  const titleRef = useRef<HTMLParagraphElement>(null)

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

      <div className="hero__wireframe" aria-hidden="true">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          {wireNodes.map((n, i) => (
            <circle
              key={i}
              className={`wire-node ${n.cls} wire-node-d${n.delay}`}
              cx={n.cx}
              cy={n.cy}
              r={n.r}
            />
          ))}
        </svg>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-line" />
        Scroll to explore
      </div>
    </section>
  )
}
