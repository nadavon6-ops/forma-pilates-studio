'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
}

const icons = ['🧘', '💪', '🏃', '👶', '💼', '❤️', '🌟', '✨']
const colors = ['bg-sage', 'bg-terracotta', 'bg-charcoal', 'bg-sage', 'bg-terracotta']

// Fallback posts in case API fails
const fallbackPosts: WPPost[] = [
  { id: 24, slug: 'pilates-frequency', title: { rendered: 'כמה פעמים בשבוע לעשות פילאטיס?' }, excerpt: { rendered: 'מומלץ 2-3 פעמים בשבוע לתוצאות אופטימליות.' } },
  { id: 23, slug: 'pilates-pregnancy', title: { rendered: 'פילאטיס בהריון - מדריך בטוח' }, excerpt: { rendered: 'תרגילים מותאמים לכל טרימסטר בהריון.' } },
  { id: 22, slug: 'pilates-reformer-vs-mat', title: { rendered: 'פילאטיס על מכשירים vs מזרן' }, excerpt: { rendered: 'השוואה בין שני סוגי הפילאטיס הפופולריים.' } },
  { id: 21, slug: 'pilates-health-benefits', title: { rendered: 'יתרונות הפילאטיס לבריאות' }, excerpt: { rendered: 'פילאטיס משפר גמישות, כוח וזקיפות.' } },
  { id: 20, slug: 'pilates-beginners', title: { rendered: '5 תרגילי פילאטיס למתחילים' }, excerpt: { rendered: 'התחלת המסע שלך בפילאטיס עם תרגילים בסיסיים.' } },
]

export default function ServicesSection() {
  const [posts, setPosts] = useState<WPPost[]>(fallbackPosts)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          'https://wordpress-1097675-6067353.cloudwaysapps.com/wp-json/wp/v2/posts?per_page=5&_embed'
        )
        if (res.ok) {
          const data = await res.json()
          if (data.length > 0) {
            setPosts(data)
          }
        }
      } catch (error) {
        console.error('Failed to fetch posts, using fallback:', error)
      }
    }
    fetchPosts()
  }, [])
  return (
    <section className="py-32 bg-white" dir="rtl">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.15em] text-terracotta mb-4 block font-medium">
            המדריכים שלנו
          </span>
          <h2 className="text-4xl md:text-6xl font-heading text-charcoal font-light">
            מידע <span className="text-terracotta">מקצועי</span> על פילאטיס
          </h2>
          <p className="mt-4 text-charcoal/60 max-w-2xl mx-auto">
            גלו את כל מה שצריך לדעת על פילאטיס - ממדריכים למתחילים ועד מידע מקצועי למדריכים
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-cream rounded-3xl h-64"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, index) => {
              const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 100)
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <motion.div
                      className="group relative bg-cream rounded-3xl p-8 h-full cursor-pointer overflow-hidden"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Background gradient on hover */}
                      <motion.div
                        className={`absolute inset-0 ${colors[index % colors.length]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />

                      {/* Icon */}
                      <motion.div
                        className="text-5xl mb-6"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {icons[index % icons.length]}
                      </motion.div>

                      {/* Content */}
                      <h3
                        className="text-2xl font-heading text-charcoal mb-4 group-hover:text-terracotta transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <p className="text-charcoal/60 mb-6 leading-relaxed">
                        {excerpt}...
                      </p>

                      {/* Arrow indicator */}
                      <motion.div
                        className="flex items-center gap-2 text-terracotta font-medium"
                        initial={{ x: 0 }}
                        whileHover={{ x: -10 }}
                      >
                        <span>קרא עוד</span>
                        <motion.svg
                          className="w-5 h-5 rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          animate={{ x: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </motion.div>

                      {/* Decorative corner */}
                      <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                        <motion.div
                          className={`absolute -top-10 -left-10 w-20 h-20 ${colors[index % colors.length]} rounded-full opacity-20`}
                          whileHover={{ scale: 2 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-charcoal/60 mb-6">
            רוצים ללמוד עוד? צרו איתנו קשר לייעוץ אישי
          </p>
          <motion.button
            className="bg-terracotta text-white px-8 py-4 rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            צור קשר
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
