'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Brand colors
const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
  dark: '#036d94',
  glow: 'rgba(4, 133, 178, 0.5)',
}

// ============================================
// WEBGL PARTICLE SYSTEM - Advanced 3D Particles
// ============================================
function DataFlowParticles() {
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
        color: `hsl(${195 + Math.random() * 20}, 100%, ${50 + Math.random() * 30}%)`,
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
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200) {
          const force = (200 - dist) / 200
          particle.vx -= (dx / dist) * force * 0.5
          particle.vy -= (dy / dist) * force * 0.5
        }

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

        const size = particle.size * scale
        const alpha = (1 - particle.z / 1000) * 0.8

        ctx.beginPath()
        const gradient = ctx.createRadialGradient(projX, projY, 0, projX, projY, size * 3)
        gradient.addColorStop(0, particle.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla'))
        gradient.addColorStop(1, 'rgba(4, 133, 178, 0)')
        ctx.fillStyle = gradient
        ctx.arc(projX, projY, size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.arc(projX, projY, size * 0.5, 0, Math.PI * 2)
        ctx.fill()

        // Connections
        particlesRef.current.slice(i + 1).forEach(other => {
          const otherScale = perspective / (perspective + other.z)
          const otherProjX = canvas.width / 2 + (other.x - canvas.width / 2) * otherScale
          const otherProjY = canvas.height / 2 + (other.y - canvas.height / 2) * otherScale

          const lineDist = Math.sqrt(
            Math.pow(projX - otherProjX, 2) + Math.pow(projY - otherProjY, 2)
          )

          if (lineDist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(4, 133, 178, ${(1 - lineDist / 100) * 0.3})`
            ctx.lineWidth = 0.5
            ctx.moveTo(projX, projY)
            ctx.lineTo(otherProjX, otherProjY)
            ctx.stroke()
          }
        })

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
// ADVANCED MATRIX RAIN - SEO Keywords
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

    const chars = 'SEOGOOGLERANKאבגדהוזחטיכלמנסעפצקרשת0123456789#1@%↑★✓▲●◆'
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
              : `rgba(4, ${brightness}, ${brightness + 50}, ${alpha * (0.3 + column.depth * 0.5)})`

            ctx.fillText(char, column.x + offset, y)

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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-20"
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
// 3D FLOATING GRAPH VISUALIZATION
// ============================================
function FloatingGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 450
    canvas.height = 350

    const dataPoints = [
      { month: 'ינו', value: 15 },
      { month: 'פבר', value: 22 },
      { month: 'מרץ', value: 35 },
      { month: 'אפר', value: 48 },
      { month: 'מאי', value: 72 },
      { month: 'יונ', value: 95 },
    ]

    let animationProgress = 0
    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      animationProgress = Math.min(animationProgress + 0.015, 1)

      const rotateX = (mouseRef.current.y - 0.5) * 15
      const rotateY = (mouseRef.current.x - 0.5) * 15

      const padding = 50
      const graphWidth = canvas.width - padding * 2
      const graphHeight = canvas.height - padding * 2

      // Grid
      ctx.strokeStyle = 'rgba(4, 133, 178, 0.15)'
      ctx.lineWidth = 1
      for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(canvas.width - padding, y)
        ctx.stroke()
      }

      // Area gradient
      const areaGradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding)
      areaGradient.addColorStop(0, `rgba(4, 133, 178, ${0.5 * animationProgress})`)
      areaGradient.addColorStop(1, 'rgba(4, 133, 178, 0)')

      ctx.beginPath()
      ctx.moveTo(padding, canvas.height - padding)

      dataPoints.forEach((point, i) => {
        const x = padding + (graphWidth / (dataPoints.length - 1)) * i
        const y = canvas.height - padding - ((point.value / 100) * graphHeight * animationProgress)
        const perspectiveX = x + rotateY * (i - dataPoints.length / 2) * 2
        const perspectiveY = y + rotateX * 2

        if (i === 0) {
          ctx.moveTo(perspectiveX, perspectiveY)
        } else {
          ctx.lineTo(perspectiveX, perspectiveY)
        }
      })

      const lastX = padding + graphWidth + rotateY * (dataPoints.length / 2) * 2
      ctx.lineTo(lastX, canvas.height - padding + rotateX * 2)
      ctx.lineTo(padding + rotateY * (-dataPoints.length / 2) * 2, canvas.height - padding + rotateX * 2)
      ctx.closePath()
      ctx.fillStyle = areaGradient
      ctx.fill()

      // Line
      ctx.beginPath()
      dataPoints.forEach((point, i) => {
        const x = padding + (graphWidth / (dataPoints.length - 1)) * i
        const y = canvas.height - padding - ((point.value / 100) * graphHeight * animationProgress)
        const perspectiveX = x + rotateY * (i - dataPoints.length / 2) * 2
        const perspectiveY = y + rotateX * 2

        if (i === 0) {
          ctx.moveTo(perspectiveX, perspectiveY)
        } else {
          ctx.lineTo(perspectiveX, perspectiveY)
        }
      })

      ctx.strokeStyle = BRAND.primary
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()

      // Points with glow
      dataPoints.forEach((point, i) => {
        const x = padding + (graphWidth / (dataPoints.length - 1)) * i
        const y = canvas.height - padding - ((point.value / 100) * graphHeight * animationProgress)
        const perspectiveX = x + rotateY * (i - dataPoints.length / 2) * 2
        const perspectiveY = y + rotateX * 2

        // Glow
        const glow = ctx.createRadialGradient(perspectiveX, perspectiveY, 0, perspectiveX, perspectiveY, 20)
        glow.addColorStop(0, 'rgba(4, 133, 178, 0.6)')
        glow.addColorStop(1, 'rgba(4, 133, 178, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(perspectiveX, perspectiveY, 20, 0, Math.PI * 2)
        ctx.fill()

        // Point
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.arc(perspectiveX, perspectiveY, 6, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = BRAND.primary
        ctx.arc(perspectiveX, perspectiveY, 4, 0, Math.PI * 2)
        ctx.fill()

        // Value label
        if (animationProgress > 0.8) {
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 12px system-ui'
          ctx.textAlign = 'center'
          ctx.fillText(`${Math.round(point.value * animationProgress)}%`, perspectiveX, perspectiveY - 18)
        }

        // Month
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.font = '11px system-ui'
        ctx.fillText(point.month, perspectiveX, canvas.height - padding + 20 + rotateX * 2)
      })

      // Growth indicator
      if (animationProgress > 0.9) {
        ctx.fillStyle = '#10b981'
        ctx.font = 'bold 24px system-ui'
        ctx.textAlign = 'left'
        ctx.fillText('+533%', padding + 10, padding + 25)

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.font = '12px system-ui'
        ctx.fillText('צמיחה ב-6 חודשים', padding + 10, padding + 45)
      }

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative"
    >
      <canvas ref={canvasRef} className="rounded-2xl" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  )
}

// ============================================
// KEYWORD RANKINGS DASHBOARD
// ============================================
function KeywordDashboard() {
  const keywords = [
    { keyword: 'קידום אתרים', position: 1, change: '+12', trend: 'up' },
    { keyword: 'SEO ישראל', position: 1, change: '+8', trend: 'up' },
    { keyword: 'בניית אתרים תל אביב', position: 2, change: '+15', trend: 'up' },
    { keyword: 'שיווק דיגיטלי', position: 3, change: '+22', trend: 'up' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 w-72"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-white font-bold text-sm">דירוג מילות מפתח</span>
        <span className="flex items-center gap-1 text-green-400 text-xs">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-3">
        {keywords.map((kw, i) => (
          <motion.div
            key={kw.keyword}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: kw.position === 1 ? BRAND.primary : kw.position === 2 ? '#6b7280' : '#4b5563' }}
              >
                #{kw.position}
              </div>
              <span className="text-white text-sm font-medium">{kw.keyword}</span>
            </div>
            <span className="text-green-400 text-xs font-bold">{kw.change}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">סה"כ מילות מפתח</span>
          <span className="text-white font-bold">523</span>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setDisplay(value)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {display.toLocaleString()}{suffix}
    </span>
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
function GlitchText({ children, className = '', style }: { children: string; className?: string; style?: React.CSSProperties }) {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`} style={style}>
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-black"
      dir="rtl"
    >
      {/* Custom Cursor */}
      <SEOCursor />

      {/* Background Layers - Cyber-level intensity */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

        {/* Gradient orbs */}
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          style={{ background: `radial-gradient(circle, ${BRAND.primary} 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
          style={{ background: `radial-gradient(circle, ${BRAND.light} 0%, transparent 70%)` }}
        />

        {/* Liquid blob */}
        <LiquidBlob />

        {/* Advanced Matrix Rain */}
        <SEODataRain />

        {/* WebGL Particles - 3D effect */}
        <DataFlowParticles />

        {/* Grid with perspective */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(4, 133, 178, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(4, 133, 178, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-30%)',
            transformOrigin: 'center top',
          }}
        />

        {/* Scanning lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-x-0 h-px animate-scan opacity-50" style={{ background: `linear-gradient(to right, transparent, ${BRAND.primary}, transparent)` }} />
          <div className="absolute inset-x-0 h-px animate-scan-reverse opacity-30" style={{ background: `linear-gradient(to right, transparent, ${BRAND.light}, transparent)` }} />
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
                #1 סוכנות SEO בישראל
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
            >
              <span className="text-white">קידום אתרים</span>
              <br />
              <GlitchText className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})` }}>
                שמביא תוצאות
              </GlitchText>
              <br />
              <span className="text-gray-400 text-3xl md:text-4xl">לא הבטחות</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 mb-3 font-light"
            >
              צוות של 20 מומחי SEO עם ניסיון של שנים.
              <br />
              <span style={{ color: BRAND.light }}>כל הלקוחות שלנו מגיעים מהמלצות.</span>
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex gap-8 mb-8 justify-center lg:justify-start"
            >
              {[
                { value: 500, suffix: '+', label: 'מילות מפתח בעמוד 1' },
                { value: 150, suffix: '+', label: 'לקוחות מרוצים' },
                { value: 300, suffix: '%', label: 'עליית תנועה ממוצעת' },
              ].map((stat, i) => (
                <div key={i} className="text-right">
                  <div className="text-3xl font-black" style={{ color: BRAND.primary }}>
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${BRAND.glow}` }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full text-white font-bold text-lg overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})` }}
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  קבלו הצעת מחיר
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

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex items-center gap-6 text-gray-500 text-sm justify-center lg:justify-start"
            >
              {['ללא התחייבות', 'שקיפות מלאה', 'תוצאות מוכחות'].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Left Column - Visualizations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            {/* 3D Graph */}
            <FloatingGraph />

            {/* Keyword Dashboard - positioned top left */}
            <div className="absolute -top-5 -left-5">
              <KeywordDashboard />
            </div>

            {/* Live traffic indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-5 right-10 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 px-5 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">+12,543</div>
                  <div className="text-gray-400 text-xs">מבקרים החודש</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
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

        .bg-radial-vignette {
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%);
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
