import { Metadata } from 'next';
import { QuoteForm } from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: 'Solicitar Cotización | Productos Industriales MaqOn',
  description: 'Solicita tu cotización personalizada para productos industriales. Nuestro equipo te ayudará a encontrar la solución perfecta para tus necesidades.',
  keywords: 'cotización industrial, solicitar cotización, productos industriales, maquinaria industrial, presupuesto industrial, MaqOn',
  alternates: { 
    canonical: '/cotizacion' 
  },
  openGraph: {
    title: 'Solicitar Cotización | Productos Industriales MaqOn',
    description: 'Solicita tu cotización personalizada para productos industriales. Nuestro equipo te ayudará a encontrar la solución perfecta.',
    url: `${process.env.SITE_URL || 'http://localhost:3000'}/cotizacion`,
    siteName: 'MaqOn',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Solicitar Cotización MaqOn - Productos Industriales',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solicitar Cotización | Productos Industriales MaqOn',
    description: 'Solicita tu cotización personalizada para productos industriales.',
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

export default function CotizacionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Form Section */}
      <section className="container-custom section-padding py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              ¿Qué necesitas?
            </h2>
            <p className="text-lg text-gray-600">
              Completa el formulario y nuestro equipo se pondrá en contacto contigo en menos de 24 horas
            </p>
          </div>
          
          <QuoteForm />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Respuesta Rápida</h3>
              <p className="text-gray-600">Recibe tu cotización en menos de 24 horas</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Personalizada</h3>
              <p className="text-gray-600">Cada cotización se adapta a tus necesidades específicas</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Soporte Experto</h3>
              <p className="text-gray-600">Nuestro equipo técnico te asesora en cada paso</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
