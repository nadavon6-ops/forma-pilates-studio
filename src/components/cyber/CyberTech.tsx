'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const technologies = [
  { name: 'AI/ML Detection', icon: '🤖', category: 'Detection' },
  { name: 'Zero Trust', icon: '🔒', category: 'Architecture' },
  { name: 'SIEM/SOAR', icon: '📊', category: 'Monitoring' },
  { name: 'EDR/XDR', icon: '🛡️', category: 'Endpoint' },
  { name: 'Cloud Security', icon: '☁️', category: 'Cloud' },
  { name: 'Threat Intel', icon: '🔍', category: 'Intelligence' },
  { name: 'IAM', icon: '🔑', category: 'Identity' },
  { name: 'Encryption', icon: '🔐', category: 'Data' },
]

const partners = [
  'Microsoft', 'CrowdStrike', 'Palo Alto', 'Splunk', 'AWS', 'Google Cloud', 'Fortinet', 'Cisco'
]

export default function CyberTech() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('stack')

  return (
    <section id="technology" ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Animated circuit board pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 H40 M60 50 H100 M50 0 V40 M50 60 V100" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-cyan-400" />
              <circle cx="50" cy="50" r="3" fill="currentColor" className="text-cyan-400" />
              <circle cx="0" cy="50" r="2" fill="currentColor" className="text-cyan-400" />
              <circle cx="100" cy="50" r="2" fill="currentColor" className="text-cyan-400" />
              <circle cx="50" cy="0" r="2" fill="currentColor" className="text-cyan-400" />
              <circle cx="50" cy="100" r="2" fill="currentColor" className="text-cyan-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
            Our Technology | הטכנולוגיה שלנו
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Powered by
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"> Cutting-Edge </span>
            Technology
          </h2>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full border border-gray-700 bg-gray-800/50">
            {['stack', 'partners'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'stack' ? 'Tech Stack' : 'Partners'}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        {activeTab === 'stack' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="p-6 rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800/50 to-gray-900/50 text-center hover:border-cyan-500/50 transition-all duration-300">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors" />

                  <div className="relative">
                    <span className="text-4xl mb-4 block">{tech.icon}</span>
                    <h3 className="text-white font-semibold mb-1">{tech.name}</h3>
                    <span className="text-xs text-cyan-400/60">{tech.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Partners */}
        {activeTab === 'partners' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            {/* Scrolling logos */}
            <div className="overflow-hidden py-8">
              <motion.div
                className="flex gap-12"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {[...partners, ...partners].map((partner, index) => (
                  <div
                    key={`${partner}-${index}`}
                    className="flex-shrink-0 px-8 py-4 rounded-xl border border-gray-700 bg-gray-800/30"
                  >
                    <span className="text-2xl font-bold text-gray-500 hover:text-cyan-400 transition-colors whitespace-nowrap">
                      {partner}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
          </motion.div>
        )}

        {/* 3D Floating Shield - Decoration */}
        <motion.div
          className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2"
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative w-64 h-64">
            {/* Shield glow */}
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl" />

            {/* Shield icon */}
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="w-40 h-40 text-cyan-400/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <svg className="absolute w-20 h-20 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
