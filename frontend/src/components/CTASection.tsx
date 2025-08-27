'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

const contactMethods = [
  {
    icon: PhoneIcon,
    title: 'Llámanos',
    description: '+34 91 123 45 67',
    href: 'tel:+34911234567',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: EnvelopeIcon,
    title: 'Escríbenos',
    description: 'info@maqon.com',
    href: 'mailto:info@maqon.com',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: MapPinIcon,
    title: 'Visítanos',
    description: 'Calle Industrial 123, Madrid',
    href: '/contacto#ubicacion',
    color: 'from-purple-500 to-purple-600'
  }
]

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6"
          >
            ¿Listo para transformar tu{' '}
            <span className="gradient-text">producción industrial</span>?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Únete a cientos de empresas que ya confían en MaqOn para sus necesidades industriales. 
            Nuestro equipo está listo para ayudarte a encontrar la solución perfecta.
          </motion.p>
        </div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <Link href={method.href} className="block">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors duration-200">
                  {method.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors duration-200">
                  {method.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-bold mb-4">
              ¡Tu cotización personalizada está a solo un clic de distancia!
            </h3>
            <p className="text-gray-300 mb-8">
              Completa nuestro formulario y recibe una propuesta adaptada a tus necesidades 
              en menos de 24 horas. Sin compromisos, solo soluciones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/cotizacion" 
                className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center"
              >
                Solicitar Cotización Gratuita
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              
              <Link 
                href="/contacto" 
                className="bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg border-2 border-white/30 hover:border-white/50 transition-all duration-200"
              >
                Hablar con un Experto
              </Link>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              ✨ Sin costos ocultos • Respuesta en 24h • Asesoría técnica incluida
            </p>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">Confían en nosotros empresas como:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-600">🏭 Industrias del Norte</div>
            <div className="text-2xl font-bold text-gray-600">🚗 AutoSur</div>
            <div className="text-2xl font-bold text-gray-600">🧪 Química Central</div>
            <div className="text-2xl font-bold text-gray-600">🧵 Textil Este</div>
            <div className="text-2xl font-bold text-gray-600">⚡ Energía Plus</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
