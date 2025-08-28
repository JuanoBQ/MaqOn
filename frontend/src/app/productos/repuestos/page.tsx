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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList category="repuestos" categoryName="Repuestos" />
      </div>
    </div>
  )
}
