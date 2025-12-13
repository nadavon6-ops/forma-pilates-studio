'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// Brand colors
const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
  dark: '#036d94',
  glow: 'rgba(4, 133, 178, 0.5)',
}

// ============================================
// WEBGL PARTICLE SYSTEM - SEO Data Flow
// ============================================
function DataFlowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Array<{
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    size: number; hue: number; life: number;
  }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles with brand colors
    const particleCount = 150
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 5,
        size: Math.random() * 3 + 1,
        hue: 195 + Math.random() * 20, // Blue hues matching brand
        life: Math.random(),
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animationId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200) {
          const force = (200 - dist) / 200
          particle.vx -= (dx / dist) * force * 0.3
          particle.vy -= (dy / dist) * force * 0.3
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // 3D projection
        const perspective = 1000
        const scale = perspective / (perspective + particle.z)
        const projX = canvas.width / 2 + (particle.x - canvas.width / 2) * scale
        const projY = canvas.height / 2 + (particle.y - canvas.height / 2) * scale

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        if (particle.z < 0) particle.z = 1000
        if (particle.z > 1000) particle.z = 0

        // Draw particle with glow
        const size = particle.size * scale
        const alpha = (1 - particle.z / 1000) * 0.8

        ctx.beginPath()
        const gradient = ctx.createRadialGradient(projX, projY, 0, projX, projY, size * 3)
        gradient.addColorStop(0, `hsla(${particle.hue}, 90%, 60%, ${alpha})`)
        gradient.addColorStop(1, 'rgba(4, 133, 178, 0)')
        ctx.fillStyle = gradient
        ctx.arc(projX, projY, size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.arc(projX, projY, size * 0.5, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections
        particlesRef.current.slice(i + 1).forEach(other => {
          const otherScale = perspective / (perspective + other.z)
          const otherProjX = canvas.width / 2 + (other.x - canvas.width / 2) * otherScale
          const otherProjY = canvas.height / 2 + (other.y - canvas.height / 2) * otherScale

          const lineDist = Math.sqrt(
            Math.pow(projX - otherProjX, 2) + Math.pow(projY - otherProjY, 2)
          )

          if (lineDist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(4, 133, 178, ${(1 - lineDist / 120) * 0.4})`
            ctx.lineWidth = 0.5
            ctx.moveTo(projX, projY)
            ctx.lineTo(otherProjX, otherProjY)
            ctx.stroke()
          }
        })

        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

// ============================================
// SEO RANKING GLOBE - Keyword World Map
// ============================================
function SEOGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 320
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.38

    // Generate globe points
    const points: Array<{ lat: number; lon: number; isKeyword: boolean; rank?: number }> = []

    // Grid points
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lon = 0; lon < 360; lon += 15) {
        points.push({ lat, lon, isKeyword: false })
      }
    }

    // Keyword ranking locations (representing top rankings worldwide)
    const keywords = [
      { lat: 32.07, lon: 34.78, rank: 1 }, // Tel Aviv - #1
      { lat: 40.71, lon: -74.01, rank: 1 }, // New York
      { lat: 51.51, lon: -0.13, rank: 2 }, // London
      { lat: 35.68, lon: 139.69, rank: 1 }, // Tokyo
      { lat: 37.57, lon: 126.98, rank: 3 }, // Seoul
      { lat: 52.52, lon: 13.40, rank: 2 }, // Berlin
      { lat: 48.86, lon: 2.35, rank: 1 }, // Paris
      { lat: -33.87, lon: 151.21, rank: 4 }, // Sydney
    ]
    keywords.forEach(k => points.push({ ...k, isKeyword: true }))

    // Ranking boost lines
    const boostLines: Array<{ from: number; to: number; progress: number; active: boolean }> = []

    const createRankingBoost = () => {
      const keywordIndices = points.map((p, i) => p.isKeyword ? i : -1).filter(i => i !== -1)
      const from = keywordIndices[Math.floor(Math.random() * keywordIndices.length)]
      let to = keywordIndices[Math.floor(Math.random() * keywordIndices.length)]
      while (to === from) {
        to = keywordIndices[Math.floor(Math.random() * keywordIndices.length)]
      }
      boostLines.push({ from, to, progress: 0, active: true })
    }

    // Initial boosts
    for (let i = 0; i < 2; i++) createRankingBoost()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHovering: e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, size, size)

      const rotationSpeed = mouseRef.current.isHovering ? 0.001 : 0.003
      rotationRef.current += rotationSpeed

      // Draw globe glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.5)
      glowGradient.addColorStop(0, 'rgba(4, 133, 178, 0.15)')
      glowGradient.addColorStop(1, 'rgba(4, 133, 178, 0)')
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Draw globe outline
      ctx.strokeStyle = 'rgba(4, 133, 178, 0.4)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Project and draw points
      const projectedPoints: Array<{ x: number; y: number; z: number; isKeyword: boolean; rank?: number }> = []

      points.forEach(point => {
        const latRad = (point.lat * Math.PI) / 180
        const lonRad = ((point.lon + rotationRef.current * 180 / Math.PI) * Math.PI) / 180

        const x = radius * Math.cos(latRad) * Math.sin(lonRad)
        const y = radius * Math.sin(latRad)
        const z = radius * Math.cos(latRad) * Math.cos(lonRad)

        projectedPoints.push({
          x: centerX + x,
          y: centerY - y,
          z,
          isKeyword: point.isKeyword,
          rank: point.rank
        })
      })

      // Draw grid points
      projectedPoints.forEach(point => {
        if (point.z > 0) {
          const alpha = point.z / radius

          if (point.isKeyword) {
            // Keyword ranking - color based on rank
            const rankColor = point.rank === 1 ? '#22c55e' : point.rank === 2 ? '#0485b2' : '#06a5d9'
            const pulse = Math.sin(Date.now() / 400) * 0.3 + 0.7

            ctx.beginPath()
            ctx.fillStyle = `${rankColor}`
            ctx.globalAlpha = alpha * pulse
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1

            // Glow
            ctx.beginPath()
            const keyGlow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 15)
            keyGlow.addColorStop(0, `${rankColor}80`)
            keyGlow.addColorStop(1, `${rankColor}00`)
            ctx.fillStyle = keyGlow
            ctx.arc(point.x, point.y, 15, 0, Math.PI * 2)
            ctx.fill()

            // Rank number
            if (point.rank) {
              ctx.fillStyle = '#fff'
              ctx.font = 'bold 8px Arial'
              ctx.textAlign = 'center'
              ctx.fillText(`#${point.rank}`, point.x, point.y + 3)
            }
          } else {
            ctx.beginPath()
            ctx.fillStyle = `rgba(4, 133, 178, ${alpha * 0.4})`
            ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })

      // Draw ranking boost lines
      boostLines.forEach((boost, i) => {
        const from = projectedPoints[boost.from]
        const to = projectedPoints[boost.to]

        if (from && to && from.z > 0 && to.z > 0 && boost.active) {
          const currentX = from.x + (to.x - from.x) * boost.progress
          const currentY = from.y + (to.y - from.y) * boost.progress

          ctx.beginPath()
          const lineGradient = ctx.createLinearGradient(from.x, from.y, currentX, currentY)
          lineGradient.addColorStop(0, 'rgba(4, 133, 178, 0)')
          lineGradient.addColorStop(0.5, 'rgba(4, 133, 178, 0.6)')
          lineGradient.addColorStop(1, 'rgba(34, 197, 94, 1)')
          ctx.strokeStyle = lineGradient
          ctx.lineWidth = 2
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(currentX, currentY)
          ctx.stroke()

          // Moving point
          ctx.beginPath()
          ctx.fillStyle = '#22c55e'
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2)
          ctx.fill()

          boost.progress += 0.015
          if (boost.progress >= 1) {
            boost.active = false
            setTimeout(() => {
              boostLines.splice(i, 1)
              createRankingBoost()
            }, 800)
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative"
    >
      <canvas ref={canvasRef} className="drop-shadow-2xl" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-[#0485b2] text-xs font-mono">LIVE RANKINGS</div>
          <div className="text-green-400 text-lg font-bold animate-pulse">● CLIMBING</div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// DATA RAIN - SEO Keywords & Metrics
// ============================================
function SEODataRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const seoTerms = [
      'SEO', 'קידום', 'GOOGLE', 'RANK', '#1', 'CTR', 'DA', 'PA',
      'SERP', 'LINK', 'META', 'H1', 'ALT', 'SSL', 'AMP', 'CWV',
      'ROI', '+500%', 'TOP10', 'INDEX', 'CRAWL', 'ORGANIC',
      'קישור', 'תוכן', 'מילה', 'חיפוש', 'דירוג', 'תנועה'
    ]

    interface Column {
      x: number
      y: number
      speed: number
      terms: string[]
      fontSize: number
      depth: number
    }

    const columns: Column[] = []
    const columnCount = Math.floor(canvas.width / 50)

    for (let i = 0; i < columnCount; i++) {
      const depth = Math.random()
      columns.push({
        x: i * 50 + Math.random() * 20,
        y: Math.random() * -canvas.height,
        speed: 1 + Math.random() * 2 + depth * 2,
        terms: Array.from({ length: 15 + Math.floor(Math.random() * 10) }, () =>
          seoTerms[Math.floor(Math.random() * seoTerms.length)]
        ),
        fontSize: 12 + depth * 6,
        depth
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      columns.forEach(column => {
        // Mouse repulsion
        const dx = mouseRef.current.x - column.x
        const dy = mouseRef.current.y - column.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        let offset = 0
        if (dist < 150) {
          offset = (150 - dist) * 0.2 * (dx > 0 ? -1 : 1)
        }

        column.terms.forEach((term, i) => {
          const y = column.y + i * (column.fontSize + 5)
          if (y > 0 && y < canvas.height) {
            const alpha = 1 - i / column.terms.length

            ctx.font = `${column.fontSize}px 'Courier New', monospace`

            // First item is brightest
            if (i === 0) {
              ctx.fillStyle = '#fff'
            } else {
              const brightness = 0.3 + column.depth * 0.4
              ctx.fillStyle = `rgba(4, 133, 178, ${alpha * brightness})`
            }

            ctx.fillText(term, column.x + offset, y)

            // Randomly change terms
            if (Math.random() < 0.01) {
              column.terms[i] = seoTerms[Math.floor(Math.random() * seoTerms.length)]
            }
          }
        })

        column.y += column.speed

        if (column.y > canvas.height + column.terms.length * column.fontSize) {
          column.y = -column.terms.length * column.fontSize
          column.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-25"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

// ============================================
// NEURAL NETWORK - AI SEO Optimization
// ============================================
function SEONeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 350
    canvas.height = 220

    const layers = [3, 5, 5, 4, 2]
    const nodes: Array<{ x: number; y: number; layer: number }> = []
    const connections: Array<{ from: number; to: number; weight: number }> = []

    // Create nodes
    layers.forEach((count, layerIdx) => {
      const x = (layerIdx + 1) * (canvas.width / (layers.length + 1))
      for (let i = 0; i < count; i++) {
        const y = (i + 1) * (canvas.height / (count + 1))
        nodes.push({ x, y, layer: layerIdx })
      }
    })

    // Create connections
    let nodeIdx = 0
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerStart = nodeIdx
      const nextLayerStart = nodeIdx + layers[l]

      for (let i = 0; i < layers[l]; i++) {
        for (let j = 0; j < layers[l + 1]; j++) {
          connections.push({
            from: currentLayerStart + i,
            to: nextLayerStart + j,
            weight: Math.random()
          })
        }
      }
      nodeIdx += layers[l]
    }

    let pulseOffset = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pulseOffset += 0.02

      // Draw connections with pulse effect
      connections.forEach(conn => {
        const from = nodes[conn.from]
        const to = nodes[conn.to]

        const pulsePos = (pulseOffset + conn.weight) % 1
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y)

        gradient.addColorStop(Math.max(0, pulsePos - 0.1), 'rgba(4, 133, 178, 0.1)')
        gradient.addColorStop(pulsePos, 'rgba(4, 133, 178, 0.8)')
        gradient.addColorStop(Math.min(1, pulsePos + 0.1), 'rgba(4, 133, 178, 0.1)')

        ctx.beginPath()
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(pulseOffset * 3 + i) * 0.3 + 0.7

        // Glow
        ctx.beginPath()
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12)
        glow.addColorStop(0, `rgba(4, 133, 178, ${0.5 * pulse})`)
        glow.addColorStop(1, 'rgba(4, 133, 178, 0)')
        ctx.fillStyle = glow
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.fillStyle = `rgba(4, 133, 178, ${pulse})`
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="opacity-80" />
      <div className="absolute bottom-2 left-2 text-xs text-[#0485b2]/70 font-mono">
        AI SEO OPTIMIZATION
      </div>
    </div>
  )
}

// ============================================
// LIQUID MORPHING BLOB
// ============================================
function LiquidBlob() {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    const numPoints = 8
    const angleStep = (Math.PI * 2) / numPoints
    const radius = 200

    const initialPoints = Array.from({ length: numPoints }, (_, i) => ({
      x: Math.cos(i * angleStep) * radius,
      y: Math.sin(i * angleStep) * radius,
    }))
    setPoints(initialPoints)

    let time = 0
    let animationId: number

    const animate = () => {
      time += 0.015

      const newPoints = initialPoints.map((_, i) => {
        const noise = Math.sin(time + i * 0.5) * 30 + Math.cos(time * 0.7 + i) * 20
        const angle = i * angleStep
        const newRadius = radius + noise
        return {
          x: Math.cos(angle) * newRadius,
          y: Math.sin(angle) * newRadius,
        }
      })

      setPoints(newPoints)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  const createPath = () => {
    if (points.length < 3) return ''

    let path = `M ${points[0].x} ${points[0].y}`

    for (let i = 0; i < points.length; i++) {
      const p0 = points[(i - 1 + points.length) % points.length]
      const p1 = points[i]
      const p2 = points[(i + 1) % points.length]
      const p3 = points[(i + 2) % points.length]

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }

    return path + ' Z'
  }

  return (
    <svg
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-15"
      viewBox="-300 -300 600 600"
    >
      <defs>
        <linearGradient id="seoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BRAND.primary} />
          <stop offset="50%" stopColor={BRAND.light} />
          <stop offset="100%" stopColor={BRAND.dark} />
        </linearGradient>
        <filter id="blobGlow">
          <feGaussianBlur stdDeviation="25" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={createPath()}
        fill="url(#seoGradient)"
        filter="url(#blobGlow)"
      />
    </svg>
  )
}

// ============================================
// CUSTOM CURSOR
// ============================================
function SEOCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"]')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1
      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 hidden md:block ${
          isHovering ? 'scale-150' : ''
        } ${isClicking ? 'scale-75' : ''}`}
        style={{ mixBlendMode: 'difference' }}
      >
        <div className={`w-10 h-10 border-2 rounded-full ${isHovering ? 'bg-[#0485b2]/20' : ''}`} style={{ borderColor: BRAND.primary }} />
        <div className="absolute top-1/2 left-1/2 w-3 h-px -translate-x-1/2" style={{ backgroundColor: BRAND.primary }} />
        <div className="absolute top-1/2 left-1/2 w-px h-3 -translate-y-1/2" style={{ backgroundColor: BRAND.primary }} />
      </div>
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ backgroundColor: BRAND.primary }}
      />
    </>
  )
}

// ============================================
// GLITCH TEXT
// ============================================
function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute top-0 left-0 opacity-80 ${glitchActive ? 'animate-glitch-1' : ''}`}
        style={{ color: '#06a5d9', clipPath: 'inset(0 0 0 0)' }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span
        className={`absolute top-0 left-0 opacity-80 ${glitchActive ? 'animate-glitch-2' : ''}`}
        style={{ color: '#036d94', clipPath: 'inset(0 0 0 0)' }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  )
}

// ============================================
// TERMINAL TYPING EFFECT
// ============================================
function SEOTerminal() {
  const lines = [
    '> אתחול אסטרטגיית SEO...',
    '> סורק מילות מפתח רלוונטיות...',
    '> בונה פרופיל קישורים: ACTIVE',
    '> אופטימיזציה טכנית: COMPLETE',
    '> Core Web Vitals: OPTIMIZED',
    '> דירוג בגוגל: מטפס ↑',
    '> מערכת מוכנה ✓',
  ]

  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (currentLine >= lines.length) {
      setTimeout(() => {
        setDisplayedLines([])
        setCurrentLine(0)
        setCurrentChar(0)
      }, 3000)
      return
    }

    const line = lines[currentLine]

    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          newLines[currentLine] = line.slice(0, currentChar + 1)
          return newLines
        })
        setCurrentChar(c => c + 1)
      }, 30 + Math.random() * 40)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar, lines])

  return (
    <div className="font-mono text-sm text-right" dir="rtl">
      {displayedLines.map((line, i) => (
        <div key={i} style={{ color: BRAND.light }}>
          {line}
          {i === displayedLines.length - 1 && currentChar < lines[currentLine]?.length && (
            <span className="animate-pulse">▋</span>
          )}
        </div>
      ))}
    </div>
  )
}

// ============================================
// MAIN HERO COMPONENT
// ============================================
export default function SEOHeroUltimate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 400])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const [showGlobe, setShowGlobe] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowGlobe(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-black"
      dir="rtl"
    >
      {/* Custom Cursor */}
      <SEOCursor />

      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

        {/* Liquid blob */}
        <LiquidBlob />

        {/* SEO Data Rain */}
        <SEODataRain />

        {/* Data Flow Particles */}
        <DataFlowParticles />

        {/* Grid with perspective */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(${BRAND.primary}25 1px, transparent 1px),
              linear-gradient(90deg, ${BRAND.primary}25 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-30%)',
            transformOrigin: 'center top',
          }}
        />

        {/* Scanning lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-x-0 h-px animate-scan opacity-40" style={{ background: `linear-gradient(to right, transparent, ${BRAND.primary}, transparent)` }} />
          <div className="absolute inset-x-0 h-px animate-scan-reverse opacity-25" style={{ background: `linear-gradient(to right, transparent, ${BRAND.light}, transparent)` }} />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)' }} />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right Column - Text (RTL) */}
          <div className="text-center lg:text-right">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border mb-8"
              style={{ borderColor: `${BRAND.primary}50`, backgroundColor: `${BRAND.primary}15` }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-sm font-medium tracking-wider" style={{ color: BRAND.light }}>
                מערכת קידום פעילה
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]"
            >
              <span className="text-white">נביא אותך</span>
              <br />
              <GlitchText className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light}, ${BRAND.dark})` }}>
                לעמוד הראשון
              </GlitchText>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 mb-3 font-light"
            >
              קידום אורגני מתקדם מבוסס AI
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-gray-500 mb-8 max-w-xl mx-auto lg:mx-0 lg:mr-0"
            >
              סוכנות SEO בוטיק שמביאה תוצאות מוכחות.
              <br />
              500+ מילות מפתח בעמוד הראשון. 150+ לקוחות מרוצים.
            </motion.p>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8 p-4 rounded-lg bg-black/60 border border-gray-800 max-w-md mx-auto lg:mx-0 lg:mr-0"
            >
              <div className="flex items-center gap-2 mb-3 flex-row-reverse">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-gray-500 mr-2">nc-digital@seo:~</span>
              </div>
              <SEOTerminal />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${BRAND.glow}` }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full text-white font-bold text-lg overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})` }}
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  בדיקת אתר חינם
                  <motion.svg
                    className="w-5 h-5 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.primary})` }}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.a
                href="tel:052-566-0563"
                whileHover={{ scale: 1.05, borderColor: BRAND.primary }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 rounded-full font-semibold text-lg transition-all flex items-center gap-2 justify-center"
                style={{ borderColor: `${BRAND.primary}80`, color: BRAND.light }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                052-566-0563
              </motion.a>
            </motion.div>
          </div>

          {/* Left Column - Visualizations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            {/* Globe */}
            <AnimatePresence>
              {showGlobe && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex justify-center"
                >
                  <SEOGlobe />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Neural Network - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="absolute -bottom-20 -left-10 bg-black/60 rounded-xl border border-gray-800 p-3"
            >
              <SEONeuralNetwork />
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute top-10 -right-10 bg-black/70 backdrop-blur-sm rounded-xl border border-gray-800 p-4"
            >
              <div className="text-3xl font-black" style={{ color: BRAND.primary }}>500+</div>
              <div className="text-xs text-gray-400">מילות מפתח בעמוד הראשון</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute top-20 -left-5 bg-black/70 backdrop-blur-sm rounded-xl border border-green-500/30 p-4"
            >
              <div className="text-2xl font-black text-green-400">+300%</div>
              <div className="text-xs text-gray-400">עליית תנועה ממוצעת</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-8 text-gray-500"
          dir="ltr"
        >
          <span className="text-sm uppercase tracking-wider">Trusted by:</span>
          {['Google Partner', 'SEMrush', 'Ahrefs', 'Moz', 'Yoast'].map((company, i) => (
            <motion.span
              key={company}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + i * 0.1 }}
              className="text-gray-600 font-semibold text-lg hover:text-[#0485b2] transition-colors cursor-default"
            >
              {company}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">גלול למטה</span>
          <div className="w-6 h-10 rounded-full border-2 flex justify-center p-2" style={{ borderColor: `${BRAND.primary}80` }}>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: BRAND.primary }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Styles */}
      <style jsx global>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(3px, -3px); }
          60% { transform: translate(-3px, -3px); }
          80% { transform: translate(3px, 3px); }
        }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(3px, -3px); }
          40% { transform: translate(-3px, 3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(-3px, -3px); }
        }

        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }

        @keyframes scan-reverse {
          0% { transform: translateY(100vh); }
          100% { transform: translateY(-100vh); }
        }

        .animate-glitch-1 {
          animation: glitch-1 0.3s ease-in-out;
        }

        .animate-glitch-2 {
          animation: glitch-2 0.3s ease-in-out;
        }

        .animate-scan {
          animation: scan 8s linear infinite;
        }

        .animate-scan-reverse {
          animation: scan-reverse 12s linear infinite;
        }

        .seo-page * {
          cursor: none !important;
        }

        @media (max-width: 768px) {
          .seo-page * {
            cursor: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
