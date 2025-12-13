'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const services = [
  {
    id: 1,
    title: 'Threat Detection & Response',
    titleHe: 'זיהוי ותגובה לאיומים',
    description: 'AI-powered threat detection with real-time response capabilities. Our SOC team monitors your infrastructure 24/7.',
    descriptionHe: 'זיהוי איומים מבוסס AI עם יכולות תגובה בזמן אמת. צוות ה-SOC שלנו מנטר את התשתית שלך 24/7.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'cyan',
    features: ['Real-time Monitoring', 'Automated Response', 'Incident Reports'],
  },
  {
    id: 2,
    title: 'Penetration Testing',
    titleHe: 'בדיקות חדירה',
    description: 'Comprehensive security assessments that identify vulnerabilities before attackers do. White-hat ethical hacking.',
    descriptionHe: 'הערכות אבטחה מקיפות שמזהות פגיעויות לפני התוקפים. פריצה אתית של כובע לבן.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    ),
    color: 'purple',
    features: ['Web App Testing', 'Network Security', 'Social Engineering'],
  },
  {
    id: 3,
    title: 'Cloud Security',
    titleHe: 'אבטחת ענן',
    description: 'Secure your cloud infrastructure across AWS, Azure, and GCP. Zero-trust architecture implementation.',
    descriptionHe: 'אבטחת תשתית הענן שלך ב-AWS, Azure ו-GCP. יישום ארכיטקטורת Zero-trust.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: 'blue',
    features: ['Multi-Cloud Support', 'IAM Management', 'Compliance'],
  },
  {
    id: 4,
    title: 'Security Training',
    titleHe: 'הדרכות אבטחה',
    description: 'Transform your employees into the first line of defense. Customized training programs and phishing simulations.',
    descriptionHe: 'הפכו את העובדים שלכם לקו ההגנה הראשון. תוכניות הדרכה מותאמות וסימולציות פישינג.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'emerald',
    features: ['Phishing Simulations', 'Awareness Programs', 'Certifications'],
  },
  {
    id: 5,
    title: 'Compliance & Audit',
    titleHe: 'תאימות וביקורת',
    description: 'Meet regulatory requirements with confidence. SOC 2, ISO 27001, GDPR, and industry-specific compliance.',
    descriptionHe: 'עמדו בדרישות הרגולציה בביטחון. SOC 2, ISO 27001, GDPR ותאימות ספציפית לתעשייה.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: 'amber',
    features: ['Gap Analysis', 'Policy Development', 'Audit Support'],
  },
  {
    id: 6,
    title: 'Incident Response',
    titleHe: 'תגובה לאירועים',
    description: 'Rapid response when breaches occur. Our elite team minimizes damage and restores operations quickly.',
    descriptionHe: 'תגובה מהירה כאשר מתרחשות פריצות. הצוות העילית שלנו ממזער נזקים ומשחזר פעילות במהירות.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    color: 'red',
    features: ['24/7 Response Team', 'Forensic Analysis', 'Recovery Planning'],
  },
]

const colorClasses = {
  cyan: 'from-cyan-500 to-cyan-600 group-hover:shadow-cyan-500/25',
  purple: 'from-purple-500 to-purple-600 group-hover:shadow-purple-500/25',
  blue: 'from-blue-500 to-blue-600 group-hover:shadow-blue-500/25',
  emerald: 'from-emerald-500 to-emerald-600 group-hover:shadow-emerald-500/25',
  amber: 'from-amber-500 to-amber-600 group-hover:shadow-amber-500/25',
  red: 'from-red-500 to-red-600 group-hover:shadow-red-500/25',
}

export default function CyberServices() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="services" ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6"
          >
            Our Services | השירותים שלנו
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Comprehensive
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Security </span>
            Solutions
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
            End-to-end cybersecurity services tailored to protect your business from evolving threats
          </p>
          <p className="text-lg text-gray-500" dir="rtl">
            שירותי אבטחת סייבר מקצה לקצה המותאמים להגנה על העסק שלך מפני איומים מתפתחים
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-gray-700 group-hover:shadow-2xl">
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-[-1px] rounded-2xl bg-gradient-to-r ${colorClasses[service.color as keyof typeof colorClasses]} opacity-20`} />
                </div>

                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[service.color as keyof typeof colorClasses]} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="relative text-sm text-cyan-400/70 mb-4" dir="rtl">
                  {service.titleHe}
                </p>

                <p className="relative text-gray-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <div className="relative flex flex-wrap gap-2 mt-auto">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs rounded-full border border-gray-700 text-gray-400 bg-gray-800/50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
