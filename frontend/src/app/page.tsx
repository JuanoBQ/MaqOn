import type { Metadata } from 'next'
import {
  Hero,
  FeaturedProducts,
  AboutSection,
  ServicesSection,
  QuoteForm,
  TestimonialsSection,
  CTASection
} from '@/components';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Productos industriales por cotización. Solicita una propuesta personalizada con MaqOn.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'MaqOn - Productos Industriales por Cotización',
    description: 'Soluciones industriales a medida. Solicita tu cotización hoy.',
    url: 'https://maqon.com',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <ServicesSection />
      <QuoteForm />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
