import type { Metadata } from 'next'
import { ProductList } from '@/components/products/ProductList'

export const metadata: Metadata = {
  title: 'Otros Equipos Industriales | MaqOn - Productos Industriales',
  description: 'Explora nuestra línea de equipos especializados y maquinaria diversa para aplicaciones específicas y sectores diversos.',
  keywords: 'equipos especializados, maquinaria diversa, aplicaciones específicas, sectores varios, MaqOn',
  alternates: { 
    canonical: '/productos/otros' 
  },
  openGraph: {
    title: 'Otros Equipos Industriales | MaqOn',
    description: 'Equipos y maquinaria especializada para aplicaciones específicas y sectores diversos.',
    url: `${process.env.SITE_URL || 'http://localhost:3000'}/productos/otros`,
    siteName: 'MaqOn',
    images: [
      {
        url: '/images/industries/construction.jpg',
        width: 1200,
        height: 630,
        alt: 'MaqOn - Otros Equipos Industriales',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Otros Equipos Industriales | MaqOn',
    description: 'Equipos especializados para aplicaciones específicas.',
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

export default function OtrosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList category="otros" categoryName="Otros" />
      </div>
    </div>
  )
}
