'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-elegant">
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2940&auto=format&fit=crop"
                  alt="FORMA founder"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
              </div>
              {/* Decorative shape behind image */}
              <div className="absolute -z-10 -top-6 -left-6 w-full h-full bg-sage-light rounded-2xl" />

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-elegant"
              >
                <span className="block text-4xl font-heading text-sage font-light">10+</span>
                <span className="text-sm text-charcoal/60">Years of Excellence</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="section-label">Our Story</span>
            <h2 className="section-title mb-6">
              Where Precision
              <br />
              Meets Presence
            </h2>
            <p className="body-text mb-6">
              FORMA was born from a simple belief: Pilates should be challenging
              and accessible, rigorous and restorative. We created a space where
              every body is welcomed and every movement matters.
            </p>
            <p className="body-text mb-8">
              With small classes, expert instruction, and a studio designed for
              focus, we help you build strength that goes beyond the reformer.
              Here, transformation happens one intentional movement at a time.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-charcoal">Expert Certified</span>
                  <p className="text-sm text-charcoal/60">500+ hours training</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-charcoal">Small Classes</span>
                  <p className="text-sm text-charcoal/60">Max 8 per session</p>
                </div>
              </div>
            </div>

            <Link href="#team" className="btn-secondary">
              Meet Our Team
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
