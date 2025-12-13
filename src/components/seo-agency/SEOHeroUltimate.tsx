'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion'

// Premium brand colors - elegant palette
const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
  dark: '#036d94',
  gold: '#c9a962',
  cream: '#f5f5f0',
}

// ============================================
// ELEGANT PARTICLE FIELD
// Subtle floating particles - premium feel
// ============================================
function ElegantParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Elegant floating particles
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      pulse: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        // Smooth movement
        p.x += p.speedX
        p.y += p.speedY
        p.pulse += 0.02

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Pulsing opacity
        const pulseOpacity = p.opacity * (0.5 + Math.sin(p.pulse) * 0.5)

        // Draw elegant glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
        gradient.addColorStop(0, `rgba(4, 133, 178, ${pulseOpacity})`)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Draw crisp center
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity * 0.8})`
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fill()

        // Connect nearby particles with subtle lines
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(4, 133, 178, ${0.05 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
}

// ============================================
// SUBTLE GRADIENT BACKGROUND
// Premium dark gradient with soft glow
// ============================================
function PremiumBackground() {
  return (
    <div className="absolute inset-0">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(4, 133, 178, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(4, 133, 178, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 20% 80%, rgba(6, 165, 217, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)
          `
        }}
      />

      {/* Subtle grain texture for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ============================================
// ELEGANT CURSOR
// Minimal, sophisticated cursor
// ============================================
function ElegantCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, [role="button"], input, textarea, [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Outer ring */}
      <motion.div
        animate={{
          width: isHovering ? 50 : 40,
          height: isHovering ? 50 : 40,
          borderColor: isHovering ? BRAND.light : `${BRAND.primary}60`,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="rounded-full border"
        style={{ borderWidth: '1px' }}
      />

      {/* Inner dot */}
      <motion.div
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: BRAND.primary }}
      />
    </motion.div>
  )
}

// ============================================
// SMOOTH COUNTER ANIMATION
// Elegant number animation
// ============================================
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const spring = useSpring(0, { damping: 40, stiffness: 80 })
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          spring.set(value)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, spring])

  useEffect(() => {
    return spring.on('change', (v) => setDisplayValue(Math.floor(v).toLocaleString()))
  }, [spring])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  )
}

// ============================================
// ELEGANT FLOATING CARD
// Premium glass morphism card
// ============================================
function FloatingCard({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${(mousePos.y - 0.5) * -5}deg) rotateY(${(mousePos.x - 0.5) * 5}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* Subtle shine effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
        }}
      />
      {children}
    </motion.div>
  )
}

// ============================================
// PREMIUM KEYWORD DISPLAY
// Clean, elegant keyword showcase
// ============================================
function KeywordShowcase() {
  const keywords = [
    { keyword: 'קידום אתרים', position: 1, trend: '+12' },
    { keyword: 'SEO ישראל', position: 1, trend: '+8' },
    { keyword: 'שיווק דיגיטלי', position: 2, trend: '+15' },
    { keyword: 'בניית אתרים', position: 3, trend: '+22' },
  ]

  return (
    <div className="space-y-3">
      {keywords.map((kw, i) => (
        <motion.div
          key={kw.keyword}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 p-4 rounded-xl backdrop-blur-sm"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderLeft: `2px solid ${kw.position === 1 ? BRAND.primary : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
              kw.position === 1
                ? 'text-white'
                : 'text-gray-400 border border-gray-700'
            }`}
            style={kw.position === 1 ? { background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})` } : {}}
          >
            #{kw.position}
          </div>
          <div className="flex-1">
            <div className="text-white font-medium">{kw.keyword}</div>
          </div>
          <div className="text-emerald-400 text-sm font-mono">
            {kw.trend}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// ELEGANT PERFORMANCE GRAPH
// Minimal, sophisticated chart
// ============================================
function PerformanceGraph() {
  const points = [20, 35, 45, 40, 60, 75, 70, 85, 90, 95]
  const pathRef = useRef<SVGPathElement>(null)

  // Create smooth curve through points
  const createPath = () => {
    const width = 300
    const height = 150
    const padding = 20
    const graphWidth = width - padding * 2
    const graphHeight = height - padding * 2

    let path = ''
    points.forEach((point, i) => {
      const x = padding + (i / (points.length - 1)) * graphWidth
      const y = height - padding - (point / 100) * graphHeight

      if (i === 0) {
        path += `M ${x} ${y}`
      } else {
        const prevX = padding + ((i - 1) / (points.length - 1)) * graphWidth
        const prevY = height - padding - (points[i - 1] / 100) * graphHeight
        const cpX1 = prevX + (x - prevX) / 2
        const cpX2 = prevX + (x - prevX) / 2
        path += ` C ${cpX1} ${prevY}, ${cpX2} ${y}, ${x} ${y}`
      }
    })
    return path
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="relative"
    >
      <svg width="300" height="150" className="w-full h-auto">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="20"
            y1={150 - 20 - (y / 100) * 110}
            x2="280"
            y2={150 - 20 - (y / 100) * 110}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Gradient fill */}
        <defs>
          <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={BRAND.primary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={BRAND.primary} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={BRAND.dark} />
            <stop offset="100%" stopColor={BRAND.light} />
          </linearGradient>
        </defs>

        {/* Fill area */}
        <motion.path
          d={`${createPath()} L 280 130 L 20 130 Z`}
          fill="url(#graphGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        />

        {/* Line */}
        <motion.path
          ref={pathRef}
          d={createPath()}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.3, duration: 1.5, ease: "easeOut" }}
        />

        {/* End dot */}
        <motion.circle
          cx="280"
          cy={150 - 20 - (95 / 100) * 110}
          r="4"
          fill={BRAND.light}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.8, type: 'spring' }}
        />

        {/* Glow around end dot */}
        <motion.circle
          cx="280"
          cy={150 - 20 - (95 / 100) * 110}
          r="8"
          fill={BRAND.primary}
          opacity="0.3"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ delay: 2.8, duration: 2, repeat: Infinity }}
        />
      </svg>

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-5 text-xs text-gray-500">
        <span>ינואר</span>
        <span>היום</span>
      </div>
    </motion.div>
  )
}

