import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/products/ProductDetail'
import { strapiClient } from '@/lib/strapi'
import { Product } from '@/types/product'

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    console.log('🔍 Metadata - Parámetro recibido:', params.id)
    
    let productData
    
    // Si el ID no es numérico, es un documentId de Strapi
    if (isNaN(parseInt(params.id))) {
      console.log('🔍 Metadata - Buscando por documentId:', params.id)
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/productos?filters[documentId][$eq]=${params.id}&populate=*`)
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (data.data && data.data.length > 0) {
          const rawProductData = data.data[0];
          productData = strapiClient.processProduct(rawProductData)
        } else {
          return {
            title: 'Producto no encontrado | MaqOn',
            description: 'El producto solicitado no está disponible.'
          }
        }
      } catch (error) {
        console.error('❌ Error en metadata buscando por documentId:', error)
        return {
          title: 'Producto no encontrado | MaqOn',
          description: 'El producto solicitado no está disponible.'
        }
      }
    } else {
      // Es un ID numérico
      const product = await strapiClient.getProducto(parseInt(params.id))
      
      if (!product || !product.data) {
        return {
          title: 'Producto no encontrado | MaqOn',
          description: 'El producto solicitado no está disponible.'
        }
      }
      
      productData = product.data
    }
    
    console.log('🔍 Producto para metadata:', productData)
    const productName = productData.nombre || 'Producto'
    const productDescription = productData.descripcion || 'Descripción del producto'

    return {
      title: `${productName} | MaqOn - Importación de Maquinaria`,
      description: productDescription,
      keywords: `${productName}, maquinaria industrial, importación, ${productData.categoria}, MaqOn`,
      alternates: { 
        canonical: `/productos/${params.id}` 
      },
      openGraph: {
        title: `${productName} | MaqOn`,
        description: productDescription,
        url: `${process.env.SITE_URL || 'http://localhost:3000'}/productos/${params.id}`,
        siteName: 'MaqOn',
        images: (() => {
          // Usar imagenes si existe, sino usar imagen como fallback
          const images = productData.imagenes?.data || (productData.imagen?.data ? [productData.imagen] : []);
          
          if (images.length > 0) {
            const firstImage = images[0];
            const imageAttrs = firstImage.data?.attributes || firstImage.attributes || firstImage;
            return [
              {
                url: `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageAttrs.url}`,
                width: imageAttrs.width || 1200,
                height: imageAttrs.height || 630,
                alt: imageAttrs.alternativeText || productName,
              },
            ];
          }
          
          return [
            {
              url: '/og-image.jpg',
              width: 1200,
              height: 630,
              alt: productName,
            },
          ];
        })(),
        locale: 'es_ES',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productName} | MaqOn`,
        description: productDescription,
        images: (() => {
          const images = productData.imagenes?.data || (productData.imagen?.data ? [productData.imagen] : []);
          
          if (images.length > 0) {
            const firstImage = images[0];
            const imageAttrs = firstImage.data?.attributes || firstImage.attributes || firstImage;
            return [`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageAttrs.url}`];
          }
          
          return ['/og-image.jpg'];
        })(),
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Producto | MaqOn',
      description: 'Descubre nuestros productos industriales importados.'
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    console.log('🔍 Parámetro recibido:', params.id)
    
    let product
    let productData
    
    // Si el ID no es numérico, es un documentId de Strapi
    if (isNaN(parseInt(params.id))) {
      console.log('🔍 Buscando por documentId:', params.id)
      
      // Buscar directamente en Strapi por documentId
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/productos?filters[documentId][$eq]=${params.id}&populate=*`)
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('📊 Respuesta de Strapi por documentId:', data)
        
        if (data.data && data.data.length > 0) {
          const rawProductData = data.data[0];
          // Procesar el producto usando el cliente Strapi
          productData = strapiClient.processProduct(rawProductData)
          console.log('✅ Producto encontrado por documentId:', productData)
        } else {
          console.log('❌ No se encontró producto con documentId:', params.id)
          notFound()
        }
      } catch (error) {
        console.error('❌ Error buscando por documentId:', error)
        notFound()
      }
    } else {
      // Es un ID numérico, usar el método normal
      console.log('🔍 Buscando por ID numérico:', params.id)
      product = await strapiClient.getProducto(parseInt(params.id))
      
      if (!product || !product.data) {
        console.log('❌ Producto no encontrado por ID numérico')
        notFound()
      }
      
      productData = product.data
    }
    
    // Debug en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Producto cargado:', productData.nombre)
      console.log('🖼️ Imágenes disponibles:', productData.imagenes?.length || 0)
    }

    // El producto ya viene procesado desde el cliente Strapi
    const transformedProduct: Product = productData as Product
    


    return (
      <div className="min-h-screen bg-gray-50">
        <ProductDetail product={transformedProduct} />
      </div>
    )
  } catch (error) {
    console.error('Error loading product:', error)
    notFound()
  }
}