'use client'

import { useEffect, useRef, ReactNode } from 'react'

export default function RevealOnScroll({
  children,
  className = '',
  delay,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay ? `reveal--delay-${delay}` : ''

  return (
    <div ref={ref} className={`reveal ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  )
}
