'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ============================================
// HEXAGON GRID BACKGROUND
// ============================================
function HexagonGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
          <path
            d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-cyan-400"
          />
          <path
            d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-cyan-400"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  )
}

// ============================================
// ANIMATED ICON CONTAINER
// ============================================
function AnimatedIconContainer({
  children,
  color,
  isActive
}: {
  children: React.ReactNode
  color: string
  isActive: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 100
    canvas.width = size
    canvas.height = size

    let animationId: number
    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, size, size)

      if (isActive) {
        rotation += 0.02

        // Draw rotating arcs
        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.strokeStyle = `${color}${Math.floor((0.3 + i * 0.2) * 255).toString(16).padStart(2, '0')}`
          ctx.lineWidth = 2
          ctx.arc(
            size / 2,
            size / 2,
            35 + i * 5,
            rotation + (i * Math.PI * 2) / 3,
            rotation + (i * Math.PI * 2) / 3 + Math.PI / 2
          )
          ctx.stroke()
        }

        // Particles
        for (let i = 0; i < 8; i++) {
          const angle = rotation * 2 + (i * Math.PI * 2) / 8
          const x = size / 2 + Math.cos(angle) * 40
          const y = size / 2 + Math.sin(angle) * 40

          ctx.beginPath()
          ctx.fillStyle = color
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [color, isActive])

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ============================================
// SERVICE CARD WITH 3D EFFECT
// ============================================
function ServiceCard3D({
  service,
  index,
  isActive,
  onClick
}: {
  service: typeof services[0]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotation({ x: y * 20, y: x * 20 })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="cursor-pointer"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className={`relative p-8 rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-500 ${
          isActive ? 'border-cyan-500/50' : 'border-gray-800'
        }`}
        style={{
          transform: `rotateX(${-rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          background: isActive
            ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.05))'
            : 'linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 0.8))',
          boxShadow: isActive
            ? `0 25px 50px -12px ${service.color}30`
            : isHovered
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            : 'none',
        }}
        animate={{
          scale: isActive ? 1.02 : 1,
        }}
      >
        {/* Shine effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: isHovered ? 0.1 : 0,
            background: `linear-gradient(
              ${Math.atan2(rotation.y, rotation.x) * (180 / Math.PI) + 90}deg,
              transparent 40%,
              white 50%,
              transparent 60%
            )`,
          }}
        />

        {/* Animated border gradient */}
        {isActive && (
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <motion.div
              className="absolute inset-[-2px]"
              style={{
                background: `conic-gradient(from 0deg, ${service.color}, #8b5cf6, #06b6d4, ${service.color})`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-[2px] rounded-2xl bg-black/90" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <AnimatedIconContainer color={service.color} isActive={isActive || isHovered}>
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-white transition-all duration-300`}
              style={{
                background: `linear-gradient(135deg, ${service.color}, ${service.color}99)`,
                boxShadow: isActive ? `0 0 30px ${service.color}50` : 'none',
              }}
            >
              {service.icon}
            </div>
          </AnimatedIconContainer>

          {/* Title */}
          <h3
            className="text-xl font-bold mb-2 transition-colors duration-300"
            style={{ color: isActive ? service.color : 'white' }}
          >
            {service.title}
          </h3>
          <p className="text-cyan-400/70 text-sm mb-4" dir="rtl">
            {service.titleHe}
          </p>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {service.features.map((feature, i) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="px-3 py-1 text-xs rounded-full border transition-all duration-300"
                style={{
                  borderColor: isActive ? `${service.color}50` : 'rgba(55, 65, 81, 0.5)',
                  backgroundColor: isActive ? `${service.color}10` : 'rgba(31, 41, 55, 0.5)',
                  color: isActive ? service.color : 'rgb(156, 163, 175)',
                }}
              >
                {feature}
              </motion.span>
            ))}
          </div>

          {/* Learn more arrow */}
          <motion.div
            className="absolute bottom-8 right-8 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
            style={{
              borderColor: isActive ? service.color : 'rgba(55, 65, 81, 0.5)',
              color: isActive ? service.color : 'rgb(107, 114, 128)',
            }}
            animate={{
              x: isHovered || isActive ? 0 : 10,
              opacity: isHovered || isActive ? 1 : 0,
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// DETAIL PANEL
// ============================================
function DetailPanel({ service, isOpen }: { service: typeof services[0] | null; isOpen: boolean }) {
  if (!service) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="col-span-full mt-8 overflow-hidden"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/90 to-black/90"
            style={{
              boxShadow: `0 0 50px ${service.color}20`,
            }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <p className="text-gray-500 mb-6" dir="rtl">{service.descriptionHe}</p>

                <h5 className="text-lg font-semibold text-white mb-3">Key Benefits:</h5>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, i) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <svg className="w-5 h-5" fill={service.color} viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                {/* Animated visualization */}
                <div className="h-64 rounded-xl border border-gray-800 bg-black/50 flex items-center justify-center overflow-hidden">
                  <ServiceVisualization service={service} />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full py-4 rounded-xl font-bold text-white transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}, ${service.color}99)`,
                    boxShadow: `0 10px 30px ${service.color}30`,
                  }}
                >
                  Get Started with {service.title}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================
// SERVICE VISUALIZATION
// ============================================
function ServiceVisualization({ service }: { service: typeof services[0] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 300
    canvas.height = 200

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      connected: number[]
    }> = []

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 2 + Math.random() * 3,
        connected: [],
      })
    }

    let animationId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = p.x - other.x
          const dy = p.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 80) {
            ctx.beginPath()
            ctx.strokeStyle = `${service.color}${Math.floor((1 - dist / 80) * 100).toString(16).padStart(2, '0')}`
            ctx.lineWidth = 1
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })

        // Draw particle
        ctx.beginPath()
        ctx.fillStyle = service.color
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Glow
        ctx.beginPath()
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        glow.addColorStop(0, `${service.color}40`)
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [service])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

