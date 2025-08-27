import type { Metadata } from 'next'
import { ProductList } from '@/components/products/ProductList'

export const metadata: Metadata = {
  title: 'Repuestos Industriales | MaqOn - Productos Industriales',
  description: 'Explora nuestra línea de repuestos: repuestos originales y alternativos para toda nuestra línea de equipos industriales con garantía y soporte técnico.',
  keywords: 'repuestos industriales, repuestos originales, repuestos alternativos, mantenimiento industrial, garantía repuestos, MaqOn',
  alternates: { 
    canonical: '/productos/repuestos' 
  },
  openGraph: {
    title: 'Repuestos Industriales | MaqOn',
    description: 'Repuestos originales y alternativos para toda nuestra línea de equipos industriales.',
    url: `${process.env.SITE_URL || 'http://localhost:3000'}/productos/repuestos`,
    siteName: 'MaqOn',
    images: [
      {
        url: '/images/industries/repuestos.jpg',
        width: 1200,
        height: 630,
        alt: 'MaqOn - Repuestos Industriales',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Repuestos Industriales | MaqOn',
    description: 'Repuestos originales y alternativos con garantía.',
    images: ['/images/industries/repuestos.jpg'],
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

export default function RepuestosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🔧</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Repuestos Industriales
          </h1>
          <p className="text-xl lg:text-2xl text-red-100 max-w-3xl mx-auto">
            Repuestos originales y alternativos para toda nuestra línea de equipos industriales
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList category="repuestos" categoryName="Repuestos" />
      </div>
    </div>
  )
}
