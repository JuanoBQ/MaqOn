import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics, Header, Footer } from '@/components'

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
    default: 'MaqOn - Productos Industriales por Cotización',
    template: '%s | MaqOn'
  },
  description: 'MaqOn ofrece productos industriales de alta calidad por cotización. Solicita tu cotización personalizada y obtén la mejor solución para tu empresa.',
  keywords: ['productos industriales', 'cotización', 'maquinaria', 'equipos industriales', 'MaqOn'],
  authors: [{ name: 'MaqOn Team' }],
  creator: 'MaqOn',
  publisher: 'MaqOn',
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
    title: 'MaqOn - Productos Industriales por Cotización',
    description: 'Productos industriales de alta calidad por cotización personalizada',
    url: 'https://maqon.com',
    siteName: 'MaqOn',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MaqOn - Productos Industriales',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaqOn - Productos Industriales por Cotización',
    description: 'Productos industriales de alta calidad por cotización personalizada',
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
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.GA_MEASUREMENT_ID!} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
