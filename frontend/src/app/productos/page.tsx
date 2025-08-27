import type { Metadata } from 'next'
import { ProductCategories } from '@/components/products/ProductCategories'

export const metadata: Metadata = {
  title: 'Productos Industriales por Categoría | MaqOn',
  description: 'Explora nuestra amplia gama de productos industriales organizados por categorías: construcción, agro, metalmecánica, manufactura, elevación y repuestos.',
  keywords: 'productos industriales, categorías, construcción, agro, metalmecánica, manufactura, elevación, repuestos, MaqOn',
  alternates: { 
    canonical: '/productos' 
  },
  openGraph: {
    title: 'Productos Industriales por Categoría | MaqOn',
    description: 'Descubre productos industriales organizados por categorías especializadas.',
    url: process.env.SITE_URL || 'http://localhost:3000',
    siteName: 'MaqOn',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MaqOn - Productos Industriales por Categoría',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Productos Industriales por Categoría | MaqOn',
    description: 'Explora productos industriales organizados por categorías especializadas.',
    images: ['/og-image.jpg'],
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

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Categories */}
      <ProductCategories />
    </div>
  )
}
