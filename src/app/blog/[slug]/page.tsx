import { getPostBySlug, getPosts } from '@/lib/wordpress'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/forma/Navigation'
import Footer from '@/components/forma/Footer'

// Force revalidation
export const revalidate = 60
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const posts = await getPosts(100)
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return { title: 'מאמר לא נמצא | FORMA Pilates' }
  }

  const yoast = post.yoast_head_json
  const fallbackTitle = post.title.rendered.replace(/<[^>]*>/g, '')
  const fallbackDescription = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim().substring(0, 160)

  return {
    title: yoast?.title || `${fallbackTitle} | FORMA Pilates`,
    description: yoast?.description || fallbackDescription,
    openGraph: {
      title: yoast?.og_title || fallbackTitle,
      description: yoast?.og_description || fallbackDescription,
      type: 'article',
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-cream" dir="rtl">
        {/* Hero Section */}
        <section className="relative bg-charcoal text-white py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-charcoal/90" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            {/* Back Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sage hover:text-white transition-colors mb-8"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span>חזרה לדף הבית</span>
            </Link>

            {/* Date */}
            <time className="text-sage text-sm tracking-wider uppercase">
              {new Date(post.date).toLocaleDateString('he-IL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-light mt-4 leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Decorative Line */}
            <div className="w-24 h-1 bg-terracotta mx-auto mt-8" />
          </div>
        </section>

        {/* Content Section */}
        <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          {/* Featured Image */}
          {featuredImage && (
            <div className="relative -mt-32 mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={featuredImage}
                alt={post.title.rendered.replace(/<[^>]*>/g, '')}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="
              prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-charcoal prose-headings:font-light
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-r-4 prose-h2:border-terracotta prose-h2:pr-4
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-charcoal/90
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-terracotta
              prose-p:text-charcoal/80 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-ul:pr-6
              prose-li:text-charcoal/80 prose-li:mb-2 prose-li:marker:text-terracotta
              prose-strong:text-charcoal prose-strong:font-semibold
              prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline
            "
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Author/CTA Box */}
          <div className="mt-16 p-8 bg-white rounded-2xl shadow-sm border border-charcoal/5">
            <div className="text-center">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧘</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-2">רוצים להתחיל להתאמן?</h3>
              <p className="text-charcoal/60 mb-6">
                הצטרפו אלינו לאימון ניסיון חינם וגלו את עולם הפילאטיס
              </p>
              <Link
                href="/#contact"
                className="inline-block bg-terracotta text-white px-8 py-3 rounded-full font-medium hover:bg-terracotta/90 transition-colors"
              >
                לתיאום אימון ניסיון
              </Link>
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-charcoal/10">
            <p className="text-charcoal/60 text-center mb-4">שתפו את המאמר</p>
            <div className="flex justify-center gap-4">
              <button className="w-10 h-10 bg-charcoal/5 rounded-full flex items-center justify-center hover:bg-terracotta hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-charcoal/5 rounded-full flex items-center justify-center hover:bg-terracotta hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-charcoal/5 rounded-full flex items-center justify-center hover:bg-terracotta hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>
        </article>

        {/* More Articles Section */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-heading text-charcoal text-center mb-12">
              מאמרים נוספים
            </h2>
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-terracotta font-medium hover:gap-4 transition-all"
              >
                <span>לכל המאמרים</span>
                <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
