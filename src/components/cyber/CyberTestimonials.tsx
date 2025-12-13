'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote: "CyberGuard transformed our security posture. Their team detected and neutralized a sophisticated attack that our previous provider missed entirely.",
    quoteHe: "CyberGuard שינתה את מצב האבטחה שלנו. הצוות שלהם זיהה וניטרל התקפה מתוחכמת שהספק הקודם שלנו פספס לחלוטין.",
    author: "David Cohen",
    role: "CTO, FinTech Startup",
    company: "PaySecure Ltd.",
    avatar: "DC",
  },
  {
    id: 2,
    quote: "The 24/7 SOC monitoring gives us peace of mind. We can focus on growing our business knowing our infrastructure is protected.",
    quoteHe: "ניטור ה-SOC 24/7 נותן לנו שקט נפשי. אנחנו יכולים להתמקד בצמיחת העסק בידיעה שהתשתית שלנו מוגנת.",
    author: "Sarah Levi",
    role: "CISO",
    company: "HealthTech Global",
    avatar: "SL",
  },
  {
    id: 3,
    quote: "Their penetration testing revealed vulnerabilities we never knew existed. Professional, thorough, and incredibly knowledgeable team.",
    quoteHe: "בדיקות החדירה שלהם חשפו פגיעויות שלא ידענו שקיימות. צוות מקצועי, יסודי ובעל ידע מדהים.",
    author: "Michael Ben-David",
    role: "VP Engineering",
    company: "CloudScale Systems",
    avatar: "MB",
  },
]

export default function CyberTestimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-32 overflow-hidden bg-black">
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
            Client Stories | סיפורי לקוחות
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-white">
            Trusted by Industry
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Leaders</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative p-10 md:p-16 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl"
            >
              {/* Quote icon */}
              <div className="absolute top-8 left-8 text-6xl text-cyan-500/20 font-serif">"</div>

              {/* Quote */}
              <blockquote className="relative z-10 text-xl md:text-2xl text-white font-light leading-relaxed mb-6">
                {testimonials[current].quote}
              </blockquote>

              {/* Hebrew quote */}
              <p className="text-gray-500 text-lg mb-8" dir="rtl">
                {testimonials[current].quoteHe}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[current].avatar}
                </div>

                <div>
                  <div className="text-white font-semibold">{testimonials[current].author}</div>
                  <div className="text-cyan-400 text-sm">{testimonials[current].role}</div>
                  <div className="text-gray-500 text-sm">{testimonials[current].company}</div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-cyan-400 w-8'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Company logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-16 border-t border-gray-800"
        >
          <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-wider">
            Protecting organizations across industries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['Finance', 'Healthcare', 'Technology', 'Government', 'Retail'].map((industry) => (
              <span
                key={industry}
                className="text-gray-600 text-lg font-medium hover:text-cyan-400 transition-colors cursor-default"
              >
                {industry}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
