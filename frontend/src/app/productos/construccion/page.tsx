import type { Metadata } from 'next'
import { ProductList } from '@/components/products/ProductList'

export const metadata: Metadata = {
  title: 'Equipos de Construcción | MaqOn - Productos Industriales',
  description: 'Explora nuestra línea de equipos de construcción: excavadoras, grúas, hormigoneras y herramientas especializadas para obras civiles e industriales.',
  keywords: 'equipos construcción, maquinaria pesada, excavadoras, grúas, hormigoneras, herramientas construcción, MaqOn',
  alternates: { 
    canonical: '/productos/construccion' 
  },
  openGraph: {
    title: 'Equipos de Construcción | MaqOn',
    description: 'Maquinaria pesada y equipos especializados para construcción civil e industrial.',
    url: `${process.env.SITE_URL || 'http://localhost:3000'}/productos/construccion`,
    siteName: 'MaqOn',
    images: [
      {
        url: '/images/industries/construction.jpg',
        width: 1200,
        height: 630,
        alt: 'MaqOn - Equipos de Construcción',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equipos de Construcción | MaqOn',
    description: 'Maquinaria pesada y equipos especializados para construcción.',
    images: ['/images/industries/construction.jpg'],
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

export default function ConstruccionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🏗️</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Equipos de Construcción
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
            Maquinaria pesada, equipos de obra y herramientas especializadas para construcción civil e industrial
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList category="construccion" categoryName="Construcción" />
      </div>
    </div>
  )
}
