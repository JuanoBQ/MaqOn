'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/outline'

interface Product {
  id: number
  documentId: string
  nombre: string
  descripcion: string
  categoria: string
  caracteristicas: Record<string, any>
  precio: number
  disponible: boolean
  createdAt: string
  updatedAt: string
  imagen?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'construccion': 'bg-blue-100 text-blue-800',
      'agro': 'bg-green-100 text-green-800',
      'metalmecanica': 'bg-gray-100 text-gray-800',
      'manufactura': 'bg-purple-100 text-purple-800',
      'elevacion': 'bg-orange-100 text-orange-800',
      'repuestos': 'bg-red-100 text-red-800',
    }
    return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[#f7b34b]/30"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {product.imagen ? (
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl text-gray-400">⚙️</div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.categoria)}`}>
            {product.categoria}
          </span>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.disponible 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.disponible ? 'Disponible' : 'Agotado'}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/productos/${product.id}`}
            className="bg-[#f7b34b] hover:bg-[#e6a02e] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <span>Ver Detalles</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#f7b34b] transition-colors duration-300 line-clamp-2">
          {product.nombre}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateDescription(product.descripcion)}
        </p>

        {/* Key Features */}
        {product.caracteristicas && Object.keys(product.caracteristicas).length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(product.caracteristicas).slice(0, 3).map(([key, value]) => (
                <span
                  key={key}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                  title={`${key}: ${value}`}
                >
                  {key}: {value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#f7b34b]">
            {formatPrice(product.precio)}
          </div>
          
          <Link
            href={`/productos/${product.id}`}
            className="inline-flex items-center bg-gray-100 hover:bg-[#f7b34b] text-gray-700 hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 group-hover:shadow-md"
          >
            <span className="text-sm">Ver</span>
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
