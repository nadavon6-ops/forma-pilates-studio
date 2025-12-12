import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          מוכנים להגדיל את התנועה לאתר?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          בואו נדבר על איך אנחנו יכולים לעזור לעסק שלכם לצמוח
        </p>
        <Link
          href="/contact"
          className="inline-block bg-primary-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
        >
          קבלו ייעוץ חינמי
        </Link>
      </div>
    </section>
  )
}
