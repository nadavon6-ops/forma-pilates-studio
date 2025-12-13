'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Brand color: #0485b2
const BRAND_COLOR = '#0485b2'
const BRAND_COLOR_LIGHT = '#06a5d9'
const BRAND_COLOR_DARK = '#036d94'

// Custom NC Logo SVG
function NCLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
    >
      {/* N letter */}
      <path
        d="M5 75V5h8l25 50V5h8v70h-8L13 25v50H5z"
        fill="currentColor"
      />
      {/* C letter with slash */}
      <path
        d="M55 40c0-19.33 15.67-35 35-35 8.5 0 16.3 3.03 22.37 8.07l-5.66 6.36C101.5 15.15 95.5 13 90 13c-14.91 0-27 12.09-27 27s12.09 27 27 27c5.5 0 11.5-2.15 16.71-6.43l5.66 6.36C106.3 71.97 98.5 75 90 75c-19.33 0-35-15.67-35-35z"
        fill="currentColor"
      />
      {/* Diagonal slash accent */}
      <path
        d="M52 5l8 0-20 70h-8L52 5z"
        fill={BRAND_COLOR}
      />
    </svg>
  )
}

export default function SEONavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ['services', 'process', 'results', 'clients', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#services', label: 'שירותים', id: 'services' },
    { href: '#process', label: 'תהליך העבודה', id: 'process' },
    { href: '#results', label: 'תוצאות', id: 'results' },
    { href: '#clients', label: 'לקוחות', id: 'clients' },
    { href: '#contact', label: 'צור קשר', id: 'contact' },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <NCLogo className={`w-14 h-10 transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  Nadav Cohen
                </span>
                <span style={{ color: BRAND_COLOR }} className="text-xs font-medium -mt-1">
                  Digital
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative text-sm font-medium transition-colors ${
                    isScrolled
                      ? activeSection === link.id ? 'text-[#0485b2]' : 'text-gray-600 hover:text-[#0485b2]'
                      : activeSection === link.id ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 right-0 left-0 h-0.5 rounded-full"
                      style={{ backgroundColor: BRAND_COLOR }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:052-566-0563"
                className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-[#0485b2]' : 'text-gray-300 hover:text-white'}`}
              >
                052-566-0563
              </a>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(4, 133, 178, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-2.5 rounded-full text-white text-sm font-bold overflow-hidden"
                style={{ backgroundColor: BRAND_COLOR }}
              >
                <span className="relative z-10">ייעוץ חינם</span>
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: BRAND_COLOR_DARK }}
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                    backgroundColor: isScrolled ? '#1f2937' : '#fff'
                  }}
                  className="w-6 h-0.5 block origin-center"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    backgroundColor: isScrolled ? '#1f2937' : '#fff'
                  }}
                  className="w-6 h-0.5 block"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                    backgroundColor: isScrolled ? '#1f2937' : '#fff'
                  }}
                  className="w-6 h-0.5 block origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-2xl text-gray-800 hover:text-[#0485b2] transition-colors font-medium"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 px-8 py-4 rounded-full text-white font-bold"
                style={{ backgroundColor: BRAND_COLOR }}
              >
                ייעוץ חינם
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
