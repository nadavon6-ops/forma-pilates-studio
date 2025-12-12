import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getPosts } from '@/lib/wordpress'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage() {
  let posts = []

  try {
    posts = await getPosts(10)
  } catch (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">הבלוג שלנו</h1>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">אין פוסטים עדיין. בקרוב יתווספו כאן תכנים חדשים!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url

                return (
                  <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    {featuredImage && (
                      <img
                        src={featuredImage}
                        alt={post.title.rendered}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <time className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('he-IL')}
                      </time>
                      <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary-600">
                          <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                        </Link>
                      </h2>
                      <div
                        className="text-gray-600 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-block mt-4 text-primary-600 font-medium hover:text-primary-700"
                      >
                        קרא עוד &larr;
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
