import { NextRequest, NextResponse } from 'next/server'
import { strapiClient } from '@/lib/strapi'

// Fallback products en caso de que Strapi no esté disponible
const fallbackProducts = [
  {
    id: 1,
    documentId: "prod001",
    nombre: "Excavadora Hidráulica CAT 320",
    descripcion: "Excavadora hidráulica de 20 toneladas con brazo extendido, ideal para obras de construcción civil y minera.",
    categoria: "construccion",
    caracteristicas: {
      "Peso": "20 toneladas",
      "Potencia": "103 HP",
      "Capacidad": "1.0 m³"
    },
    precio: 85000,
    disponible: true,
    imagen: "/images/industries/construction.jpg",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    documentId: "prod002",
    nombre: "Grúa Torre Liebherr",
    descripcion: "Grúa torre de alta capacidad para construcción de edificios y estructuras de gran altura.",
    categoria: "construccion",
    caracteristicas: {
      "Capacidad": "8 toneladas",
      "Alcance": "50 metros",
      "Altura": "200 metros"
    },
    precio: 125000,
    disponible: true,
    imagen: "/images/industries/construction.jpg",
    createdAt: "2024-01-16T10:00:00Z",
    updatedAt: "2024-01-16T10:00:00Z"
  },
  {
    id: 3,
    documentId: "prod003",
    nombre: "Tractor Agrícola John Deere",
    descripcion: "Tractor agrícola de alta potencia para labores de campo y preparación de suelos.",
    categoria: "agro",
    caracteristicas: {
      "Potencia": "150 HP",
      "Tracción": "4x4",
      "Combustible": "Diesel"
    },
    precio: 45000,
    disponible: true,
    imagen: "/images/industries/agro.jpg",
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z"
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    console.log('🔍 API Products - Categoría solicitada:', category)
    console.log('🔍 API Products - Búsqueda solicitada:', search)
    
    let products = []
    
    try {
      // Intentar obtener productos desde Strapi
      if (category) {
        console.log('🔍 Buscando productos para categoría:', category)
        products = await strapiClient.getProductosByCategory(category)
      } else {
        console.log('🔍 Obteniendo todos los productos')
        products = await strapiClient.getAllProductos()
      }
      
      console.log('✅ Productos obtenidos desde Strapi:', products.length)
      if (products.length > 0) {
        console.log('📋 Primeros productos:', products.slice(0, 3).map((p: any) => ({ id: p.id, nombre: p.nombre, categoria: p.categoria })))
        console.log('🖼️ Imagen del primer producto:', products[0].imagen)
      }
      
    } catch (strapiError) {
      console.warn('⚠️ Error con Strapi, usando productos fallback:', strapiError)
      
      // Usar productos fallback si Strapi no está disponible
      products = fallbackProducts
      
      // Filtrar por categoría si se especifica
      if (category) {
        products = fallbackProducts.filter((product: any) => 
          product.categoria.toLowerCase() === category.toLowerCase()
        )
      }
    }

    // Aplicar filtro de búsqueda si se especifica
    if (search && search.trim()) {
      const searchTerm = search.toLowerCase().trim()
      products = products.filter((product: any) => 
        product.nombre.toLowerCase().includes(searchTerm) ||
        product.descripcion.toLowerCase().includes(searchTerm) ||
        product.categoria.toLowerCase().includes(searchTerm)
      )
      console.log('🔍 Productos filtrados por búsqueda:', products.length)
    }
    
    // Filtrar solo productos disponibles
    const availableProducts = products.filter((product: any) => product.disponible !== false)
    
    return NextResponse.json({
      success: true,
      products: availableProducts,
      total: availableProducts.length,
      category: category || 'all',
      source: products.length > 0 && products[0].documentId?.startsWith('prod') ? 'fallback' : 'strapi'
    })
    
  } catch (error) {
    console.error('❌ Error en API de productos:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor',
        products: [],
        total: 0
      },
      { status: 500 }
    )
  }
}
