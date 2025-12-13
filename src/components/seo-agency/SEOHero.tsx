'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ============================================
// GOOGLE RANKINGS VISUALIZATION
// ============================================
function RankingsVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    const rankings = [
      { keyword: 'קידום אתרים', from: 45, to: 1, color: '#10b981' },
      { keyword: 'SEO ישראל', from: 32, to: 2, color: '#34d399' },
      { keyword: 'בניית אתרים', from: 28, to: 3, color: '#6ee7b7' },
      { keyword: 'שיווק דיגיטלי', from: 50, to: 4, color: '#a7f3d0' },
    ]

    let progress = 0
    let animationId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i <= 10; i++) {
        const y = 30 + (i * 24)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()

        // Position numbers
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.font = '10px monospace'
        ctx.textAlign = 'right'
        ctx.fillText(`#${i * 5 + 1}`, 25, y + 4)
      }

      progress += 0.005
      if (progress > 1) progress = 0

      rankings.forEach((ranking, i) => {
        const x = 80 + i * 80
        const currentPos = ranking.from - (ranking.from - ranking.to) * Math.min(progress * 2, 1)
        const y = 30 + (currentPos - 1) * 4.8

        // Trail
        ctx.beginPath()
        ctx.strokeStyle = ranking.color + '40'
        ctx.lineWidth = 2
        ctx.moveTo(x, 30 + (ranking.from - 1) * 4.8)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Current position dot
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15)
        gradient.addColorStop(0, ranking.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.arc(x, y, 15, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = ranking.color
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()

        // Keyword label
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(ranking.keyword.split(' ')[0], x, canvas.height - 20)

        // Position label
        ctx.fillStyle = ranking.color
        ctx.font = 'bold 14px sans-serif'
        ctx.fillText(`#${Math.round(currentPos)}`, x, y - 20)
      })

      // Title
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 14px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('עליית דירוגים בזמן אמת', canvas.width / 2, 20)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="rounded-xl" />
}

