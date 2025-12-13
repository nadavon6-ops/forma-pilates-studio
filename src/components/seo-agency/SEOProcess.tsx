'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Brand color: #0485b2
const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
  dark: '#036d94',
  glow: 'rgba(4, 133, 178, 0.3)',
}

const steps = [
  {
    number: '01',
    title: 'אבחון ומחקר',
    description: 'ניתוח מעמיק של האתר, התחרות ושוק היעד. מחקר מילות מפתח מקיף וזיהוי הזדמנויות.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    duration: 'שבוע 1-2',
  },
  {
    number: '02',
    title: 'בניית אסטרטגיה',
    description: 'פיתוח תכנית עבודה מפורטת הכוללת יעדים, לוחות זמנים ומדדי הצלחה.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    duration: 'שבוע 2-3',
  },
  {
    number: '03',
    title: 'אופטימיזציה טכנית',
    description: 'תיקון בעיות טכניות, שיפור מהירות, מבנה האתר ו-Core Web Vitals.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    duration: 'שבוע 3-5',
  },
  {
    number: '04',
    title: 'תוכן ובניית קישורים',
    description: 'יצירת תוכן איכותי ובניית פרופיל קישורים חזק שמחזק את הסמכות של האתר.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    duration: 'שוטף',
  },
  {
    number: '05',
    title: 'מעקב ואופטימיזציה',
    description: 'ניטור ביצועים שוטף, דוחות חודשיים ושיפור מתמיד בהתאם לתוצאות.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    duration: 'שוטף',
  },
]

export default function SEOProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-[150px]"
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
          <span
            className="inline-block px-4 py-2 rounded-full border text-sm font-medium mb-6"
            style={{
              borderColor: `${BRAND.primary}50`,
              backgroundColor: `${BRAND.primary}15`,
              color: BRAND.light
            }}
          >
            תהליך העבודה
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            איך אנחנו <span style={{ color: BRAND.primary }}>עובדים</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            תהליך עבודה מובנה ושקוף שמבטיח תוצאות
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute right-1/2 top-0 bottom-0 w-px bg-gray-800 hidden lg:block">
            <motion.div
              className="absolute top-0 right-0 w-full"
              style={{
                height: lineProgress,
                background: `linear-gradient(to bottom, ${BRAND.primary}, ${BRAND.light})`
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-left lg:pr-16' : 'lg:text-right lg:pl-16'}`}>
                  <div
                    className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 transition-colors hover:border-[#0485b2]/30"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${BRAND.primary}15`,
                          color: BRAND.primary
                        }}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <span className="font-bold text-lg" style={{ color: BRAND.primary }}>{step.number}</span>
                        <span className="text-gray-600 text-sm mr-2">/ {step.duration}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div
                  className="hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-black z-10"
                  style={{ border: `4px solid ${BRAND.primary}` }}
                >
                  <span className="font-bold" style={{ color: BRAND.primary }}>{step.number}</span>
                </div>

                {/* Empty space for alignment */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Results Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full border"
            style={{
              background: `linear-gradient(135deg, ${BRAND.primary}15, ${BRAND.light}10)`,
              borderColor: `${BRAND.primary}50`
            }}
          >
            <svg className="w-6 h-6" style={{ color: BRAND.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-white font-medium">
              תוצאות ראשונות תוך <span className="font-bold" style={{ color: BRAND.primary }}>3-6 חודשים</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
