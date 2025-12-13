'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

// Brand colors
const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
  dark: '#036d94',
  glow: 'rgba(4, 133, 178, 0.4)',
}

// ============================================
// 3D HOLOGRAPHIC CARD
// ============================================
function HolographicCard({ children, index }: { children: React.ReactNode; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setRotateX((y - centerY) / 10)
    setRotateY((centerX - x) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovering(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group perspective-1000"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Holographic border effect */}
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(45deg, ${BRAND.primary}, ${BRAND.light}, ${BRAND.dark}, ${BRAND.primary})`,
          backgroundSize: '400% 400%',
          animation: isHovering ? 'gradient-shift 3s ease infinite' : 'none',
        }}
      />

      {/* Card content */}
      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 overflow-hidden">
        {/* Shine effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${BRAND.glow} 45%, transparent 50%)`,
            transform: isHovering ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.6s ease-out',
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${BRAND.primary}20 1px, transparent 1px), linear-gradient(90deg, ${BRAND.primary}20 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {children}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  )
}

// ============================================
// ANIMATED COUNTER WITH SPRING PHYSICS
// ============================================
function SpringCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const spring = useSpring(0, { stiffness: 50, damping: 20 })
  const display = useTransform(spring, (latest) => Math.floor(latest).toLocaleString())
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])

  useEffect(() => {
    return display.on('change', (latest) => setDisplayValue(latest))
  }, [display])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

// ============================================
// PARTICLE RING ANIMATION
// ============================================
function ParticleRing({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 120
    canvas.width = size
    canvas.height = size

    const particles: Array<{ angle: number; radius: number; speed: number; size: number }> = []
    const particleCount = 20

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: (Math.PI * 2 / particleCount) * i,
        radius: 45 + Math.random() * 10,
        speed: 0.01 + Math.random() * 0.01,
        size: 1 + Math.random() * 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, size, size)

      particles.forEach(p => {
        p.angle += p.speed

        const x = size / 2 + Math.cos(p.angle) * p.radius
        const y = size / 2 + Math.sin(p.angle) * p.radius

        // Glow
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3)
        gradient.addColorStop(0, color + '80')
        gradient.addColorStop(1, color + '00')
        ctx.fillStyle = gradient
        ctx.arc(x, y, p.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.arc(x, y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      })

      // Center ring
      ctx.beginPath()
      ctx.strokeStyle = color + '40'
      ctx.lineWidth = 1
      ctx.arc(size / 2, size / 2, 45, 0, Math.PI * 2)
      ctx.stroke()

      requestAnimationFrame(animate)
    }

    animate()
  }, [color])

  return <canvas ref={canvasRef} className="absolute inset-0 m-auto" width={120} height={120} />
}

// ============================================
// LIVE DATA TICKER
// ============================================
function LiveDataTicker() {
  const [metrics, setMetrics] = useState({
    impressions: 1847523,
    clicks: 127845,
    keywords: 523,
    rank: 1,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        impressions: prev.impressions + Math.floor(Math.random() * 150),
        clicks: prev.clicks + Math.floor(Math.random() * 15),
        keywords: prev.keywords + (Math.random() > 0.95 ? 1 : 0),
        rank: prev.rank,
      }))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div
        className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border overflow-hidden"
        style={{ borderColor: `${BRAND.primary}40` }}
      >
        {/* Animated border */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(90deg, transparent, ${BRAND.primary}40, transparent)`,
            animation: 'border-flow 3s linear infinite',
          }}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="font-mono text-sm" style={{ color: BRAND.light }}>LIVE DATA STREAM</span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-white">
              {metrics.impressions.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">חשיפות</div>
          </div>
          <div className="text-center border-x border-gray-800">
            <div className="text-2xl font-bold font-mono" style={{ color: BRAND.primary }}>
              {metrics.clicks.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">קליקים</div>
          </div>
          <div className="text-center border-l border-gray-800">
            <div className="text-2xl font-bold font-mono text-white">
              {metrics.keywords}
            </div>
            <div className="text-xs text-gray-500">TOP 10</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-mono text-green-400">
              #{metrics.rank}
            </div>
            <div className="text-xs text-gray-500">ממוצע דירוג</div>
          </div>
        </div>

        {/* Scrolling data line */}
        <div className="mt-4 overflow-hidden">
          <div className="flex gap-8 animate-scroll-x font-mono text-xs text-gray-600">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="whitespace-nowrap">
                {['SEO', 'SERP', 'CTR', 'DA', 'PA', 'TF', 'CF'][i % 7]}: {Math.floor(Math.random() * 100)}%
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes border-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          animation: scroll-x 20s linear infinite;
        }
      `}</style>
    </motion.div>
  )
}

// ============================================
// STATS DATA
// ============================================
const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'מילות מפתח',
    subLabel: 'בעמוד הראשון בגוגל',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
  },
  {
    value: 150,
    suffix: '+',
    label: 'לקוחות פעילים',
    subLabel: 'עסקים שסומכים עלינו',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    value: 300,
    suffix: '%',
    label: 'עליית תנועה ממוצעת',
    subLabel: 'תוך 6 חודשים',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    value: 8,
    suffix: '',
    label: 'שנות ניסיון',
    subLabel: 'בתחום ה-SEO',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
]

// ============================================
// MAIN COMPONENT
// ============================================
export default function SEOStatsUltimate() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#0a0a0a]" dir="rtl">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${BRAND.primary} 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[150px]"
          style={{ backgroundColor: `${BRAND.primary}08` }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full border text-sm font-medium mb-6"
            style={{
              borderColor: `${BRAND.primary}50`,
              backgroundColor: `${BRAND.primary}15`,
              color: BRAND.light
            }}
          >
            המספרים מדברים
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            תוצאות <span style={{ color: BRAND.primary }}>מוכחות</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            אנחנו לא מבטיחים - אנחנו מביאים תוצאות. הנה המספרים שמוכיחים את זה.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <HolographicCard key={stat.label} index={index}>
              <div className="relative text-center">
                {/* Particle ring behind icon */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <ParticleRing color={BRAND.primary} />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ color: BRAND.primary }}>
                    {stat.icon}
                  </div>
                </div>

                {/* Value */}
                <div
                  className="text-5xl md:text-6xl font-black mb-2"
                  style={{ color: BRAND.primary }}
                >
                  <SpringCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Labels */}
                <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.subLabel}</div>
              </div>
            </HolographicCard>
          ))}
        </div>

        {/* Live Data Ticker */}
        <div className="max-w-3xl mx-auto">
          <LiveDataTicker />
        </div>
      </div>
    </section>
  )
}
