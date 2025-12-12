import Link from 'next/link'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

export default function Hero({
  title = 'קידום אתרים מקצועי בגוגל',
  subtitle = 'אנחנו עוזרים לעסקים להגיע לעמוד הראשון בגוגל ולהגדיל את התנועה האורגנית שלהם',
  ctaText = 'בואו נדבר',
  ctaLink = '/contact'
}: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={ctaLink}
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors text-center"
            >
              {ctaText}
            </Link>
            <Link
              href="/services"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors text-center"
            >
              השירותים שלנו
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
    </section>
  )
}
