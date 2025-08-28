'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/outline'
import { Product } from '@/types/product'

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

  // Función para validar si el precio debe mostrarse
  const shouldShowPrice = (price: any): boolean => {
    if (price === null || price === undefined || price === '') {
      return false
    }
    const numPrice = Number(price)
    return !isNaN(numPrice) && numPrice > 0
  }

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'construccion': 'bg-blue-100 text-blue-800',
      'agro': 'bg-green-100 text-green-800',
      'manofactura': 'bg-purple-100 text-purple-800',
      'elevacion': 'bg-orange-100 text-orange-800',
      'repuestos': 'bg-red-100 text-red-800',
      'otros': 'bg-gray-100 text-gray-800',
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
        {(() => {
          // Usar la primera imagen del array imagenes, o imagen como fallback
          const firstImage = product.imagenes && product.imagenes.length > 0 
            ? product.imagenes[0] 
            : product.imagen;
          
          return firstImage ? (
            <img
              src={typeof firstImage === 'string' ? firstImage : firstImage.url}
              alt={typeof firstImage === 'string' ? product.nombre : (firstImage.alternativeText || product.nombre)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl text-gray-400">⚙️</div>
            </div>
          );
        })()}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.categoria)}`}>
            {product.categoria}
          </span>
        </div>



        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/productos/${product.documentId || product.id}`}
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
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#f7b34b] transition-colors duration-300 line-clamp-2">
          {product.nombre}
        </h3>

        {/* Description - Solo una línea corta */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {truncateDescription(product.descripcion, 80)}
        </p>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          {shouldShowPrice(product.precio) ? (
            <div className="text-xl font-bold text-[#f7b34b]">
              {formatPrice(Number(product.precio))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 font-medium">
              Precio a consultar
            </div>
          )}
          
          <Link
            href={`/productos/${product.documentId || product.id}`}
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
