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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList category="agro" categoryName="Agro" />
      </div>
    </div>
  )
}
