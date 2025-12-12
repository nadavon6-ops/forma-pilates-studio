'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        {/* Using a stunning Pilates image as placeholder - replace with video later */}
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940&auto=format&fit=crop"
          alt="Pilates studio"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/20 to-charcoal/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-24 lg:pb-32">
        <div className="container-custom">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.2em] text-white/80 mb-4 block font-medium"
          >
            Austin&apos;s Premier Pilates Studio
          </motion.span>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hero-title font-heading text-white font-light mb-6 max-w-4xl"
          >
            Strength in Every
            <br />
            Movement
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-xl"
          >
            Transform your body and mind with expert-led reformer Pilates
            in a stunning boutique studio.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="#book" className="btn-primary text-center">
              Book Your First Class
            </Link>
            <Link href="#schedule" className="btn-ghost-light text-center">
              View Schedule
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
          <svg
            width="20"
            height="30"
            viewBox="0 0 20 30"
            fill="none"
            className="text-white/60"
          >
            <rect
              x="1"
              y="1"
              width="18"
              height="28"
              rx="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <motion.circle
              cx="10"
              cy="10"
              r="3"
              fill="currentColor"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Decorative diagonal line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-cream"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
      />
    </section>
  )
}
