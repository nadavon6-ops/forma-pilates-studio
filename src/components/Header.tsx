'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">Nadav Digital</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              ראשי
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary-600 transition-colors">
              שירותים
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              אודות
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary-600 transition-colors">
              בלוג
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              צור קשר
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              התייעצות חינם
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-primary-600">ראשי</Link>
            <Link href="/services" className="block py-2 text-gray-700 hover:text-primary-600">שירותים</Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-primary-600">אודות</Link>
            <Link href="/blog" className="block py-2 text-gray-700 hover:text-primary-600">בלוג</Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-primary-600">צור קשר</Link>
            <Link
              href="/contact"
              className="block mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg text-center"
            >
              התייעצות חינם
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
