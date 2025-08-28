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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList category="construccion" categoryName="Construcción" />
      </div>
    </div>
  )
}
