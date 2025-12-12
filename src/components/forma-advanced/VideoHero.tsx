'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax effects - IMPOSSIBLE in WordPress
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <section ref={containerRef} className="relative h-[120vh] overflow-hidden">
      {/* Video Background with parallax scale - IMPOSSIBLE in WordPress */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940"
        >
          {/* Using a Pilates/Yoga video from a public source */}
          <source
            src="https://videos.pexels.com/video-files/4057411/4057411-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Animated overlay gradient - IMPOSSIBLE in WordPress */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(44,44,44,0.7) 100%)',
              'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(44,44,44,0.6) 100%)',
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(44,44,44,0.7) 100%)',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.div>

      {/* Content with parallax - IMPOSSIBLE in WordPress */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4"
      >
        {/* Animated ring - IMPOSSIBLE in WordPress */}
        <motion.div
          className="absolute w-[600px] h-[600px] border border-white/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 30, repeat: Infinity, ease: 'linear' }, scale: { duration: 5, repeat: Infinity } }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] border border-terracotta/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-terracotta text-sm uppercase tracking-[0.3em] mb-6"
        >
          Welcome to FORMA
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-5xl md:text-7xl lg:text-9xl font-heading text-white font-light mb-6"
        >
          Find Your
          <br />
          <motion.span
            animate={{
              color: ['#ffffff', '#C4907A', '#ffffff'],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Flow
          </motion.span>
        </motion.h1>

        {/* Play button - IMPOSSIBLE in WordPress */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 w-20 h-20 rounded-full border-2 border-white/50 flex items-center justify-center group"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.button>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-white/60 text-sm mt-4 uppercase tracking-wider"
        >
          Watch Our Story
        </motion.span>
      </motion.div>

      {/* Scroll indicator - IMPOSSIBLE in WordPress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-20 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
