'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const BRAND = {
  primary: '#0485b2',
  light: '#06a5d9',
}

interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  date: string
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
    }>
  }
}

export default function SEOBlog() {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          'https://wordpress-1097675-6067353.cloudwaysapps.com/wp-json/wp/v2/posts?per_page=6&_embed',
          { next: { revalidate: 60 } }
        )
        if (res.ok) {
          const data = await res.json()
          setPosts(data)
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-[#0a0a0f]" dir="rtl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">הבלוג שלנו</h2>
            <p className="text-gray-400">טוען מאמרים...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 rounded-2xl h-64"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section className="py-24 bg-[#0a0a0f]" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">הבלוג שלנו</h2>
          <p className="text-gray-400 mb-8">מאמרים חדשים יתווספו בקרוב...</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <span className="text-gray-400 text-sm">ממתין לסנכרון עם WordPress</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-[#0a0a0f]" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(4, 133, 178, 0.1)', border: '1px solid rgba(4, 133, 178, 0.2)' }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-gray-400 text-sm">מסונכרן עם WordPress</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            הבלוג שלנו
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            מאמרים מקצועיים בנושאי שיווק דיגיטלי, קידום אתרים ואסטרטגיות צמיחה
          </p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
            const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 120)

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div
                    className="relative rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02]"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Image or Placeholder */}
                    <div className="h-48 overflow-hidden">
                      {featuredImage ? (
                        <img
                          src={featuredImage}
                          alt={post.title.rendered}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${BRAND.primary}20, ${BRAND.light}10)` }}
                        >
                          <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <time className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('he-IL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>

                      <h3
                        className="text-xl font-bold text-white mt-2 mb-3 line-clamp-2 group-hover:text-[#0485b2] transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />

                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {excerpt}...
                      </p>

                      <div
                        className="flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: BRAND.primary }}
                      >
                        <span>קרא עוד</span>
                        <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${BRAND.primary}10, transparent 70%)`,
                      }}
                    />
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            }}
          >
            <span>לכל המאמרים</span>
            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Sync Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-gray-500 text-xs">WordPress Sync Active</span>
            </div>
            <span className="text-gray-600">•</span>
            <span className="text-gray-500 text-xs">{posts.length} מאמרים</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-500 text-xs">עדכון כל 60 שניות</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
