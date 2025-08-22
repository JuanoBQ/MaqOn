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
      <div className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              Sobre <span className="gradient-text">MaqOn</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce más sobre nuestra empresa, nuestra misión y los valores que nos guían 
              para ofrecer el mejor servicio a nuestros clientes.
            </p>
          </div>
        </div>
      </div>
      
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
