import { ServicesSection } from '@/components/ServicesSection';

export default function ServiciosPage() {
  return (
    <div className="min-h-screen">
      <div className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              Nuestros <span className="gradient-text">Servicios</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos un servicio integral que va más allá de la venta de productos. 
              Desde la cotización hasta el mantenimiento, estamos contigo en cada paso.
            </p>
          </div>
        </div>
      </div>
      
      <ServicesSection />
      
      <div className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            ¿Necesitas un servicio específico?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarte con cualquier consulta o solicitud especial.
          </p>
          <a href="/contacto" className="btn-primary">
            Contactar con Nosotros
          </a>
        </div>
      </div>
    </div>
  );
}
