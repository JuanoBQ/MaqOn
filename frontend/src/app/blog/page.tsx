import { Metadata } from 'next'
import { BlogList } from '@/components/blog/BlogList'

export const metadata: Metadata = {
  title: 'Blog Industrial | Artículos y Guías Técnicas MaqOn',
  description: 'Descubre artículos, guías técnicas y tendencias sobre maquinaria industrial. Mantente actualizado con las últimas innovaciones del sector industrial.',
  keywords: 'blog maquinaria industrial, guías técnicas, tendencias industria, casos de uso, maquinaria industrial, blog industrial, MaqOn',
  alternates: { 
    canonical: '/blog' 
  },
  openGraph: {
    title: 'Blog Industrial | Artículos y Guías Técnicas MaqOn',
    description: 'Descubre artículos, guías técnicas y tendencias sobre maquinaria industrial. Mantente actualizado con las últimas innovaciones.',
    url: `${process.env.SITE_URL || 'http://localhost:3000'}/blog`,
    siteName: 'MaqOn Blog',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Industrial MaqOn - Artículos y Guías Técnicas',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Industrial | Artículos y Guías Técnicas MaqOn',
    description: 'Descubre artículos, guías técnicas y tendencias sobre maquinaria industrial.',
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
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom section-padding py-16 sm:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Blog MaqOn
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 leading-relaxed">
              Descubre las últimas tendencias, guías técnicas y casos de éxito en maquinaria industrial
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="container-custom section-padding py-12 sm:py-16">
        <BlogList />
      </section>
    </div>
  )
}
