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

const TOTAL_NODES = 70
const HIGHLIGHTED_COUNT = 5
const CONNECTION_DIST = 100

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
        n.x += n.vx
        n.y += n.vy

        if (n.x < -10) n.x = w + 10
        if (n.x > w + 10) n.x = -10
        if (n.y < -10) n.y = h + 10
        if (n.y > h + 10) n.y = -10
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DIST) {
            const opacity = 1 - dist / CONNECTION_DIST
            const anyHighlighted = nodes[i].highlighted || nodes[j].highlighted

            ctx!.strokeStyle = anyHighlighted
              ? `rgba(42, 21, 21, ${opacity * 0.8})`
              : `rgba(26, 26, 26, ${opacity * 0.8})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.stroke()
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (n.highlighted) {
          ctx!.fillStyle = '#ff2d2d'
          ctx!.globalAlpha = 0.6
        } else {
          ctx!.fillStyle = '#222222'
          ctx!.globalAlpha = 1
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

    let resizeTimeout: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return <canvas ref={canvasRef} className="node-network" aria-hidden="true" />
}
