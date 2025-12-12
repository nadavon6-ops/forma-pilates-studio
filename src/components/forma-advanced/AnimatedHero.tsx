'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import Link from 'next/link'

// Floating particles component - IMPOSSIBLE in WordPress
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            x: [null, Math.random() * 400 - 200],
            y: [null, Math.random() * 400 - 200],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

// Animated gradient background - IMPOSSIBLE in WordPress
function AnimatedGradient() {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          'radial-gradient(circle at 20% 50%, #4A5D52 0%, #2C2C2C 50%, #1a1a1a 100%)',
          'radial-gradient(circle at 80% 50%, #4A5D52 0%, #2C2C2C 50%, #1a1a1a 100%)',
          'radial-gradient(circle at 50% 80%, #4A5D52 0%, #2C2C2C 50%, #1a1a1a 100%)',
          'radial-gradient(circle at 20% 50%, #4A5D52 0%, #2C2C2C 50%, #1a1a1a 100%)',
        ],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Magnetic button - IMPOSSIBLE in WordPress
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center justify-center bg-terracotta text-white px-10 py-5 rounded-full font-medium text-lg transition-colors hover:bg-terracotta-dark cursor-pointer"
    >
      {children}
    </motion.a>
  )
}

// Text reveal animation - IMPOSSIBLE in WordPress
function AnimatedText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')

  return (
    <motion.h1 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block mr-[0.25em]"
          style={{ transformOrigin: 'bottom' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  )
}

// Scroll progress indicator - IMPOSSIBLE in WordPress
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-terracotta z-50 origin-left"
      style={{ scaleX }}
    />
  )
}

export default function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax effects - IMPOSSIBLE in WordPress
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <>
      <ScrollProgress />
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Animated gradient background */}
        <AnimatedGradient />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Content with parallax */}
        <motion.div
          style={{ y, opacity, scale }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 px-4 py-2 rounded-full text-sm">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-terracotta rounded-full"
              />
              Austin&apos;s Premier Pilates Experience
            </span>
          </motion.div>

          {/* Main headline with word-by-word reveal */}
          <AnimatedText
            text="Transform Your Body"
            className="text-5xl md:text-7xl lg:text-8xl font-heading text-white font-light mb-2"
          />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading text-terracotta font-light mb-8"
          >
            Move Different
          </motion.h2>

          {/* Subtitle with typing effect feel */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-xl text-white/70 max-w-xl mb-10"
          >
            Experience reformer Pilates like never before. Where precision meets artistry.
          </motion.p>

          {/* Magnetic CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton href="#book">
              Start Your Journey
            </MagneticButton>
            <motion.a
              href="#explore"
              whileHover={{ scale: 1.05, borderColor: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center border-2 border-white/30 text-white px-10 py-5 rounded-full font-medium text-lg transition-colors hover:bg-white/10"
            >
              Explore Studio
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/50 text-xs uppercase tracking-widest">Scroll to explore</span>
            <motion.div
              animate={{ height: ['20px', '40px', '20px'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[1px] bg-gradient-to-b from-white/50 to-transparent"
            />
          </motion.div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>
    </>
  )
}
