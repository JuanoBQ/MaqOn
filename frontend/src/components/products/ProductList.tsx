'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from './ProductCard'
import { ProductListSkeleton } from '@/components/ui/ProductSkeleton'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Product } from '@/types/product'

interface ProductListProps {
  category: string
  categoryName: string
}

export function ProductList({ category, categoryName }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'newest'>('name')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        console.log('🔍 ProductList: Buscando productos para categoría:', category)
        
        const response = await fetch(`/api/products?category=${category}`)
        
        if (!response.ok) {
          throw new Error('Error al cargar productos')
        }
        
        const data = await response.json()
        console.log('📊 ProductList: Respuesta de API:', data)
      if (data.products && data.products.length > 0) {
        console.log('📋 Primer producto completo:', data.products[0])
        console.log('🖼️ Estructura de imagen del primer producto:', data.products[0].imagen)
      }
        
        setProducts(data.products || [])
        setFilteredProducts(data.products || [])
        
        if (data.products && data.products.length > 0) {
          console.log('✅ ProductList: Productos cargados:', data.products.length)
        } else {
          console.log('⚠️ ProductList: No se encontraron productos')
        }
      } catch (err) {
        console.error('❌ ProductList: Error:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    let filtered = [...products]

    // Ordenar productos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.nombre.localeCompare(b.nombre)
        case 'newest':
          const dateA = new Date(a.createdAt || '').getTime()
          const dateB = new Date(b.createdAt || '').getTime()
          return dateB - dateA // Más reciente primero
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, sortBy])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Productos de {categoryName}
          </h2>
          <p className="text-lg text-gray-600">
            Cargando productos especializados...
          </p>
        </div>
        <ProductListSkeleton />
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

      {/* Filtros y ordenamiento */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 bg-white p-4 rounded-lg border border-gray-200 mb-8">
        <div className="flex items-center space-x-2">
          <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
            Ordenar por:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'newest')}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-[#f7b34b] focus:border-[#f7b34b]"
          >
            <option value="name">Nombre A-Z</option>
            <option value="newest">Más Recientes</option>
          </select>
        </div>
        
        <div className="text-sm text-gray-500">
          {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Results Info */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600">
          Mostrando <span className="font-semibold">{filteredProducts.length}</span> de <span className="font-semibold">{products.length}</span> productos en {categoryName.toLowerCase()}
        </p>
      </div>
    </div>
  )
}
