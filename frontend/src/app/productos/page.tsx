import type { Metadata } from 'next'
import { FeaturedProducts } from '@/components/FeaturedProducts';

export const metadata: Metadata = {
  title: 'Productos',
  description: 'Catálogo de productos industriales disponibles por cotización con MaqOn.',
  alternates: { canonical: '/productos' },
};

export default function ProductosPage() {
  return (
    <div className="min-h-screen">
      <div className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              Nuestros <span className="gradient-text">Productos</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra amplia gama de productos industriales de alta calidad. 
              Cada producto está diseñado para maximizar la eficiencia y durabilidad.
            </p>
          </div>
        </div>
      </div>
      
      <FeaturedProducts />
      
      <div className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nuestro equipo puede ayudarte a encontrar la solución perfecta para tus necesidades específicas.
          </p>
          <a href="/cotizacion" className="btn-primary">
            Solicitar Cotización Personalizada
          </a>
        </div>
      </div>
    </div>
  );
}
