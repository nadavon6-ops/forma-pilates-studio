import Navigation from '@/components/forma/Navigation'
import Footer from '@/components/forma/Footer'
import Link from 'next/link'
import { getPosts } from '@/lib/wordpress'

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = []

  try {
    posts = await getPosts(10)
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-cream" dir="rtl">
        {/* Hero Section */}
        <section className="relative bg-charcoal text-white py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-charcoal/90" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <span className="text-xs uppercase tracking-[0.15em] text-sage mb-4 block font-medium">
              הבלוג שלנו
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light leading-tight">
              מאמרים על <span className="text-terracotta">פילאטיס</span>
            </h1>
            <p className="mt-6 text-white/70 max-w-2xl mx-auto">
              מידע מקצועי, טיפים וכל מה שצריך לדעת על עולם הפילאטיס
            </p>
            <div className="w-24 h-1 bg-terracotta mx-auto mt-8" />
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📝</span>
                </div>
                <p className="text-charcoal/60 text-lg">אין מאמרים עדיין. בקרוב יתווספו כאן תכנים חדשים!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

                  return (
                    <article
                      key={post.id}
                      className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                    >
                      <div className="relative h-48 bg-sage/20 overflow-hidden">
                        {featuredImage ? (
                          <img
                            src={featuredImage}
                            alt={post.title.rendered.replace(/<[^>]*>/g, '')}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-5xl">🧘</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-6">
                        <time className="text-xs uppercase tracking-wider text-terracotta font-medium">
                          {new Date(post.date).toLocaleDateString('he-IL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <h2 className="text-xl font-heading text-charcoal mt-3 mb-3 group-hover:text-terracotta transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                          </Link>
                        </h2>
                        <div
                          className="text-charcoal/60 line-clamp-3 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 mt-4 text-terracotta font-medium hover:gap-3 transition-all"
                        >
                          <span>קרא עוד</span>
                          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-heading text-charcoal mb-4">
              רוצים להתחיל להתאמן?
            </h2>
            <p className="text-charcoal/60 mb-8">
              הצטרפו אלינו לאימון ניסיון חינם וגלו את עולם הפילאטיס
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-terracotta text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta/90 transition-colors"
            >
              לתיאום אימון ניסיון
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
