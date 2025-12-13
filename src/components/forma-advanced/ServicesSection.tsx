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

const icons = ['🧘', '💪', '🏃', '👶', '💼']
const colors = ['bg-sage', 'bg-terracotta', 'bg-charcoal', 'bg-sage', 'bg-terracotta']

// Fallback posts
const fallbackPosts: WPPost[] = [
  { id: 24, slug: 'pilates-frequency', title: { rendered: 'כמה פעמים בשבוע לעשות פילאטיס?' }, excerpt: { rendered: 'המדריך המלא לתדירות אימונים - המלצות למתחילים, מתקדמים ולפי יעדים אישיים.' } },
  { id: 23, slug: 'pilates-pregnancy', title: { rendered: 'פילאטיס בהריון - המדריך הבטוח' }, excerpt: { rendered: 'כל מה שצריך לדעת על אימוני פילאטיס בהריון - תרגילים מותאמים לכל טרימסטר.' } },
  { id: 22, slug: 'pilates-reformer-vs-mat', title: { rendered: 'פילאטיס מכשירים או מזרן?' }, excerpt: { rendered: 'השוואה מקיפה בין שני סוגי הפילאטיס - יתרונות, חסרונות ומה מתאים לכם.' } },
  { id: 21, slug: 'pilates-health-benefits', title: { rendered: 'יתרונות הפילאטיס לבריאות' }, excerpt: { rendered: 'מה המדע אומר? יתרונות מוכחים לגמישות, כוח, יציבה והקלה על כאבי גב.' } },
  { id: 20, slug: 'pilates-beginners', title: { rendered: '5 תרגילי פילאטיס למתחילים' }, excerpt: { rendered: 'המדריך המלא למתחילים - 5 תרגילים בסיסיים עם הסברים מפורטים וטיפים.' } },
]

export default function ServicesSection() {
  const [posts, setPosts] = useState<WPPost[]>(fallbackPosts)

  useEffect(() => {
    fetch('https://wordpress-1097675-6067353.cloudwaysapps.com/wp-json/wp/v2/posts?per_page=5')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data)
        }
      })
      .catch(() => {})
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

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(0, 5).map((post, index) => {
            const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 100)
            return (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className={`group relative bg-cream rounded-3xl p-8 h-full cursor-pointer overflow-hidden hover:-translate-y-2 transition-transform duration-300`}>
                  {/* Icon */}
                  <div className="text-5xl mb-6">
                    {icons[index % icons.length]}
                  </div>

                  {/* Content */}
                  <h3
                    className="text-2xl font-heading text-charcoal mb-4 group-hover:text-terracotta transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p className="text-charcoal/60 mb-6 leading-relaxed">
                    {excerpt}...
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-terracotta font-medium">
                    <span>קרא עוד</span>
                    <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                    <div className={`absolute -top-10 -left-10 w-20 h-20 ${colors[index % colors.length]} rounded-full opacity-20`} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-charcoal/60 mb-6">
            רוצים ללמוד עוד? צרו איתנו קשר לייעוץ אישי
          </p>
          <button className="bg-terracotta text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform">
            צור קשר
          </button>
        </div>
      </div>
    </section>
  )
}
