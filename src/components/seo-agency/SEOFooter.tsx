'use client'

import { motion } from 'framer-motion'

// Brand color: #0485b2
const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
  dark: '#036d94',
  glow: 'rgba(4, 133, 178, 0.3)',
}

export default function SEOFooter() {
  return (
    <footer className="relative py-16 bg-black border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.light})` }}
              >
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-2xl font-black text-white">N-C.Digital</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              סוכנות SEO בוטיק המתמחה בקידום אורגני ובניית אתרים.
              אנחנו מביאים את העסק שלך לעמוד הראשון בגוגל.
            </p>
            <div className="flex gap-4">
              {/* Social links */}
              {['linkedin', 'facebook', 'twitter'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 transition-colors"
                  style={{
                    ['--hover-color' as string]: BRAND.primary,
                    ['--hover-bg' as string]: `${BRAND.primary}15`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = BRAND.primary
                    e.currentTarget.style.backgroundColor = `${BRAND.primary}15`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9ca3af'
                    e.currentTarget.style.backgroundColor = '#111827'
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {social === 'linkedin' && (
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    )}
                    {social === 'facebook' && (
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z" />
                    )}
                    {social === 'twitter' && (
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482c-4.09-.193-7.715-2.157-10.141-5.126a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    )}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">שירותים</h4>
            <ul className="space-y-3">
              {['קידום אתרי תדמית', 'קידום חנויות אונליין', 'בניית אתרים', 'ייעוץ SEO'].map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-gray-400 transition-colors"
                    style={{ ['--hover-color' as string]: BRAND.primary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = BRAND.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">יצירת קשר</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:052-566-0563"
                  className="text-gray-400 flex items-center gap-2 transition-colors"
                  style={{ ['--hover-color' as string]: BRAND.primary }}
                  onMouseEnter={(e) => e.currentTarget.style.color = BRAND.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  052-566-0563
                </a>
              </li>
              <li className="text-gray-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                מתחם נגה, תל אביב
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} N-C.Digital. כל הזכויות שמורות.
          </div>
          <div className="flex gap-6 text-gray-500 text-sm">
            <a
              href="#"
              className="transition-colors"
              style={{ ['--hover-color' as string]: BRAND.primary }}
              onMouseEnter={(e) => e.currentTarget.style.color = BRAND.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              תנאי שימוש
            </a>
            <a
              href="#"
              className="transition-colors"
              style={{ ['--hover-color' as string]: BRAND.primary }}
              onMouseEnter={(e) => e.currentTarget.style.color = BRAND.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              מדיניות פרטיות
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
