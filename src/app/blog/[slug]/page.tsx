import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getPostBySlug, getPosts } from '@/lib/wordpress'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const revalidate = 60

// Generate static paths for all posts
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

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'פוסט לא נמצא | Nadav Digital',
    }
  }

  // Strip HTML tags for description
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim().substring(0, 160)

  return {
    title: `${post.title.rendered.replace(/<[^>]*>/g, '')} | Nadav Digital`,
    description,
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
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="mb-8">
            <time className="text-gray-500">
              {new Date(post.date).toLocaleDateString('he-IL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-4"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </header>

          {featuredImage && (
            <img
              src={featuredImage}
              alt={post.title.rendered.replace(/<[^>]*>/g, '')}
              className="w-full h-auto rounded-xl mb-8"
            />
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </main>
      <Footer />
    </>
  )
}
