'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'

// ============================================
// WEBGL PARTICLE SYSTEM - Advanced 3D Particles
// ============================================
function WebGLParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Array<{
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    size: number; color: string; life: number;
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

    // Initialize particles
    const particleCount = 200
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 5,
        size: Math.random() * 3 + 1,
        color: `hsl(${180 + Math.random() * 60}, 100%, ${50 + Math.random() * 30}%)`,
        life: Math.random(),
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    let animationId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, i) => {
        // Mouse interaction - particles are attracted/repelled
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200) {
          const force = (200 - dist) / 200
          particle.vx -= (dx / dist) * force * 0.5
          particle.vy -= (dy / dist) * force * 0.5
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
        gradient.addColorStop(0, particle.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla'))
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)')
        ctx.fillStyle = gradient
        ctx.arc(projX, projY, size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.arc(projX, projY, size * 0.5, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections between nearby particles
        particlesRef.current.slice(i + 1).forEach(other => {
          const otherScale = perspective / (perspective + other.z)
          const otherProjX = canvas.width / 2 + (other.x - canvas.width / 2) * otherScale
          const otherProjY = canvas.height / 2 + (other.y - canvas.height / 2) * otherScale

          const lineDist = Math.sqrt(
            Math.pow(projX - otherProjX, 2) + Math.pow(projY - otherProjY, 2)
          )

          if (lineDist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - lineDist / 100) * 0.3})`
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
// CYBER GLOBE - Interactive World Map
// ============================================
function CyberGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 300
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.4

    // Generate globe points
    const points: Array<{ lat: number; lon: number; isCity: boolean }> = []

    // Grid points
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lon = 0; lon < 360; lon += 15) {
        points.push({ lat, lon, isCity: false })
      }
    }

    // Major cities (cyber attack sources/targets)
    const cities = [
      { lat: 32.07, lon: 34.78 }, // Tel Aviv
      { lat: 40.71, lon: -74.01 }, // New York
      { lat: 51.51, lon: -0.13 }, // London
      { lat: 35.68, lon: 139.69 }, // Tokyo
      { lat: 37.57, lon: 126.98 }, // Seoul
      { lat: 55.75, lon: 37.62 }, // Moscow
      { lat: 39.90, lon: 116.41 }, // Beijing
      { lat: -33.87, lon: 151.21 }, // Sydney
      { lat: 52.52, lon: 13.40 }, // Berlin
      { lat: 48.86, lon: 2.35 }, // Paris
    ]
    cities.forEach(c => points.push({ ...c, isCity: true }))

    // Attack lines
    const attackLines: Array<{ from: number; to: number; progress: number; active: boolean }> = []

    const createRandomAttack = () => {
      const cityIndices = points.map((p, i) => p.isCity ? i : -1).filter(i => i !== -1)
      const from = cityIndices[Math.floor(Math.random() * cityIndices.length)]
      let to = cityIndices[Math.floor(Math.random() * cityIndices.length)]
      while (to === from) {
        to = cityIndices[Math.floor(Math.random() * cityIndices.length)]
      }
      attackLines.push({ from, to, progress: 0, active: true })
    }

    // Initial attacks
    for (let i = 0; i < 3; i++) createRandomAttack()

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

      // Rotation speed based on mouse
      const rotationSpeed = mouseRef.current.isHovering ? 0.001 : 0.003
      rotationRef.current += rotationSpeed

      // Draw globe glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.5)
      glowGradient.addColorStop(0, 'rgba(6, 182, 212, 0.1)')
      glowGradient.addColorStop(1, 'rgba(6, 182, 212, 0)')
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2)
      ctx.fill()

      // Draw globe outline
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Project and draw points
      const projectedPoints: Array<{ x: number; y: number; z: number; isCity: boolean }> = []

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
          isCity: point.isCity
        })
      })

      // Draw grid points (only front-facing)
      projectedPoints.forEach(point => {
        if (point.z > 0) {
          const alpha = point.z / radius

          if (point.isCity) {
            // City - larger, pulsing
            const pulse = Math.sin(Date.now() / 500) * 0.3 + 0.7
            ctx.beginPath()
            ctx.fillStyle = `rgba(255, 100, 100, ${alpha * pulse})`
            ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
            ctx.fill()

            // City glow
            ctx.beginPath()
            const cityGlow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 10)
            cityGlow.addColorStop(0, `rgba(255, 100, 100, ${alpha * 0.5})`)
            cityGlow.addColorStop(1, 'rgba(255, 100, 100, 0)')
            ctx.fillStyle = cityGlow
            ctx.arc(point.x, point.y, 10, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.beginPath()
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.5})`
            ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })

      // Draw attack lines
      attackLines.forEach((attack, i) => {
        const from = projectedPoints[attack.from]
        const to = projectedPoints[attack.to]

        if (from && to && from.z > 0 && to.z > 0 && attack.active) {
          const currentX = from.x + (to.x - from.x) * attack.progress
          const currentY = from.y + (to.y - from.y) * attack.progress

          // Draw line trail
          ctx.beginPath()
          const lineGradient = ctx.createLinearGradient(from.x, from.y, currentX, currentY)
          lineGradient.addColorStop(0, 'rgba(255, 50, 50, 0)')
          lineGradient.addColorStop(0.5, 'rgba(255, 50, 50, 0.5)')
          lineGradient.addColorStop(1, 'rgba(255, 255, 50, 1)')
          ctx.strokeStyle = lineGradient
          ctx.lineWidth = 2
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(currentX, currentY)
          ctx.stroke()

          // Draw moving point
          ctx.beginPath()
          ctx.fillStyle = '#ffff00'
          ctx.arc(currentX, currentY, 3, 0, Math.PI * 2)
          ctx.fill()

          // Update progress
          attack.progress += 0.01
          if (attack.progress >= 1) {
            attack.active = false
            setTimeout(() => {
              attackLines.splice(i, 1)
              createRandomAttack()
            }, 1000)
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
          <div className="text-cyan-400 text-xs font-mono">LIVE THREAT MAP</div>
          <div className="text-red-400 text-lg font-bold animate-pulse">● ACTIVE</div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// ADVANCED MATRIX RAIN - with Depth & Interaction
// ============================================
function AdvancedMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZאבגדהוזחטיכלמנסעפצקרשת0123456789@#$%^&*(){}[]|;:,.<>?/~`'
    const charArray = chars.split('')

    interface Column {
      x: number
      y: number
      speed: number
      chars: string[]
      fontSize: number
      depth: number
    }

    const columns: Column[] = []
    const columnCount = Math.floor(canvas.width / 20)

    for (let i = 0; i < columnCount; i++) {
      const depth = Math.random()
      columns.push({
        x: i * 20 + Math.random() * 10,
        y: Math.random() * -canvas.height,
        speed: 2 + Math.random() * 4 + depth * 3,
        chars: Array.from({ length: 20 + Math.floor(Math.random() * 20) }, () =>
          charArray[Math.floor(Math.random() * charArray.length)]
        ),
        fontSize: 10 + depth * 8,
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
          offset = (150 - dist) * 0.3 * (dx > 0 ? -1 : 1)
        }

        column.chars.forEach((char, i) => {
          const y = column.y + i * column.fontSize
          if (y > 0 && y < canvas.height) {
            const alpha = 1 - i / column.chars.length
            const brightness = i === 0 ? 255 : 100 + column.depth * 100

            ctx.font = `${column.fontSize}px 'Courier New', monospace`
            ctx.fillStyle = i === 0
              ? '#fff'
              : `rgba(0, ${brightness}, ${brightness + 50}, ${alpha * (0.3 + column.depth * 0.5)})`

            ctx.fillText(char, column.x + offset, y)

            // Randomly change characters
            if (Math.random() < 0.02) {
              column.chars[i] = charArray[Math.floor(Math.random() * charArray.length)]
            }
          }
        })

        column.y += column.speed

        if (column.y > canvas.height + column.chars.length * column.fontSize) {
          column.y = -column.chars.length * column.fontSize
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
      className="absolute inset-0 opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

// ============================================
// LIQUID MORPHING BLOB
// ============================================
function LiquidBlob() {
  const pathRef = useRef<SVGPathElement>(null)
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
    const animate = () => {
      time += 0.02

      const newPoints = initialPoints.map((point, i) => {
        const noise = Math.sin(time + i * 0.5) * 30 + Math.cos(time * 0.7 + i) * 20
        const angle = i * angleStep
        const newRadius = radius + noise
        return {
          x: Math.cos(angle) * newRadius,
          y: Math.sin(angle) * newRadius,
        }
      })

      setPoints(newPoints)
      requestAnimationFrame(animate)
    }

    animate()
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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-20"
      viewBox="-250 -250 500 500"
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="20" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        ref={pathRef}
        d={createPath()}
        fill="url(#blobGradient)"
        filter="url(#glow)"
      />
    </svg>
  )
}

// ============================================
// CUSTOM CYBER CURSOR
// ============================================
function CyberCursor() {
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
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
          isHovering ? 'scale-150' : ''
        } ${isClicking ? 'scale-75' : ''}`}
        style={{ mixBlendMode: 'difference' }}
      >
        <div className={`w-10 h-10 border-2 border-cyan-400 rounded-full ${isHovering ? 'bg-cyan-400/20' : ''}`} />
        <div className="absolute top-1/2 left-1/2 w-3 h-px bg-cyan-400 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-px h-3 bg-cyan-400 -translate-y-1/2" />
      </div>
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-1 h-1 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2"
      />
      <style jsx global>{`
        .cyber-page * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}

// ============================================
// GLITCH TEXT - Enhanced Version
// ============================================
function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute top-0 left-0 text-red-500 opacity-80 ${glitchActive ? 'animate-glitch-1' : ''}`}
        style={{ clipPath: 'inset(0 0 0 0)' }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span
        className={`absolute top-0 left-0 text-cyan-400 opacity-80 ${glitchActive ? 'animate-glitch-2' : ''}`}
        style={{ clipPath: 'inset(0 0 0 0)' }}
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
function TerminalText() {
  const lines = [
    '> Initializing security protocols...',
    '> Scanning network vulnerabilities...',
    '> AI threat detection: ACTIVE',
    '> Zero-day protection: ENABLED',
    '> Firewall status: MAXIMUM',
    '> Encryption: AES-256-GCM',
    '> System secured ✓',
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
      }, 30 + Math.random() * 50)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar, lines])

  return (
    <div className="font-mono text-sm text-left">
      {displayedLines.map((line, i) => (
        <div key={i} className="text-green-400">
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
// NEURAL NETWORK VISUALIZATION
// ============================================
function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    const layers = [4, 6, 6, 4, 2]
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

        gradient.addColorStop(Math.max(0, pulsePos - 0.1), 'rgba(6, 182, 212, 0.1)')
        gradient.addColorStop(pulsePos, 'rgba(6, 182, 212, 0.8)')
        gradient.addColorStop(Math.min(1, pulsePos + 0.1), 'rgba(6, 182, 212, 0.1)')

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
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 15)
        glow.addColorStop(0, `rgba(6, 182, 212, ${0.5 * pulse})`)
        glow.addColorStop(1, 'rgba(6, 182, 212, 0)')
        ctx.fillStyle = glow
        ctx.arc(node.x, node.y, 15, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.fillStyle = `rgba(6, 182, 212, ${pulse})`
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2)
        ctx.fill()

        // Ring
        ctx.beginPath()
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.3 * pulse})`
        ctx.lineWidth = 1
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2)
        ctx.stroke()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="opacity-80" />
      <div className="absolute bottom-2 left-2 text-xs text-cyan-400/60 font-mono">
        AI NEURAL NETWORK
      </div>
    </div>
  )
}

// ============================================
// MAIN HERO COMPONENT
// ============================================
export default function CyberHeroUltimate() {
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
    const timer = setTimeout(() => setShowGlobe(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Custom Cursor */}
      <CyberCursor />

      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

        {/* Liquid blob */}
        <LiquidBlob />

        {/* Advanced Matrix Rain */}
        <AdvancedMatrixRain />

        {/* WebGL Particles */}
        <WebGLParticleSystem />

        {/* Grid with perspective */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-30%)',
            transformOrigin: 'center top',
          }}
        />

        {/* Scanning lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan opacity-50" />
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan-reverse opacity-30" />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-8"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
                Enterprise Security Active
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]"
            >
              <span className="text-white">Protect Your</span>
              <br />
              <GlitchText className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Digital Future
              </GlitchText>
            </motion.h1>

            {/* Hebrew Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 mb-3 font-light"
              dir="rtl"
            >
              הגנת סייבר מתקדמת לעסקים בישראל ובעולם
            </motion.p>

            {/* English Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-gray-500 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Next-generation cybersecurity powered by AI.
              Trusted by Fortune 500 companies worldwide.
            </motion.p>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8 p-4 rounded-lg bg-black/50 border border-gray-800 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-gray-500 ml-2">cyberguard@security:~</span>
              </div>
              <TerminalText />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(6, 182, 212, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Start Free Assessment
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-cyan-500/50 rounded-full text-cyan-400 font-semibold text-lg hover:bg-cyan-500/10 transition-all flex items-center gap-2 justify-center"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Visualizations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
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
                  <CyberGlobe />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Neural Network - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="absolute -bottom-20 -right-10 bg-black/50 rounded-xl border border-gray-800 p-3"
            >
              <NeuralNetwork />
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute top-10 -left-10 bg-black/70 backdrop-blur-sm rounded-xl border border-gray-800 p-4"
            >
              <div className="text-3xl font-black text-cyan-400">99.9%</div>
              <div className="text-xs text-gray-400">Threat Detection</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute top-20 -right-5 bg-black/70 backdrop-blur-sm rounded-xl border border-red-500/30 p-4"
            >
              <div className="text-2xl font-black text-red-400">2M+</div>
              <div className="text-xs text-gray-400">Threats Blocked</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-8 text-gray-500"
        >
          <span className="text-sm uppercase tracking-wider">Trusted by:</span>
          {['Microsoft', 'Google', 'Amazon', 'Meta', 'IBM'].map((company, i) => (
            <motion.span
              key={company}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + i * 0.1 }}
              className="text-gray-600 font-semibold text-lg hover:text-cyan-400 transition-colors cursor-default"
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
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
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

        .bg-radial-vignette {
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%);
        }
      `}</style>
    </section>
  )
}
