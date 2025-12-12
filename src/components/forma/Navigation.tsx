'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#classes', label: 'Classes' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#pricing', label: 'Pricing' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-cream shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <span
                className={`font-heading text-2xl lg:text-3xl font-light tracking-tight transition-colors duration-500 ${
                  isScrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                FORMA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm uppercase tracking-[0.1em] font-medium transition-colors duration-300 link-underline ${
                    isScrolled
                      ? 'text-charcoal hover:text-terracotta'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="#book"
                className="btn-primary"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 transition-all duration-300 origin-center ${
                    isMobileMenuOpen
                      ? 'bg-white rotate-45 translate-y-2'
                      : isScrolled
                      ? 'bg-charcoal'
                      : 'bg-white'
                  }`}
                />
                <span
                  className={`w-full h-0.5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? 'opacity-0'
                      : isScrolled
                      ? 'bg-charcoal'
                      : 'bg-white'
                  }`}
                />
                <span
                  className={`w-full h-0.5 transition-all duration-300 origin-center ${
                    isMobileMenuOpen
                      ? 'bg-white -rotate-45 -translate-y-2'
                      : isScrolled
                      ? 'bg-charcoal'
                      : 'bg-white'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-sage"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex flex-col items-center gap-8"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-heading text-4xl text-white hover:text-terracotta-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mt-8"
                >
                  <Link
                    href="#book"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary"
                  >
                    Book Now
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
