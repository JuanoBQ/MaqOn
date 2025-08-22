'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const stats = [
  { number: '15+', label: 'Años de Experiencia' },
  { number: '500+', label: 'Proyectos Completados' },
  { number: '100+', label: 'Clientes Satisfechos' },
  { number: '24h', label: 'Tiempo de Respuesta' }
]

const values = [
  {
    title: 'Calidad Garantizada',
    description: 'Todos nuestros productos cumplen con los más altos estándares de calidad industrial.',
    icon: '🏆'
  },
  {
    title: 'Soporte Técnico',
    description: 'Equipo de expertos disponibles para asesorarte en cada paso del proceso.',
    icon: '🔧'
  },
  {
    title: 'Entrega Puntual',
    description: 'Comprometidos con cumplir los plazos de entrega acordados.',
    icon: '⏰'
  },
  {
    title: 'Precios Competitivos',
    description: 'Ofrecemos la mejor relación calidad-precio del mercado.',
    icon: '💰'
  }
]

export function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-display font-bold text-gray-900">
                Sobre <span className="gradient-text">MaqOn</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Somos una empresa especializada en la distribución de productos industriales 
                de alta calidad, con más de 15 años de experiencia en el sector.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Nuestra misión es proporcionar soluciones industriales innovadoras y 
                confiables, respaldadas por un servicio al cliente excepcional y 
                soporte técnico especializado.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl font-display font-bold text-primary-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
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
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-8">
              <div className="space-y-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-2xl">{value.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-200 rounded-full opacity-20" />
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
            ¿Por qué elegir MaqOn?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Soluciones Personalizadas</h4>
              <p className="text-gray-600 text-sm">
                Cada cotización se adapta a tus necesidades específicas y presupuesto.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Innovación Constante</h4>
              <p className="text-gray-600 text-sm">
                Trabajamos con las últimas tecnologías y marcas líderes del mercado.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Relación a Largo Plazo</h4>
              <p className="text-gray-600 text-sm">
                Construimos relaciones duraderas basadas en la confianza y resultados.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
