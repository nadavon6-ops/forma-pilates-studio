'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const instructors = [
  {
    name: 'Sarah Mitchell',
    role: 'Founder & Lead Instructor',
    bio: '15 years experience. Trained in classical Pilates with modern techniques.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800',
    specialty: 'Reformer & Rehabilitation',
  },
  {
    name: 'James Chen',
    role: 'Senior Instructor',
    bio: 'Former professional dancer. Specializes in athletic conditioning.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800',
    specialty: 'Athletic Pilates',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Instructor',
    bio: 'Yoga and Pilates fusion expert. Creates mind-body connections.',
    image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=800',
    specialty: 'Yoga-Pilates Fusion',
  },
  {
    name: 'Michael Torres',
    role: 'Instructor',
    bio: 'Sports medicine background. Focus on injury prevention.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800',
    specialty: 'Injury Recovery',
  },
]

export default function InstructorsSection() {
  const [activeInstructor, setActiveInstructor] = useState(0)

  return (
    <section className="py-32 bg-charcoal overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-terracotta mb-4 block font-medium">
            Our Team
          </span>
          <h2 className="text-4xl md:text-6xl font-heading text-white font-light">
            Meet Your <span className="text-terracotta">Instructors</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Interactive instructor selector - IMPOSSIBLE in WordPress */}
          <div className="space-y-4">
            {instructors.map((instructor, index) => (
              <motion.div
                key={instructor.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveInstructor(index)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                  activeInstructor === index
                    ? 'bg-sage'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Progress indicator - IMPOSSIBLE in WordPress */}
                  <motion.div
                    className="w-1 h-16 rounded-full overflow-hidden bg-white/20"
                    initial={false}
                  >
                    <motion.div
                      className="w-full bg-terracotta"
                      initial={{ height: 0 }}
                      animate={{ height: activeInstructor === index ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-heading text-white">{instructor.name}</h3>
                    <p className="text-white/60 text-sm">{instructor.role}</p>
                    <span className="inline-block mt-2 text-xs bg-terracotta/20 text-terracotta px-3 py-1 rounded-full">
                      {instructor.specialty}
                    </span>
                  </div>

                  {/* Arrow indicator - IMPOSSIBLE in WordPress */}
                  <motion.svg
                    animate={{ x: activeInstructor === index ? 0 : -10, opacity: activeInstructor === index ? 1 : 0 }}
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Animated instructor card - IMPOSSIBLE in WordPress */}
          <div className="relative h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeInstructor}
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <div className="relative h-full rounded-3xl overflow-hidden">
                  {/* Image with parallax on hover */}
                  <motion.img
                    src={instructors[activeInstructor].image}
                    alt={instructors[activeInstructor].name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

                  {/* Content overlay - IMPOSSIBLE in WordPress */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-8"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '60px' }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="h-1 bg-terracotta mb-4"
                    />
                    <h3 className="text-3xl font-heading text-white mb-2">
                      {instructors[activeInstructor].name}
                    </h3>
                    <p className="text-white/80 mb-4">
                      {instructors[activeInstructor].bio}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-terracotta font-medium flex items-center gap-2"
                    >
                      Book with {instructors[activeInstructor].name.split(' ')[0]}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating decorative elements - IMPOSSIBLE in WordPress */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 border border-terracotta/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-60 h-60 border border-sage/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
