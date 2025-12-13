'use client'

import { useEffect } from 'react'
import CyberNavigation from '@/components/cyber/CyberNavigation'
import CyberHero from '@/components/cyber/CyberHero'
import CyberServices from '@/components/cyber/CyberServices'
import CyberStats from '@/components/cyber/CyberStats'
import CyberWhyUs from '@/components/cyber/CyberWhyUs'
import CyberTech from '@/components/cyber/CyberTech'
import CyberTestimonials from '@/components/cyber/CyberTestimonials'
import CyberCTA from '@/components/cyber/CyberCTA'
import CyberFooter from '@/components/cyber/CyberFooter'

export default function CyberPage() {
  useEffect(() => {
    // Add cyber theme class to body
    document.body.classList.add('cyber-theme')
    return () => {
      document.body.classList.remove('cyber-theme')
    }
  }, [])

  return (
    <div className="cyber-page bg-black min-h-screen overflow-x-hidden">
      <CyberNavigation />
      <main>
        <CyberHero />
        <CyberStats />
        <CyberServices />
        <CyberWhyUs />
        <CyberTech />
        <CyberTestimonials />
        <CyberCTA />
      </main>
      <CyberFooter />
    </div>
  )
}
