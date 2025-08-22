import { CTASection } from '@/components/CTASection';

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      <div className="section-padding bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
              <span className="gradient-text">Contacta</span> con Nosotros
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aquí para ayudarte. Ponte en contacto con nuestro equipo y 
              te responderemos lo antes posible.
            </p>
          </div>
        </div>
      </div>
      
      <CTASection />
      
      <div className="section-padding bg-white" id="ubicacion">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
                Información de <span className="gradient-text">Contacto</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-600">Calle Industrial 123<br />Madrid, España</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <p className="text-gray-600">+34 91 123 45 67</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@maqon.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horario</h3>
                    <p className="text-gray-600">Lunes - Viernes: 8:00 - 18:00<br />Sábado: 9:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Envíanos un Mensaje
              </h3>
              <p className="text-gray-600 mb-6">
                Completa el formulario y te responderemos en las próximas 24 horas.
              </p>
              <a href="/cotizacion" className="btn-primary w-full text-center">
                Solicitar Cotización
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
