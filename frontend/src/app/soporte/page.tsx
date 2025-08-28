'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon, 
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'



const supportServices = [
  {
    icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
    title: 'Mantenimiento Preventivo',
    description: 'Programas de mantenimiento para optimizar el rendimiento de tus equipos.',
    features: ['Inspecciones regulares', 'Lubricación', 'Calibración', 'Reemplazo de piezas']
  },
  {
    icon: <DocumentTextIcon className="w-8 h-8" />,
    title: 'Asesoría Técnica',
    description: 'Consultoría especializada para la selección y optimización de equipos.',
    features: ['Análisis de necesidades', 'Recomendaciones técnicas', 'Especificaciones', 'Comparativas']
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
    title: 'Soporte Remoto',
    description: 'Asistencia técnica a distancia para resolución rápida de problemas.',
    features: ['Diagnóstico remoto', 'Guías paso a paso', 'Videollamadas', 'Documentación técnica']
  }
]

const contactMethods = [
  {
    icon: <PhoneIcon className="w-6 h-6" />,
    title: 'Teléfono',
    description: 'Línea directa de soporte',
    contact: '+57 (1) 234-5678',
    available: 'Lun - Vie: 8:00 AM - 6:00 PM'
  },
  {
    icon: <EnvelopeIcon className="w-6 h-6" />,
    title: 'Email',
    description: 'Soporte por correo electrónico',
    contact: 'soporte@maqon.com',
    available: 'Respuesta en 24 horas'
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
    title: 'Chat en Vivo',
    description: 'Asistencia inmediata',
    contact: 'Disponible en el sitio',
    available: 'Lun - Vie: 9:00 AM - 5:00 PM'
  }
]

export default function SoportePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#f7b34b] to-[#e6a02e] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🔧</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Soporte Técnico
          </h1>
          <p className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto">
            Asistencia especializada para tus equipos industriales
          </p>
        </div>
      </div>

      {/* Support Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestros Servicios de Soporte
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una gama completa de servicios técnicos para mantener tus equipos funcionando al máximo rendimiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-[#f7b34b] mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-[#f7b34b] rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Methods */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Cómo Contactarnos?
            </h2>
            <p className="text-lg text-gray-600">
              Múltiples canales para brindarte la asistencia que necesitas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f7b34b]/10 rounded-full mb-4">
                  <div className="text-[#f7b34b]">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {method.description}
                </p>
                <p className="text-lg font-medium text-[#f7b34b] mb-2">
                  {method.contact}
                </p>
                <p className="text-sm text-gray-500">
                  {method.available}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas Soporte Inmediato?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Nuestro equipo técnico está listo para ayudarte con cualquier consulta o problema.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center bg-[#f7b34b] hover:bg-[#e6a02e] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Contactar Ahora
            </Link>
            <Link
              href="/cotizacion"
              className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
