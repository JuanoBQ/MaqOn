import type { Metadata } from 'next'
import { ProductList } from '@/components/products/ProductList'

export const metadata: Metadata = {
  title: 'Equipos de Manufactura | MaqOn - Productos Industriales',
  description: 'Explora nuestra línea de equipos de manufactura: líneas de producción, robots industriales, sistemas de control de calidad y automatización industrial.',
  keywords: 'equipos manufactura, robots industriales, líneas producción, automatización, control calidad, MaqOn',
  alternates: { 
    canonical: '/productos/manofactura' 
  },
  openGraph: {
    title: 'Equipos de Manufactura | MaqOn',
    description: 'Líneas de producción automatizadas, robots industriales y sistemas de control de calidad.',
    url: `${process.env.SITE_URL || 'http://localhost:3000'}/productos/manofactura`,
    siteName: 'MaqOn',
    images: [
      {
        url: '/images/industries/manufacturing.jpg',
        width: 1200,
        height: 630,
        alt: 'MaqOn - Equipos de Manufactura',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equipos de Manufactura | MaqOn',
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

export default function ManofacturaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList category="manofactura" categoryName="Manufactura" />
      </div>
    </div>
  )
}
