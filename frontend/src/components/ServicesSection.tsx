'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const services = [
  {
    id: 1,
    title: 'Cotizaciones Personalizadas',
    description: 'Recibe cotizaciones detalladas adaptadas a tus necesidades específicas en menos de 24 horas.',
    icon: '📋',
    features: ['Análisis de requisitos', 'Propuesta técnica', 'Precio competitivo', 'Soporte post-venta'],
    cta: 'Solicitar Cotización',
    href: '/cotizacion'
  },
  {
    id: 2,
    title: 'Asesoría Técnica',
    description: 'Nuestro equipo de expertos te guía en la selección del producto más adecuado para tu aplicación.',
    icon: '🔧',
    features: ['Evaluación técnica', 'Recomendaciones', 'Optimización de costos', 'Garantía de funcionamiento'],
    cta: 'Consultar Asesoría',
    href: '/asesoria'
  },
  {
    id: 3,
    title: 'Instalación y Puesta en Marcha',
    description: 'Servicio completo de instalación, configuración y puesta en marcha de equipos industriales.',
    icon: '⚡',
    features: ['Instalación profesional', 'Configuración inicial', 'Pruebas de funcionamiento', 'Capacitación del personal'],
    cta: 'Solicitar Instalación',
    href: '/instalacion'
  },
  {
    id: 4,
    title: 'Mantenimiento Preventivo',
    description: 'Programas de mantenimiento preventivo para maximizar la vida útil de tus equipos.',
    icon: '🛠️',
    features: ['Inspecciones regulares', 'Lubricación', 'Ajustes preventivos', 'Reportes detallados'],
    cta: 'Programar Mantenimiento',
    href: '/mantenimiento'
  }
]

export function ServicesSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Nuestros <span className="gradient-text">Servicios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos un servicio integral que va más allá de la venta de productos. 
            Desde la cotización hasta el mantenimiento, estamos contigo en cada paso.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group"
            >
              <div className="p-8">
                {/* Service Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{service.icon}</span>
                </div>

                {/* Service Content */}
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-200">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link 
                  href={service.href}
                  className="btn-outline w-full text-center group-hover:bg-primary-50 transition-colors duration-200"
                >
                  {service.cta}
                  <ArrowRightIcon className="w-4 h-4 ml-2 inline" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
            ¿Necesitas algo más específico?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Si tienes requisitos especiales o necesitas un servicio personalizado, 
            nuestro equipo está listo para ayudarte. Contáctanos para discutir tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="btn-primary">
              Contactar con Nosotros
            </Link>
            <Link href="/servicios" className="btn-outline">
              Ver Todos los Servicios
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
