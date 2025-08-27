import type { Metadata } from 'next'
import { ProductList } from '@/components/products/ProductList'

export const metadata: Metadata = {
  title: 'Manufactura | MaqOn - Productos Industriales',
  description: 'Explora nuestra línea de equipos de manufactura: líneas de producción automatizadas, robots industriales y sistemas de control de calidad.',
  keywords: 'manufactura, líneas producción, robots industriales, control calidad, automatización industrial, MaqOn',
  alternates: { 
    canonical: '/productos/manufactura' 
  },
  openGraph: {
    title: 'Manufactura | MaqOn',
    description: 'Líneas de producción automatizadas, robots industriales y sistemas de control de calidad.',
    url: `${process.env.SITE_URL || 'http://localhost:3000'}/productos/manufactura`,
    siteName: 'MaqOn',
    images: [
      {
        url: '/images/industries/manufacturing.jpg',
        width: 1200,
        height: 630,
        alt: 'MaqOn - Manufactura',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manufactura | MaqOn',
    description: 'Líneas de producción automatizadas y robots industriales.',
    images: ['/images/industries/manufacturing.jpg'],
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

export default function ManufacturaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🏭</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Manufactura
          </h1>
          <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto">
            Líneas de producción automatizadas, robots industriales y sistemas de control de calidad
          </p>
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductList category="manufactura" categoryName="Manufactura" />
      </div>
    </div>
  )
}
