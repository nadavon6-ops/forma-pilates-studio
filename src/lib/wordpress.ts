const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://wordpress-1097675-6067353.cloudwaysapps.com/wp-json/wp/v2'

// Yoast SEO data structure (requires Yoast SEO plugin)
export interface YoastSEO {
  title?: string
  description?: string
  robots?: {
    index?: string
    follow?: string
  }
  og_title?: string
  og_description?: string
  og_image?: Array<{
    url: string
    width: number
    height: number
  }>
  twitter_card?: string
  canonical?: string
}

export interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  featured_media: number
  yoast_head_json?: YoastSEO
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface WPPage {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_media: number
  yoast_head_json?: YoastSEO
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface WPMedia {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    width: number
    height: number
  }
}

// Fetch all posts
export async function getPosts(perPage: number = 10): Promise<WPPost[]> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/posts?per_page=${perPage}&_embed`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return []
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return null
    const posts = await res.json()
    return posts[0] || null
  } catch (error) {
    console.error('Failed to fetch post:', error)
    return null
  }
}

// Fetch all pages
export async function getPages(): Promise<WPPage[]> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/pages?_embed`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Failed to fetch pages:', error)
    return []
  }
}

// Fetch single page by slug
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/pages?slug=${slug}&_embed`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return null
    const pages = await res.json()
    return pages[0] || null
  } catch (error) {
    console.error('Failed to fetch page:', error)
    return null
  }
}

// Fetch homepage (usually slug is 'home' or page ID)
export async function getHomePage(): Promise<WPPage | null> {
  try {
    // Try to get front page settings first
    const settingsRes = await fetch(
      `${WORDPRESS_API_URL.replace('/wp/v2', '')}/`,
      { next: { revalidate: 60 } }
    )
    if (settingsRes.ok) {
      const settings = await settingsRes.json()
      if (settings.home) {
        // Home is a page ID
        const pageRes = await fetch(
          `${WORDPRESS_API_URL}/pages/${settings.home}?_embed`,
          { next: { revalidate: 60 } }
        )
        if (pageRes.ok) return pageRes.json()
      }
    }
  } catch (e) {
    console.error('Failed to fetch homepage settings:', e)
  }

  // Fallback: try common homepage slugs
  try {
    const homeSlugs = ['home', 'homepage', 'front-page']
    for (const slug of homeSlugs) {
      const page = await getPageBySlug(slug)
      if (page) return page
    }
  } catch (e) {
    console.error('Failed to fetch homepage by slug:', e)
  }

  return null
}

// Fetch media by ID
export async function getMedia(id: number): Promise<WPMedia | null> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/media/${id}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Failed to fetch media:', error)
    return null
  }
}

// Fetch site info
export async function getSiteInfo() {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL.replace('/wp/v2', '')}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error('Failed to fetch site info:', error)
    return null
  }
}

// Fetch menus (requires WP REST API Menus plugin or similar)
export async function getMenus() {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/menus`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}
