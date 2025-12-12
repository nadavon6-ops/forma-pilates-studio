'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface ServicePageContentProps {
  page: {
    id: number
    title: { rendered: string }
    content: { rendered: string }
  }
}

export default function ServicePageContent({ page }: ServicePageContentProps) {
  return (
    <main className="min-h-screen bg-cream" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-32 bg-charcoal overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-sage/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              דף הבית
            </Link>
            <span className="text-white/40 mx-3">/</span>
            <span className="text-terracotta">מאמרים</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading text-white font-light max-w-4xl"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-terracotta mt-8"
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-8"
            >
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-heading prose-headings:text-charcoal prose-headings:font-light
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-terracotta
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-charcoal/80 prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:my-6 prose-ul:pr-6
                  prose-li:text-charcoal/80 prose-li:mb-3 prose-li:marker:text-terracotta
                  prose-ol:my-6 prose-ol:pr-6
                  prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-charcoal prose-strong:font-semibold
                  prose-blockquote:border-r-4 prose-blockquote:border-terracotta prose-blockquote:pr-6 prose-blockquote:italic prose-blockquote:text-charcoal/70
                "
                dangerouslySetInnerHTML={{ __html: page.content.rendered }}
              />
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-4"
            >
              {/* CTA Card */}
              <div className="sticky top-8">
                <div className="bg-sage rounded-3xl p-8 text-white mb-8">
                  <h3 className="text-2xl font-heading mb-4">מעוניינים להתחיל?</h3>
                  <p className="text-white/80 mb-6">
                    הצטרפו לקהילת הפילאטיס שלנו והתחילו את המסע לגוף בריא יותר
                  </p>
                  <motion.button
                    className="w-full bg-white text-sage py-4 rounded-full font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    צור קשר
                  </motion.button>
                </div>

                {/* Related Articles */}
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h3 className="text-xl font-heading text-charcoal mb-6">מאמרים נוספים</h3>
                  <div className="space-y-4">
                    <Link href="/services/מה-זה-פילאטיס" className="block group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-2xl group-hover:bg-sage/10 transition-colors">
                          🧘
                        </div>
                        <span className="text-charcoal/80 group-hover:text-terracotta transition-colors">
                          מה זה פילאטיס?
                        </span>
                      </div>
                    </Link>
                    <Link href="/services/פילאטיס-אחרי-לידה" className="block group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-2xl group-hover:bg-sage/10 transition-colors">
                          👶
                        </div>
                        <span className="text-charcoal/80 group-hover:text-terracotta transition-colors">
                          פילאטיס אחרי לידה
                        </span>
                      </div>
                    </Link>
                    <Link href="/services/שכר-מדריכי-פילאטיס" className="block group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-2xl group-hover:bg-sage/10 transition-colors">
                          💼
                        </div>
                        <span className="text-charcoal/80 group-hover:text-terracotta transition-colors">
                          שכר מדריכי פילאטיס
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-charcoal">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading text-white font-light mb-6">
              מוכנים להתחיל את <span className="text-terracotta">המסע</span>?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              הצטרפו אלינו לשיעור ניסיון וגלו את היתרונות של פילאטיס על הגוף והנפש
            </p>
            <motion.button
              className="bg-terracotta text-white px-10 py-4 rounded-full font-medium text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              קבעו שיעור ניסיון
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
