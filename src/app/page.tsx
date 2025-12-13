import { Metadata } from 'next'
import { getPageBySlug } from '@/lib/wordpress'

// Force fresh content on every request
export const dynamic = 'force-dynamic'
export const revalidate = 0
import VideoHero from '@/components/forma-advanced/VideoHero'
import ImageRevealSection from '@/components/forma-advanced/ImageRevealSection'
import InfiniteCarousel from '@/components/forma-advanced/InfiniteCarousel'
import ClassesShowcase from '@/components/forma-advanced/ClassesShowcase'
import BeforeAfterSlider from '@/components/forma-advanced/BeforeAfterSlider'
import InstructorsSection from '@/components/forma-advanced/InstructorsSection'
import ParallaxSection from '@/components/forma-advanced/ParallaxSection'
import InteractiveGallery from '@/components/forma-advanced/InteractiveGallery'
import SmoothCTA from '@/components/forma-advanced/SmoothCTA'
import ServicesSection from '@/components/forma-advanced/ServicesSection'
import Footer from '@/components/forma/Footer'
import Navigation from '@/components/forma/Navigation'

// Generate SEO metadata from WordPress
export async function generateMetadata(): Promise<Metadata> {
  // Fetch page data from WordPress for SEO
  const page = await getPageBySlug('forma-home')

  // If WordPress has Yoast SEO data, use it
  if (page?.yoast_head_json) {
    const yoast = page.yoast_head_json
    return {
      title: yoast.title || 'FORMA Pilates Studio | Austin, TX',
      description: yoast.description || 'Premium boutique Pilates studio in Austin. Reformer classes, private sessions, and mindful movement.',
      openGraph: {
        title: yoast.og_title || yoast.title,
        description: yoast.og_description || yoast.description,
        images: yoast.og_image?.map(img => ({
          url: img.url,
          width: img.width,
          height: img.height,
        })),
      },
      twitter: {
        card: 'summary_large_image',
      },
      robots: {
        index: yoast.robots?.index !== 'noindex',
        follow: yoast.robots?.follow !== 'nofollow',
      },
    }
  }

  // Fallback: Use WordPress page title/excerpt
  if (page) {
    return {
      title: page.title.rendered + ' | Austin, TX',
      description: page.excerpt.rendered.replace(/<[^>]*>/g, ''),
    }
  }

  // Default fallback
  return {
    title: 'FORMA Pilates Studio | Austin, TX',
    description: 'Premium boutique Pilates studio in Austin. Reformer classes, private sessions, and mindful movement.',
  }
}

export default async function HomePage() {
  // Fetch content from WordPress (for future dynamic content)
  const page = await getPageBySlug('forma-home')

  return (
    <>
      <Navigation />
      <main>
        {/*
          HEADLESS WORDPRESS + REACT ARCHITECTURE
          =========================================
          - SEO: Pulled from WordPress (Yoast compatible)
          - Content: Can be managed in WordPress admin
          - Design: Beautiful React animations

          WordPress URL: https://wordpress-1097675-6067353.cloudwaysapps.com/wp-admin
          Edit page: forma-home
        */}

        {/* Section 1: Full-screen video hero with parallax */}
        <VideoHero />

        {/* Section 2: Image reveal on scroll */}
        <ImageRevealSection />

        {/* Section 3: Infinite scrolling carousel */}
        <InfiniteCarousel />

        {/* Section 4: Services/Articles from WordPress - SEO rich content */}
        <ServicesSection />

        {/* Section 5: Interactive classes with video preview */}
        <ClassesShowcase />

        {/* Section 5: Before/after comparison slider */}
        <BeforeAfterSlider />

        {/* Section 6: Interactive instructor cards */}
        <InstructorsSection />

        {/* Section 7: 3D tilt cards with parallax */}
        <ParallaxSection />

        {/* Section 8: 3D gallery with shine effects */}
        <InteractiveGallery />

        {/* Section 9: Animated CTA with morphing blob */}
        <SmoothCTA />
      </main>
      <Footer />
    </>
  )
}
