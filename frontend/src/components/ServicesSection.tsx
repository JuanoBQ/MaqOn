'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const services = [
  {
    id: 1,
    title: 'Cotización de Importación',
    description: 'Cotizaciones completas que incluyen equipo, flete, seguros, aranceles y todos los costos de importación.',
    icon: '📋',
    features: ['Análisis de requisitos técnicos', 'Cotización CIF completa', 'Tiempos de entrega', 'Documentación requerida'],
    cta: 'Solicitar Cotización',
    href: '/cotizacion'
  },
  {
    id: 2,
    title: 'Gestión Aduanera',
    description: 'Manejamos todos los trámites aduaneros, documentación y cumplimiento de regulaciones colombianas.',
    icon: '🏛️',
    features: ['Declaración de importación', 'Pago de aranceles', 'Certificados de origen', 'Cumplimiento normativo'],
    cta: 'Consultar Servicios',
    href: '/servicios'
  },
  {
    id: 3,
    title: 'Logística Internacional',
    description: 'Coordinamos el transporte desde el fabricante hasta tu empresa en Colombia.',
    icon: '🚢',
    features: ['Transporte marítimo/aéreo', 'Seguros de carga', 'Seguimiento en tiempo real', 'Entrega puerta a puerta'],
    cta: 'Conocer Logística',
    href: '/servicios'
  },
  {
    id: 4,
    title: 'Soporte Post-Importación',
    description: 'Asesoría técnica, instalación y mantenimiento de los equipos importados.',
    icon: '🔧',
    features: ['Instalación y puesta en marcha', 'Capacitación técnica', 'Mantenimiento preventivo', 'Repuestos originales'],
    cta: 'Solicitar Soporte',
    href: '/servicios'
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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
            Servicios de <span className="gradient-text">Importación</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos un servicio integral de importación que cubre todo el proceso. 
            Desde la cotización hasta la entrega en tu empresa, gestionamos cada detalle.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group"
            >
              <div className="p-6 sm:p-8">
                {/* Service Icon */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl sm:text-3xl">{service.icon}</span>
                </div>

                {/* Service Content */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-primary-600 transition-colors duration-200">
                  {service.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
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
            ¿Necesitas importar maquinaria específica?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Si tienes requisitos especiales de importación o necesitas equipos no convencionales, 
            nuestro equipo de expertos está listo para ayudarte. Contáctanos para una consulta personalizada.
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
