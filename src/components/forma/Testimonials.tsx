'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    quote: "FORMA changed how I move. I'm stronger, more confident, and finally excited to work out. This isn't just a studio—it's a transformation.",
    name: 'Sarah M.',
    classType: 'Reformer Flow',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: "The instructors actually know your name. They remember your injuries, your goals, your progress. It feels like family.",
    name: 'James T.',
    classType: 'Private Sessions',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: "I was intimidated by Pilates for years. FORMA made me feel welcome from day one. Now I can't imagine my week without it.",
    name: 'Priya K.',
    classType: 'Reformer Foundations',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-label"
            >
              Kind Words
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-title"
            >
              What Our Community Says
            </motion.h2>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            {/* Quote Mark */}
            <div className="quote-mark font-heading">&ldquo;</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="relative z-10"
              >
                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading text-charcoal font-light italic leading-snug mb-8 text-center">
                  {testimonials[currentIndex].quote}
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <cite className="not-italic font-medium text-charcoal block">
                      {testimonials[currentIndex].name}
                    </cite>
                    <span className="text-sm text-terracotta">
                      {testimonials[currentIndex].classType}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border-2 border-sage/30 flex items-center justify-center text-sage hover:bg-sage hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-terracotta w-6' : 'bg-sage/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full border-2 border-sage/30 flex items-center justify-center text-sage hover:bg-sage hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
