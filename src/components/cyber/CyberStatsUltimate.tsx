'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion'

// ============================================
// ANIMATED COUNTER WITH SPRING PHYSICS
// ============================================
function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0
}: {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: 2000
  })

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])

  const display = useTransform(spring, (latest) => {
    return decimals > 0 ? latest.toFixed(decimals) : Math.floor(latest).toLocaleString()
  })

  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    return display.on('change', (latest) => {
      setDisplayValue(latest)
    })
  }, [display])

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

// ============================================
// HOLOGRAPHIC CARD EFFECT
// ============================================
function HolographicCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setPosition({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${(position.y - 0.5) * -10}deg) rotateY(${(position.x - 0.5) * 10}deg)`
          : 'perspective(1000px) rotateX(0) rotateY(0)',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Holographic shine effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 0.3 : 0,
          background: `radial-gradient(
            circle at ${position.x * 100}% ${position.y * 100}%,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 50%
          )`,
        }}
      />
      {children}
    </motion.div>
  )
}

// ============================================
// CIRCULAR PROGRESS INDICATOR
// ============================================
function CircularProgress({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  color = '#06b6d4'
}: {
  value: number
  maxValue?: number
  size?: number
  strokeWidth?: number
  color?: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = (value / maxValue) * 100

  const spring = useSpring(0, { stiffness: 50, damping: 30 })

  useEffect(() => {
    if (isInView) {
      spring.set(progress)
    }
  }, [isInView, progress, spring])

  const strokeDashoffset = useTransform(
    spring,
    (latest) => circumference - (latest / 100) * circumference
  )

  const [offset, setOffset] = useState(circumference)

  useEffect(() => {
    return strokeDashoffset.on('change', (latest) => {
      setOffset(latest)
    })
  }, [strokeDashoffset])

  return (
    <svg ref={ref} width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          filter: `drop-shadow(0 0 10px ${color})`,
        }}
      />
      {/* Glow effect */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        opacity={0.5}
        style={{
          filter: `blur(4px)`,
        }}
      />
    </svg>
  )
}

// ============================================
// PARTICLE RING EFFECT
// ============================================
function ParticleRing({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 200
    canvas.width = size
    canvas.height = size

    const particles: Array<{
      angle: number
      radius: number
      speed: number
      size: number
      alpha: number
    }> = []

    for (let i = 0; i < 30; i++) {
      particles.push({
        angle: (i / 30) * Math.PI * 2,
        radius: 70 + Math.random() * 10,
        speed: 0.01 + Math.random() * 0.02,
        size: 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.7,
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, size, size)

      particles.forEach(particle => {
        particle.angle += particle.speed * (isHovered ? 2 : 1)

        const x = size / 2 + Math.cos(particle.angle) * particle.radius
        const y = size / 2 + Math.sin(particle.angle) * particle.radius

        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.alpha})`
        ctx.fill()

        // Trail
        for (let i = 1; i < 5; i++) {
          const trailAngle = particle.angle - particle.speed * i * 3
          const tx = size / 2 + Math.cos(trailAngle) * particle.radius
          const ty = size / 2 + Math.sin(trailAngle) * particle.radius
          ctx.beginPath()
          ctx.arc(tx, ty, particle.size * (1 - i * 0.2), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(6, 182, 212, ${particle.alpha * (1 - i * 0.2)})`
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [isHovered])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

// ============================================
// STAT DATA
// ============================================
const stats = [
  {
    value: 99.9,
    suffix: '%',
    label: 'Uptime Guarantee',
    labelHe: 'זמן פעילות מובטח',
    description: 'Enterprise-grade reliability',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: '#06b6d4',
    decimals: 1,
  },
  {
    value: 500,
    suffix: '+',
    label: 'Enterprise Clients',
    labelHe: 'לקוחות ארגוניים',
    description: 'Fortune 500 trusted',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: '#8b5cf6',
    decimals: 0,
  },
  {
    value: 2,
    suffix: 'M+',
    label: 'Threats Blocked',
    labelHe: 'איומים נחסמו',
    description: 'Daily protection',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: '#ef4444',
    decimals: 0,
  },
  {
    value: 24,
    suffix: '/7',
    label: 'SOC Monitoring',
    labelHe: 'ניטור מרכז תפעול',
    description: 'Round-the-clock security',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    color: '#10b981',
    decimals: 0,
  },
]

// ============================================
// MAIN STATS COMPONENT
// ============================================
export default function CyberStatsUltimate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          style={{ y }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
            By The Numbers | במספרים
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Proven
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Results</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real metrics that demonstrate our commitment to protecting your digital assets
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <HolographicCard className="h-full">
                <div
                  className="relative h-full p-8 rounded-2xl border bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm overflow-hidden transition-all duration-500"
                  style={{
                    borderColor: hoveredIndex === index ? stat.color : 'rgba(55, 65, 81, 0.5)',
                    boxShadow: hoveredIndex === index ? `0 0 40px ${stat.color}30` : 'none',
                  }}
                >
                  {/* Particle ring effect */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <ParticleRing isHovered={hoveredIndex === index} />
                  </div>

                  {/* Corner accent */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-bl-full transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to bottom right, ${stat.color}30, transparent)`,
                      opacity: hoveredIndex === index ? 1 : 0.5,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-6 transition-colors duration-300"
                      style={{ color: stat.color }}
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                        filter: hoveredIndex === index ? `drop-shadow(0 0 10px ${stat.color})` : 'none',
                      }}
                    >
                      {stat.icon}
                    </motion.div>

                    {/* Value with circular progress */}
                    <div className="relative mb-4">
                      <div
                        className="text-4xl md:text-5xl font-black transition-colors duration-300"
                        style={{
                          background: `linear-gradient(to right, ${stat.color}, ${stat.color}99)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: hoveredIndex === index ? `drop-shadow(0 0 20px ${stat.color})` : 'none',
                        }}
                      >
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          decimals={stat.decimals}
                        />
                      </div>
                    </div>

                    {/* Labels */}
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
                      <p className="text-gray-600 text-xs mb-2" dir="rtl">{stat.labelHe}</p>
                      <p className="text-gray-500 text-xs">{stat.description}</p>
                    </div>

                    {/* Animated line at bottom */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 rounded-full"
                      style={{ backgroundColor: stat.color }}
                      initial={{ width: 0 }}
                      animate={{
                        width: hoveredIndex === index ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Hover glow overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${stat.color}10, transparent 70%)`,
                    }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                  />
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>All systems operational</span>
            <span className="text-gray-700">|</span>
            <span>Last updated: Real-time</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
