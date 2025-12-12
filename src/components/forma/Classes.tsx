'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const classes = [
  {
    name: 'Reformer Foundations',
    level: 'Beginner',
    description: 'Master the fundamentals. Build awareness. Begin your journey.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2940&auto=format&fit=crop',
  },
  {
    name: 'Reformer Flow',
    level: 'Intermediate',
    description: 'Fluid sequences that challenge and restore. Find your rhythm.',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2940&auto=format&fit=crop',
  },
  {
    name: 'Athletic Reformer',
    level: 'Advanced',
    description: 'High-intensity conditioning for athletes and fitness enthusiasts.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2940&auto=format&fit=crop',
  },
  {
    name: 'Private Sessions',
    level: 'All Levels',
    description: 'One-on-one attention. Personalized programming. Accelerated results.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2940&auto=format&fit=crop',
  },
]

export default function Classes() {
  return (
    <section id="classes" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title"
          >
            Find Your Practice
          </motion.h2>
        </div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {classes.map((cls, index) => (
            <motion.div
              key={cls.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-portrait overflow-hidden">
                  <img
                    src={cls.image}
                    alt={cls.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  {/* Level Badge */}
                  <span className="absolute top-4 left-4 text-xs uppercase tracking-wider text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    {cls.level}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading text-card-title text-charcoal mb-2">
                    {cls.name}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-4 flex-1">
                    {cls.description}
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-medium text-sage hover:text-terracotta transition-colors group/link"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="#schedule" className="btn-secondary">
            View Full Schedule
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
