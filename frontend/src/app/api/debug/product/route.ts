import { NextRequest, NextResponse } from 'next/server'
import { strapiClient } from '@/lib/strapi'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ 
        error: 'ID de producto requerido',
        usage: 'Use ?id=1 para obtener un producto específico o ?id=documentId para buscar por documentId'
      }, { status: 400 })
    }
    
    console.log('🔍 Debug: Obteniendo producto con ID:', id)
    
    let product
    let searchMethod = 'unknown'
    
    // Si el ID no es numérico, buscar por documentId
    if (isNaN(parseInt(id))) {
      console.log('🔍 Debug: Buscando por documentId:', id)
      searchMethod = 'documentId'
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/productos?filters[documentId][$eq]=${id}&populate=*`)
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('📊 Debug: Respuesta de Strapi por documentId:', data)
        
        if (data.data && data.data.length > 0) {
          product = { data: data.data[0] }
        } else {
          product = null
        }
      } catch (error) {
        console.error('❌ Error buscando por documentId:', error)
        product = null
      }
    } else {
      console.log('🔍 Debug: Buscando por ID numérico:', id)
      searchMethod = 'numericId'
      product = await strapiClient.getProducto(parseInt(id))
    }
    
    return NextResponse.json({
      success: true,
      productId: id,
      searchMethod: searchMethod,
      strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
      product: product,
      hasData: !!product?.data,
      dataStructure: product?.data ? Object.keys(product.data) : 'No data'
    })
    
  } catch (error) {
    console.error('❌ Error en debug de producto:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    }, { status: 500 })
  }
}
