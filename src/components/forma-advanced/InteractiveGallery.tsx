'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200',
    title: 'Flow State',
    category: 'Studio',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200',
    title: 'Precision',
    category: 'Practice',
  },
  {
    src: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1200',
    title: 'Connection',
    category: 'Community',
  },
  {
    src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200',
    title: 'Strength',
    category: 'Training',
  },
]

// Image card with cursor follow effect - IMPOSSIBLE in WordPress
function ImageCard({ image, index }: { image: typeof images[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
        {/* Image with zoom effect */}
        <motion.img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content that slides up - IMPOSSIBLE in WordPress */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="text-terracotta text-sm uppercase tracking-wider mb-2"
          >
            {image.category}
          </motion.span>
          <motion.h3
            className="text-white text-3xl font-heading"
            style={{ transform: 'translateZ(30px)' }}
          >
            {image.title}
          </motion.h3>

          {/* Animated line that expands on hover */}
          <motion.div
            className="h-0.5 bg-terracotta mt-4 origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Shine effect on hover - IMPOSSIBLE in WordPress */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          whileHover={{ translateX: '200%' }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  )
}

export default function InteractiveGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">Our Space</span>
          <h2 className="text-4xl md:text-6xl font-heading text-charcoal font-light">
            Step Inside
          </h2>
        </motion.div>

        {/* Interactive Gallery Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          style={{ perspective: '1000px' }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ImageCard image={image} index={index} />
            </div>
          ))}
        </div>

        {/* Animated CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#book"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 text-sage hover:text-terracotta transition-colors group"
          >
            <span className="text-lg font-medium">Experience the studio</span>
            <motion.svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
