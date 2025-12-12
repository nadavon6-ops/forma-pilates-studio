'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const classes = [
  {
    id: 1,
    name: 'Reformer Foundations',
    level: 'Beginner',
    duration: '55 min',
    description: 'Master the fundamentals of Pilates on the reformer. Perfect for beginners.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200',
    video: 'https://videos.pexels.com/video-files/4057411/4057411-sd_640_360_25fps.mp4',
    color: '#4A5D52',
  },
  {
    id: 2,
    name: 'Power Flow',
    level: 'Intermediate',
    duration: '50 min',
    description: 'Dynamic sequences that build strength and endurance. Challenge yourself.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200',
    video: 'https://videos.pexels.com/video-files/4057411/4057411-sd_640_360_25fps.mp4',
    color: '#C4907A',
  },
  {
    id: 3,
    name: 'Athletic Reformer',
    level: 'Advanced',
    duration: '60 min',
    description: 'High-intensity training for athletes. Push your limits.',
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1200',
    video: 'https://videos.pexels.com/video-files/4057411/4057411-sd_640_360_25fps.mp4',
    color: '#2C2C2C',
  },
  {
    id: 4,
    name: 'Restore & Stretch',
    level: 'All Levels',
    duration: '45 min',
    description: 'Gentle movements focused on flexibility and recovery.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200',
    video: 'https://videos.pexels.com/video-files/4057411/4057411-sd_640_360_25fps.mp4',
    color: '#E8EDEA',
  },
]

// Interactive class card with video preview - IMPOSSIBLE in WordPress
function ClassCard({ classItem, isActive, onClick }: { classItem: typeof classes[0]; isActive: boolean; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    videoRef.current?.play()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    videoRef.current?.pause()
  }

  return (
    <motion.div
      layout
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer overflow-hidden rounded-3xl ${isActive ? 'col-span-2 row-span-2' : ''}`}
      initial={false}
      animate={{
        flex: isActive ? 2 : 1,
      }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
    >
      <motion.div
        className="relative w-full h-full min-h-[300px]"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Background image */}
        <img
          src={classItem.image}
          alt={classItem.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video preview on hover - IMPOSSIBLE in WordPress */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <video
            ref={videoRef}
            src={classItem.video}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${classItem.color}ee, ${classItem.color}00)` }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.span
            className="text-white/70 text-xs uppercase tracking-wider mb-2"
            layout
          >
            {classItem.level} • {classItem.duration}
          </motion.span>
          <motion.h3
            className="text-white text-2xl md:text-3xl font-heading mb-2"
            layout
          >
            {classItem.name}
          </motion.h3>

          {/* Description that expands - IMPOSSIBLE in WordPress */}
          <AnimatePresence>
            {isActive && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-white/80 text-sm md:text-base"
              >
                {classItem.description}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Animated button - IMPOSSIBLE in WordPress */}
          <motion.button
            className="mt-4 self-start bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium overflow-hidden relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-terracotta"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">View Schedule</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ClassesShowcase() {
  const [activeClass, setActiveClass] = useState<number | null>(1)

  return (
    <section className="py-32 bg-cream">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">Our Classes</span>
          <h2 className="text-4xl md:text-6xl font-heading text-charcoal font-light">
            Find Your
            <span className="text-terracotta"> Perfect</span> Class
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-xl mx-auto">
            Hover over each class to see a preview. Click to expand.
          </p>
        </motion.div>

        {/* Interactive grid - IMPOSSIBLE in WordPress */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[300px]"
          layout
        >
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              isActive={activeClass === classItem.id}
              onClick={() => setActiveClass(activeClass === classItem.id ? null : classItem.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
