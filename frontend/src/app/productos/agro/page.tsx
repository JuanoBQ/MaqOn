import type { Metadata } from 'next'
import { ProductList } from '@/components/products/ProductList'

export const metadata: Metadata = {
  title: 'Equipos para el Agro | MaqOn - Productos Industriales',
  description: 'Explora nuestra línea de equipos agrícolas: tractores, sistemas de riego, procesadoras y equipos de almacenamiento para el sector agroindustrial.',
  keywords: 'equipos agro, tractores agrícolas, sistemas riego, procesadoras agrícolas, almacenamiento agro, MaqOn',
  alternates: { 
    canonical: '/productos/agro' 
  },
  openGraph: {
    title: 'Equipos para el Agro | MaqOn',
    description: 'Tecnología agrícola moderna y equipos especializados para el sector agroindustrial.',
    url: `${process.env.SITE_URL || 'http://localhost:3000'}/productos/agro`,
    siteName: 'MaqOn',
    images: [
      {
        url: '/images/industries/agro.jpg',
        width: 1200,
        height: 630,
        alt: 'MaqOn - Equipos para el Agro',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equipos para el Agro | MaqOn',
    description: 'Tecnología agrícola moderna y equipos especializados.',
    images: ['/images/industries/agro.jpg'],
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

export default function AgroPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🚜</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Equipos para el Agro
          </h1>
          <p className="text-xl lg:text-2xl text-green-100 max-w-3xl mx-auto">
            Tecnología agrícola moderna, tractores, sistemas de riego y equipos de procesamiento agroindustrial
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList category="agro" categoryName="Agro" />
      </div>
    </div>
  )
}
