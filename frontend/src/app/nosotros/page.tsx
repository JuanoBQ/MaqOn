import type { Metadata } from 'next'
import { AboutSection } from '@/components/AboutSection';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Conoce a MaqOn: misión, valores y experiencia en soluciones industriales.',
  alternates: { canonical: '/nosotros' },
};

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      <AboutSection />
      
      <div className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            ¿Quieres conocer más sobre nosotros?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Estamos aquí para responder cualquier pregunta que tengas sobre MaqOn.
          </p>
          <a href="/contacto" className="btn-primary">
            Contactar con Nosotros
          </a>
        </div>
      </div>
    </div>
  );
}
