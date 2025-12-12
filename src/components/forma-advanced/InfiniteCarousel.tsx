'use client'

import { motion } from 'framer-motion'

const carouselImages = [
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600', alt: 'Pilates 1' },
  { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600', alt: 'Pilates 2' },
  { src: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=600', alt: 'Pilates 3' },
  { src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600', alt: 'Pilates 4' },
  { src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600', alt: 'Pilates 5' },
  { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600', alt: 'Pilates 6' },
  { src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600', alt: 'Pilates 7' },
  { src: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=600', alt: 'Pilates 8' },
]

// Infinite scroll carousel - IMPOSSIBLE in WordPress without heavy plugins
export default function InfiniteCarousel() {
  // Double the images for seamless loop
  const doubledImages = [...carouselImages, ...carouselImages]

  return (
    <section className="py-20 bg-sage overflow-hidden">
      <div className="container-custom mb-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.15em] text-white/60 mb-4 block font-medium"
        >
          Our Community
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading text-white font-light"
        >
          Movement in Motion
        </motion.h2>
      </div>

      {/* First row - scrolls left - IMPOSSIBLE in WordPress */}
      <div className="relative mb-4">
        <motion.div
          className="flex gap-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {doubledImages.map((img, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 w-[300px] h-[400px] rounded-2xl overflow-hidden group"
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-terracotta/0 group-hover:bg-terracotta/20 transition-colors duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second row - scrolls right - IMPOSSIBLE in WordPress */}
      <div className="relative">
        <motion.div
          className="flex gap-4"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
        >
          {doubledImages.reverse().map((img, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 w-[300px] h-[400px] rounded-2xl overflow-hidden group"
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 bg-terracotta/0 group-hover:bg-terracotta/20 transition-colors duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated stats overlay - IMPOSSIBLE in WordPress */}
      <div className="container-custom mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Happy Members' },
            { number: '50+', label: 'Classes Weekly' },
            { number: '10+', label: 'Expert Instructors' },
            { number: '5★', label: 'Google Rating' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <motion.span
                className="text-5xl md:text-6xl font-heading text-white font-light block"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, type: 'spring' }}
              >
                {stat.number}
              </motion.span>
              <span className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
