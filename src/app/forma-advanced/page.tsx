import AnimatedHero from '@/components/forma-advanced/AnimatedHero'
import ParallaxSection from '@/components/forma-advanced/ParallaxSection'
import InteractiveGallery from '@/components/forma-advanced/InteractiveGallery'
import SmoothCTA from '@/components/forma-advanced/SmoothCTA'
import Footer from '@/components/forma/Footer'
import Navigation from '@/components/forma/Navigation'

export const metadata = {
  title: 'FORMA Pilates | Advanced React Showcase',
  description: 'Experience the power of React - animations and interactions impossible in WordPress alone.',
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

          1. ANIMATED HERO:
             - Floating particles with random movement
             - Animated gradient background (color shifting)
             - Magnetic buttons (follow cursor)
             - Word-by-word text reveal animation
             - Parallax scrolling (content moves at different speeds)
             - Scroll progress indicator

          2. PARALLAX SECTION:
             - 3D tilt cards (respond to mouse position)
             - Elements move at different scroll speeds
             - Horizontal scrolling text on vertical scroll
             - Staggered reveal animations

          3. INTERACTIVE GALLERY:
             - 3D perspective transforms on hover
             - Shine/glare effects that follow cursor
             - Smooth image zoom on hover
             - Content slides up with spring physics

          4. SMOOTH CTA:
             - Morphing blob background
             - Animated grid pattern
             - Glowing text effects
             - Magnetic button with cursor follow
             - Ripple/shine effects on hover

          WordPress can do NONE of these without heavy plugins
          that slow down the site and often don't work well.
          =====================================================
        */}

        <AnimatedHero />
        <ParallaxSection />
        <InteractiveGallery />
        <SmoothCTA />
      </main>
      <Footer />
    </>
  )
}
