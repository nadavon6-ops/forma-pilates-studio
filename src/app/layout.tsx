import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FORMA Pilates Studio | Austin\'s Premier Boutique Pilates',
  description: 'Transform your body and mind with expert-led reformer Pilates in Austin\'s most stunning boutique studio. Small classes, big transformations. Book your first class free.',
  keywords: 'pilates, reformer pilates, austin pilates, boutique fitness, pilates studio austin, reformer classes',
  openGraph: {
    title: 'FORMA Pilates Studio | Austin\'s Premier Boutique Pilates',
    description: 'Transform your body and mind with expert-led reformer Pilates in Austin\'s most stunning boutique studio.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="font-body bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  )
}
