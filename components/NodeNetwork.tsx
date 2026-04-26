'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  highlighted: boolean
}

const TOTAL_NODES = 350
const HIGHLIGHTED_COUNT = 25
const CONNECTION_DIST = 100
const MOUSE_RADIUS = 150
const MOUSE_FORCE = 0.8

export default function NodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let nodes: Node[] = []
    let animId: number
    const dpr = window.devicePixelRatio || 1
    let mouse = { x: -1000, y: -1000 }

    function resizeCanvas() {
      canvas!.width = window.innerWidth * dpr
      canvas!.height = window.innerHeight * dpr
      canvas!.style.width = window.innerWidth + 'px'
      canvas!.style.height = window.innerHeight + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initNodes() {
      nodes = []
      for (let i = 0; i < TOTAL_NODES; i++) {
        const highlighted = i < HIGHLIGHTED_COUNT
        nodes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: highlighted ? 2 : 1 + Math.random(),
          highlighted,
        })
      }
    }

    function draw() {
      const w = window.innerWidth
      const h = window.innerHeight

      ctx!.clearRect(0, 0, w, h)

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Mouse repulsion
        const mdx = n.x - mouse.x
        const mdy = n.y - mouse.y
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = (1 - mDist / MOUSE_RADIUS) * MOUSE_FORCE
          n.vx += (mdx / mDist) * force
          n.vy += (mdy / mDist) * force
        }

        // Dampen velocity back to base speed
        n.vx *= 0.98
        n.vy *= 0.98

        // Ensure minimum drift
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
        if (speed < 0.15) {
          n.vx += (Math.random() - 0.5) * 0.05
          n.vy += (Math.random() - 0.5) * 0.05
        }

        n.x += n.vx
        n.y += n.vy

        if (n.x < -10) n.x = w + 10
        if (n.x > w + 10) n.x = -10
        if (n.y < -10) n.y = h + 10
        if (n.y > h + 10) n.y = -10
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const opacity = 1 - dist / CONNECTION_DIST
            const anyHighlighted = nodes[i].highlighted || nodes[j].highlighted

            ctx!.strokeStyle = anyHighlighted
              ? `rgba(255, 45, 45, ${opacity * 0.15})`
              : `rgba(100, 100, 100, ${opacity * 0.25})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.stroke()
          }
        }
      }

      // Draw mouse connections to nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - mouse.x
        const dy = nodes[i].y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS) {
          const opacity = (1 - dist / MOUSE_RADIUS) * 0.6
          ctx!.strokeStyle = `rgba(255, 45, 45, ${opacity})`
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.moveTo(mouse.x, mouse.y)
          ctx!.lineTo(nodes[i].x, nodes[i].y)
          ctx!.stroke()
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (n.highlighted) {
          ctx!.fillStyle = '#ff2d2d'
          ctx!.globalAlpha = 0.8
        } else {
          ctx!.fillStyle = '#555555'
          ctx!.globalAlpha = 0.6
        }
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.globalAlpha = 1
      }

      animId = requestAnimationFrame(draw)
    }

    resizeCanvas()
    initNodes()
    draw()

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }

    // Listen for spawn events from the wireframe watcher
    const handleSpawn = (e: Event) => {
      const { x, y } = (e as CustomEvent).detail
      const count = 8 + Math.floor(Math.random() * 8)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
        const speed = 1.5 + Math.random() * 3
        const highlighted = Math.random() < 0.3
        nodes.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: highlighted ? 2 : 1 + Math.random(),
          highlighted,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)
    window.addEventListener('watcher-spawn', handleSpawn)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('watcher-spawn', handleSpawn)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return <canvas ref={canvasRef} className="node-network" aria-hidden="true" />
}
