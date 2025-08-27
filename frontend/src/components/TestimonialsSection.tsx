'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { StarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    position: 'Director de Operaciones',
    company: 'Industrias del Norte S.A.',
    content: 'MaqOn nos ha proporcionado soluciones excepcionales para nuestros equipos industriales. Su servicio de cotización es rápido y preciso, y la calidad de los productos supera nuestras expectativas.',
    rating: 5,
    image: '/images/testimonials/carlos.jpg'
  },
  {
    id: 2,
    name: 'Ana Martínez',
    position: 'Ingeniera de Mantenimiento',
    company: 'Fábrica de Automóviles Sur',
    content: 'El equipo técnico de MaqOn es increíblemente profesional. Nos han ayudado a optimizar nuestros procesos con equipos de última generación y un soporte técnico excepcional.',
    rating: 5,
    image: '/images/testimonials/ana.jpg'
  },
  {
    id: 3,
    name: 'Miguel López',
    position: 'Gerente de Compras',
    company: 'Planta Química Central',
    content: 'Hemos trabajado con MaqOn durante más de 5 años y siempre han cumplido con sus promesas. Sus cotizaciones son transparentes y competitivas, y la entrega siempre es puntual.',
    rating: 5,
    image: '/images/testimonials/miguel.jpg'
  },
  {
    id: 4,
    name: 'Laura Fernández',
    position: 'Supervisora de Producción',
    company: 'Textil Industrial Este',
    content: 'La asesoría técnica que recibimos de MaqOn fue fundamental para elegir el equipo correcto. Han transformado completamente nuestra línea de producción con su experiencia.',
    rating: 5,
    image: '/images/testimonials/laura.jpg'
  }
]

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
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
            Lo que dicen nuestros <span className="gradient-text">Clientes</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestros clientes confían en MaqOn para sus necesidades industriales. 
            Descubre por qué somos su proveedor preferido.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group"
            >
              <div className="p-4 sm:p-6">
                {/* Quote Icon */}
                <div className="mb-3 sm:mb-4">
                  <ChatBubbleLeftIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed line-clamp-4">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs sm:text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {testimonial.position}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white text-center"
        >
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-display font-bold mb-2">98%</div>
              <div className="text-primary-100">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold mb-2">24h</div>
              <div className="text-primary-100">Tiempo de Respuesta</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold mb-2">500+</div>
              <div className="text-primary-100">Proyectos Completados</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold mb-2">15+</div>
              <div className="text-primary-100">Años de Experiencia</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
            ¿Listo para unirte a nuestros clientes satisfechos?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Solicita tu cotización personalizada y descubre por qué tantas empresas 
            confían en MaqOn para sus necesidades industriales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/cotizacion" className="btn-primary">
              Solicitar Cotización
            </a>
            <a href="/contacto" className="btn-outline">
              Contactar con Nosotros
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
