import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ 
        error: 'ID de producto requerido',
        usage: 'Use ?id=vpjs4ztee95gytz5p7y0jcec para ver la estructura de imagen'
      }, { status: 400 })
    }
    
    console.log('🔍 Debug: Obteniendo imagen para producto:', id)
    
    // Buscar el producto
    let productData
    
    if (isNaN(parseInt(id))) {
      // Buscar por documentId
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/productos?filters[documentId][$eq]=${id}&populate=*`)
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (data.data && data.data.length > 0) {
        productData = data.data[0]
      } else {
        return NextResponse.json({
          success: false,
          error: 'Producto no encontrado'
        }, { status: 404 })
      }
    } else {
      // Buscar por ID numérico
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/productos/${id}?populate=*`)
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      
      const data = await response.json()
      productData = data.data
    }
    
    return NextResponse.json({
      success: true,
      productId: id,
      productName: productData.nombre,
      imageStructure: {
        raw: productData.imagen,
        hasData: !!productData.imagen?.data,
        dataStructure: productData.imagen?.data ? Object.keys(productData.imagen.data) : 'No data',
        attributes: productData.imagen?.data?.attributes || 'No attributes',
        url: productData.imagen?.data?.attributes?.url || 'No URL',
        fullUrl: productData.imagen?.data?.attributes?.url ? 
          `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${productData.imagen.data.attributes.url}` : 
          'No full URL'
      },
      strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    })
    
  } catch (error) {
    console.error('❌ Error en debug de imagen:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    }, { status: 500 })
  }
}