// ============================================
// PREMIUM BUTTON
// Elegant, subtle hover effects
// ============================================
function PremiumButton({
  children,
  variant = 'primary',
  href,
}: {
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  href?: string
}) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const baseClasses = "relative px-8 py-4 rounded-full font-medium text-base overflow-hidden transition-all duration-300"

  const variantClasses = variant === 'primary'
    ? 'text-white'
    : `text-white border border-white/20 hover:border-white/40`

  const Component = href ? motion.a : motion.button

  return (
    <Component
      ref={buttonRef as any}
      href={href}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses}`}
      data-cursor-hover
    >
      {/* Background for primary */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})` }}
          animate={{
            background: isHovering
              ? `linear-gradient(135deg, ${BRAND.light}, ${BRAND.primary})`
              : `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})`
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: '-100%', opacity: 0 }}
        animate={{
          x: isHovering ? '100%' : '-100%',
          opacity: isHovering ? 0.2 : 0,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(90deg, transparent, white, transparent)',
        }}
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Component>
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

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0f' }}
      dir="rtl"
    >
      {/* Elegant Cursor */}
      <ElegantCursor />

      {/* Background */}
      <PremiumBackground />
      <ElegantParticleField />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Right Column - Text */}
          <div className="text-center lg:text-right">
            {/* Subtle badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: BRAND.primary }}
              />
              <span className="text-gray-400 text-sm">
                סוכנות SEO מובילה בישראל
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.15] tracking-tight"
            >
              <span className="text-white">קידום אתרים</span>
              <br />
              <span style={{ color: BRAND.primary }}>שמביא תוצאות</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-400 text-lg mb-10 max-w-md mx-auto lg:mx-0"
            >
              אנחנו לא רק מבטיחים - אנחנו מוכיחים.
              <span className="text-white"> תוצאות מדידות</span> שמדברות בעד עצמן.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex gap-8 mb-10 justify-center lg:justify-start"
            >
              {[
                { value: 500, suffix: '+', label: 'מילות מפתח בעמוד 1' },
                { value: 150, suffix: '+', label: 'לקוחות מרוצים' },
                { value: 300, suffix: '%', label: 'צמיחה ממוצעת' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
                  className="text-center lg:text-right"
                >
                  <div className="text-3xl font-bold text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <PremiumButton variant="primary">
                התחילו עכשיו
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </PremiumButton>

              <PremiumButton variant="outline" href="tel:052-566-0563">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                052-566-0563
              </PremiumButton>
            </motion.div>
          </div>

          {/* Left Column - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <FloatingCard
              delay={0.6}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${BRAND.primary}20, ${BRAND.light}20)` }}
                  >
                    <svg className="w-5 h-5" style={{ color: BRAND.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-medium">ביצועי SEO</div>
                    <div className="text-gray-500 text-xs">30 ימים אחרונים</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 text-xs font-medium">+32%</span>
                </div>
              </div>

              {/* Graph */}
              <div className="mb-6">
                <PerformanceGraph />
              </div>

              {/* Keywords */}
              <div>
                <div className="text-gray-400 text-sm mb-4">מילות מפתח מובילות</div>
                <KeywordShowcase />
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-xs">גלול</span>
          <div
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full"
              style={{ backgroundColor: BRAND.primary }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Cursor style */}
      <style jsx global>{`
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
