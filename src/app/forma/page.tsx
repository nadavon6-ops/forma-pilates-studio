import Navigation from '@/components/forma/Navigation'
import Hero from '@/components/forma/Hero'
import About from '@/components/forma/About'
import Classes from '@/components/forma/Classes'
import Benefits from '@/components/forma/Benefits'
import Testimonials from '@/components/forma/Testimonials'
import Gallery from '@/components/forma/Gallery'
import Membership from '@/components/forma/Membership'
import Location from '@/components/forma/Location'
import FinalCTA from '@/components/forma/FinalCTA'
import Footer from '@/components/forma/Footer'

export default function FormaHomepage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Classes />
        <Benefits />
        <Testimonials />
        <Gallery />
        <Membership />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
