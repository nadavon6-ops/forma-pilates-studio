import VideoHero from '@/components/forma-advanced/VideoHero'
import ImageRevealSection from '@/components/forma-advanced/ImageRevealSection'
import InfiniteCarousel from '@/components/forma-advanced/InfiniteCarousel'
import ClassesShowcase from '@/components/forma-advanced/ClassesShowcase'
import BeforeAfterSlider from '@/components/forma-advanced/BeforeAfterSlider'
import InstructorsSection from '@/components/forma-advanced/InstructorsSection'
import ParallaxSection from '@/components/forma-advanced/ParallaxSection'
import InteractiveGallery from '@/components/forma-advanced/InteractiveGallery'
import SmoothCTA from '@/components/forma-advanced/SmoothCTA'
import Footer from '@/components/forma/Footer'
import Navigation from '@/components/forma/Navigation'

export const metadata = {
  title: 'FORMA Pilates | Advanced React Showcase',
  description: 'Experience the power of React - animations and interactions impossible in WordPress alone.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function FormaAdvancedPage() {
  return (
    <>
      <Navigation />
      <main>
        {/*
          =====================================================
          REACT-ONLY FEATURES SHOWCASE
          These features are IMPOSSIBLE in WordPress alone:
          =====================================================

          1. VIDEO HERO:
             - Full-screen video background with autoplay
             - Parallax scaling on scroll
             - Animated rotating rings
             - Gradient text color animation

          2. IMAGE REVEAL SECTION:
             - Clip-path reveal animations on scroll
             - Overlay sweep effects
             - Horizontal parallax text
             - Staggered image loading

          3. INFINITE CAROUSEL:
             - Two-row infinite scrolling (opposite directions)
             - CSS-based seamless loop
             - Hover scale effects
             - No JavaScript intervals

          4. CLASSES SHOWCASE:
             - Video preview on hover (auto-play/pause)
             - Expandable/collapsible cards with layout animation
             - Dynamic grid resizing
             - Smooth content reveals

          5. BEFORE/AFTER SLIDER:
             - Drag-to-compare with clip-path
             - Touch and mouse support
             - Animated handle
             - Real-time position updates

          6. INSTRUCTORS SECTION:
             - Interactive selector with state management
             - 3D card rotation on switch
             - Progress bar animations
             - AnimatePresence for smooth transitions

          7. PARALLAX SECTION:
             - 3D tilt cards (respond to mouse position)
             - Elements move at different scroll speeds
             - Horizontal scrolling text on vertical scroll

          8. INTERACTIVE GALLERY:
             - 3D perspective transforms on hover
             - Shine/glare effects that follow cursor
             - Content slides up with spring physics

          9. SMOOTH CTA:
             - Morphing blob background
             - Animated grid pattern
             - Glowing text effects
             - Magnetic button with cursor follow

          WordPress can do NONE of these without heavy plugins
          that slow down the site and often don't work well.
          =====================================================
        */}

        {/* Section 1: Full-screen video hero with parallax */}
        <VideoHero />

        {/* Section 2: Image reveal on scroll */}
        <ImageRevealSection />

        {/* Section 3: Infinite scrolling carousel */}
        <InfiniteCarousel />

        {/* Section 4: Interactive classes with video preview */}
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
