'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'

// Brand color: #0485b2
const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
  dark: '#036d94',
  glow: 'rgba(4, 133, 178, 0.3)',
}

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const spring = useSpring(0, { stiffness: 50, damping: 30 })

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])

  const display = useTransform(spring, (latest) => Math.floor(latest).toLocaleString())

  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    return display.on('change', (latest) => setDisplayValue(latest))
  }, [display])

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

// ============================================
// LIVE METRICS TICKER
// ============================================
function LiveMetricsTicker() {
  const [metrics, setMetrics] = useState({
    impressions: 1245678,
    clicks: 89432,
    keywords: 523,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        impressions: prev.impressions + Math.floor(Math.random() * 100),
        clicks: prev.clicks + Math.floor(Math.random() * 10),
        keywords: prev.keywords + (Math.random() > 0.9 ? 1 : 0),
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-black/50 backdrop-blur-xl rounded-2xl border border-[#0485b2]/30 p-6"
      style={{ boxShadow: `0 0 30px ${BRAND.glow}` }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: BRAND.light }} />
          <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: BRAND.primary }} />
        </span>
        <span className="text-sm font-medium" style={{ color: BRAND.light }}>נתונים בזמן אמת</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white font-mono">
            {metrics.impressions.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">חשיפות היום</div>
        </div>
        <div className="text-center border-x border-gray-800">
          <div className="text-2xl font-bold font-mono" style={{ color: BRAND.primary }}>
            {metrics.clicks.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">קליקים</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white font-mono">
            {metrics.keywords}
          </div>
          <div className="text-xs text-gray-500">מילות מפתח TOP 10</div>
        </div>
      </div>
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
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
    color: BRAND.primary,
  },
  {
    value: 150,
    suffix: '+',
    label: 'לקוחות פעילים',
    subLabel: 'עסקים שסומכים עלינו',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: BRAND.light,
  },
  {
    value: 300,
    suffix: '%',
    label: 'עליית תנועה ממוצעת',
    subLabel: 'תוך 6 חודשים',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: BRAND.primary,
  },
  {
    value: 20,
    suffix: '',
    label: 'מומחי SEO',
    subLabel: 'בצוות המקצועי שלנו',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: BRAND.light,
  },
]

// ============================================
// MAIN STATS COMPONENT
// ============================================
export default function SEOStats() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${BRAND.primary}80 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[100px]" style={{ backgroundColor: `${BRAND.primary}08` }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-4 py-2 rounded-full border text-sm font-medium mb-6"
            style={{
              borderColor: `${BRAND.primary}50`,
              backgroundColor: `${BRAND.primary}15`,
              color: BRAND.light
            }}
          >
            המספרים מדברים
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            תוצאות <span style={{ color: BRAND.primary }}>מוכחות</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            אנחנו לא מבטיחים - אנחנו מביאים תוצאות. הנה המספרים שמוכיחים את זה.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className="relative h-full p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#0485b2]/50"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.color}15, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="mb-4 transition-colors duration-300"
                  style={{ color: stat.color }}
                >
                  {stat.icon}
                </div>

                {/* Value */}
                <div
                  className="text-4xl md:text-5xl font-black mb-2"
                  style={{ color: stat.color }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Labels */}
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.subLabel}</div>

                {/* Decorative corner */}
                <div
                  className="absolute top-0 left-0 w-16 h-16 opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, transparent)`,
                    borderBottomRightRadius: '100%',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Metrics */}
        <div className="max-w-xl mx-auto">
          <LiveMetricsTicker />
        </div>
      </div>
    </section>
  )
}
