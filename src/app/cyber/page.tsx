'use client'

import { useEffect } from 'react'
import CyberNavigation from '@/components/cyber/CyberNavigation'
import CyberHeroUltimate from '@/components/cyber/CyberHeroUltimate'
import CyberStatsUltimate from '@/components/cyber/CyberStatsUltimate'
import CyberServicesUltimate from '@/components/cyber/CyberServicesUltimate'
import CyberWhyUs from '@/components/cyber/CyberWhyUs'
import CyberTech from '@/components/cyber/CyberTech'
import CyberTestimonials from '@/components/cyber/CyberTestimonials'
import CyberCTA from '@/components/cyber/CyberCTA'
import CyberFooter from '@/components/cyber/CyberFooter'

export default function CyberPage() {
  useEffect(() => {
    // Add cyber theme class to body
    document.body.classList.add('cyber-theme')
    document.body.style.cursor = 'none'

    return () => {
      document.body.classList.remove('cyber-theme')
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <div className="cyber-page bg-black min-h-screen overflow-x-hidden">
      <CyberNavigation />
      <main>
        <CyberHeroUltimate />
        <CyberStatsUltimate />
        <CyberServicesUltimate />
        <CyberWhyUs />
        <CyberTech />
        <CyberTestimonials />
        <CyberCTA />
      </main>
      <CyberFooter />
    </div>
  )
}
