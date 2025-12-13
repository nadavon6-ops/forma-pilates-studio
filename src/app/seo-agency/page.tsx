'use client'

import { useEffect } from 'react'
import SEONavigation from '@/components/seo-agency/SEONavigation'
import SEOHeroUltimate from '@/components/seo-agency/SEOHeroUltimate'
import SEOStatsUltimate from '@/components/seo-agency/SEOStatsUltimate'
import SEOServices from '@/components/seo-agency/SEOServices'
import SEOProcess from '@/components/seo-agency/SEOProcess'
import SEOResults from '@/components/seo-agency/SEOResults'
import SEOClients from '@/components/seo-agency/SEOClients'
import SEOCTA from '@/components/seo-agency/SEOCTA'
import SEOFooter from '@/components/seo-agency/SEOFooter'

export default function SEOAgencyPage() {
  useEffect(() => {
    document.body.classList.add('seo-theme')
    document.body.style.backgroundColor = '#0a0a0a'
    document.body.style.cursor = 'none'

    return () => {
      document.body.classList.remove('seo-theme')
      document.body.style.backgroundColor = ''
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <div className="seo-page bg-[#0a0a0a] min-h-screen overflow-x-hidden" dir="rtl">
      <SEONavigation />
      <main>
        <SEOHeroUltimate />
        <SEOStatsUltimate />
        <SEOServices />
        <SEOProcess />
        <SEOResults />
        <SEOClients />
        <SEOCTA />
      </main>
      <SEOFooter />
    </div>
  )
}
