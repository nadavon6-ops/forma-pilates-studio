'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// 3D Tilt Card - IMPOSSIBLE in WordPress
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, { stiffness: 100, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 100, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = e.clientX - centerX
    const y = e.clientY - centerY

    rotateY.set(x * 0.05)
    rotateX.set(-y * 0.05)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Counter animation - IMPOSSIBLE in WordPress (smooth counting)
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value}{suffix}
      </motion.span>
    </motion.span>
  )
}

const features = [
  {
    stat: '8',
    suffix: ' Max',
    title: 'Intimate Classes',
    description: 'Personal attention in every session',
    gradient: 'from-sage to-sage-dark',
  },
  {
    stat: '500',
    suffix: '+',
    title: 'Hours Certified',
    description: 'Expert instructors who care',
    gradient: 'from-terracotta to-terracotta-dark',
  },
  {
    stat: '5',
    suffix: ' Star',
    title: 'Rated Studio',
    description: 'Loved by our community',
    gradient: 'from-charcoal to-charcoal-light',
  },
]

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Parallax transforms for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <section
      ref={containerRef}
      id="explore"
      className="relative py-32 bg-cream overflow-hidden"
    >
      {/* Floating decorative elements with parallax - IMPOSSIBLE in WordPress */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-20 left-10 w-64 h-64 bg-sage/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10">
        {/* Section header with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Why FORMA
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-heading text-charcoal font-light">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="block"
            >
              Not Just Pilates.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="block text-terracotta"
            >
              A Movement Experience.
            </motion.span>
          </h2>
        </motion.div>

        {/* 3D Tilt Cards - IMPOSSIBLE in WordPress */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <TiltCard key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10"
                  style={{
                    background: `linear-gradient(to bottom right, var(--${feature.gradient.split(' ')[0].replace('from-', '')}), var(--${feature.gradient.split(' ')[1].replace('to-', '')}))`
                  }}
                />
                <div className="bg-white p-10 rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-500 transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Floating stat number */}
                  <motion.div
                    style={{ transform: 'translateZ(50px)' }}
                    className="mb-6"
                  >
                    <span className="text-6xl md:text-7xl font-heading text-sage font-light">
                      <AnimatedCounter value={parseInt(feature.stat)} suffix={feature.suffix} />
                    </span>
                  </motion.div>

                  <h3 className="text-2xl font-heading text-charcoal mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-charcoal/60">
                    {feature.description}
                  </p>

                  {/* Animated line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                    className="mt-6 h-1 bg-gradient-to-r from-sage to-terracotta origin-left rounded-full"
                  />
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Horizontal scroll text - IMPOSSIBLE in WordPress */}
        <motion.div
          style={{ x: useTransform(scrollYProgress, [0, 1], ['0%', '-50%']) }}
          className="mt-32 overflow-hidden"
        >
          <div className="flex gap-8 text-8xl md:text-[12rem] font-heading text-sage/10 whitespace-nowrap">
            <span>STRENGTH</span>
            <span>•</span>
            <span>BALANCE</span>
            <span>•</span>
            <span>FLOW</span>
            <span>•</span>
            <span>STRENGTH</span>
            <span>•</span>
            <span>BALANCE</span>
            <span>•</span>
            <span>FLOW</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
