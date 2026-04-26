'use client'

import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({
  value,
  suffix = '',
}: {
  value: number
  suffix?: string
}) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const start = performance.now()

          function step(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(step)
          }

          requestAnimationFrame(step)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="stat__number">
      {display}
      {suffix}
    </span>
  )
}
