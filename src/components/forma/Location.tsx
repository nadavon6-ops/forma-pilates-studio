'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Location() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elegant aspect-square lg:aspect-auto lg:h-[500px]">
              {/* Placeholder for map - replace with actual Google Maps embed */}
              <div className="w-full h-full bg-sage-light flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                  alt="Austin cityscape"
                  className="w-full h-full object-cover"
                />
                {/* Map overlay with pin */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="bg-terracotta text-white p-4 rounded-full shadow-lg"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="section-label">Visit Us</span>
            <h2 className="section-title mb-8">
              Find Us in
              <br />
              South Austin
            </h2>

            {/* Contact Info */}
            <div className="space-y-6 mb-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-charcoal/50 mb-1">Address</p>
                  <p className="text-charcoal font-medium">
                    1204 South Congress Ave, Suite 200
                    <br />
                    Austin, TX 78704
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-charcoal/50 mb-1">Hours</p>
                  <p className="text-charcoal font-medium">
                    Mon–Fri: 6am–8pm
                    <br />
                    Sat–Sun: 8am–4pm
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-charcoal/50 mb-1">Contact</p>
                  <p className="text-charcoal font-medium">
                    hello@formapilates.com
                    <br />
                    (512) 555-0142
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Get Directions
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
