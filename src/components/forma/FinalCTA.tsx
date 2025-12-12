'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section id="book" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940&auto=format&fit=crop"
          alt="FORMA Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-7xl font-heading text-white font-light mb-6"
        >
          Begin Your
          <br />
          Transformation
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto"
        >
          Your first class is on us. Experience the FORMA difference.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="#"
            className="inline-flex items-center justify-center bg-terracotta text-white px-12 py-5 rounded-full font-medium text-lg transition-all duration-300 ease-out hover:bg-terracotta-dark hover:shadow-button hover:-translate-y-1"
          >
            Book Your Free Class
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
