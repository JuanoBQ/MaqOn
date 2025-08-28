import type { Metadata } from 'next'
import { ProductList } from '@/components/products/ProductList'

export const metadata: Metadata = {
  title: 'Equipos de Elevación | MaqOn - Productos Industriales',
  description: 'Explora nuestra línea de equipos de elevación: montacargas, grúas móviles, plataformas elevadoras y sistemas de izaje industrial.',
  keywords: 'equipos elevación, montacargas, grúas móviles, plataformas elevadoras, sistemas izaje, MaqOn',
  alternates: { 
    canonical: '/productos/elevacion' 
  },
  openGraph: {
    title: 'Equipos de Elevación | MaqOn',
    description: 'Montacargas, grúas móviles, plataformas elevadoras y sistemas de izaje industrial.',
    url: `${process.env.SITE_URL || 'http://localhost:3000'}/productos/elevacion`,
    siteName: 'MaqOn',
    images: [
      {
        url: '/images/industries/elevacion.jpg',
        width: 1200,
        height: 630,
        alt: 'MaqOn - Equipos de Elevación',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equipos de Elevación | MaqOn',
    description: 'Montacargas, grúas móviles y plataformas elevadoras.',
    images: ['/images/industries/elevacion.jpg'],
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
}

export default function ElevacionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList category="elevacion" categoryName="Elevación" />
      </div>
    </div>
  )
}
