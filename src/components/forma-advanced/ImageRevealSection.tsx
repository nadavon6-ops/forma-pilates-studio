'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const pilatesImages = [
  {
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200',
    title: 'Reformer Mastery',
    subtitle: 'Precision in every movement',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200',
    title: 'Core Strength',
    subtitle: 'Building from the center',
  },
  {
    src: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1200',
    title: 'Guided Practice',
    subtitle: 'Expert hands-on instruction',
  },
]

// Reveal on scroll component - IMPOSSIBLE in WordPress
function RevealImage({ image, index }: { image: typeof pilatesImages[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-3xl"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      {/* Image with clip-path reveal - IMPOSSIBLE in WordPress */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
        transition={{ duration: 1.2, delay: index * 0.2, ease: [0.77, 0, 0.175, 1] }}
        className="relative aspect-[4/5] overflow-hidden"
      >
        <motion.img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.3 }}
          animate={isInView ? { scale: 1 } : { scale: 1.3 }}
          transition={{ duration: 1.5, delay: index * 0.2 }}
        />

        {/* Overlay that sweeps away - IMPOSSIBLE in WordPress */}
        <motion.div
          className="absolute inset-0 bg-sage"
          initial={{ x: 0 }}
          animate={isInView ? { x: '100%' } : { x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3, ease: [0.77, 0, 0.175, 1] }}
        />
      </motion.div>

      {/* Text reveal - IMPOSSIBLE in WordPress */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal/80 to-transparent">
        <motion.h3
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
          className="text-2xl font-heading text-white"
        >
          {image.title}
        </motion.h3>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
          className="text-white/70 text-sm mt-1"
        >
          {image.subtitle}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function ImageRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])

  return (
    <section ref={containerRef} className="py-32 bg-cream overflow-hidden">
      <div className="container-custom">
        {/* Header with parallax text - IMPOSSIBLE in WordPress */}
        <motion.div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            The Practice
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading text-charcoal font-light"
          >
            Every Movement
            <br />
            <span className="text-terracotta">Tells a Story</span>
          </motion.h2>
        </motion.div>

        {/* Images with reveal effect */}
        <div className="grid md:grid-cols-3 gap-8">
          {pilatesImages.map((image, index) => (
            <RevealImage key={index} image={image} index={index} />
          ))}
        </div>

        {/* Large parallax text - IMPOSSIBLE in WordPress */}
        <motion.div
          style={{ x }}
          className="mt-20 -mx-20 overflow-hidden"
        >
          <div className="text-[15vw] font-heading text-sage/5 whitespace-nowrap">
            BREATHE • MOVE • TRANSFORM • BREATHE • MOVE • TRANSFORM
          </div>
        </motion.div>
      </div>
    </section>
  )
}
