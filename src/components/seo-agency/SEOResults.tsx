'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ============================================
// CASE STUDY CHART
// ============================================
function CaseStudyChart({ data, color }: { data: number[]; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })

  useEffect(() => {
    if (!isInView) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 300
    canvas.height = 100

    let progress = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      progress += 0.02

      const currentProgress = Math.min(progress, 1)

      // Draw line
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 3

      const maxVal = Math.max(...data)
      data.forEach((value, i) => {
        const x = (i / (data.length - 1)) * canvas.width
        const y = canvas.height - (value / maxVal) * canvas.height * 0.8 * currentProgress

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Area fill
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, color + '40')
      gradient.addColorStop(1, color + '00')
      ctx.fillStyle = gradient
      ctx.fill()

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [isInView, data, color])

  return (
    <div ref={containerRef}>
      <canvas ref={canvasRef} className="w-full" />
    </div>
  )
}

// ============================================
// CASE STUDIES DATA
// ============================================
const caseStudies = [
  {
    client: 'חברת פיננסים',
    industry: 'פיננסים',
    metrics: {
      traffic: { before: 2500, after: 15000, change: '+500%' },
      keywords: { before: 12, after: 89, change: '+641%' },
      leads: { before: 45, after: 280, change: '+522%' },
    },
    chartData: [2500, 3200, 4800, 7200, 9500, 12000, 15000],
    testimonial: 'התוצאות עברו את כל הציפיות. תוך 6 חודשים הגענו לעמוד הראשון על מילות המפתח המרכזיות.',
    color: '#10b981',
  },
  {
    client: 'רשת קמעונאות',
    industry: 'E-commerce',
    metrics: {
      traffic: { before: 8000, after: 42000, change: '+425%' },
      keywords: { before: 34, after: 156, change: '+358%' },
      leads: { before: 120, after: 890, change: '+641%' },
    },
    chartData: [8000, 12000, 18000, 25000, 32000, 38000, 42000],
    testimonial: 'המכירות האורגניות עלו ב-400% ואנחנו ממשיכים לצמוח.',
    color: '#3b82f6',
  },
  {
    client: 'חברת נדל"ן',
    industry: 'נדל"ן',
    metrics: {
      traffic: { before: 1200, after: 8500, change: '+608%' },
      keywords: { before: 8, after: 67, change: '+737%' },
      leads: { before: 15, after: 145, change: '+866%' },
    },
    chartData: [1200, 2100, 3500, 5200, 6800, 7800, 8500],
    testimonial: 'הפכנו למובילים בתחום באזור שלנו בזכות הקידום המקצועי.',
    color: '#8b5cf6',
  },
]

export default function SEOResults() {
  const [activeCase, setActiveCase] = useState(0)

  return (
    <section id="results" className="relative py-32 overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#0f1a14]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            תוצאות אמיתיות
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            הצלחות <span className="text-emerald-400">הלקוחות שלנו</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            לא מבטיחים - מביאים. הנה כמה דוגמאות לתוצאות שהשגנו.
          </p>
        </motion.div>

        {/* Case Study Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {caseStudies.map((study, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCase(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCase === index
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {study.industry}
            </motion.button>
          ))}
        </div>

        {/* Active Case Study */}
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Metrics */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: caseStudies[activeCase].color }}
                />
                <h3 className="text-2xl font-bold text-white">
                  {caseStudies[activeCase].client}
                </h3>
                <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-sm">
                  {caseStudies[activeCase].industry}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {Object.entries(caseStudies[activeCase].metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div
                      className="text-3xl font-black mb-2"
                      style={{ color: caseStudies[activeCase].color }}
                    >
                      {value.change}
                    </div>
                    <div className="text-gray-500 text-sm mb-2">
                      {key === 'traffic' ? 'תנועה' : key === 'keywords' ? 'מילות מפתח' : 'לידים'}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <span className="text-gray-600">{value.before.toLocaleString()}</span>
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="text-white font-bold">{value.after.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-black/30 rounded-xl p-4 mb-8">
                <div className="text-gray-500 text-sm mb-4">צמיחת תנועה לאורך זמן</div>
                <CaseStudyChart
                  data={caseStudies[activeCase].chartData}
                  color={caseStudies[activeCase].color}
                />
              </div>
            </div>

            {/* Testimonial */}
            <div className="flex flex-col justify-center">
              <div className="relative">
                <svg
                  className="absolute -top-4 -right-4 w-16 h-16 text-emerald-500/20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-2xl text-white font-medium leading-relaxed mb-6">
                  "{caseStudies[activeCase].testimonial}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white font-bold">
                    {caseStudies[activeCase].client.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">מנהל שיווק</div>
                    <div className="text-gray-500 text-sm">{caseStudies[activeCase].client}</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600"
              >
                רוצים תוצאות דומות? דברו איתנו
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
