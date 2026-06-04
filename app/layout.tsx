import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Customs Broker Nassau, Bahamas | Atlas Brokerage',
    template: '%s | Atlas Brokerage',
  },
  description:
    "Nassau's trusted customs brokerage for vehicles, goods, duty exemptions, and more. Licensed Bahamian customs broker — fast, transparent, and fully Click2Clear registered. Get a free quote today.",
  keywords: [
    'customs broker Bahamas',
    'customs broker Nassau',
    'customs clearance Nassau Bahamas',
    'import car Bahamas',
    'duty exemption Bahamas',
    'licensed customs broker Bahamas',
    'customs brokerage services Bahamas',
  ],
  authors: [{ name: 'Atlas Brokerage' }],
  openGraph: {
    type: 'website',
    locale: 'en_BS',
    siteName: 'Atlas Brokerage',
    title: 'Customs Broker Nassau, Bahamas | Atlas Brokerage',
    description:
      "Nassau's trusted customs brokerage for vehicles, goods, duty exemptions, and more. Your World, Cleared.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        {/* LocalBusiness Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Atlas Brokerage',
              description:
                'Licensed Bahamian customs broker serving Nassau and the Family Islands. Vehicle imports, general goods clearance, duty exemptions, animal imports, and freight forwarding.',
              url: 'https://www.atlasbrokerage.bs',
              telephone: '+1-242-000-0000',
              email: 'info@atlasbrokerage.bs',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Nassau',
                addressRegion: 'New Providence',
                addressCountry: 'BS',
              },
              areaServed: {
                '@type': 'Country',
                name: 'The Bahamas',
              },
              priceRange: '$$',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '17:00',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
