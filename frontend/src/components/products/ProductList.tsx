'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from './ProductCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

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

interface ProductListProps {
  category: string
  categoryName: string
}

export function ProductList({ category, categoryName }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products?category=${category}`)
        
        if (!response.ok) {
          throw new Error('Error al cargar productos')
        }
        
        const data = await response.json()
        setProducts(data.products || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-xl mb-4">⚠️ Error al cargar productos</div>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#f7b34b] hover:bg-[#e6a02e] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Intentar de nuevo
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-500 text-6xl mb-4">📦</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          No hay productos en esta categoría
        </h3>
        <p className="text-gray-600 mb-6">
          Actualmente no tenemos productos disponibles en {categoryName.toLowerCase()}.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            ¿Buscas algo específico? Nuestro equipo puede ayudarte a encontrar la solución perfecta.
          </p>
          <a
            href="/cotizacion"
            className="inline-block bg-[#f7b34b] hover:bg-[#e6a02e] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Solicitar Cotización
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      {/* Category Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Productos de {categoryName}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra selección de productos especializados en {categoryName.toLowerCase()}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Results Info */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600">
          Mostrando <span className="font-semibold">{products.length}</span> productos en {categoryName.toLowerCase()}
        </p>
      </div>
    </div>
  )
}
