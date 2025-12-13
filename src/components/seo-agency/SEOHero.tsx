'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

// Brand colors
const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
  dark: '#036d94',
  glow: 'rgba(4, 133, 178, 0.3)',
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

    canvas.width = 500
    canvas.height = 400

    // Data points representing SEO growth
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

      // 3D perspective based on mouse
      const rotateX = (mouseRef.current.y - 0.5) * 15
      const rotateY = (mouseRef.current.x - 0.5) * 15

      const padding = 60
      const graphWidth = canvas.width - padding * 2
      const graphHeight = canvas.height - padding * 2

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(4, 133, 178, 0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(canvas.width - padding, y)
        ctx.stroke()
      }

      // Draw area gradient
      const areaGradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding)
      areaGradient.addColorStop(0, `rgba(4, 133, 178, ${0.4 * animationProgress})`)
      areaGradient.addColorStop(1, 'rgba(4, 133, 178, 0)')

      ctx.beginPath()
      ctx.moveTo(padding, canvas.height - padding)

      dataPoints.forEach((point, i) => {
        const x = padding + (graphWidth / (dataPoints.length - 1)) * i
        const targetY = canvas.height - padding - (point.value / 100) * graphHeight
        const y = canvas.height - padding - ((point.value / 100) * graphHeight * animationProgress)

        // Apply 3D perspective transform
        const perspectiveX = x + rotateY * (i - dataPoints.length / 2) * 2
        const perspectiveY = y + rotateX * 2

        if (i === 0) {
          ctx.moveTo(perspectiveX, perspectiveY)
        } else {
          ctx.lineTo(perspectiveX, perspectiveY)
        }
      })

      // Complete area path
      const lastX = padding + graphWidth + rotateY * (dataPoints.length / 2) * 2
      ctx.lineTo(lastX, canvas.height - padding + rotateX * 2)
      ctx.lineTo(padding + rotateY * (-dataPoints.length / 2) * 2, canvas.height - padding + rotateX * 2)
      ctx.closePath()
      ctx.fillStyle = areaGradient
      ctx.fill()

      // Draw line
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

      // Draw data points with glow
      dataPoints.forEach((point, i) => {
        const x = padding + (graphWidth / (dataPoints.length - 1)) * i
        const y = canvas.height - padding - ((point.value / 100) * graphHeight * animationProgress)
        const perspectiveX = x + rotateY * (i - dataPoints.length / 2) * 2
        const perspectiveY = y + rotateX * 2

        // Glow
        const glow = ctx.createRadialGradient(perspectiveX, perspectiveY, 0, perspectiveX, perspectiveY, 20)
        glow.addColorStop(0, 'rgba(4, 133, 178, 0.5)')
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
          ctx.font = 'bold 14px system-ui'
          ctx.textAlign = 'center'
          ctx.fillText(`${Math.round(point.value * animationProgress)}%`, perspectiveX, perspectiveY - 20)
        }

        // Month label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.font = '12px system-ui'
        ctx.fillText(point.month, perspectiveX, canvas.height - padding + 25 + rotateX * 2)
      })

      // Growth indicator
      if (animationProgress > 0.9) {
        ctx.fillStyle = '#10b981'
        ctx.font = 'bold 28px system-ui'
        ctx.textAlign = 'left'
        ctx.fillText('+533%', padding + 10, padding + 30)

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.font = '14px system-ui'
        ctx.fillText('צמיחה ב-6 חודשים', padding + 10, padding + 52)
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
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
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
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 w-72"
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
  const ref = useRef<HTMLSpanElement>(null)

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
    <span ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  )
}

// ============================================
// FLOATING PARTICLES
// ============================================
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: BRAND.primary,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// MAIN HERO COMPONENT
// ============================================
export default function SEOHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-30"
          style={{ background: `radial-gradient(circle, ${BRAND.primary} 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: `radial-gradient(circle, ${BRAND.light} 0%, transparent 70%)` }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(${BRAND.primary} 1px, transparent 1px),
              linear-gradient(90deg, ${BRAND.primary} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        <FloatingParticles />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right Column - Text (Hebrew RTL) */}
          <div className="text-right">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
              style={{ borderColor: `${BRAND.primary}50`, backgroundColor: `${BRAND.primary}10` }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: BRAND.primary }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: BRAND.primary }} />
              </span>
              <span style={{ color: BRAND.primary }} className="text-sm font-medium">
                #1 סוכנות SEO בישראל
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-white"
            >
              קידום אתרים
              <br />
              <span style={{ color: BRAND.primary }}>שמביא תוצאות</span>
              <br />
              <span className="text-gray-400 text-3xl md:text-4xl">לא הבטחות</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg"
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
              className="flex gap-10 mb-10"
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
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 20px 40px ${BRAND.glow}` }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full text-white font-bold text-lg"
                style={{ backgroundColor: BRAND.primary }}
              >
                קבלו הצעת מחיר
              </motion.button>
              <motion.a
                href="tel:052-566-0563"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 rounded-full font-semibold text-lg transition-all flex items-center gap-2 text-white"
                style={{ borderColor: `${BRAND.primary}50` }}
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
              className="mt-10 flex items-center gap-6 text-gray-500 text-sm"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                ללא התחייבות
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                שקיפות מלאה
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                תוצאות מוכחות
              </div>
            </motion.div>
          </div>

          {/* Left Column - Visualizations */}
          <div className="relative hidden lg:block">
            <FloatingGraph />

            {/* Keyword Dashboard */}
            <div className="absolute -top-10 -left-10">
              <KeywordDashboard />
            </div>

            {/* Live traffic indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-5 right-10 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 px-5 py-3"
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
          </div>
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
          <span className="text-xs">גלול למטה</span>
          <div className="w-6 h-10 rounded-full border-2 flex justify-center p-2" style={{ borderColor: `${BRAND.primary}50` }}>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: BRAND.primary }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
