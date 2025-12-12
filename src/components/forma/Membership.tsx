'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const membershipOptions = ['Drop-In', 'Class Packs', 'Monthly Unlimited']

export default function Membership() {
  return (
    <section id="pricing" className="section-padding bg-sage-light">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            Membership
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title mb-6"
          >
            Find Your Flow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-text mb-12"
          >
            Flexible options designed for your schedule, your goals, your life.
          </motion.p>

          {/* Membership Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {membershipOptions.map((option, index) => (
              <motion.div
                key={option}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white text-charcoal px-6 py-3 rounded-full border-2 border-transparent hover:border-terracotta transition-all duration-300 cursor-pointer shadow-soft"
              >
                <span className="font-medium">{option}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="#" className="btn-primary-large">
              View All Options
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
