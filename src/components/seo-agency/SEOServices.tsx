'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Brand color: #0485b2
const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
  dark: '#036d94',
  glow: 'rgba(4, 133, 178, 0.15)',
}

const services = [
  {
    id: 1,
    title: 'קידום אתרי תדמית',
    titleEn: 'Corporate SEO',
    description: 'קידום אורגני מקצועי לאתרי תדמית וארגונים. נבנה אסטרטגיה מותאמת אישית שתביא את העסק שלך לעמוד הראשון בגוגל.',
    features: [
      'מחקר מילות מפתח מעמיק',
      'אופטימיזציה טכנית מלאה',
      'בניית תוכן איכותי',
      'בניית קישורים איכותיים',
      'דוחות ומעקב חודשי',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    gradient: 'from-[#0485b2] to-[#06a5d9]',
  },
  {
    id: 2,
    title: 'קידום חנויות אונליין',
    titleEn: 'E-commerce SEO',
    description: 'קידום מותאם לחנויות מקוונות ואתרי מסחר אלקטרוני. נגדיל את התנועה האורגנית ואת ההמרות שלך.',
    features: [
      'אופטימיזציה לדפי מוצר',
      'Schema markup למוצרים',
      'אסטרטגיית תוכן למכירות',
      'שיפור מהירות אתר',
      'אופטימיזציה למובייל',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    gradient: 'from-[#036d94] to-[#0485b2]',
  },
  {
    id: 3,
    title: 'בניית אתרים מותאמי SEO',
    titleEn: 'SEO-Optimized Development',
    description: 'בניית אתרים מודרניים עם התייחסות מלאה לקידום אורגני מהיום הראשון. קוד נקי, מהירות גבוהה ומבנה אופטימלי.',
    features: [
      'עיצוב מותאם אישית',
      'ביצועים ומהירות גבוהים',
      'מבנה URL אופטימלי',
      'תגי Meta מותאמים',
      'תמיכה בריספונסיביות',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    gradient: 'from-[#06a5d9] to-[#0485b2]',
  },
  {
    id: 4,
    title: 'ייעוץ SEO',
    titleEn: 'SEO Consulting',
    description: 'ליווי וייעוץ מקצועי לצוות השיווק שלך. נעזור לכם להבין את עולם ה-SEO ולהטמיע את השיטות הנכונות.',
    features: [
      'אבחון מצב קיים',
      'בניית אסטרטגיה',
      'הדרכת צוותים',
      'ליווי שוטף',
      'דוחות וניתוח נתונים',
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: 'from-[#0485b2] to-[#036d94]',
  },
]

export default function SEOServices() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0a1015] to-[#0a0a0a]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[150px]"
          initial={{ backgroundColor: `${BRAND.primary}08` }}
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-[100px]"
          initial={{ backgroundColor: `${BRAND.light}05` }}
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
            השירותים שלנו
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            מה אנחנו <span style={{ color: BRAND.primary }}>עושים</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            אנחנו מתמקדים אך ורק בקידום אורגני ובניית אתרים.
            <br />
            זה מה שאנחנו יודעים לעשות הכי טוב.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group"
            >
              <div
                className="relative h-full p-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#0485b2]/50"
                style={{
                  boxShadow: hoveredId === service.id ? `0 25px 50px -12px ${BRAND.glow}` : 'none',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${BRAND.glow}, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: `${BRAND.primary}15`,
                        color: BRAND.primary
                      }}
                    >
                      {service.icon}
                    </div>
                    <span className="text-gray-600 text-sm font-medium">{service.titleEn}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#0485b2] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <svg className="w-5 h-5" style={{ color: BRAND.primary }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300`}
                  >
                    לפרטים נוספים
                  </motion.button>
                </div>

                {/* Corner decoration */}
                <div
                  className="absolute bottom-0 left-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{
                    background: `linear-gradient(45deg, transparent, ${BRAND.primary})`,
                    borderTopRightRadius: '100%',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
            לא בטוחים מה מתאים לכם? בואו נדבר.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${BRAND.glow}` }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full text-white font-bold text-lg"
            style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})` }}
          >
            שיחת ייעוץ חינם
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
