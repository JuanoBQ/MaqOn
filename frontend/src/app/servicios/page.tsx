import { ServicesSection } from '@/components/ServicesSection';

export default function ServiciosPage() {
  return (
    <div className="min-h-screen">
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
