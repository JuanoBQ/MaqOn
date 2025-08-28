'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const stats = [
  { number: '15+', label: 'Años Importando a Colombia' },
  { number: '500+', label: 'Equipos Importados' },
  { number: '100+', label: 'Empresas Colombianas' },
  { number: '24h', label: 'Cotización Express' }
]

const values = [
  {
    title: 'Importación Directa',
    description: 'Trabajamos directamente con fabricantes internacionales para garantizar calidad y precios competitivos.',
    icon: '🌍'
  },
  {
    title: 'Gestión Aduanera',
    description: 'Manejamos todos los trámites aduaneros y documentación para una importación sin complicaciones.',
    icon: '📋'
  },
  {
    title: 'Entrega en Colombia',
    description: 'Logística completa para entregar tus equipos en cualquier ciudad de Colombia.',
    icon: '🚚'
  },
  {
    title: 'Soporte Post-Importación',
    description: 'Asesoría técnica y soporte continuo después de la entrega de tus equipos.',
    icon: '🔧'
  }
]

export function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
                Sobre <span className="gradient-text">MaqOn</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Somos especialistas en importación de maquinaria y equipos industriales a Colombia, conectando empresas colombianas con tecnología de vanguardia mundial.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Nuestra misión es facilitar el acceso a la mejor maquinaria industrial del mundo, 
                gestionando todo el proceso de importación para que tu empresa se enfoque en crecer.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-display font-bold text-primary-600 mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
          >
            <div className="relative bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-6 sm:p-8">
              <div className="space-y-4 sm:space-y-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 sm:space-x-4"
                  >
                    <div className="text-2xl sm:text-3xl flex-shrink-0">{value.icon}</div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
            ¿Por qué elegir MaqOn para tus importaciones?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Red Global de Proveedores</h4>
              <p className="text-gray-600 text-sm">
                Acceso directo a fabricantes internacionales y las mejores marcas del mundo.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Proceso Simplificado</h4>
              <p className="text-gray-600 text-sm">
                Gestionamos toda la logística de importación para que te enfoques en tu negocio.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🇨🇴</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expertos en Colombia</h4>
              <p className="text-gray-600 text-sm">
                Conocemos el mercado colombiano y las regulaciones locales para una importación exitosa.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
