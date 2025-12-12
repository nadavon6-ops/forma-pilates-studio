'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'

// Interactive before/after slider - COMPLETELY IMPOSSIBLE in WordPress without plugins
export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setSliderPosition(percentage)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  return (
    <section className="py-32 bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">The Transformation</span>
          <h2 className="text-4xl md:text-6xl font-heading text-charcoal font-light">
            See the <span className="text-terracotta">Difference</span>
          </h2>
          <p className="mt-4 text-charcoal/60">
            Drag the slider to compare our studio atmosphere
          </p>
        </motion.div>

        {/* Before/After Slider - IMPOSSIBLE in WordPress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div
            ref={containerRef}
            className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* "After" image (full width, bottom layer) */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600"
                alt="After"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                After Class ✨
              </div>
            </div>

            {/* "Before" image (clipped, top layer) - IMPOSSIBLE in WordPress */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600"
                alt="Before"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-charcoal/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                Before Class
              </div>
            </motion.div>

            {/* Slider handle - IMPOSSIBLE in WordPress */}
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              animate={{ boxShadow: isDragging ? '0 0 20px rgba(255,255,255,0.5)' : '0 0 10px rgba(0,0,0,0.3)' }}
            >
              {/* Handle circle */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                animate={{ scale: isDragging ? 1.3 : 1 }}
              >
                <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Transformation stories - with animated counters */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          {[
            { label: 'Flexibility Increase', value: '40%', icon: '🧘' },
            { label: 'Core Strength', value: '65%', icon: '💪' },
            { label: 'Stress Reduction', value: '80%', icon: '😌' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-6 bg-sage-light rounded-2xl"
            >
              <span className="text-4xl mb-4 block">{stat.icon}</span>
              <motion.span
                className="text-4xl font-heading text-sage block"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.2, type: 'spring' }}
              >
                +{stat.value}
              </motion.span>
              <span className="text-charcoal/60 text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
