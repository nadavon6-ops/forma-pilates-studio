const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://wordpress-1097675-6067353.cloudwaysapps.com/wp-json/wp/v2'

export interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  featured_media: number
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
  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?per_page=${perPage}&_embed`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error('Failed to fetch post')
  const posts = await res.json()
  return posts[0] || null
}

// Fetch all pages
export async function getPages(): Promise<WPPage[]> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/pages?_embed`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error('Failed to fetch pages')
  return res.json()
}

// Fetch single page by slug
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/pages?slug=${slug}&_embed`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error('Failed to fetch page')
  const pages = await res.json()
  return pages[0] || null
}

// Fetch homepage (usually slug is 'home' or page ID)
export async function getHomePage(): Promise<WPPage | null> {
  // Try to get front page settings first
  try {
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
    // Fallback to slug-based lookup
  }

  // Fallback: try common homepage slugs
  const homeSlugs = ['home', 'homepage', 'front-page']
  for (const slug of homeSlugs) {
    const page = await getPageBySlug(slug)
    if (page) return page
  }

  return null
}

// Fetch media by ID
export async function getMedia(id: number): Promise<WPMedia | null> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/media/${id}`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) return null
  return res.json()
}

// Fetch site info
export async function getSiteInfo() {
  const res = await fetch(
    `${WORDPRESS_API_URL.replace('/wp/v2', '')}`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) throw new Error('Failed to fetch site info')
  return res.json()
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
