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
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">📐</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Equipos de Elevación
          </h1>
          <p className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto">
            Montacargas, grúas móviles, plataformas elevadoras y sistemas de izaje industrial
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList category="elevacion" categoryName="Elevación" />
      </div>
    </div>
  )
}
