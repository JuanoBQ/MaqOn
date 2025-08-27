import type { Metadata } from 'next'
import { ProductList } from '@/components/products/ProductList'

export const metadata: Metadata = {
  title: 'Metalmecánica | MaqOn - Productos Industriales',
  description: 'Explora nuestra línea de equipos metalmecánicos: tornos CNC, fresadoras, soldadoras y herramientas de precisión para la industria metalmecánica.',
  keywords: 'metalmecánica, tornos CNC, fresadoras, soldadoras, herramientas precisión, maquinado, MaqOn',
  alternates: { 
    canonical: '/productos/metalmecanica' 
  },
  openGraph: {
    title: 'Metalmecánica | MaqOn',
    description: 'Equipos de corte, soldadura, maquinado y herramientas de precisión para la industria metalmecánica.',
    url: `${process.env.SITE_URL || 'http://localhost:3000'}/productos/metalmecanica`,
    siteName: 'MaqOn',
    images: [
      {
        url: '/images/industries/metalmecanica.jpg',
        width: 1200,
        height: 630,
        alt: 'MaqOn - Metalmecánica',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metalmecánica | MaqOn',
    description: 'Equipos de corte, soldadura y maquinado de precisión.',
    images: ['/images/industries/metalmecanica.jpg'],
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

export default function MetalmecanicaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-600 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">⚙️</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Metalmecánica
          </h1>
          <p className="text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto">
            Equipos de corte, soldadura, maquinado y herramientas de precisión para la industria metalmecánica
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList category="metalmecanica" categoryName="Metalmecánica" />
      </div>
    </div>
  )
}
