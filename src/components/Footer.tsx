import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Nadav Digital</h3>
            <p className="text-gray-400 mb-4">
              סוכנות SEO מקצועית המתמחה בקידום אתרים אורגני בגוגל.
              אנחנו עוזרים לעסקים להגיע ללקוחות חדשים דרך חיפוש אורגני.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  שירותים
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  אודות
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  בלוג
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">צור קשר</h4>
            <ul className="space-y-2 text-gray-400">
              <li>טלפון: 050-1234567</li>
              <li>אימייל: info@nadav-digital.co.il</li>
              <li>ישראל</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nadav Digital. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  )
}
