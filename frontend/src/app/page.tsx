import type { Metadata } from 'next'
import {
  Hero,
  IndustrialSectors,
  AboutSection,
  ServicesSection,
  QuoteForm,
  TestimonialsSection,
  CTASection
} from '@/components';

export const metadata: Metadata = {
  title: 'MaqOn Maquinaria y equipos | Soluciones Industriales a Medida',
  description: 'Descubre nuestra selección de maquinaria y equipos industriales de alta calidad. Soluciones personalizadas para todos los sectores industriales. Solicita tu cotización gratuita hoy mismo.',
  keywords: 'maquinaria industrial, equipos industriales, cotización industrial, soluciones industriales, MaqOn, sectores industriales',
  alternates: { 
    canonical: '/' 
  },
  openGraph: {
    title: 'MaqOn Maquinaria y equipos | Soluciones Industriales a Medida',
    description: 'Maquinaria y equipos industriales de alta calidad. Soluciones personalizadas para todos los sectores industriales.',
    url: process.env.SITE_URL || 'http://localhost:3000',
    siteName: 'MaqOn',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MaQon - Maquinaria y equipos industriales',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
      twitter: {
      card: 'summary_large_image',
      title: 'MaqOn Maquinaria y equipos | Soluciones Industriales a Medida',
      description: 'Maquinaria y equipos industriales de alta calidad. Soluciones personalizadas para todos los sectores industriales.',
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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <IndustrialSectors />
      <AboutSection />
      <ServicesSection />
      <QuoteForm />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
