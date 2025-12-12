import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/forma/Navigation'
import Footer from '@/components/forma/Footer'
import ServicePageContent from './ServicePageContent'

const WORDPRESS_API = 'https://wordpress-1097675-6067353.cloudwaysapps.com/wp-json/wp/v2'

// Map Hebrew slugs to WordPress page IDs
const slugToPageId: Record<string, number> = {
  'מה-זה-פילאטיס': 7,
  'פילאטיס-אחרי-לידה': 10,
  'שכר-מדריכי-פילאטיס': 12,
}

interface WPPage {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  yoast_head_json?: {
    title?: string
    description?: string
    og_title?: string
    og_description?: string
  }
}

async function getPageById(id: number): Promise<WPPage | null> {
  try {
    const res = await fetch(`${WORDPRESS_API}/pages/${id}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug)
  const pageId = slugToPageId[decodedSlug]

  if (!pageId) {
    return { title: 'Page Not Found' }
  }

  const page = await getPageById(pageId)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  // Use Yoast SEO data if available
  if (page.yoast_head_json) {
    return {
      title: page.yoast_head_json.title || page.title.rendered,
      description: page.yoast_head_json.description || page.excerpt.rendered.replace(/<[^>]*>/g, ''),
      openGraph: {
        title: page.yoast_head_json.og_title || page.title.rendered,
        description: page.yoast_head_json.og_description,
      },
    }
  }

  return {
    title: page.title.rendered,
    description: page.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160),
  }
}

export async function generateStaticParams() {
  return Object.keys(slugToPageId).map((slug) => ({
    slug: encodeURIComponent(slug),
  }))
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug)
  const pageId = slugToPageId[decodedSlug]

  if (!pageId) {
    notFound()
  }

  const page = await getPageById(pageId)

  if (!page) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <ServicePageContent page={page} />
      <Footer />
    </>
  )
}
