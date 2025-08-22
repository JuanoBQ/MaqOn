'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link'
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/solid'

const featuredProducts = [
  {
    id: 1,
    name: 'Compresor Industrial HD-5000',
    category: 'Compresores',
    description: 'Compresor de alta presión para aplicaciones industriales pesadas',
    image: '/images/products/compressor.jpg',
    features: ['5000 PSI', 'Motor 10HP', 'Tanque 100L'],
    rating: 4.8,
    reviews: 127
  },
  {
    id: 2,
    name: 'Bomba Centrífuga BC-200',
    category: 'Bombas',
    description: 'Bomba centrífuga para transferencia de fluidos industriales',
    image: '/images/products/pump.jpg',
    features: ['200 L/min', 'Presión 5 bar', 'Acero inoxidable'],
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Válvula de Control VC-100',
    category: 'Válvulas',
    description: 'Válvula de control automática para sistemas de fluidos',
    image: '/images/products/valve.jpg',
    features: ['Control PID', 'Presión 10 bar', 'DN100'],
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: 'Motor Eléctrico ME-75',
    category: 'Motores',
    description: 'Motor trifásico de alta eficiencia para aplicaciones industriales',
    image: '/images/products/motor.jpg',
    features: ['75 HP', 'Eficiencia IE4', '380V/50Hz'],
    rating: 4.9,
    reviews: 203
  }
]

export function FeaturedProducts() {
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
            Productos <span className="gradient-text">Destacados</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra selección de productos industriales de alta calidad. 
            Cada producto está disponible por cotización personalizada.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center overflow-hidden">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">⚙️</span>
                </div>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                {/* CTA */}
                <Link 
                  href={`/productos/${product.id}`}
                  className="btn-outline w-full text-center group-hover:bg-primary-50 transition-colors duration-200"
                >
                  Ver Detalles
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            href="/productos" 
            className="btn-primary inline-flex items-center group"
          >
            Ver Todos los Productos
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
