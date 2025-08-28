import { NextRequest, NextResponse } from 'next/server'
import { strapiClient } from '@/lib/strapi'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 DEBUG: Obteniendo todos los productos desde Strapi...')
    
    // Obtener todos los productos
    const allProducts = await strapiClient.getAllProductos()
    
    // Obtener productos por categorías específicas
    const construccionProducts = await strapiClient.getProductosByCategory('construccion')
    const manofacturaProducts = await strapiClient.getProductosByCategory('manofactura')
    const otrosProducts = await strapiClient.getProductosByCategory('otros')
    
    return NextResponse.json({
      success: true,
      debug: {
        totalProducts: allProducts.length,
        allProducts: allProducts.map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
          categoria: p.categoria,
          disponible: p.disponible,
          precio: p.precio
        })),
        construccionProducts: construccionProducts.length,
        construccionDetails: construccionProducts.map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
          categoria: p.categoria,
          disponible: p.disponible,
          precio: p.precio
        })),
        manofacturaProducts: manofacturaProducts.length,
        manofacturaDetails: manofacturaProducts.map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
          categoria: p.categoria,
          disponible: p.disponible,
          precio: p.precio
        })),
        otrosProducts: otrosProducts.length,
        otrosDetails: otrosProducts.map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
          categoria: p.categoria,
          disponible: p.disponible,
          precio: p.precio
        }))
      },
      strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    })
    
  } catch (error) {
    console.error('❌ DEBUG Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido',
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
      },
      { status: 500 }
    )
  }
}