// ============================================
// TRAFFIC GROWTH CHART
// ============================================
function TrafficGrowthChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 350
    canvas.height = 200

    const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני']
    const data = [1200, 1800, 2400, 3500, 5200, 8400]

    let progress = 0
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      progress += 0.02
      const currentProgress = Math.min(progress, 1)

      // Draw area gradient
      ctx.beginPath()
      ctx.moveTo(40, canvas.height - 30)

      data.forEach((value, i) => {
        const x = 40 + (i * (canvas.width - 60)) / (data.length - 1)
        const maxVal = Math.max(...data)
        const y = canvas.height - 30 - (value / maxVal) * (canvas.height - 60) * currentProgress

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      // Complete the area
      ctx.lineTo(canvas.width - 20, canvas.height - 30)
      ctx.lineTo(40, canvas.height - 30)
      ctx.closePath()

      const areaGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      areaGradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)')
      areaGradient.addColorStop(1, 'rgba(16, 185, 129, 0)')
      ctx.fillStyle = areaGradient
      ctx.fill()

      // Draw line
      ctx.beginPath()
      data.forEach((value, i) => {
        const x = 40 + (i * (canvas.width - 60)) / (data.length - 1)
        const maxVal = Math.max(...data)
        const y = canvas.height - 30 - (value / maxVal) * (canvas.height - 60) * currentProgress

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.strokeStyle = '#10b981'
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw points and labels
      data.forEach((value, i) => {
        const x = 40 + (i * (canvas.width - 60)) / (data.length - 1)
        const maxVal = Math.max(...data)
        const y = canvas.height - 30 - (value / maxVal) * (canvas.height - 60) * currentProgress

        // Glow
        ctx.beginPath()
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 15)
        glow.addColorStop(0, 'rgba(16, 185, 129, 0.5)')
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.arc(x, y, 15, 0, Math.PI * 2)
        ctx.fill()

        // Point
        ctx.beginPath()
        ctx.fillStyle = '#10b981'
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()

        // Month label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(months[i], x, canvas.height - 10)

        // Value label
        if (currentProgress > 0.8) {
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 11px sans-serif'
          ctx.fillText((value * currentProgress).toFixed(0), x, y - 15)
        }
      })

      // Title
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText('צמיחת תנועה אורגנית', canvas.width - 10, 20)

      // Growth percentage
      ctx.fillStyle = '#10b981'
      ctx.font = 'bold 16px sans-serif'
      ctx.fillText(`+${Math.round(600 * currentProgress)}%`, canvas.width - 10, 40)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return <canvas ref={canvasRef} className="rounded-xl" />
}

// ============================================
// FLOATING KEYWORDS
// ============================================
function FloatingKeywords() {
  const keywords = [
    'SEO', 'Google', '#1', 'דירוג', 'תנועה', 'המרות', 'אורגני',
    'מילות מפתח', 'קישורים', 'תוכן', 'אופטימיזציה', 'Analytics'
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {keywords.map((keyword, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-500/20 font-bold text-lg"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
          }}
          animate={{
            y: [null, '-20%', null],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          {keyword}
        </motion.div>
      ))}
    </div>
  )
}

// ============================================
// SEARCH BAR ANIMATION
// ============================================
function AnimatedSearchBar() {
  const [query, setQuery] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const queries = ['קידום אתרים מקצועי', 'SEO לעסקים', 'בניית אתרים']
  const [queryIndex, setQueryIndex] = useState(0)

  useEffect(() => {
    const currentQuery = queries[queryIndex]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= currentQuery.length) {
        setQuery(currentQuery.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setQueryIndex((prev) => (prev + 1) % queries.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [queryIndex])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="relative max-w-xl mx-auto"
    >
      <div className="relative bg-white rounded-2xl shadow-2xl shadow-emerald-500/20 overflow-hidden">
        <div className="flex items-center p-4 border-b border-gray-100">
          <div className="flex gap-2 ml-4">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center text-sm text-gray-400">google.com</div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 bg-gray-50 rounded-full px-6 py-4 border border-gray-200">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-gray-800 font-medium" dir="rtl">
              {query}
              <span className="animate-pulse text-emerald-500">|</span>
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border-r-4 border-emerald-500"
            >
              <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">#1</div>
              <div className="text-right">
                <div className="text-emerald-700 font-medium text-sm">n-c.digital - הלקוח שלך</div>
                <div className="text-gray-500 text-xs">קידום אתרים מקצועי | תוצאות מוכחות</div>
              </div>
            </motion.div>
            <div className="flex items-start gap-3 p-3 rounded-lg opacity-50">
              <div className="bg-gray-300 text-white text-xs font-bold px-2 py-1 rounded">#2</div>
              <div className="text-right">
                <div className="text-gray-600 font-medium text-sm">מתחרה א׳</div>
                <div className="text-gray-400 text-xs">שירותי SEO</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg opacity-30">
              <div className="bg-gray-300 text-white text-xs font-bold px-2 py-1 rounded">#3</div>
              <div className="text-right">
                <div className="text-gray-600 font-medium text-sm">מתחרה ב׳</div>
                <div className="text-gray-400 text-xs">פתרונות דיגיטליים</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px]" />

        {/* Floating keywords */}
        <FloatingKeywords />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Right Column - Text (Hebrew RTL) */}
          <div className="text-right">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 text-sm font-medium">
                סוכנות SEO מובילה בישראל
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
            >
              <span className="text-white">אנחנו מביאים את</span>
              <br />
              <span className="text-white">העסק שלך ל</span>
              <span className="bg-gradient-to-l from-emerald-400 to-green-500 bg-clip-text text-transparent">עמוד הראשון</span>
              <br />
              <span className="text-white">בגוגל</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 mb-8 leading-relaxed"
            >
              קידום אורגני מקצועי ובניית אתרים מותאמי SEO.
              <br />
              <span className="text-emerald-400">צוות של 20 מומחים</span> עם ניסיון של שנים בהבאת תוצאות.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex gap-8 mb-10"
            >
              {[
                { value: '500+', label: 'מילות מפתח בעמוד 1' },
                { value: '150+', label: 'לקוחות מרוצים' },
                { value: '10+', label: 'שנות ניסיון' },
              ].map((stat, i) => (
                <div key={i} className="text-right">
                  <div className="text-3xl font-black text-emerald-400">{stat.value}</div>
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
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full text-white font-bold text-lg"
              >
                קבלו הצעת מחיר
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-emerald-500/50 rounded-full text-emerald-400 font-semibold text-lg hover:bg-emerald-500/10 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                052-566-0563
              </motion.button>
            </motion.div>
          </div>

          {/* Left Column - Visualizations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <AnimatedSearchBar />

            {/* Floating metrics cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-10 -right-10 bg-black/80 backdrop-blur-xl rounded-xl border border-emerald-500/20 p-4"
            >
              <RankingsVisualization />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute -top-10 -left-10 bg-black/80 backdrop-blur-xl rounded-xl border border-emerald-500/20 p-4"
            >
              <TrafficGrowthChart />
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
          <span className="text-xs">גלול למטה</span>
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
