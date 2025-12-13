'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const reasons = [
  {
    number: '01',
    title: 'Military-Grade Expertise',
    titleHe: 'מומחיות ברמה צבאית',
    description: 'Our team includes veterans from elite intelligence units (8200, Mossad) with decades of combined experience in cyber warfare.',
    icon: '🎖️',
  },
  {
    number: '02',
    title: 'Proactive Defense',
    titleHe: 'הגנה פרואקטיבית',
    description: 'We don\'t wait for attacks. Our AI-powered systems predict and prevent threats before they materialize.',
    icon: '🛡️',
  },
  {
    number: '03',
    title: 'Global Coverage',
    titleHe: 'כיסוי גלובלי',
    description: 'Operating from Israel with presence in US, Europe, and Asia. Local expertise, global reach.',
    icon: '🌍',
  },
  {
    number: '04',
    title: 'Zero Trust Architecture',
    titleHe: 'ארכיטקטורת אפס אמון',
    description: 'Every access request is verified. Trust nothing, verify everything. Maximum security posture.',
    icon: '🔐',
  },
]

export default function CyberWhyUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100])

  return (
    <section id="about" ref={containerRef} className="relative py-32 overflow-hidden bg-black">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: '-100%',
              right: '-100%',
            }}
            animate={{
              x: ['0%', '100%'],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Hexagon grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon
              points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-cyan-400"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
                Why Choose Us | למה אנחנו
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Israel's Leading
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Cyber Defense
                </span>
                <br />
                Company
              </h2>

              <p className="text-lg text-gray-400 mb-8">
                Born from the world's most advanced cyber ecosystem, we bring military-grade protection to businesses of all sizes.
              </p>

              <p className="text-lg text-gray-500 mb-8" dir="rtl">
                נולדנו מהאקוסיסטם הסייבר המתקדם ביותר בעולם, ומביאים הגנה ברמה צבאית לעסקים בכל הגדלים.
              </p>

              {/* Achievement badges */}
              <div className="flex flex-wrap gap-4">
                {['ISO 27001', 'SOC 2 Type II', 'GDPR Compliant'].map((badge) => (
                  <div
                    key={badge}
                    className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-gray-300 text-sm font-medium"
                  >
                    ✓ {badge}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Feature cards */}
          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-6 rounded-xl border border-gray-800 bg-gradient-to-r from-gray-900/50 to-transparent backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500" />

                  <div className="relative flex items-start gap-6">
                    {/* Number */}
                    <div className="flex-shrink-0 text-5xl font-black text-gray-800 group-hover:text-cyan-500/30 transition-colors">
                      {reason.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{reason.icon}</span>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {reason.title}
                        </h3>
                      </div>
                      <p className="text-sm text-cyan-400/70 mb-2" dir="rtl">
                        {reason.titleHe}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
