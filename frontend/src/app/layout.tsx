import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics, Header, Footer } from '@/components'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { FaviconDefinitive } from '@/components/ui/FaviconDefinitive'
import { Hero } from '@/components'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MaqOn Maquinaria y equipos',
    template: '%s | MaqOn'
  },
  description: 'MaqOn importación y distribución de maquinaria y equipos industriales de alta calidad. Solicita tu cotización personalizada y obtén la mejor solución para tu empresa.',
  keywords: ['maquinaria industrial', 'equipos industriales', 'cotización', 'productos industriales', 'MaqOn'],
  authors: [{ name: 'MaqOn Team' }],
  creator: 'MaqOn',
  publisher: 'MaqOn',
  // Favicon se maneja dinámicamente en el componente Favicon
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://maqon.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MaqOn Maquinaria y equipos',
    description: 'Maquinaria y equipos',
    url: 'https://maqon.com',
    siteName: 'MaqOn',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MaQon - Maquinaria y equipos industriales',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
      twitter: {
      card: 'summary_large_image',
      title: 'MaqOn Maquinaria y equipos',
      description: 'Maquinaria y equipos industriales de alta calidad',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <FaviconDefinitive />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