// ============================================
// SERVICES DATA
// ============================================
const services = [
  {
    id: 1,
    title: 'Threat Detection & Response',
    titleHe: 'זיהוי ותגובה לאיומים',
    description: 'AI-powered threat detection with real-time response capabilities. Our SOC team monitors your infrastructure 24/7.',
    descriptionHe: 'זיהוי איומים מבוסס AI עם יכולות תגובה בזמן אמת. צוות ה-SOC שלנו מנטר את התשתית שלך 24/7.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: '#06b6d4',
    features: ['Real-time Monitoring', 'Automated Response', 'Incident Reports'],
    benefits: [
      'Reduce incident response time by 80%',
      'AI-powered anomaly detection',
      '24/7 SOC team monitoring',
      'Automated threat neutralization',
    ],
  },
  {
    id: 2,
    title: 'Penetration Testing',
    titleHe: 'בדיקות חדירה',
    description: 'Comprehensive security assessments that identify vulnerabilities before attackers do.',
    descriptionHe: 'הערכות אבטחה מקיפות שמזהות פגיעויות לפני התוקפים.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    ),
    color: '#8b5cf6',
    features: ['Web App Testing', 'Network Security', 'Social Engineering'],
    benefits: [
      'Identify vulnerabilities before hackers',
      'Certified ethical hackers',
      'Detailed remediation reports',
      'Compliance-ready documentation',
    ],
  },
  {
    id: 3,
    title: 'Cloud Security',
    titleHe: 'אבטחת ענן',
    description: 'Secure your cloud infrastructure across AWS, Azure, and GCP. Zero-trust architecture.',
    descriptionHe: 'אבטחת תשתית הענן שלך ב-AWS, Azure ו-GCP. ארכיטקטורת Zero-trust.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: '#3b82f6',
    features: ['Multi-Cloud Support', 'IAM Management', 'Compliance'],
    benefits: [
      'Unified multi-cloud security',
      'Zero-trust implementation',
      'Automated compliance monitoring',
      'Cloud-native protection',
    ],
  },
  {
    id: 4,
    title: 'Security Training',
    titleHe: 'הדרכות אבטחה',
    description: 'Transform employees into the first line of defense with customized training programs.',
    descriptionHe: 'הפכו את העובדים שלכם לקו ההגנה הראשון עם תוכניות הדרכה מותאמות.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: '#10b981',
    features: ['Phishing Simulations', 'Awareness Programs', 'Certifications'],
    benefits: [
      'Reduce human error by 90%',
      'Interactive phishing simulations',
      'Gamified learning platform',
      'Track employee progress',
    ],
  },
  {
    id: 5,
    title: 'Compliance & Audit',
    titleHe: 'תאימות וביקורת',
    description: 'Meet regulatory requirements with confidence. SOC 2, ISO 27001, GDPR compliance.',
    descriptionHe: 'עמדו בדרישות הרגולציה בביטחון. תאימות SOC 2, ISO 27001, GDPR.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: '#f59e0b',
    features: ['Gap Analysis', 'Policy Development', 'Audit Support'],
    benefits: [
      'Streamlined compliance process',
      'Expert audit preparation',
      'Policy template library',
      'Continuous monitoring',
    ],
  },
  {
    id: 6,
    title: 'Incident Response',
    titleHe: 'תגובה לאירועים',
    description: 'Rapid response when breaches occur. Our elite team minimizes damage quickly.',
    descriptionHe: 'תגובה מהירה כאשר מתרחשות פריצות. הצוות העילית שלנו ממזער נזקים במהירות.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    color: '#ef4444',
    features: ['24/7 Response Team', 'Forensic Analysis', 'Recovery Planning'],
    benefits: [
      '15-minute response SLA',
      'Digital forensics expertise',
      'Business continuity planning',
      'Post-incident reporting',
    ],
  },
]

// ============================================
// MAIN SERVICES COMPONENT
// ============================================
export default function CyberServicesUltimate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <HexagonGrid />

        <motion.div
          style={{ y: backgroundY }}
          className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6"
          >
            Our Services | השירותים שלנו
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Comprehensive
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% auto' }}
            >
              {' '}Security{' '}
            </motion.span>
            Solutions
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
            End-to-end cybersecurity services tailored to protect your business from evolving threats
          </p>
          <p className="text-lg text-gray-500" dir="rtl">
            שירותי אבטחת סייבר מקצה לקצה המותאמים להגנה על העסק שלך מפני איומים מתפתחים
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard3D
              key={service.id}
              service={service}
              index={index}
              isActive={activeService === service.id}
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
            />
          ))}

          {/* Detail Panel */}
          <DetailPanel
            service={services.find(s => s.id === activeService) || null}
            isOpen={activeService !== null}
          />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">
            Can't find what you're looking for? Let's discuss your specific needs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold text-lg"
          >
            Schedule a Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
