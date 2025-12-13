import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug, getPages } from '@/lib/wordpress'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Revalidate every 60 seconds
export const revalidate = 60

// Generate static paths for all WordPress pages
export async function generateStaticParams() {
  try {
    const pages = await getPages()
    return pages.map((page) => ({
      slug: page.slug,
    }))
  } catch {
    return []
  }
}

// Generate metadata from Yoast SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  const yoast = page.yoast_head_json
  const featuredImage = page._embedded?.['wp:featuredmedia']?.[0]?.source_url

  // Fallback values
  const fallbackTitle = page.title.rendered.replace(/<[^>]*>/g, '')
  const fallbackDescription = page.excerpt.rendered.replace(/<[^>]*>/g, '').trim().substring(0, 160)

  return {
    title: yoast?.title || fallbackTitle,
    description: yoast?.description || fallbackDescription,

    ...(yoast?.canonical && { alternates: { canonical: yoast.canonical } }),

    robots: {
      index: yoast?.robots?.index !== 'noindex',
      follow: yoast?.robots?.follow !== 'nofollow',
    },

    openGraph: {
      title: yoast?.og_title || fallbackTitle,
      description: yoast?.og_description || fallbackDescription,
      type: 'website',
      images: yoast?.og_image?.map(img => ({
        url: img.url,
        width: img.width,
        height: img.height,
      })) || (featuredImage ? [{ url: featuredImage }] : []),
    },

    twitter: {
      card: (yoast?.twitter_card as 'summary' | 'summary_large_image') || 'summary_large_image',
      title: yoast?.og_title || fallbackTitle,
      description: yoast?.og_description || fallbackDescription,
      images: yoast?.og_image?.[0]?.url || featuredImage,
    },
  }
}

// Allow any slug to be rendered dynamically
export const dynamicParams = true

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  const featuredImage = page._embedded?.['wp:featuredmedia']?.[0]?.source_url

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="mb-8">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900"
              dangerouslySetInnerHTML={{ __html: page.title.rendered }}
            />
          </header>

          {featuredImage && (
            <img
              src={featuredImage}
              alt={page.title.rendered.replace(/<[^>]*>/g, '')}
              className="w-full h-auto rounded-xl mb-8"
            />
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </article>
      </main>
      <Footer />
    </>
  )
}
