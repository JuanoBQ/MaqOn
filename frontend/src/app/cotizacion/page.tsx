import type { Metadata } from 'next'
import { QuoteForm } from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: 'Cotización',
  description: 'Solicita una cotización personalizada de productos industriales con MaqOn.',
  alternates: { canonical: '/cotizacion' },
};

export default function CotizacionPage() {
  return (
    <div className="min-h-screen">
      <div className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              Solicita tu <span className="gradient-text">Cotización</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Completa el formulario y nuestro equipo te enviará una cotización personalizada 
              en menos de 24 horas. ¡Es rápido, fácil y sin compromiso!
            </p>
          </div>
        </div>
      </div>
      
      <QuoteForm />
      
      <div className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            ¿Tienes dudas sobre el proceso?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nuestro equipo está disponible para ayudarte con cualquier consulta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contacto" className="btn-outline">
              Contactar con Nosotros
            </a>
            <a href="/servicios" className="btn-primary">
              Ver Nuestros Servicios
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
