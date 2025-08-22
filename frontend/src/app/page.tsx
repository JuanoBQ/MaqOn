import {
  Hero,
  FeaturedProducts,
  AboutSection,
  ServicesSection,
  QuoteForm,
  TestimonialsSection,
  CTASection
} from '@/components';

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
